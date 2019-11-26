# Node.js环境升级：

node有一个模块叫n（这名字可够短的），是专门用来管理node.js的版本的。

	1、首先安装n模块：
	npm install -g n

	2、升级node.js到最新稳定版
	n stable
	
	3、 升级到指定的版本：在n后面跟随版本号
	比如：n v0.10.26 或 n 0.10.26

 

## 在云服务器上安装 Node.js 环境

#### 一、下载并安装 Node.js
	下载最新的稳定版 v6.10.3 到本地
	1、wget https://nodejs.org/dist/v6.10.3/node-v6.10.3-linux-x64.tar.xz

	下载完成后, 将其解压
	2、tar xvJf node-v6.10.3-linux-x64.tar.xz

	将解压的 Node.js 目录移动到 /usr/local 目录下
	3、mv node-v6.10.3-linux-x64 /usr/local/node-v6

	配置 node 软链接到 /bin 目录
	4、ln -s /usr/local/node-v6/bin/node /bin/node
	

