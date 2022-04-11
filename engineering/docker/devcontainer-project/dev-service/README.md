1. 命令行输入`yarn devcontainer`开始启动开发服务
2. 首先获取`docker-compose.yml`配置，然后遍历所有服务集合，拿到每一个服务的`image`字段。
3. 使用docker查询本地是否具有指定的镜像？
   - 有直接排除掉本地拥有的镜像
  ```shell
  docker images | awk '{if(NR!=1) print}' | awk '{ print $1":"$2 }'
  ```
  获取除了第一行之后的所有信息，并且只有第一二列，格式为：`xx:xx`
4. 使用docker查询一下`image`字段的值所对应的镜像在registry仓库中有没有？
   - 有，将有的镜像放入`exsitImages`数组当中
   - 无，将无的镜像放入`lackImages`数组当中

5. 遍历`exsitImages`依次从仓库拉取存着仓库中的镜像
6. 遍历`lackImages`依次构建指定的镜像
