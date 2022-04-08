## DEV CONTAINER

### 添加`Dockerfile`进行服务编写

1. `docker-compose.yml`配置`docker`服务集合，根据实际开发需要看看需要配置多少个`docker`服务。在前端开发中，目前需要用到如下服务：
   - `whistle service`：whistle代理服务器，用于前端开发日常的抓包、调试、`mock`、`bug`追踪等工作
   - `webdev service`：前端实际开发代码所实际依赖的`devcontainer`容器。
   为了创造以上的服务，我们需要首先构建出相关的服务镜像，也就是`images`。
玩法步骤：

- 建立一个文件夹，叫做`images`，里头放置一个个`Dockerfile`，可以根据不同的服务去取名字，比如说`Dockerfile.webdev`和`Dockerfile.whistle`。每个`Dockerfile`就根据自己的需求去书写，比如`Dockerfile.whistle`，这个服务是用于创造一个代理服务器提供给我们去使用的。
  ⚠️疑问：为什么不直接在本地安装`whistle`，而要用`docker`去创造一个`whistle`服务。
  ✅解答：因为使用`docker`部署`whistle`的话，能够方便环境迁移，同时里头还可能集成相关的依赖配置。既然是统一大家的开发环境，那么`whistle`本身也是基于`Node`平台运行的，那也要统一起来。虽然他跟开发d`evcontainer`是两个容器。但是我们要做的就是在开发当中，将所有可能导致开发问题出现的变量因素控制起来，方便我们后续去统一排查。而且，如果环境崩溃了，我们也可以迅速地重新建立起来，本地的环境搭建破坏了，当然也可以重新建立起来，就是如果依赖到其他东西，你除非记忆力很好，可以迅速找到相关依赖配置，否则就需要花费不少时间。

### 添加`docker-compose.yml`进行容器编排

- 当我们把相关的服务用`Dockerfile`写好之后，就需要使用`docker-compose`去进行服务编排了，对每一个服务指定基本的配置项：
  - 镜像：告诉`docker-compose`当前的这个服务需要一个什么镜像启动起来。
  - 容器名：镜像最终会运行起该服务对应的容器，那这个容器名当然也需要指定一下。
  - 端口：由于我们的服务`whistle`和`webdev`之后开发都要对外提供服务，让我们开发的时候能够在浏览器访问`whistle`服务器和`dev-server`服务器的相关内容。因此当然需要给容器指定一个端口映射到宿主机上来，才能通过`localhost:port`的方式在宿主机上访问。
  - volumes: 开发相关的内容我们肯定是需要进行数据持久化的，不太可能随着container销毁而消失。因此我们当然需要指定数据卷的挂载位置。
  - networks: 一般地，我们对于一个服务集合，最好还是单独放在一个网络当中，方便管理。
  - command: `/bin/sh -c "while sleep 1000; do :; done"`为了让我们的`devcontainer`保存运行状态，我们还需要配置这个选项，去执行一个死循环保证`devcontainer`活着。`whislte`服务就不需要，本来它就可以直接运行在后台不挂掉。
  - restart: `always`，为了防止我们的服务意外挂掉，我们还可以配置`restart: always`告诉`docker-compose`，如果服务意外挂掉，请永远记得帮我随时重启。

### 添加`devcontainer.json`指定服务为devcontainer并进行相关配置

由`docker-compose`进行容器编排后，你还需要去配置生成的服务集合当中哪一个服务要作为开发用的`devcontainer`。这个时候，你就需要使用`devcontainer.json`进行配置了。基本配置项如下：

- extensions: Array<string>，就是vscode当中插件安装扩展，不同的是因为我们的vscode真正是放在container当中，所以需要安装在里头才能让vscode扩展用起来。那么我们就可以在这个位置写扩展相关的扩展名，容器当中就会自动安装这些扩展。
  ✨实践中，一个团队可能都有规范配置，vscode需要什么扩展，就可以按照规范配置上。这样子可以保证团队中的每一个成员都拥有指定规范的扩展。保证环境配置上的统一。
- settings: Record<stirng, string>，就是vscode当中对vscode本身的配置，不同的是因为我们的vscode真正放在container当中，所以需要用这个settings去对container中的vscode进行配置。

### 添加`devcontainer.env`为devcontainer配置环境变量

有的时候，我们需要往容器里头注入变量。那么在使用`docker-compose`的情况下，我们可以现在`.devcontainer/`下建立一个环境配置文件`devcontainer.env`，然后再在`docker-compose.yml` 中对指定为`devcontainer`的服务下边添加一个新的配置项：
`env_file: devcontainer.env`
