 ## 项目目的
 项目主要时为了展示前端整个架构过程，包括前端编译，打包上线等
 ## 技术栈
- 项目使用：vue3.x vue-router  
- 编译使用：webpack  
- 部署使用：docker
 ## 本地运行
 进入项目中，执行运行命令
 ```shell
 cd project1
 pnpm i
 pnpm run dev
 ```
 ## 部署
 主要运行脚本，编译然后生成docker镜像，tag后上传服务器  
 Windows(powershell运行可能需要更新脚本运行安全策略):
 ```shell
 .\build.ps1
 ```
 Linux:
 ```shell
 ./build.sh
 ```
 远程启动nginx容器，执行部署：
 ```shell
 docker run -d --rm -p 80:80 -v /home/pengshouhua/microfrontend/nginx.conf:/etc/nginx/nginx.conf -v /home/pengshouhua/microfrontend/html:/usr/share/nginx/html --name microfrontend-nginx nginx
 docker run --rm -v 宿主目录:镜像目录 dockerregistry:5000/microfrontend-proj1
 docker run --rm -v 宿主目录:镜像目录 dockerregistry:5000/microfrontend-proj2
 ```
