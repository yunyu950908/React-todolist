import React, {Component} from "react";

export default class SignInForm extends Component {
    render() {
        return (
            <form className="signIn"
                  onSubmit={this.props.onSubmit}>
                <div className="row">
                    <label htmlFor="">用户名</label>
                    <input type="text"
                           placeholder="username"
                           value={this.props.formData.username}
                           onChange={this.props.onChange.bind(null, "username")}/>
                </div>
                <div className="row">
                    <label htmlFor="">密码</label>
                    <input type="password"
                           placeholder="password"
                           value={this.props.formData.password}
                           onChange={this.props.onChange.bind(null, "password")}/>
                </div>
                <div className="row action">
                    <button type="submit">登录</button>
                    <a href="javascript:;" onClick={this.props.onForgetPassword}>忘记密码？</a>
                </div>
            </form>
        )
    }
}

























