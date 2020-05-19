import { LinValidator, Rule, Animal } from "lin-mizar"
class RegisterValidator extends LinValidator {
    [x: string]: any;
    constructor() {
        super();
        this.user_name = [
            new Rule("isNotEmpty", "用户名不可为空!"),
            new Rule("isLength", "用户名长度必须在2~20之间", 2, 20)
        ];
        this.user_phone = [
            new Rule(
                "matches",
                "手机号码格式错误!",
                /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
            )
        ];
    }
}
export { 
    RegisterValidator, // 注册验证器
}