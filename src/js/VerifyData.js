/**
 * Created by yunyu on 2017/9/1.
 */

export const VerifyData = {
    // 邮箱
    isEmail(email){
        const isEmailReg1 = /^([^_]+[a-z0-9_\.]+[^_]+)@([^\-]+[a-z0-9\-]+[^\-])\.([a-z]{2,4})$/;
        let matchReg1 = email.match(isEmailReg1);
        if (matchReg1 !== null) {
            const isEmailReg2 = /_{2,}/g;
            const isEmailReg3 = /-{2,}/g;
            let matchReg2 = matchReg1[1].match(isEmailReg2);
            let matchReg3 = matchReg1[2].match(isEmailReg3);
            if (matchReg2 === null && matchReg3 === null) {
                // 该邮箱合法：参考 新浪邮箱 + 万网域名
                return true;
            } else {
                alert("该邮箱不合法！")
            }
        } else {
            alert("该邮箱不合法！")
        }
    },

    // 用户名
    isUsername(username){
        const regUsername = /^[a-zA-Z0-9_]{4,16}$/;
        if (username.match(regUsername) === null) {
            alert("用户名必须是4~16位字母、数字或下划线_")
        } else {
            // 用户名合法
            return true;
        }
    },

    // 密码Sample Text
    isPassword(password){
        const regPassword = /^[0-9a-zA-Z`~!@#\$%\^&\*\(\)_\+\-=\\\|\[\]\{\}\;\:\,\.\/\?\*\>\<]{6,}$/;
        if (password.match(regPassword) === null) {
            alert("密码必须是6位数以上的字母、数字、_、+、-、*、/、=、.、`、~、!、@、#、$、%、^、&、*、(、)、<、>、?、\、|、[、]、{、}、:、;")
        } else {
            // 密码合法
            return true;
        }
    }
};
