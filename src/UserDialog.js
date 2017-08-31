import React, {Component} from "react";
// CSS
import "./UserDialog.css";
// leanCloud
import {signUp, signIn, sendPasswordResetEmail} from "./leanCloud";
// 注册组件
import SignUpForm from "./SignUpForm";
// 登录组件
import SignInForm from "./SignInForm";


// Component UserDialog
export default class UserDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "signIn",
            selectedTab: "signInOrSignUp",
            formData: {
                email: '',
                username: '',
                password: ''
            }
        }
    }

    // 切换 注册/登录
    switch(e) {
        this.setState({
            selected: e.target.value
        });
        this.changeStyle(e)
    }

    // 注册
    signUp(e) {
        e.preventDefault();
        let {email, username, password} = this.state.formData;
        let success = (user) => {
            this.props.onSignUp.call(null, user);
            console.log(user)
        };
        let error = (error) => {
            console.log(error.code);
            switch (error.code) {
                case 125:
                    alert("无效的电子邮箱地址");
                    break;
                case 200:
                    alert("用户名不能为空");
                    break;
                case 201:
                    alert("密码不能为空");
                    break;
                case 202:
                    alert("该用户已存在");
                    break;
                case 217:
                    alert("无效的用户名");
                    break;
                case 218:
                    alert("无效的密码");
                    break;
                default:
                    console.log(error);
                    alert("未知错误");
                    break;
            }
        };
        signUp(email, username, password, success, error)
    }

    // 登录
    signIn(e) {
        e.preventDefault();
        let {username, password} = this.state.formData;
        let success = (user) => {
            this.props.onSignIn.call(null, user)
        };
        let error = (error) => {
            // console.log(error.code);
            switch (error.code) {
                case 200:
                    alert("用户名不能为空");
                    break;
                case 201:
                    alert("密码不能为空");
                    break;
                case 210:
                    alert("用户名与密码不匹配");
                    break;
                case 211:
                    alert("该用户不存在");
                    break;
                case 217:
                    alert("无效的用户名");
                    break;
                case 218:
                    alert("无效的密码");
                    break;
                case 219:
                    alert("登录失败次数超过限制，请稍15分钟后再试");
                    break;

                default:
                    console.log(error);
                    alert("未知错误");
                    break;
            }

        };
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

        let signInOrSignUp = (
            <div className="signInOrSignUp">
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
                    {this.state.selected === "signUp" ?
                        <SignUpForm formData={this.state.formData}
                                    onSubmit={this.signUp.bind(this)}
                                    onChange={this.changeFormData.bind(this)}/>
                        : null}
                    {this.state.selected === "signIn" ?
                        <SignInForm formData={this.state.formData}
                                    onSubmit={this.signIn.bind(this)}
                                    onChange={this.changeFormData.bind(this)}
                                    onForgetPassword={this.showForgetPassword.bind(this)}/>
                        : null}
                </div>
            </div>
        );

        let forgetPassword = (
            <div className="forgetPassword">
                <h3>重置密码</h3>
                <form action=""
                      className="forgetPassword"
                      onSubmit={this.resetPassword.bind(this)}>
                    <div className="row">
                        <label htmlFor="">邮箱</label>
                        <input type="email"
                               placeholder="Email Address"
                               value={this.state.formData.email}
                               onChange={this.changeFormData.bind(this, "email")}/>
                    </div>
                    <div className="row action">
                        <button type="submit">发送重置邮件</button>
                        <a href="javascript:;" onClick={this.returnToSignIn.bind(this)}>返回登录</a>
                    </div>
                </form>
            </div>
        );

        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    {/* 切换 注册/登录*/}
                    {this.state.selectedTab === "signInOrSignUp" ? signInOrSignUp : forgetPassword}
                </div>
            </div>
        )
    }

    // 忘记密码
    showForgetPassword() {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.selectedTab = "forgetPassword";
        this.setState(stateCopy);
    }

    resetPassword(e) {
        e.preventDefault();
        sendPasswordResetEmail(this.state.formData.email);
        alert("邮件已发送，请检查你的收件箱！")
    }

    // 返回登录
    returnToSignIn() {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.selectedTab = "signInOrSignUp";
        this.setState(stateCopy);
    }
}
