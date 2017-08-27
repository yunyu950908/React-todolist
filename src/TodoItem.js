import React, {Component} from 'react';
import './TodoItem.css';

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