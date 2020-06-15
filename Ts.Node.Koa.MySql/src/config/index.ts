import dbconfig from "./dbconfig.json";

// 定义数据库配置类型接口 用于规范dbconfig.json中的数据类型
interface DbConfigType {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'mariadb';
    timezone: string;
}

// 运行环境配置：开发，测试，生产
const config: any = {
    development: {
        server: {
            host: "localhost",
            prot: 8080
        },
        database: dbconfig.development as DbConfigType  //由于dbconfig是一个json格式没有类型，所以在这里用接口业做中转换，不然在app.ts中的 new Sequelize(Config.database) 会报错
    },
    test: {
        server: {
            host: "localhost",
            prot: 8086
        },
        database: dbconfig.test as DbConfigType
    },
    production: {
        server: {
            host: "localhost",
            prot: 3306
        },
        database: dbconfig.production as DbConfigType
    }
};

// 约束config取值范围
// type configKey = 'development' | 'test' | 'production'; //这样是写死的值不灵活
type configKey = keyof typeof config;   // 用 keyof 来取对象的第一层key


// Node环境变量(process对象下的env属性 用于在Node环境下读取环境变量信息【后面的NODE_EVN是可以自定义的】)
const NODE_EVN: string | number | symbol = process.env.NODE_EVN as configKey || 'development';

console.log(NODE_EVN)
// process报错：由于默认在ts环境中没有继承Node环境的相关API 所以要调用Node.js环境下的process对象需要安装第三方库 npm i -D @types/node

export default config[NODE_EVN];