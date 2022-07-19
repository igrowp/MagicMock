# MagicMock

### 项目启动

#### 1. 安装依赖

项目分为服务端(server)和客户端(client)，两个项目分别管理，首次安装依赖方式：
方式一：可以通过`init.sh`脚本进行安装，即

```
$ sh ./init.sh
```

方式二：分别进入两个目录下，执行`npm install`，即

```
$ cd npm install
$ cd client && npm install
$ cd ../server && npm install
```

#### 2. 启动本地服务

需要先本地安装 mysql，并修改`/server/nodemon.json`中的环境变量，设置`DB_NAME`、`DB_ACCOUNT`、`DB_PASSWORD`为你本地 mysql 的信息

在根目录下执行`npm run dev`可以直接启动客户端和服务端，也可以进入到各自服务的目录下执行`npm run dev`分别启动
