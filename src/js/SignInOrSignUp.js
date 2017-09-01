import React, {Component} from "react";
// 注册组件
import SignUpForm from './SignUpForm'
// 登录组件
import SignInForm from './SignInForm'

export default class SignInOrSignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "signIn"
        }
    }

    // 切换 注册/登录
    switch(e) {
        // console.log(e.target.value)
        this.setState({
            selected: e.target.value
        });
        this.changeStyle(e)
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
        return (
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
                    {/*注册*/}
                    {this.state.selected === "signUp" ?
                        <SignUpForm formData={this.props.formData}
                                    onSubmit={this.props.onSignUp}
                                    onChange={this.props.onChange}/>
                        : null}
                    {/*登录*/}
                    {this.state.selected === "signIn" ?
                        <SignInForm formData={this.props.formData}
                                    onSubmit={this.props.onSignIn}
                                    onChange={this.props.onChange}
                                    onForgetPassword={this.props.onForgetPassword}/>
                        : null}
                </div>
            </div>
        )
    }
}