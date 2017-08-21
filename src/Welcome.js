import React from 'react'; // 为什么要 import React
class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
        setInterval(() => {
            this.setState({
                date: new Date()
            })
        })
        console.log("已在 constructor 里将 props 和 state 初始化好了")
    }

    componentWillMount() {
        console.log("这里是componentWillMount，说明马上就要运行 render")
    }


    render() {
        console.log("这里是render")
        return (
            <div>
                <h1>hello,{this.props.name}</h1>
                <h2>{this.state.date.toString()}</h2>
            </div>
        );
    }

    componentDidMount() {
        console.log("这里是componentDidMount, 已经挂载到页面")
    }
}

export default Welcome // 为什么要 export，为什么要加 default