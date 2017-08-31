import React, {Component} from 'react';
// CSS
import './reset.css';
import 'normalize.css';
import './App.css';
// Component
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import UserDialog from './UserDialog';
import AV, {getCurrentUser, signOut, TodoModel} from "./leanCloud"

// Component App
class App extends Component {
    constructor(props) {
        super(props)
        // 存储数据与状态，载入localStorage
        this.state = {
            user: getCurrentUser() || {},
            newTodo: '',
            todoList: []
        }
        let user = getCurrentUser()
        if (user) {
            TodoModel.getByUser(user, (todos) => {
                console.log(user)
                console.log(todos)
                let stateCopy = JSON.parse(JSON.stringify(this.state))
                stateCopy.todoList = todos;
                this.setState(stateCopy)
            })
        }
        // 判断登录状态 ==> 获取数据
        // this.checkLoginStatus();
    }

    render() {
        console.log("App render");

        // todos 存储 TodoItem
        let todos = this.state.todoList
        // 过滤出还存在的Todo
            .filter((item) => !item.deleted)
            // 遍历每一个还在的Todo
            .map((item, index) => {
                return (
                    // 返回TodoItem存进todos
                    <li key={index}>
                        <TodoItem todo={item}
                                  onToggle={this.toggle.bind(this)}
                                  onDelete={this.delete.bind(this)}/>
                    </li>
                )
            })
        // 返回最终要渲染到页面的内容
        return (
            <div className="App">
                <h1>
                    {this.state.user.username || "我"}的待办清单
                    {this.state.user.id ?
                        <button id="signOut" onClick={this.signOut.bind(this)}>登出</button> :
                        null}
                </h1>
                <div className="inputWrapper">
                    {/*
                     ** content 存储输入的 newTodo
                     ** onSubmit 存储自定义函数 addTodo
                     ** onChange 存储自定义函数 changeTitle
                     **/}
                    <TodoInput content={this.state.newTodo}
                               onSubmit={this.addTodo.bind(this)}
                               onChange={this.changeTitle.bind(this)}/>
                </div>
                {/* 用一个有序列表存储 Todos */}
                <ol className='todoList'>
                    {todos}
                </ol>
                {this.state.user.id ?
                    null :
                    <UserDialog onSignUp={this.onSignUpOrSignIn.bind(this)}
                                onSignIn={this.onSignUpOrSignIn.bind(this)}/>}
            </div>
        );
    }

    // 判断登录状态 ==> 获取数据
    // checkLoginStatus() {
    //     if (this.state.user !== {}) {
    //         this.searchTodo()
    //     }
    // }

    // 初始化保存对象
    // https://leancloud.cn/docs/leanstorage_guide-js.html#保存对象
    // saveTodo() {
    //     // 初始化一个类
    //     var AVTodos = AV.Object.extend('Todo');
    //     var avTodos = new AVTodos();
    //     // 设置读写权限
    //     var acl = new AV.ACL();
    //     acl.setReadAccess(AV.User.current(), true)
    //     acl.setWriteAccess(AV.User.current(), true)
    //     // 设置实例存储的数据及权限
    //     let dataString = JSON.stringify(this.state.todoList)
    //     avTodos.set('content', dataString);
    //     avTodos.setACL(acl)
    //     // 保存到leanCloud
    //     avTodos.save().then((todo) => {
    //         let stateCopy = JSON.parse(JSON.stringify(this.state))
    //         // 绑定用户数据 id ==> 用户识别码
    //         stateCopy.todoList.id = todo.id
    //         this.setState(stateCopy)
    //         console.log('保存成功');
    //     }, function (error) {
    //         alert('保存失败')
    //     })
    // }

    // 上传更新对象
    // https://leancloud.cn/docs/leanstorage_guide-js.html#更新对象
    // updateTodo() {
    //     let dataString = JSON.stringify(this.state.todoList)
    //     let avTodos = AV.Object.createWithoutData('Todo', this.state.todoList.id)
    //     avTodos.set('content', dataString)
    //     avTodos.save().then(function (e) {
    //         console.log(e)
    //         console.log('update success')
    //     })
    // }

    // 从 leanCloud 下载与用户id识别码对应的数据
    // reference ==> https://leancloud.cn/docs/leanstorage_guide-js.html#获取对象
    // searchTodo() {
    //     if (this.state.user) {
    //         var query = new AV.Query('Todo');
    //         query.find().then((todos) => {
    //             // console.log(todos)
    //             let avAlltodos = todos[0]
    //             let id = avAlltodos.id
    //             let stateCopy = JSON.parse(JSON.stringify(this.state))
    //             stateCopy.todoList = JSON.parse(avAlltodos.attributes.content)
    //             stateCopy.todoList.id = id
    //             this.setState(stateCopy)
    //         }, function (error) {
    //             console.error(error)
    //         })
    //     }
    // }

    // 同步数据
    // changeTodo() {
    //     this.state.todoList.id ? this.updateTodo() : this.saveTodo()
    // }


    // 登录/注册
    onSignUpOrSignIn(user) {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.user = user;
        this.setState(stateCopy);
        this.searchTodo();
    }


    // 登出功能 ===> 清除数据
    signOut() {
        let confirmSignOut = window.confirm("确认登出？")
        if (confirmSignOut) {
            signOut()
            let stateCopy = JSON.parse(JSON.stringify(this.state));
            stateCopy.user = {};
            stateCopy.todoList = [];
            this.setState(stateCopy)
        }
    }

    // componentDidUpdate 在组件更新之后调用
    componentDidUpdate() {
    }

    // 删除一个 TodoItem
    delete(event, todo) {
        todo.deleted = true;
        this.setState(this.state);
        // this.changeTodo();
    }

    // 切换 TodoItem 状态
    toggle(e, todo) {
        todo.status = todo.status === 'completed' ? '' : 'completed';
        this.setState(this.state);
        // this.changeTodo();
    }

    // 让TotoInput从只读变为可写
    changeTitle(event) {
        this.setState({
            newTodo: event.target.value,
            todoList: this.state.todoList
        })
    }

    // 在TodoList里添加一个Todo
    addTodo(event) {
        let newTodo = {
            status: "",
            title: event.target.value,
            deleted: false

        }
        TodoModel.create(newTodo, (id) => {
            newTodo.id = id;
            console.log(newTodo)
            this.state.todoList.push(newTodo);
            this.setState({
                newTodo: "",
                todoList: this.state.todoList
            })
        }, (error) => {
            console.log(error)
        })
        // this.changeTodo();
    }
}

// 模块出口
export default App;


