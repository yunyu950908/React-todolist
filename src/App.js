import React, {Component} from 'react';
// CSS reset
import './reset.css';
// CSS normalize
import 'normalize.css';
// CSS APP
import './App.css';
// Component
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import * as localStore from './localStorage';


// Component App
class App extends Component {
    constructor(props) {
        super(props)
        // 存储数据与状态，载入localStorage
        this.state = {
            newTodo: '',
            todoList: localStore.load("todoList") || []
        }
    }

    render() {
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
                <h1>我的代办</h1>
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
            </div>
        );
    }

    // componentDidUpdate 在组件更新之后调用
    componentDidUpdate() {
        localStore.save("todoList", this.state.todoList)
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

