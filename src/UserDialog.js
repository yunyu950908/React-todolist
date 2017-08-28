import React, {Component} from "react";
// CSS
import "./UserDialog.css"
// leanCloud
import {signUp, signIn} from "./leanCloud"

// Component UserDialog
export default class UserDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "signIn",
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
        this.changeStyle(e)
    }

    // 注册
    signUp(e) {
        e.preventDefault()
        let {username, password} = this.state.formData
        let success = (user) => {
            this.props.onSignUp.call(null, user)
            console.log(user)
        }
        let error = (error) => {
            alert(error)
        }
        signUp(username, password, success, error)
    }

    // 登录
    signIn(e) {
        e.preventDefault();
        let {username, password} = this.state.formData;
        let success = (user) => {
            this.props.onSignIn.call(null, user)
        }
        let error = (error) => {
            alert(error);
        }
        signIn(username, password, success, error)
    }

    changeFormData(key, e) {
        // this.state中有个formData对象，注意深拷贝
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.formData[key] = e.target.value;
        this.setState(stateCopy);
    }

    // 改变 注册/登录 选中样式
    changeStyle(e) {
        e.target.parentNode.style.boxShadow = "none";
        e.target.parentNode.style.background = "RGB(247, 247, 247)";
        e.target.parentNode.parentNode.childNodes.forEach((lab) => {
            if (lab.nodeType === 1 && lab !== e.target.parentNode) {
                lab.style.boxShadow = "inset 0px 0px 1px 0px rgba(0, 0, 0, .2)";
                lab.style.background = "rgba(222, 222, 222, .6)";
            }
        })
    }

    render() {
        // {/* 注册 */}
        let signUpForm = (
            <form className="signUp"
                  onSubmit={this.signUp.bind(this)}>
                <div className="row">
                    <label>用户名</label>
                    <input type="text"
                           placeholder="username"
                           value={this.state.formData.username}
                           onChange={this.changeFormData.bind(this, "username")}/>
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password"
                           placeholder="password"
                           value={this.state.formData.password}
                           onChange={this.changeFormData.bind(this, "password")}/>
                </div>
                <div className="row action">
                    <button type="submit">注册</button>
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
                           placeholder="username"
                           value={this.state.formData.username}
                           onChange={this.changeFormData.bind(this, "username")}/>
                </div>
                <div className="row">
                    <label htmlFor="">密码</label>
                    <input type="password"
                           placeholder="password"
                           value={this.state.formData.password}
                           onChange={this.changeFormData.bind(this, "password")}/>
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
                    <nav>
                        <label htmlFor="signUp">注册
                            <input type="radio"
                                   value="signUp"
                                   id="signUp"
                                   checked={this.state.selected === "signUp"}
                                   onChange={this.switch.bind(this)}/>
                        </label>
                        <label htmlFor="signIn">登录
                            <input type="radio"
                                   value="signIn"
                                   id="signIn"
                                   checked={this.state.selected === "signIn"}
                                   onChange={this.switch.bind(this)}/>
                        </label>
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