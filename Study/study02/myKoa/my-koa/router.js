class Router {
    constructor() {
        this.stock = [];
    };

    register(path, methods, middleware) {
        this.stock.push({ path, methods, middleware });
    };

    // GET方式 其他方式同理
    get(path, middleware) {
        this.register(path, 'get', middleware);
    };

    // POST方式
    post(path, middleware) {
        this.register(path, 'post', middleware);
    };

    routes() {
        return async (ctx, next) => {
            let route;
            for (let i = 0; i < this.stock.length; i++) {
                // 判断匹配path 和 method
                if (this.stock[i].path === ctx.url && 0 <= this.stock[i].methods.indexOf(ctx.method)) {
                    route = this.stock[i].middleware;
                    break;
                };
            };
            // console.log('-----------route：', route);
            if (route && 'function' === typeof route) {
                route(ctx, next);
                return;
            }

            await next();
        };
    };
};
module.exports = Router;