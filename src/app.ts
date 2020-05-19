import * as Koa from "koa";
import * as KoaBodyParser from "koa-bodyparser";
import * as cors from "koa2-cors";
import * as mount from "koa-mount";
import * as serve from "koa-static";
import { config, json, logging, success, jwt, Loader } from "lin-mizar";
// import { PermissionModel } from "./models/permission";

/**
 * 首页
 */
function indexPage(app) {
  app.context.loader.mainRouter.get("/", async ctx => {
    ctx.type = "html";
    ctx.body = `<h1>欢迎来到同福客栈</h1>!`;
  });
}

/**
 * 跨域支持
 * @param app koa实例
 */
function applyCors(app) {
  app.use(cors());
}

/**
 * 解析Body参数
 * @param app koa实例
 */
function applyBodyParse(app) {
  // 参数解析
  app.use(KoaBodyParser());
}

/**
 * 静态资源服务
 * @param app koa实例
 * @param prefix 静态资源存放相对路径
 */
function applyStatic(app, prefix = "/src/assets") {
  const assetsDir = config.getItem("file.storeDir", "src/assets");
  app.use(mount(prefix, serve(assetsDir)));
}

/**
 * json logger 扩展
 * @param app koa实例
 */
function applyDefaultExtends(app) {
  json(app);
  logging(app);
  success(app);
}

/**
 * loader 插件管理
 * @param app koa实例
 */
function applyLoader(app) {
  const pluginPath = config.getItem("pluginPath");
  const loader = new Loader(pluginPath, app);
  loader.initLoader();
}

/**
 * jwt
 * @param app koa实例
 */
function applyJwt(app) {
  const secret = config.getItem("secret");
  jwt.initApp(app, secret);
}

/**
 * 初始化Koa实例
 */
async function createApp() {
  const app = new Koa();
  applyBodyParse(app);
  applyCors(app);
  applyStatic(app);
  const { log, error, Lin, multipart } = require("lin-mizar");
  app.use(log);
  app.on("error", error);
  applyDefaultExtends(app);
  applyLoader(app);
  applyJwt(app);
  const lin = new Lin();
  await lin.initApp(app, true);
//   await PermissionModel.initPermission();
  indexPage(app);
  multipart(app);
  return app;
}
// require('./init-table/eva.table.js') // 初始化数据  eva 系统数据
// require('./../sync/crawler/medical.js') // 初始化数据  药品 系统数据
// require('./../sync/crawler/medical-detail.js') // 初始化数据  药品详情 系统数据
module.exports = { createApp };
