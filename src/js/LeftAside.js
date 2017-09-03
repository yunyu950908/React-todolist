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

function getAsideBars() {
    return document.querySelectorAll(".asideBar ul li");
}

export default class LeftAside extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // user
            time: formatTime(),
            asideBars: [],
        };
        // 右上角时钟
        setInterval(() => {
            this.setState({
                time: formatTime(),
            })
        }, 1000)
    }

    // 改变选中样式，触发切换事件
    changeClass(e) {
        // let children = [].slice.call(e.target.parentNode.children);
        let children = Array.prototype.slice.call(getAsideBars());
        children.map((e, i) => {
            e.classList.remove("selectedAsideBar");
        });
        e.target.classList.add("selectedAsideBar");
        // 存储到state
        this.setState({
            asideBars: children
        });
        // 通知父组件 切换展示
        this.props.changeBars(e.target)
    }

    // 检查 selectedAsideBar
    checkAsideBarClass() {
        let selectedBar;
        let asideBars = this.state.asideBars;
        console.log(asideBars)
        asideBars.forEach((e, i) => {
            if (e.classList.contains("selectedAsideBar")) {
                selectedBar = e;
            }
        });
        console.log(selectedBar)
    }

    componentDidMount() {
        let asideBars = [].slice.call(getAsideBars());
        this.setState({
            asideBars: asideBars
        })
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
                        <li className="unfinished selectedAsideBar"
                            onClick={this.changeClass.bind(this)}>
                            待完成
                        </li>
                        <li className="finished"
                            onClick={this.changeClass.bind(this)}>
                            已完成
                        </li>
                        <li className="recycle"
                            onClick={this.changeClass.bind(this)}>
                            回收站
                        </li>
                        <li className="function-todo">
                            功能完善中...
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}