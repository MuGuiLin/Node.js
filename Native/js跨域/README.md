# 为什么跨域问题？
    1 是浏览器自身搞的事情 -> 同源策略，


# 为什么要同源策略
    1 防止csrf攻击
    2 同源策略的dom查询，iframe嵌套，钓鱼网站


# 跨域解决方案
    1 jsonp script img (获取资源的标签是没有跨域问题) (只能是get，需要后端配合)
    2 post 空iframe 加 form 实现post请求
    3 cors (基本都是后端的事)
    4 代理 （devServer，Ngx）
    5 postMessage
    6 主域名相同 子域名不相同的iframe跨域 document.domain
