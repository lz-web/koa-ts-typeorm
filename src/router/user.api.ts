import { LinRouter } from "lin-mizar";
import { loginRequired } from "../middleware/jwt";
import { RegisterValidator } from "../validators/user.validate";
const userRouter = new LinRouter({
    prefix: '/eva/user'
});
userRouter.linPost(
    'name',
    '/register',
    {},
    loginRequired,
    // userLogger('管理员新建了一个用户'),
    async ctx => {
        let v = await new RegisterValidator().validate(ctx)
        console.log(v)
        ctx.json({
            code: 10000,
            msg: '成功!'
        });
    }
);
export {
    userRouter
};
