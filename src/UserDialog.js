import React, {Component} from "react";
import "./UserDialog.css"

export default class UserDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "signUp"
        }
    }

    // 切换 注册/登录
    switch(e) {
        this.setState({
            selected: e.target.value
        })
    }

    render() {
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    {/* 切换 注册/登录*/}
                    <nav onChange={this.switch.bind(this)}>
                        <label htmlFor=""><input type="radio"
                                                 value="signUp"
                                                 checked={this.state.selected === "signUp"}/>注册</label>
                        <label htmlFor=""><input type="radio"
                                                 value="signIn"
                                                 checked={this.state.selected === "signIn"}/>登录</label>
                    </nav>
                    <div className="panes">
                        {/* 注册 */}
                        <form action="" className="signUp">
                            <div className="row">
                                <laberl>用户名</laberl>
                                <input type="text"/>
                            </div>
                            <div className="row">
                                <laberl>密码</laberl>
                                <input type="password"/>
                            </div>
                            <div className="row action">
                                <buttom type="submit">注册</buttom>
                            </div>
                        </form>
                        {/* 登录 */}
                        <form action="" className="signIn">
                            <div className="row">
                                <label htmlFor="">用户名</label>
                                <input type="text"/>
                            </div>
                            <div className="row">
                                <label htmlFor="">密码</label>
                                <input type="password"/>
                            </div>
                            <div className="row action">
                                <button type="submit">登录</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}