import React, {Component} from "react";
import "./UserDialog.css"

// Component UserDialog
export default class UserDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "signUp",
            formData: {
                username: '',
                password: ''
            }
        }
    }

    // 切换 注册/登录
    switch(e) {
        this.setState({
            selected: e.target.value
        })
    }

    signUp(e) {
    }

    signIn(e) {
    }

    changeUsername(e) {
        // this.state中有个formData对象，注意深拷贝
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.formData.username = e.target.value;
        this.setState(stateCopy);
    }

    changePassword(e) {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.formData.password = e.target.value;
        this.setState(stateCopy);
    }

    render() {
        // {/* 注册 */}
        let signUpForm = (
            <form className="signUp"
                  onSubmit={this.signUp.bind(this)}>
                <div className="row">
                    <laberl>用户名</laberl>
                    <input type="text"
                           value={this.state.formData.username}
                           onChange={this.changeUsername.bind(this)}/>
                </div>
                <div className="row">
                    <laberl>密码</laberl>
                    <input type="password"
                           value={this.state.formData.password}
                           onChange={this.changePassword.bind(this)}/>
                </div>
                <div className="row action">
                    <buttom type="submit">注册</buttom>
                </div>
            </form>
        )
        // {/* 登录 */}
        let signInForm = (
            <form className="signIn"
                  onSubmit={this.signIn.bind(this)}>
                <div className="row">
                    <label htmlFor="">用户名</label>
                    <input type="text"
                           value={this.state.formData.username}
                           onchange={this.changeUsername.bind(this)}/>
                </div>
                <div className="row">
                    <label htmlFor="">密码</label>
                    <input type="password"
                           value={this.state.formData.password}
                           onchange={this.changePassword.bind(this)}/>
                </div>
                <div className="row action">
                    <button type="submit">登录</button>
                </div>
            </form>
        )

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
                        {this.state.selected === 'signUp' ? signUpForm : null}
                        {this.state.selected === 'signIn' ? signInForm : null}
                    </div>
                </div>
            </div>
        )
    }
}