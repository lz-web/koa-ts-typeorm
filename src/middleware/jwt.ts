
import { NotFound } from "lin-mizar";

/**
 * 守卫函数，用户登陆即可访问
 */
async function loginRequired(ctx, next) {
    if (ctx.request.method !== "OPTIONS") {
        if (false) {
            throw new NotFound({
                msg: "没有找到相关日志2"
            })
        }
        await next();
    } else {
        await next();
    }
}
export {
    loginRequired
};