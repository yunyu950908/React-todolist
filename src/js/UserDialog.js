import React, {Component} from "react";
// CSS
import "../css/UserDialog.css";
// leanCloud
import {signUp, signIn, sendPasswordResetEmail} from "./leanCloud";
// 切换 注册/登录 组件
import SignInOrSignUp from "./SignInOrSignUp"
// 重置密码 组件
import ForgetPasswordForm from "./ForgetPasswordForm";
// 判断输入合法
import {VerifyData} from "./VerifyData"

// Component UserDialog
export default class UserDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "signInOrSignUp",
            formData: {
                email: '',
                username: '',
                password: ''
            }
        }
    }


    // 注册
    signUp(e) {
        e.preventDefault();
        let {email, username, password} = this.state.formData;

        // 判断输入是否合法
        if (!(VerifyData.isEmail(email) && VerifyData.isUsername(username) && VerifyData.isPassword(password))) {
            return;
        }
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
        if (!(VerifyData.isUsername(username) && VerifyData.isPassword(password))) {
            return;
        }
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

    render() {

        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    {/* 切换 注册/登录 忘记密码*/}
                    {this.state.selectedTab === "signInOrSignUp" ?
                        <SignInOrSignUp formData={this.state.formData}
                                        onSignIn={this.signIn.bind(this)}
                                        onSignUp={this.signUp.bind(this)}
                                        onChange={this.changeFormData.bind(this)}
                                        onForgetPassword={this.showForgetPassword.bind(this)}/> :
                        <ForgetPasswordForm formData={this.state.formData}
                                            onSubmit={this.resetPassword.bind(this)}
                                            onChange={this.changeFormData.bind(this)}
                                            onSignIn={this.returnToSignIn.bind(this)}/>}
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
