import React, {Component} from 'react';
// CSS
import './reset.css';
import 'normalize.css';
import './App.css';
// Component
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import UserDialog from './UserDialog';
import {getCurrentUser, signOut} from "./leanCloud"

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
                        <button onClick={this.signOut.bind(this)}>登出</button> :
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

    // 登录/注册
    onSignUpOrSignIn(user) {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.user = user;
        this.setState(stateCopy);
    }


    // 登出功能
    signOut() {
        signOut()
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.user = {};
        this.setState(stateCopy)
    }

    // componentDidUpdate 在组件更新之后调用
    componentDidUpdate() {

    }

    // 删除一个 TodoItem，修改localStorage
    delete(event, todo) {
        todo.deleted = true;
        this.setState(this.state);
    }

    // 切换 TodoItem 状态，修改localStorage
    toggle(e, todo) {
        todo.status = todo.status === 'completed' ? '' : 'completed';
        this.setState(this.state);
    }

    // 让TotoInput从只读变为可写，修改localStorage
    changeTitle(event) {
        this.setState({
            newTodo: event.target.value,
            todoList: this.state.todoList
        })
    }

    // 在TodoList里添加一个Todo，修改localStorage
    addTodo(event) {
        this.state.todoList.push({
            id: idMaker(),
            title: event.target.value,
            state: null,
            deleted: false
        })
        this.setState({
            newTodo: '',
            todoList: this.state.todoList
        })
    }
}

// 创建 ID
let id = 0;
function idMaker() {
    id += 1;
    return id;
}

// 模块出口
export default App;

