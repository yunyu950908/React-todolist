import React, {Component} from 'react';
import './TodoInput.css';

// Component TodoInput
export default class TodoInput extends Component {
    render() {
        {/*通知<App/>改value*/}
        return <input type="text"
                      className="TodoInput"
                      value={this.props.content}
                      onKeyPress={this.submit.bind(this)}
                      onChange={this.changeTitle.bind(this)}/>
    }

    // [回车] 事件，通知 <App/> 改 todoList
    submit(e) {
        if (e.key === 'Enter') {
            this.props.onSubmit(e)
        }
    }

    // 通知 <App/> 可写 input
    changeTitle(e) {
        this.props.onChange(e)
    }
}