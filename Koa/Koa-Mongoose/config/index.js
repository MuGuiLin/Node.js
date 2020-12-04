const path = require('path');
const dbConfig = require('./data-base.json');

const config = {
    development: {
        server: {
            host: 'localhost',
            port: 3000
        },
        database: dbConfig.development,
        jwt: {
            privateKey: 'mupiao'
        },
        template: {
            root: path.join(__dirname, '../views')
        },
        storage: {
            dir: path.resolve(__dirname, '../uploads'),
            static: path.join(__dirname, '../static'),
            prefix: '/public/attachments'
        }
    },
    test: {
        server: {
            host: 'localhost',
            port: 3000
        },
        database: dbConfig.test,
        jwt: {
            privateKey: 'mupiao'
        },
        template: {
            root: path.join(__dirname, 'views')
        },
        storage: {
            dir: path.resolve(__dirname, 'attachments'),
            static: path.join(__dirname, '/static'),
            prefix: '/public/attachments'
        }
    },
    production: {
        server: {
            host: 'localhost',
            port: 3000
        },
        database: dbConfig.production,
        jwt: {
            privateKey: 'mupiao'
        },
        template: {
            root: path.join(__dirname, 'views')
        },
        storage: {
            dir: path.resolve(__dirname, 'attachments'),
            static: path.join(__dirname, '/static'),
            prefix: '/public/attachments'
        }
    }
};

const NODE_EVN = process.env.NODE_ENV || 'development';

// console.log('-------process：', process.env);

module.exports = config[NODE_EVN];