import React from 'react';
import './TodoInput.css';

// Component TodoInput
export default function (props) {
    //通知<App/>改value
    return (
        <input type="text"
               className="TodoInput"
               placeholder="在此输出您的待办，按回车键确认"
               value={props.content}
               onKeyPress={submit.bind(null, props)}
               onChange={changeTitle.bind(null, props)}/>
    )
}

// [回车] 事件，通知 <App/> 改 todoList
function submit(props, e) {
    if (e.key === 'Enter') {
        props.onSubmit(e)
    }
}

// 通知 <App/> 可写 input
function changeTitle(props, e) {
    props.onChange(e)
}
