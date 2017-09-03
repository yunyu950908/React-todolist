import React, {Component} from "react"

import "../css/LeftAside.css"

function formatTime() {
    let initDate = new Date();
    let h = initDate.getHours(),
        m = initDate.getMinutes(),
        s = initDate.getSeconds();
    if (h < 10) {
        h = "0" + h.toString()
    }
    if (m < 10) {
        m = "0" + m
    }
    if (s < 10) {
        s = "0" + s
    }
    return h + " : " + m + " : " + s;
}

export default class LeftAside extends Component {
    constructor() {
        super();
        this.state = {
            // user
            time: formatTime()
        };
        // 右上角时钟
        setInterval(() => {
            this.setState({
                time: formatTime()
            })
        })
    }

    // 改变选中样式，触发切换事件
    changeClass(e) {
        let targetClass = e.target.className;
        // let children = [].slice.call(e.target.parentNode.children);
        let children = Array.prototype.slice.call(e.target.parentNode.children);
        children.map((e, i) => {
            e.classList.remove("selectedAsideBar");
        });
        e.target.classList.add("selectedAsideBar");
        this.changeAsideBar(targetClass);
    }

    // 切换事件
    changeAsideBar(){

    }

    render() {
        return (
            <div className="leftAside">
                <header>
                    <h2>Hello, {this.props.user.username}</h2>
                    <timer>{this.state.time}</timer>
                </header>
                <nav className="asideBar">
                    <ul>
                        <li className="unfinishedBin selectedAsideBar"
                            onClick={this.changeClass.bind(this)}>
                            待完成
                        </li>
                        <li className="finishedBin"
                            onClick={this.changeClass.bind(this)}>
                            已完成
                        </li>
                        <li className="recycleBin"
                            onClick={this.changeClass.bind(this)}>
                            回收站
                        </li>
                        <li className="function-todo"
                            onClick={this.changeClass.bind(this)}>
                            功能完善中...
                        </li>
                    </ul>
                </nav>
                <footer></footer>
            </div>
        )
    }
}