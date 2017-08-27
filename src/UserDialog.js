import React, {Component} from "react";
import "./UserDialog.css"

export default class UserDialog extends Component {
    render() {
        return (
            <dic className="UserDialog-Wrapper">
                <div className="UserDialog">
                    <nav>
                        <input type="radio"/>注册
                        <input type="radio"/>登录
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
            </dic>
        )
    }
}