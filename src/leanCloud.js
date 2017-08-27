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
 alert('LeanCloud Rocks!')
 })
 */