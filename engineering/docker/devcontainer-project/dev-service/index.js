const execa = require('execa')
const path = require('path')
const yaml = require('js-yaml')
const fs = require('fs')

class DevService {
  static Registry = '127.0.0.1:9000'
  static ProjectName = 'bingo-admin'
  async run() {
    /** 1.获取docker-compose配置中的所有服务 */
    const services = await this.getServices()
    /** 2. 找出本地没有的镜像 */
    const lackImagesOfLocal = await this.findLackLocalImages(services)

    /** 3. 本地没有的镜像继续从找出仓库没有的镜像：这些就是需要docker-compose真正需要构建的镜像 */
    const { shouldBuildImages, shouldPullImages } = await this.findLackRepositoryImages(
      lackImagesOfLocal
    )
    /** 4. 从harbor拉取应该拉取的镜像 */
    await this.pullImages(shouldPullImages)
    /** 5. 使用docker-compose构建应该构建的镜像 */
    await this.buildImages(shouldBuildImages)
    /** 6. 启动docker-compose指定的所有服务 */
    await this.startServices()
  }

  /** 获取docker-compose配置 */
  async getDockerComposeConfig() {
    return new Promise((resolve, reject) => {
      try {
        const dockerComposeConfig = yaml.load(
          fs.readFileSync(
            path.resolve(__dirname, '../.devcontainer/docker-compose.yml'),
            'utf8'
          )
        )
        resolve(dockerComposeConfig)
      } catch (err) {
        reject(err)
      }
    })
  }

  /** 获取所有的服务 */
  async getServices() {
    const { services } = await this.getDockerComposeConfig()
    return services
  }

  /** 获取本地已存在的镜像 */
  async getLocalImages() {
    await execa('chmod', ['777', path.resolve(__dirname, 'docker.bash')])
    const localImages = await execa(path.resolve(__dirname, 'docker.bash'), {
      shell: true
    }).then(({ stdout }) => stdout.split('\n'))
    return localImages
  }

  /** 对比检查本地镜像，找出缺失的镜像 */
  async findLackLocalImages(services) {
    const serviceImages = Object.entries(services).reduce((serviceImages, [_, value]) => {
      const { image } = value
      serviceImages.push(image)
      return serviceImages
    }, [])
    const localImages = await this.getLocalImages()
    const lackImages = serviceImages.filter(
      (serviceImage) => !localImages.includes(serviceImage)
    )
    return lackImages
  }

  /** 在本地不存在的镜像基础上，继续寻找registry仓库中不存在的镜像 */
  async findLackRepositoryImages(images) {
    const shouldPullImages = []
    const shouldBuildImages = []

    /** /v2/<name>/tags/list */
    const curlRequest = images.map(async (image) => {
      const [imageName, imageTag] = image.split(':')
      /**  curl 127.0.0.1:9000/v2/whistle/tags/list */
      try {
        await execa('curl', [`${DevService.Registry}/v2/${imageName}/tags/list`]).then(
          ({ stdout }) => {
            const info = JSON.parse(stdout)
            if (info.errors && info.errors.length > 0) {
              shouldBuildImages.push(image)
            } else {
              const { tags } = info
              /** 查看下registry是否存在当前版本
               *  - 不存在，放入构建数组
               *  - 存在，放入拉取数组
               */
              tags.includes(imageTag)
                ? shouldPullImages.push(image)
                : shouldBuildImages.push(image)
            }
          }
        )
      } catch (err) {
        console.log('err', err)
      }
    })
    await Promise.all(curlRequest)
    return {
      shouldBuildImages,
      shouldPullImages
    }
  }

  /** 从仓库拉取镜像 */
  async pullImages(images) {
    const pullRequests = images.reduce((pullRequests, curImage) => {
      const privateImage = `${DevService.Registry}/${curImage}`
      pullRequests.push(
        execa('docker', ['pull', privateImage], {
          stdio: 'inherit'
        })
      )
      return pullRequests
    }, [])
    await Promise.all(pullRequests)
    const tagRequests = images.reduce((tagRequests, curImage) => {
      const privateImage = `${DevService.Registry}/${curImage}`
      tagRequests.push(execa('docker', ['tag', privateImage, curImage]))
      return tagRequests
    }, [])
    await Promise.all(tagRequests)
  }

  /** 构建需要构建的镜像 */
  async buildImages(images) {
    if (!images.length) return
    const dockerComposeConfig = await this.getDockerComposeConfig()
    const services = await this.getServices()
    const shouldBuildServices = Object.entries(services).reduce(
      (shouldBuildServices, [key, value]) => {
        const { image } = value
        if (images.includes(image)) {
          shouldBuildServices[key] = value
        }
        return shouldBuildServices
      },
      {}
    )
    dockerComposeConfig.services = shouldBuildServices
    const newDockerComposeConfig = yaml.dump(dockerComposeConfig)
    await fs.writeFileSync(
      path.resolve(__dirname, '../.devcontainer/docker-compose.shouldbuild.yml'),
      newDockerComposeConfig
    )
    try {
      await execa(
        'docker-compose',
        [
          '-f',
          `${path.resolve(__dirname, '../.devcontainer/docker-compose.shouldbuild.yml')}`,
          'build'
        ],
        {
          stdio: 'inherit'
        }
      )
    } catch (err) {
      console.log('err', err)
    }

    images.forEach(async (image) => {
      const privateImage = `${DevService.Registry}/${image}`
      await execa.command(`docker tag ${image} ${privateImage} `)
    })
    const pushRequests = images.reduce((pushRequests, curImage) => {
      const privateImage = `${DevService.Registry}/${curImage}`
      pushRequests.push(execa('docker', ['push', privateImage]))
      return pushRequests
    }, [])
    await Promise.all(pushRequests)
    const tagRequests = images.reduce((tagRequests, curImage) => {
      console.log('curImage', curImage)
      const privateImage = `${DevService.Registry}/${curImage}`
      tagRequests.push(execa('docker', ['tag', privateImage, curImage]))
      return tagRequests
    }, [])
    await Promise.all(tagRequests)
  }

  /** 运行所有服务 */
  async startServices() {
    await execa('docker-compose', [
      '-f',
      path.resolve(__dirname, '../.devcontainer/docker-compose.yml'),
      'up',
      '-d'
    ])
  }
}

const devService = new DevService()
devService.run()
// buildLackImages()
