import React from 'react';
//登录组件
export default function (props) {
    return (
        <form className="signIn"
              onSubmit={props.onSubmit.bind(this)}>
            <div className="row">
                <label htmlFor="">用户名</label>
                <input type="text"
                       placeholder="用户名"
                       value={props.formData.username}
                       onChange={props.onChange.bind(null, "username")}/>
            </div>
            <div className="row">
                <label htmlFor="">密码</label>
                <input type="password"
                       placeholder="密码"
                       value={props.formData.password}
                       onChange={props.onChange.bind(null, "password")}/>
            </div>
            <div className="row action">
                <button type="submit">登录</button>
                <a href="javascript:;" onClick={props.onForgetPassword}>忘记密码？</a>
            </div>
        </form>
    )
}

























