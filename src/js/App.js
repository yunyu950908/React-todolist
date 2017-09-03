import React, {Component} from 'react';
// CSS
import '../css/reset.css';
import 'normalize.css';
import '../css/App.css';
// Component
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import UserDialog from './UserDialog';
import AV, {getCurrentUser, signOut, TodoModel} from "./leanCloud";
import LeftAside from "./LeftAside"

// Component App
class App extends Component {
    constructor(props) {
        super(props);
        // 存储数据与状态，载入localStorage
        this.state = {
            user: getCurrentUser() || {},
            newTodo: '',
            todoList: [],
        };
        // 刷新判断登录状态 ==> 获取数据
        this.getUserInfo();
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
            });
        // 返回最终要渲染到页面的内容
        return (
            <div className="App">
                <aside>
                    <LeftAside
                        user={this.state.user}
                    />
                    {this.state.user.id ?
                        <button id="signOut" onClick={this.signOut.bind(this)}>
                            <span>&#xe65f;</span>
                            <span>signout</span>
                        </button> :
                        null}
                </aside>
                <main>
                    <h1>
                        {this.state.user.username || "我"}的待办清单
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
                </main>
            </div>
        );
    }

    //getUserInfo 查询
    getUserInfo() {
        let user = getCurrentUser();
        if (user) {
            TodoModel.getByUser(user, (todos) => {
                let stateCopy = JSON.parse(JSON.stringify(this.state));
                stateCopy.todoList = todos;
                this.setState(stateCopy)
            })
        }
    }

    // 登录/注册
    onSignUpOrSignIn(user) {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.user = user;
        this.setState(stateCopy);
        // 进来后第一时间获取数据
        this.getUserInfo();
    }

    // 登出功能 ===> 清除数据
    signOut() {
        signOut();
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.user = {};
        stateCopy.todoList = [];
        this.setState(stateCopy);
    }

    // componentDidUpdate 在组件更新之后调用
    componentDidUpdate() {
    }

    // 删除一个 TodoItem
    delete(event, todo) {
        let oldDeleted = todo.deleted;
        todo.deleted = todo.deleted === false;
        this.setState(this.state);
        TodoModel.update(todo, () => {
                this.setState(this.state)
            }, (error) => {
                todo.status = oldDeleted;
                this.setState(this.state);
                alert("服务器未同步！")
            }
        );
    }

    // 切换 TodoItem 状态 ==> 更新leanCloud
    toggle(e, todo) {
        let oldStatus = todo.status;
        todo.status = todo.status === 'completed' ? '' : 'completed';
        this.setState(this.state);
        TodoModel.update(todo, () => {
                this.setState(this.state)
            }, (error) => {
                todo.status = oldStatus;
                this.setState(this.state);
                alert("服务器未同步！")
            }
        );
        console.log(this.state.todoList);
        this.filterUnfinished()
        this.filterFinished()
        this.filterDeleted()
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
        if (event.target.value.trim() !== "") {
            let newTodo = {
                status: "",
                title: event.target.value,
                deleted: false
            };
            TodoModel.create(newTodo, (id) => {
                // leanCloud.js ==> successFn(response.id)
                newTodo.id = id;
                this.state.todoList.push(newTodo);
                this.setState({
                    newTodo: "",
                    todoList: this.state.todoList
                })
            }, (error) => {
                // leanCloud.js ==> errorFn(error)
                console.log(error)
            });
        } else {
            alert("不允许输入空值！")
        }
        // console.log(this.state.todoList)
    }

    //========================================状态过滤==========================================

    // 过滤待完成

    filterUnfinished() {
        let Unfinished = [];
        this.state.todoList.forEach(e => {
            if (e.status === "" && e.deleted === false) {
                Unfinished.push(e);
            }
        });
        console.log("未完成")
        console.log(Unfinished)
    }

    // 过滤已完成
    filterFinished() {
        let finidhed = [];
        this.state.todoList.forEach(e => {
            if (e.status !== "") {
                finidhed.push(e);
            }
        });
        console.log("已完成")
        console.log(finidhed)
    }

    // 过滤已删除

    filterDeleted() {
        let deleted = [];
        this.state.todoList.forEach(e => {
            if (e.deleted) {
                deleted.push(e)
            }
        });
        console.log("已删除")
        console.log(deleted)
    }
}

// 模块出口
export default App;


