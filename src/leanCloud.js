// leancloud-storage
import AV from 'leancloud-storage'
// leancloud init
var APP_ID = 'qF7pESJt7MUOwSKvPj97SMAk-gzGzoHsz';
var APP_KEY = 'jiE1lqfiqefFepn4zRbggNq6';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
// leancloud ping
/*
 var TestObject = AV.Object.extend('TestObject')
 var testObject = new TestObject()
 testObject.save({
 words: 'Hello World!'
 }).then(function (object) {
 console.log(object)
 alert('LeanCloud Rocks!')
 })
 */

export default AV

export function signUp(username, password, successFn, errorFn) {
    // 新建AVUser对象实例
    var user = new AV.User();
    // 设置用户名
    user.setUsername(username);
    // 设置密码
    user.setPassword(password);

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
