// leancloud-storage
import AV from 'leancloud-storage'
// leancloud init
var APP_ID = 'qF7pESJt7MUOwSKvPj97SMAk-gzGzoHsz';
var APP_KEY = 'jiE1lqfiqefFepn4zRbggNq6';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});


export default AV

export function signUp(email, username, password, successFn, errorFn) {
    // 新建AVUser对象实例
    var user = new AV.User();
    // 设置用户名
    user.setUsername(username);
    // 设置密码
    user.setPassword(password);
    // 设置邮箱
    user.setEmail(email);

    user.signUp().then(function (loginedUser) {
        let user = getUserFromAVUser(loginedUser);
        successFn.call(null, user);
    }, function (error) {
        errorFn.call(null, error);
    })
    return undefined
}

export function signIn(username, password, successFn, errorFn) {
    AV.User.logIn(username, password).then(function (loginedUser) {
        let user = getUserFromAVUser(loginedUser);
        console.log(user)
        successFn.call(null, user);
    }, function (error) {
        errorFn.call(null, error);
    })
}

export function getCurrentUser() {
    let user = AV.User.current();
    if (user) {
        return getUserFromAVUser(user)
    } else {
        return null
    }
}

export function signOut() {
    AV.User.logOut();
    return undefined;
}

// 获取 leanCloud 存储的User信息
function getUserFromAVUser(AVUser) {
    return {
        id: AVUser.id,
        ...AVUser.attributes
    }
}

// 发送重置邮件

export function sendPasswordResetEmail(email, successFn, errorFn) {
    AV.User.requestPasswordReset(email).then(function (success) {
        successFn.call()
    }, function (error) {
        errorFn.call(null, error)
    })
}


export const TodoModel = {
    getByUser(user, successFn, errorFn){
        let query = new AV.Query("Todo")
        query.find().then((response) => {
            console.log(response)
            let array = response.map((todo) => {
                return {
                    id: todo.id,
                    ...todo.attributes
                }
            })
            successFn.call(null, array)
        }, (error) => {
            errorFn && errorFn.call(null, error)
        })
    },
    create({status, title, deleted}, successFn, errorFn){
        let Todo = AV.Object.extend("Todo")
        let todo = new Todo()
        todo.set("title", title)
        todo.set("status", status)
        todo.set("deleted", deleted)

        // 控制访问权限
        let acl = new AV.ACL()
        acl.setReadAccess(AV.User.current(), true)
        acl.setWriteAccess(AV.User.current(), true)
        todo.setACL(acl)
        //

        todo.save().then(function (response) {
            successFn.call(null, response.id)
        }, function (error) {
            errorFn && errorFn.call(null, error)
        });
    },
    update(){
    },
    destroy(){
    }
}









