"use strict";

module.exports = {
  port: 8687,
  siteDomain: "http://localhost:8687",
  countDefault: 10,
  pageDefault: 0,
  apiDir: "src/router",
  accessExp: 60 * 60 * 24, // 1h 单位秒
  // accessExp: 60, // 1h 单位秒
  // debug 模式
  debug: true,
  // refreshExp 设置refresh_token的过期时间，默认一个月
  // refreshExp: 600,
  refreshExp: 60 * 60 * 24 * 30,
  // 暂不启用插件
  pluginPath: {
    // // plugin name
    // poem: {
    //   // determine a plugin work or not
    //   enable: true,
    //   // path of the plugin
    //   path: "app/plugins/poem",
    //   // other config
    //   limit: 2
    // },
  }
};
