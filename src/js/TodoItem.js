import React, {Component} from 'react';
import '../css/TodoItem.css';
import {uploadTodos} from "./leanCloud"

// Component TodoItem
export default class TodoItem extends Component {
    render() {
        return (
            <div className='TodoItem'>
                {/*通知<App/>改checkbox状态*/}
                <input type="checkbox"
                       checked={this.props.todo.status}
                       onChange={this.toggle.bind(this)}/>
                {/*通知<App/>改TodoInput的span*/}
                <span className="title">{this.props.todo.title}</span>
                <button onClick={this.delete.bind(this)}>删除</button>
            </div>
        )
    }

    // 通知 <App/> 触发删除事件
    delete(e) {
        this.props.onDelete(e, this.props.todo)
    }

    // 通知 <App/> 切换checkbox状态
    toggle(e) {
        this.props.onToggle(e, this.props.todo)
    }
}
export function error(error){
    switch(error.code){
        case 210:
            alert('用户名与密码不匹配')
            break
        case 211:
            alert('用户名不存在')
            break
        case 202:
            alert('用户名已存在')
            break
        case 201:
            alert('密码不能为空')
            break
        case 200:
            alert('用户名不能为空')
            break
        case 217:
            alert('无效的用户名，不允许空白用户名')
            break
        case 218:
            alert('无效的密码，不允许空白密码')
            break
        case 502:
            alert('服务器维护中')
            break
        default:
            alert(error)
            break
    }
}