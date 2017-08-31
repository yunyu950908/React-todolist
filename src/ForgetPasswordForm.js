import React, {Component} from "react";

export default class ForgetPasswordForm extends Component {
    render() {
        return (
            <div className="forgetPassword">
                <h3>重置密码</h3>
                <form action=""
                      className="forgetPassword"
                      onSubmit={this.props.onSubmit}>
                    <div className="row">
                        <label htmlFor="">邮箱</label>
                        <input type="email"
                               placeholder="Email Address"
                               value={this.props.formData.email}
                               onChange={this.props.onChange.bind(null, "email")}/>
                    </div>
                    <div className="row action">
                        <button type="submit">发送重置邮件</button>
                        <a href="javascript:;" onClick={this.props.onSignIn}>返回登录</a>
                    </div>
                </form>
            </div>
        )
    }
}