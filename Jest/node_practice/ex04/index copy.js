const Sequelize = require('sequelize');

module.exports.initModel = async (sequelize) => {

  // 定义user 用户表模型
  const User = sequelize.define('user', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    name: Sequelize.STRING
  }, { timestamps: false }); // 创建表时默认会自动生成时间戳字段(会自动生createdAt 创建时间 和 updatedAt更新时间这两个时间戳字段)

  // 同步数据库（就是根据上面的表模型在数据库中创建一张表）设置表创建规则{force: true} 强制同步：在创建表之前先删除已存在的表 【注：同步数据库时，如果表已存在就不会在创建，所要强制同步】
  await User.sync({ force: true });

  // 向数据库user表中添加数据
  // await User.create({name: '沐枫'});

  // 查询表中的所有数据
  // console.log(await JSON.stringify(User.findAll()))


  // 定义product产品表模型
  const Product = sequelize.define('product', {
    // id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true }, // 注：如果在这里没有加id字段，数据库也会自动加上的，并且是自增id
    title: Sequelize.STRING,
    userId: Sequelize.INTEGER
  }, { tableName: 'products' });

  // 同步到数据库（将product产品表在数据库中创建）
  await Product.sync({ force: true });

  // 表关系设置为1对多关系（会添加userId到Product表作为外键）， 即 1:N -> User:Product
  // 1端建立关系
  Product.belongsTo(User, {
    constraints: true,  //数据完整性校验
    onDelete: 'CASCADE'
  });
  // N端建立关系
  User.hasMany(Product);



  // 字段数据类型参考模型
  const FieldType = sequelize.define('fieldtype', {
    id: {
      type: Sequelize.INTEGER,    // id字段数据 
      autoIncrement: true,        // 自增
      allowNull: false,           // 是否充许为空
      primaryKey: true            // 设为主键（全表唯一）
    },
    name: Sequelize.STRING(100),  //字符串类型
    sex: Sequelize.BOOLEAN,
    age: {
      type: Sequelize.STRING,     // 数字类型
      defaultValue: 1             // 设置默认值
    },
    rmb: {
      type: Sequelize.FLOAT,      // 价格类型
      allowNull: false
    },
    job: Sequelize.TEXT           // 文本类型
    // createdAt: Sequelize.BIGINT,  // 日期时间类型 【默认这两个字段自动添加】
    // updatedAt: Sequelize.BIGINT
  });

  // 同步数据库
  FieldType.sync({ force: true }).then(async () => {

    // 插入数据
    await FieldType.create({
      name: '沐枫',
      sex: 1,
      age: 29,
      rmb: 999998,
      job: 'Web 全栈开发',
      // createdAt: new Date(),
      // updatedAt: new Date()
    });

    // 查询数据
    // const Data = await FieldType.findAll();
    // console.log('fieldtype表中的所有数据：', JSON.stringify(Data));
  });




  return { User, Product };
};

/*
Sequelize 数据类型

Sequelize.STRING                      // VARCHAR(255)
Sequelize.STRING(1234)                // VARCHAR(1234)
Sequelize.STRING.BINARY               // VARCHAR BINARY
Sequelize.TEXT                        // TEXT
Sequelize.TEXT('tiny')                // TINYTEXT

Sequelize.INTEGER                     // INTEGER
Sequelize.BIGINT                      // BIGINT
Sequelize.BIGINT(11)                  // BIGINT(11)

Sequelize.FLOAT                       // FLOAT
Sequelize.FLOAT(11)                   // FLOAT(11)
Sequelize.FLOAT(11, 12)               // FLOAT(11,12)

Sequelize.REAL                        // REAL         仅限于PostgreSQL.
Sequelize.REAL(11)                    // REAL(11)     仅限于PostgreSQL.
Sequelize.REAL(11, 12)                // REAL(11,12)  仅限于PostgreSQL.

Sequelize.DOUBLE                      // DOUBLE
Sequelize.DOUBLE(11)                  // DOUBLE(11)
Sequelize.DOUBLE(11, 12)              // DOUBLE(11,12)

Sequelize.DECIMAL                     // DECIMAL
Sequelize.DECIMAL(10, 2)              // DECIMAL(10,2)

Sequelize.DATE                        // DATETIME 针对 mysql / sqlite, TIMESTAMP WITH TIME ZONE 针对 postgres
Sequelize.DATE(6)                     // DATETIME(6) 针对 mysql 5.6.4+. 小数秒支持多达6位精度
Sequelize.DATEONLY                    // DATE 不带时间.
Sequelize.BOOLEAN                     // TINYINT(1)

Sequelize.ENUM('value 1', 'value 2')  // 一个允许具有 “value 1” 和 “value 2” 的 ENUM
Sequelize.ARRAY(Sequelize.TEXT)       // 定义一个数组。 仅限于 PostgreSQL。
Sequelize.ARRAY(Sequelize.ENUM)       // 定义一个 ENUM 数组. 仅限于 PostgreSQL。

Sequelize.JSON                        // JSON 列. 仅限于 PostgreSQL, SQLite and MySQL.
Sequelize.UUID                        // PostgreSQL 和 SQLite 的 UUID 数据类型, CHAR(36) BINARY 针对于 MySQL (使用默认值: Sequelize.UUIDV1 或 Sequelize.UUIDV4 来让 sequelize 自动生成 ID)

Sequelize.GEOMETRY                    // 空间列.  仅限于 PostgreSQL (具有 PostGIS) 或 MySQL.
Sequelize.GEOMETRY('POINT')           // 具有几何类型的空间列.  仅限于 PostgreSQL (具有 PostGIS) 或 MySQL.
Sequelize.GEOMETRY('POINT', 4326)     // 具有几何类型和SRID的空间列.  仅限于 PostgreSQL (具有 PostGIS) 或 MySQL.
*/