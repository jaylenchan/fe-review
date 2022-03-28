![img](../../../pic/Web开发流程图.png)
## 总览

bingo-admin的背景是易辅来超管平台和校管平台的合并，并以此基础上增加和优化需求功能。项目技术栈是`Vue2全家桶+TS+SCSS+Whistle（代理调试）`。项目的启动开发有两种，你自己手动配置相关环境，或者采用docker开发【环境统一，启动即开发环境】，下面只介绍docker开发的方式。

## 一、如何设置以及启动项目

### 1. 配置请求转发相关

#### 1.1 建立起bingo-admin-whistle代理服务器配置

- 在Chrome浏览器安装SwitchyOmega插件(此步骤省略，很简单，该翻qiang翻qiang)完成后，找到如下菜单
![img](https://gitlab.ekwing.com/chenjialiang/wsl_update/uploads/67ee6b78b1054abb8347529c5ce5f45a/%E6%88%AA%E5%B1%8F2022-01-13_%E4%B8%8A%E5%8D%8810.27.35.png)
- 点击后，我们开始新建情景模式,选择代理服务器，名称填"bingo-admin-whistle"(其实填啥都行，看你自己，只是为了之后协助方便交流，统一填一个名字好一些)
- 新建后你就会发现左侧菜单多出了你自己建立起来的代理服务器配置菜单，点击它，按照如下填写:
![img](https://gitlab.ekwing.com/chenjialiang/wsl_update/uploads/c9341475316438b484664493819e39a1/%E6%88%AA%E5%B1%8F2022-01-13_%E4%B8%8A%E5%8D%8810.31.11.png)

#### 1.2 配置浏览器指定流量转发规则

- 选择左侧菜单的`auto switch`功能，找到**添加条件**添加一个新的局部代理规则
![img](https://gitlab.ekwing.com/chenjialiang/wsl_update/uploads/9a19e5a0f3d3d2f501b34c549d99a56e/%E6%88%AA%E5%B1%8F2022-01-13_%E4%B8%8A%E5%8D%8810.34.52.png)

- 这里我们就填写bingo-admin项目的域名，并告诉SwitchyOmega，请你帮我转发这个域名下的请求到指定的代理服务器上去，这里我们就在右侧选择`bingo-admin-whistle`代理服务器（默认是`直接连接`，选择的bingo-admin-whistle就是刚刚我们创建起来的代理服务器配置）
![img](https://gitlab.ekwing.com/wisdom/fe/bingo-admin/uploads/42eb8fdcc2fccb0ee6869cea93d3e537/%E6%88%AA%E5%B1%8F2022-01-13_%E4%B8%8B%E5%8D%8811.17.56.png)

- **SwithyOmega局部代理配置成功**，接下来就是在Chrome浏览器当中使用SwitchyOmega的`auto switch`情景模式啦！【`auto switch`这个情景模式在我的理解中就是用来匹配不同的域名转发给其他的情景模式的。这里说的情景模式意思就是左侧菜单栏那堆东西，所以当然也可以是代理服务器，具体的情景模式建立一开始就说过怎么去创建新的情景模式了，代理服务器只是情景模式中的一种而已】如下就是使用`auto switch`的效果，你会发现浏览器右侧的switchyOmega扩展按钮应该是绿色的才对

  ![img](https://gitlab.ekwing.com/wisdom/fe/bingo-admin/uploads/29f30eca273b6bd197fd8921bc717c6b/%E6%88%AA%E5%B1%8F2022-01-13_%E4%B8%8B%E5%8D%8811.27.04.png)

- 这里提一下，配置SwitchOmega只是为了做到把局部代理，也就是拜托SwitchyOmega将某些符合你要求的请求转发到指定的代理服务器上去。其实如果你想让你整个系统的请求都跑代理服务器完全没问题，那你就配置你对应系统的系统代理。拿这个项目举例：项目最终跑在浏览器上，但是我要拦截浏览器发出去的数据包，应该怎么做？有两种方式，一种是全局代理，一种是局部代理。全局代理就是让我们的整个系统，也就是你的整台电脑，所有的软件发出去的请求都经过代理服务器；局部代理就是单单配置某个软件发出去的请求经过代理服务器，这里的某个软件在这个项目中就是我们的浏览器。很多人很疑惑的一点是，我已经有了whistle代理服务器，也有了浏览器，为啥还要SwitchyOmega？这是因为如果在使用系统代理的时候，你只需要找到自己系统配置系统代理的地方，在那里配置代理服务器的ip:port即可，操作系统帮你做了流量请求的转发而已。但是局部代理也需要一个这样的机制，即现在不配置全局代理了，那么谁帮我把浏览器出去的请求转发到我要的代理服务器上去，而SwitchyOmega做的就是这样一个搬运流量的事，它只是流量的搬运工，把浏览器发出去的请求，搬运到whistle代理服务器罢了。只不过，SwitchyOmega能做到更加细粒度的控制，也就是我还要提更高的要求，请你SwitchyOmega帮我只转发浏览器中符合某个条件的请求，而不是所有浏览器发出去的请求！我们上述的那些步骤一直都在做这件事而已。

### 2.配置Docker相关

#### 下载Docker Desktop

- 项目开发为了保证环境统一和避免环境配置,我选择在docker当中开发（当然你也可以不用docker开发，自己配置相关环境）。首先，到docker官方下载自己对应系统的Docker DeskTop，官方地址：<https://www.docker.com/get-started>
![img](https://gitlab.ekwing.com/chenjialiang/wsl_update/uploads/7ebd31dca0bed72d98953552afd32236/%E6%88%AA%E5%B1%8F2022-01-13_%E4%B8%8A%E5%8D%8810.53.16.png)
- 注意⚠️：windows系统的小伙伴（特别是win10）可能在启动`Docker Desktop`的时候遇到报错弹窗：**“wsl2 installation is incomplete”**，那么你需要下载一下wsl_update更新包。为了方便大家使用更新包，我直接将该包上传到了gitlab仓库，你只需`git clone git@gitlab.ekwing.com:chenjialiang/wsl_update.git`把该仓库克隆下来，找到里头的`wsl_update_x64.msi`双击安装更新你的wsl即可。现在，我们重新启动`Docker Desktop`软件，docker就成功启动了【这里其实顺便把你的docker-compose也一起启动了，docker desktop会顺便把docker-compose一起安装了，无需你手动安装，很方便】。

- **额外重点操作**⚠️：本项目会用到线下接口服务器，这个服务器的网段是`172.17.0.1/16`，刚巧不巧，我们的docker0网桥默认docker给指定的网段也是`172.17.0.1/16`，这样子就会导致我们很可能在使用docker环境开发当中请求线下接口超时的问题，我也是在测试数据包的时候排查出来的这个问题。目前，够想到的方式就是修改docker0的默认网段，其他无解。如图所示，在你的docker desktop当中找到这个菜单，然后将高亮的部分，这个`bip`字段自己找一个没用的网段写上，这个"bip"就是修改docker0网桥的网段（你可以在命令行`docker network ls `可以看到一个name是bridge的默认网桥，它就是大名鼎鼎的docker0网桥。接着`docker inspect bridge`就可以看到详细的网段信息了）这里我写的是`172.18.0.1/16`，因为我开发的项目并没这个网段的线下服务，如果你有就自己改掉，建议改成`192.(1-158).0.1/24`，随便哪个都行，不和相关公司服务以及你自身网卡的网段相同即可。修改完成之后，记得重启docker才会生效。
![img](https://gitlab.ekwing.com/wisdom/fe/bingo-admin/uploads/99e438f7297129ed806bf3f47e5d6a5f/%E6%88%AA%E5%B1%8F2022-01-13_%E4%B8%8B%E5%8D%8811.30.17.png)


#### 安装VSCode插件：`Remote Container`

![img](https://gitlab.ekwing.com/chenjialiang/wsl_update/uploads/b02d432ab590f3a066584a069902adbd/%E6%88%AA%E5%B1%8F2022-01-13_%E4%B8%8A%E5%8D%8810.00.59.png)
安装完成后，注意你的VSCode左下角会多出一个图标（由一个>和一个<组成的，就在**设置**图标小齿轮下方）。

## 二、正式启动项目

1. 你只需要像平时开发那样，在VSCode打开你的项目。找到刚才我说的Remote插件系统通用的图标，点击它，你就会在VSCode上方中央看到弹出了一个由Remote插件系统为我们提供的菜单
![img](https://gitlab.ekwing.com/chenjialiang/wsl_update/uploads/649d1d4cd0954f2a2c4a9c5b820adc9b/%E6%88%AA%E5%B1%8F2022-01-13_%E4%B8%8A%E5%8D%8810.12.23.png)
2. 我们选择`Reopen Folder in Container`，意思是我要在Container容器当中重新打开我的这个本地项目。点击，VSCode会为你生成一个新的窗口，这时候你就会看到新窗口的左下方，之前图标的位置显示**“正在打开远程”**
![img](https://gitlab.ekwing.com/chenjialiang/wsl_update/uploads/ba212dd77f29f0419295c7a2f126073a/%E6%88%AA%E5%B1%8F2022-01-13_%E4%B8%8A%E5%8D%8810.14.03.png)
3. 同时可以看到右下角也出现了一个弹窗，你还可以选择点击`Strating Dev Container (show log)`去查看docker构建项目的相关信息：
![img](https://gitlab.ekwing.com/chenjialiang/wsl_update/uploads/1693756e970430e3327c548b684847eb/%E6%88%AA%E5%B1%8F2022-01-13_%E4%B8%8A%E5%8D%8810.14.18.png)
4. 接下来，你只需要等待docker构建项目，并启动项目（没错，第一次启动已经不需要你自己下载node_module，也不需要你手动跑项目，它会自己跑起来）。
5. 启动项目成功！点击<http://wisdom.100efly.com/page/pc/admin/login>，然后像在本地VSCode开发代码那样，开始你的代码开发吧！
    ![img](https://gitlab.ekwing.com/wisdom/fe/bingo-admin/uploads/a29f970484cfa9f10af370bfcdefa70e/%E6%88%AA%E5%B1%8F2022-01-13_%E4%B8%8B%E5%8D%8811.19.44.png)


## 三、项目相关命令说明

| 命令             | 说明                           |
| ---------------- | ------------------------------ |
| `yarn install`   | 安装依赖                       |
| `yarn serve`     | 启动本地开发环境（自带热启动） |
| `yarn build`     | 构建生产环境 (自带压缩)        |
| `yarn lint`      | 代码格式检查以及自动修复       |
| `yarn test:unit` | 运行单元测试                   |
| `yarn svg`       | 自动生成 svg 组件              |
| `yarn install`   | 安装依赖                       |
|                  |                                |

## 四、自定义 Vue 配置

看这里 [Configuration Reference](https://cli.vuejs.org/config/).
