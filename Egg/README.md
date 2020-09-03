# Egg.js

egg.js官方文档：[https://eggjs.org](https://eggjs.org)

> Egg.js为建造而生 使用Node.js和Koa更好的企业框架和应用程序， Egg 是以 Koa 作为其基础框架，在Koa的模型基础上，进一步对它进行了一些增强。



## 安装初始化依赖项：

```shell
mkdir egg-demo // 创建项目根目录
cd egg-demo
npm init // 初始化package.json
npm install egg --save
npm install egg-bin --save-dev
```

在 `package.json`文件中的`scripts`配置项中添加如下配置

```shell
{
  "scripts": {
    "dev": "egg-bin dev"
  }
}
```

## 创建项目目录结构：

```shell
// 在项目根目录中创建如下目录
mkdir app // 工程目录
mkdir config // 配置文件存放目录
```

![egg项目目录结构](D:\node\Node.js\Egg\egg.js目录结构.png)