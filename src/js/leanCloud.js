// leancloud-storage
import AV from 'leancloud-storage'
// leancloud init
const APP_ID = 'qF7pESJt7MUOwSKvPj97SMAk-gzGzoHsz';
const APP_KEY = 'jiE1lqfiqefFepn4zRbggNq6';
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

    user.signUp().then((loginedUser) => {
        let user = getUserFromAVUser(loginedUser);
        successFn.call(null, user);
    }, (error) => {
        errorFn.call(null, error);
    })
    return undefined
}

export function signIn(username, password, successFn, errorFn) {
    AV.User.logIn(username, password).then((loginedUser) => {
        let user = getUserFromAVUser(loginedUser);
        // console.log(user);
        successFn.call(null, user);
    }, (error) => {
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
    AV.User.requestPasswordReset(email).then((success) => {
        successFn.call()
    }, (error) => {
        errorFn.call(null, error)
    })
}

// 操作todo
export const TodoModel = {
    // 创建对象
    create({status, title, deleted}, successFn, errorFn){
        // 创建todo 对象
        let Todo = AV.Object.extend("Todo");
        let todo = new Todo();
        todo.set("title", title);
        todo.set("status", status);
        todo.set("deleted", deleted)

        // 控制读写权限
        let acl = new AV.ACL();
        acl.setReadAccess(AV.User.current(), true);
        acl.setWriteAccess(AV.User.current(), true)
        todo.setACL(acl)

        // 保存todo 对象
        todo.save().then((response) => {
            // 保存成功回调参数 response.id
            successFn.call(null, response.id)
        }, (error) => {
            // 保存失败回调参数 error
            errorFn && errorFn.call(null, error)
        })
    },
    // 获取对象
    getByUser(user, successFn, errorFn){
        let query = new AV.Query("Todo");
        query.find().then((response) => {
            let array = response.map((todo) => {
                return {
                    id: todo.id,
                    ...todo.attributes
                }
            });
            successFn.call(null, array)
        }, (error) => {
            errorFn && errorFn.call(null, error)
        })
    },
    //删除对象 ==> 敏感操作 一般不需要 ，使用一个状态值保存更新即可
    /*
     destroy(todoId, successFn, errorFn){
     let todo = AV.Object.createWithoutData("Todo", todoId);
     todo.destroy().then((response) => {
     successFn && successFn.call(null, response)
     }, (error) => {
     errorFn && errorFn.call(null, error)
     })
     },
     */
    // 更新对象
    update({id, status, title, deleted}, successFn, errorFn){
        let todo = AV.Object.createWithoutData("Todo", id);
        // 局部更新 + 允许其他false
        title !== undefined && todo.set("title", title);
        status !== undefined && todo.set("status", status);
        deleted !== undefined && todo.set("deleted", deleted);

        todo.save().then((response) => {
            successFn && successFn.call(null, response)
        }, (error) => {
            errorFn && errorFn.call(null, error)
        })
    }

};











