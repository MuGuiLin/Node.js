# Node.js环境安装
	下载地址：[https://nodejs.org/en/download/]
	
	历史版本：[https://nodejs.org/dist/]
	
# node 热更新：
	npm i -g nodemon
	
	nodemon app.js


# Node.js环境升级：

node有一个模块叫n（这名字可够短的），是专门用来管理node.js的版本的。

	1、首先安装n模块：
	npm install -g n

	2、升级node.js到最新稳定版
	n stable
	
	3、 升级到指定的版本：在n后面跟随版本号
	比如：n v0.10.26 或 n 0.10.26

 

## 在云服务器上安装 Node.js 环境

#### 下载并安装 Node.js下载最新的稳定版 v6.10.3 到本地

	1、wget https://nodejs.org/dist/v6.10.3/node-v6.10.3-linux-x64.tar.xz

	下载完成后, 将其解压
	2、tar xvJf node-v6.10.3-linux-x64.tar.xz

	将解压的 Node.js 目录移动到 /usr/local 目录下
	3、mv node-v6.10.3-linux-x64 /usr/local/node-v6

	配置 node 软链接到 /bin 目录
	4、ln -s /usr/local/node-v6/bin/node /bin/node
	

## 阿里云部署Node.js环境

#### 一、使用二进制文件安装
	该部署过程使用的安装包是已编译好的二进制文件。解压之后，在bin文件夹中就已存在node和npm，无需重复编译。

	完成以下操作，使用二进制文件部署Node.js环境：
	
	注：【软件默认安装在/root/目录下】
	
	1、下载Node.js安装包。
		wget https://nodejs.org/dist/v6.9.5/node-v6.9.5-linux-x64.tar.xz
	
	2、解压文件。
		tar xvf node-v6.9.5-linux-x64.tar.xz
	
	3、创建软链接【全局变量】，您就可以在任意目录下直接使用node和npm命令。
		ln -s /root/node-v6.9.5-linux-x64/bin/node /usr/local/bin/node		//就是将/root/node-v6.9.5-linux-x64/bin/node文件【中间要有空格】 创建快捷方式到 /usr/local/bin/node 中
		ln -s /root/node-v6.9.5-linux-x64/bin/npm /usr/local/bin/npm
	
	4、查看node、npm版本。
		node -v
		npm -v
	
	至此，Node.js环境已安装完毕。软件默认安装在/root/node-v6.9.5-linux-x64/目录下。

	5、如果需要将该软件安装到其他目录（例如：/opt/node/）下，请进行如下操作：
		mkdir -p /opt/node/
		mv /root/node-v6.9.5-linux-x64/* /opt/node/
		rm -f /usr/local/bin/node
		rm -f /usr/local/bin/npm
		ln -s /opt/node/bin/node /usr/local/bin/node
		ln -s /opt/node/bin/npm /usr/local/bin/npm
	


#### 二、配置和使用 npm

	配置 npm
	npm 是 Node.js 的包管理和分发工具。它可以让 Node.js 开发者能够更加轻松的共享代码和共用代码片段
	下载 node 的压缩包中已经包含了 npm , 我们只需要将其软链接到 bin 目录下即可
	5、ln -s /usr/local/node-v6/bin/npm /bin/npm

	配置环境变量
	将 /usr/local/node-v6/bin 目录添加到 $PATH 环境变量中可以方便地使用通过 npm 全局安装的第三方工具
	6、echo 'export PATH=/usr/local/node-v6/bin:$PATH' >> /etc/profile

	生效环境变量
	7、source /etc/profile

	使用 npm
	通过 npm 安装进程管理模块 forever
	8、npm install forever -g

	
	
#### 三、完成实验
	node -v
	npm -v
	恭喜！您已经成功完成了搭建 Node.js 环境的实验任务。
	




## ========== npm的常用命令 ==========
| 命令                        | 说明                      |
|-----------------------------|---------------------------|
|npm install -g npm to update |更新升级npm
|npm -v          			  |显示版本，检查npm 是否正确安装。  
|npm install express   		  |安装express模块  
|npm install -g express		  |全局安装express模块  
|npm list         			  |列出已安装模块  
|npm show express     		  |显示模块详情  
|npm update        			  |升级当前目录下的项目的所有模块  
|npm update express    		  |升级当前目录下的项目的指定模块  
|npm update -g express 		  |升级全局安装的express模块  
|npm uninstall express 		  |删除指定的模块



 
 


	

