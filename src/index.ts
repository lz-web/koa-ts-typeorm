import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
const fs = require("fs");
const path = require("path");

const { config } = require("lin-mizar/lin/config");

// createConnection().then(async connection => {
    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await connection.manager.save(user);
    // const users = await connection.manager.find(User);



// }).catch(error => console.log(error));


/**
 * 获取配置
 */
function applyConfig() {
    const cwd = process.cwd();
    const files = fs.readdirSync(path.resolve(`${cwd}/src/config`));
    for (const file of files) {
        console.log(file)
        config.getConfigFromFile(`src/config/${file}`);
    }
    // 加载其它配置文件
    config.getConfigFromFile("src/extensions/file/config.js");
}
const run = async () => {
    applyConfig();
    const { createApp } = require("./app");
    const app = await createApp();
    const port = config.getItem("port");
    app.listen(port, () => {
        console.log(`listening at ${port}`);
    });
};
// 启动应用
run();