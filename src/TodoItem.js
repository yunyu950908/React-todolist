import React, {Component} from 'react';

export default class TodoItem extends Component {
    render() {
        return (
            <div>{this.props.todo.title}
                <input type="checkbox"
                       checked={this.props.todo.status}
                       onChange={this.toggle.bind(this)}/>
            </div>
        )
    }

    toggle(e) {
        this.props.onToggle(e, this.props.todo)
    }
}