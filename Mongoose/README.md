# Mongoose 一个用于node.js的优雅mongodb对象建模
	官网：[https://mongoosejs.com/]
	
在以前编写MongoDB验证，转换和业务逻辑样板很麻烦。 这就是为什么Mongoose(猫鼬)的原因。

Mongoose提供了一个直接的，基于模式的解决方案来对您的应用程序数据进行建模。 它包括现成的内置类型转换，验证，查询构建，业务逻辑挂钩等等。
	
	
```
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', {
	useNewUrlParser: true, 
	useUnifiedTopology: true
});

const Cat = mongoose.model('Cat', { 
	name: String 
});

const kitty = new Cat({ 
	name: 'Zildjian' 
});

kitty.save().then(() => console.log('meow'));

```