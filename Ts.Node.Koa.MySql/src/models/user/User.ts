import { Model, Table, PrimaryKey, AutoIncrement, Column, AllowNull, Unique, DataType, UpdatedAt, CreatedAt } from "sequelize-typescript";

const crypto = require('crypto');

@Table({
    tableName: 'User'
})
export class User extends Model<User> {
    @PrimaryKey         // 主键
    @AutoIncrement      // 值自增
    @Column({           // 列属性
        type: DataType.INTEGER.UNSIGNED
    })
    id: number;


    @AllowNull(false)   // 不能为空
    @Unique(true)       // 值唯一（不能重复）
    @Column({
        type: DataType.STRING(32)
    })
    username: string;

    set password(val: string) {
        let md5 = crypto.createHash('md5');
        let pwd = md5.update(val).digest('hex');  // md5 16进制
        this.setDataValue('password', pwd);
    };

    get mupiao() {
        return '666'
    };

    @Column({
        type: DataType.CHAR(8), //字符类型
        defaultValue: '男'
    })
    sex: string;


    @Column({
        type: DataType.CHAR(3), //字符类型
        defaultValue: '0'
    })
    age: string;


    @AllowNull(true)
    @Column({
        type: DataType.STRING(32)
    })
    job: string;


    @AllowNull(true)
    @Column({
        type: DataType.STRING(11)
    })
    phone: string;


    @AllowNull(true)
    @Column({
        type: DataType.STRING(32)
    })
    wechat: string;


    @AllowNull(true)
    @Column({
        type: DataType.STRING
    })
    address: string;


    @AllowNull(true)
    @Column({
        type: DataType.STRING
    })
    photo: string;


    @AllowNull(true)
    @Column({
        type: DataType.TEXT
    })
    summary: Text;


    @CreatedAt
    createdAt: Date;


    @UpdatedAt
    updatedAt: Date;
};