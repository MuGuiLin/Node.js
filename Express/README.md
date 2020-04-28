# Express的安装
首先假定你已经安装了 Node.js，接下来为你的应用创建一个目录，然后进入此目录并将其作为当前工作目录。
```
$ mkdir 项目名
$ cd 项目名
```

通过 npm init 命令为你的应用创建一个 package.json 文件。 欲了解 package.json 是如何起作用的，请参考 Specifics of npm’s package.json handling.
```
$ npm init
```
此命令将要求你输入几个参数，例如此应用的名称和版本。 你可以直接按“回车”键接受大部分默认设置即可，下面这个除外：

```
entry point: (index.js)
```
键入 app.js 或者你所希望的名称，这是当前应用的入口文件。如果你希望采用默认的 index.js 文件名，只需按“回车”键即可。

接下来在 myapp 目录下安装 Express 并将其保存到依赖列表中。如下：
```
$ npm install express --save
```

如果只是临时安装 Express，不想将它添加到依赖列表中，可执行如下命令：

```
$ npm install express --no-save
```
npm 5.0+ 版本在默认情况下会将安装的模块添加到 package.json 文件中的 dependencies 列表中。对于较老的 npm 版本，你就必须指定 --save 参数。然后，照旧执行 npm install 命令即可自动安装依赖列表中所列出的所有模块。