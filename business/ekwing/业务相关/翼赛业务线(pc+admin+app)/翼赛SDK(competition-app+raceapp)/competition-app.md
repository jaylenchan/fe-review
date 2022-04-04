![img](../../../pic/Web开发流程图.png)
## 总览

`competition-app`是**翼赛sdk主入口**及相关**政策页面**的实现项目。其中sdk的开发背景一开始是为了给竞赛学生在翼课学生开放一个入口，通过这个入口可以进行赛前模拟练习，赛时正式竞赛的效果。

## 项目概述

- 开发模式：**前后端分离**

- 业务技术：**Vue2+JS+JSBridge+Scss**

- 项目地址：

- CI配置：`Jenkinsfile`

  ```shell
     ## Config阶段，对指定的文件“.env.production”进行配置替换。这个阶段做了两件事
     ### 将.env.production中的PUBLIC_PATH替换成//cdn-res.esmatch.cn/resource/competition-app/$BRANCH/
     ### 将.env.production中的CDN_PATH替换成//cdn-res.esmatch.cn/resource/competition-app/$BRANCH/
     #### 其中，$BRANCH就是当前分支名。现在基本就是1.2。
     
     stage('Config') {
          steps {
            sh '''
              sed -i "/^PUBLIC_PATH=/c PUBLIC_PATH=//cdn-res.esmatch.cn/resource/competition-app/$BRANCH/" .env.production
              sed -i "/^CDN_PATH=/c CDN_PATH=//cdn-res.esmatch.cn/resource/competition-app/$BRANCH/" .env.production
            '''
          }
     }
  ```

   ```shell
      ## Build阶段， Jenkins使用webpack对本项目进行打包构建，这一步其实就是将你在本地的构建交给了Jenkins去做而已。生成的文件跟本地构建build生成的文件一模一样。
      
      stage('Build') {
           steps {
             sh '''
               yarn
               yarn build
             '''
           }
       }
   ```

  ```shell
   ## Deploy阶段，这个阶段Jenkins会使用sshPublisher插件将刚刚生成的dist文件夹进行线下服务器部署。其实做的事情就是连接172.17.20.23服务器，传输文件内容到172.17.20.23服务器指定的磁盘目录上去而已。其中sshPublisherDesc写了两次，是为了分别部署html和其他静态资源文件（css/js/img/fonts），这是因为对于web来说，这两者最终部署的地方是不同的。对于css/js/img/fonts我们是要部署到cdn去的，而html是部署到自己服务器上的。因为html常常不需要缓存，或者协商缓存，而其他资源往往都是强缓存。
   
   ## sshTransfer中的常用配置说明
   ### cleanRemote: true 告诉Jenkins，连接到服务器那边的时候，远程指定传输目录请帮我清除掉旧的内容
   ### sourceFiles: 'dist/**' 告诉Jenkins，我要传输的文件是dist下边的所有内容
   ### removePrefix: 'dist' 告诉Jenkins，我要传输的文件最后放置的目录要去除dist前缀
   ### remoteDirectory: "/raceapp/resource/competition-app/$BRANCH" 告诉Jenkins我要传输到远程服务器中的哪个磁盘目录
   ###  excludes: 'dist/*.html' 告诉Jenkins，当我传输我的文件时，请帮我排除掉符合dist/*.html这个规则的文件
   
   stage('Deploy') {
        steps {
          sshPublisher(publishers: [
            sshPublisherDesc(
              configName: '172.17.20.23',
              transfers: [
                sshTransfer(
                  cleanRemote: true,
                  excludes: 'dist/*.html',
                  execCommand: ''' echo 'Deploy Success' ''',
                  execTimeout: 120000,
                  flatten: false,
                  makeEmptyDirs: false,
                  noDefaultExcludes: false,
                  patternSeparator: '[, ]+',
                  remoteDirectory: "/raceapp/resource/competition-app/$BRANCH",
                  remoteDirectorySDF: false,
                  removePrefix: 'dist',
                  sourceFiles: 'dist/**')
              ],
              usePromotionTimestamp: false,
              useWorkspaceInPromotion: false,
              verbose: false
            ),
            sshPublisherDesc(
              configName: '172.17.20.23', // 线下：172.17.20.22 预发布：172.17.20.23
              transfers: [
                sshTransfer(
                  cleanRemote: true,
                  excludes: '',
                  execCommand: ''' echo 'Deploy Success' ''',
                  execTimeout: 120000,
                  flatten: false,
                  makeEmptyDirs: false,
                  noDefaultExcludes: false,
                  patternSeparator: '[, ]+',
                  remoteDirectory: "/raceapp/web/app/competition/$BRANCH", // cdn cdn-back esmatch
                  remoteDirectorySDF: false,
                  removePrefix: 'dist',
                  sourceFiles: 'dist/*.html')
              ],
              usePromotionTimestamp: false,
              useWorkspaceInPromotion: false,
              verbose: false
            )
          ])
        }
      }
  ```

## 常见问题

- webview缓存问题：有时候手机代理可能会导致只拿html资源，而没有请求到静态资源，这种时候大概率是webview自身缓存的问题，你可以把webview当作一个微型浏览器，浏览器可能缓存，webview当然可能缓存。解决方式是清除app缓存重来。
