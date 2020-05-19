const { config } = require("lin-mizar");
const Sequelize = require("sequelize");

/**
 * 数据库名，默认lin-cms
 */
const database = config.getItem("db.database", "medical_system");

/**
 * 数据库用户名，默认root
 */
const username = config.getItem("db.username", "root");

/**
 * 数据库密码，默认123456
 */
const password = config.getItem("db.password", "mysql123456");

/**
 * 其它数据库配置项
 */
const options = config.getItem("db", {});

/**
 * 全局的 Sequelize 实例
 */
const sequelize = new Sequelize(database, username, password, {
  dialect: "mysql",
  ...options
});

sequelize.sync({
  force: false
});

module.exports = sequelize;
