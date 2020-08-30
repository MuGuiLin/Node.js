# Nodejs 用户鉴权

---

## Cookie

> ## 什么是 Cookie？
>
> Cookie 是一些数据, 存储于你电脑上的文本文件中。
>
> 当 web 服务器向浏览器发送 web 页面时，在连接关闭后，服务端不会记录用户的信息。
>
> Cookie 的作用就是用于解决 "如何记录客户端的用户信息":
>
> - 当用户访问 web 页面时，他的名字可以记录在 cookie 中。
> - 在用户下一次访问该页面时，可以在 cookie 中读取用户访问记录。
>
> 
>
> **Cookie的诞生**
>
> 由于HTTP协议是无状态的，而服务器端的业务必须是要有状态的。Cookie诞生的最初目的是为了存储web中的状态信息，以方便服务器端使用。比如判断用户是否是第一次访问网站。目前最新的规范是RFC 6265，它是一个由浏览器服务器共同协作实现的规范。
>
> **Cookie的处理**
>
> 1. 服务器像客户端发送cookie。
> 2. 浏览器将cookie保存。
> 3. 之后每次http请求浏览器都会将cookie发送给服务器端。

```js
// cookie.js
const http = require("http")
http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        res.end('');
        return
    }

    // 观察cookie存在
    console.log('cookie:', req.headers.cookie);

    // 设置cookie
    res.setHeader('Set-Cookie', 'cookie1=abc;');
    res.end('hello cookie!!');
}).listen(3000);


// Header Set-Cookie负责设置cookie
// 请求传递Cookie

```



## Session

> session会话机制是一种服务器端机制，它使用类似于哈希表（可能还有哈希表）的结构来保存信
>
> 息。
>
> 实现原理：
>
> 1. 服务器在接受客户端首次访问时在服务器端创建seesion，然后保存seesion(我们可以将
>
> seesion保存在内存中，也可以保存在redis中，推荐使用后者)，然后给这个session生成一
>
> 个唯一的标识字符串,然后在响应头中种下这个唯一标识字符串。
>
> 2. 签名。这一步通过秘钥对sid进行签名处理，避免客户端修改sid。（非必需步骤）
>
> 3. 浏览器中收到请求响应的时候会解析响应头，然后将sid保存在本地cookie中，浏览器在下次
>
> http请求的请求头中会带上该域名下的cookie信息，
>
> 4. 服务器在接受客户端请求时会去解析请求头cookie中的sid，然后根据这个sid去找服务器端
>
> 保存的该客户端的session，然后判断该请求是否合法。

```js
const http = require("http");
const session = {};

http.createServer((req, res) => {
    // 观察cookie存在
    console.log('cookie:', req.headers.cookie);

    const sessionKey = 'sid';
    const cookie = req.headers.cookie;

    if (cookie && cookie.indexOf(sessionKey) > -1) {
        res.end('Come Back ');

        // 简略写法未必具有通用性
        const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`);
        const sid = pattern.exec(cookie)[1];

        console.log('session:', sid, session, session[sid]);
    } else {
        const sid = (Math.random() * 99999999).toFixed();
        
        // 设置cookie
        res.setHeader('Set-Cookie', `${sessionKey}=${sid};`);
        session[sid] = { name: 'laowang' };
        res.end('Hello');
    };

    res.end('hello cookie!!');
}).listen(3000);
```

### koa中的session

```shell
安装： npm i koa-session -S
```



###  使用redis存储session

```shell
安装： npm i koa-redis -S
```

> redis 是一个高性能的key-value数据库。
>
> **Redis 与其他 key - value 缓存产品有以下三个特点：**
>
> - Redis支持数据的持久化，可以将内存中的数据保存在磁盘中，重启的时候可以再次加载进行使用。 
> - Redis不仅仅支持简单的key-value类型的数据，同时还提供list，set，zset，hash等数据结构的 存储。
> - Redis支持数据的备份，即master-slave模式的数据备份。
>
> 
>
> **Redis 优势：**
>
> - 性能极高 – Redis能读的速度是110000次/s,写的速度是81000次/s 。丰富的数据类型 – Redis支持二进制案例的 Strings, Lists, Hashes, Sets 及 Ordered Sets 数据类型操作。 
> - 原子 – Redis的所有操作都是原子性的，意思就是要么成功执行要么失败完全不执行。单个操作是原子 性的。多个操作也支持事务，即原子性，通过MULTI和EXEC指令包起来。 
> - 丰富的特性 – Redis还支持 publish/subscribe, 通知, key 过期等等特性。

##  Token 

> 



## Jwt (Json Web Token)

> **原理解析 :**
>
> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidGVzdCIsImV4cCI6MTU2NjM5OTc3MSwiaWF0Ij oxNTY2Mzk2MTcxfQ.nV6sErzfZSfWtLSgebAL9nx2wg-LwyGLDRvfjQeF04U 
>
> **上面 Bearer Token包含三个组成部分：令牌头、payload、哈希，它们中间是用.分隔开的**
>
> 1. 令牌头: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
>
> 2. payload: eyJkYXRhIjoidGVzdCIsImV4cCI6MTU2NzY5NjEzNCwiaWF0Ij oxNTY3NjkyNTM0fQ.
>
> 3. 哈希: OzDruSCbXFokv1zFpkv22Z_9AJGCHG5fT_WnEaf72EA 
>
>     前两个base64参数是可逆 的，那第三个hash参数 ？？？
>
> 1.  签名：默认使用base64对payload编码，使用hs256算法对令牌头、payload和密钥进行签名生成 哈希 
> 2.  验证：默认使用hs256算法对hs256算法对令牌中数据签名并将结果和令牌中哈希比对

### HMAC SHA256

> HMAC SHA256 HMAC(Hash Message Authentication Code，散列消息鉴别码，基于密钥的Hash算法的认证协 议。消息鉴别码实现鉴别的原理是，用公开函数和密钥产生一个固定长度的值作为认证标识，用 这个标识鉴别消息的完整性。使用一个密钥生成一个固定大小的小数据块，即MAC，并将其加入 到消息中，然后传输。接收方利用与发送方共享的密钥进行鉴别认证等。

### BASE64 

>  按照RFC2045的定义，Base64被定义为：Base64内容传送编码被设计用来把任意序列的8位字节 描述为一种不易被人直接识别的形式。（The Base64 Content-Transfer-Encoding is designed to represent arbitrary sequences of octets in a form that need not be humanly readable.） 常见于邮件、http加密，截取http信息，你就会发现登录操作的用户名、密码字段通过BASE64编 码的 Beare



## OAuth(开放授权)

> 概述：三方登入主要基于OAuth 2.0。OAuth协议为用户资源的授权提供了一个安全的、开放而又 简易的标准。与以往的授权方式不同之处是OAUTH的授权不会使第三方触及到用户的帐号信息 （如用户名与密码），即第三方无需使用用户的用户名与密码就可以申请获得该用户资源的授权， 因此OAUTH是安全的。



## SSO (单点登录)

> 