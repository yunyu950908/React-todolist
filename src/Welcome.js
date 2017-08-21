import React from 'react'; // 为什么要 import React
class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            test: '1'
        }
        this.setState({
            date: new Date(),
            test: 'constructor'
        })
        console.log("这里是constructor，props 和 state 初始化好了")
    }

    componentWillMount() {
        this.setState({
            date: new Date(),
            test: 'componentWillMount'
        })
        console.log("这里是componentWillMount，说明马上就要运行 render")
    }


    render() {
        console.log("这里是render")
        return (
            <div>
                <h1>hello,{this.props.name}</h1>
                <h2>{this.state.date.toString()}</h2>
                <p>{this.state.test}</p>
            </div>
        );
    }

    componentDidMount() {
        this.setState({
            date: new Date(),
            test: 'componentDidMount'
        })
        console.log("这里是componentDidMount, 已经挂载到页面")
    }

    componentWillReceiveProps() {
        this.setState({
            date: new Date(),
            test: 'componentWillReceiveProps'
        })
    }

    shouldComponentUpdate() {
        this.setState({
            date: new Date(),
            test: 'shouldComponentUpdate'
        })
        return true;
    }
    
    componentWillUnmount() {
        console.log('这里是componentWillUnmount 要死咯')
    }

}

export default Welcome // 为什么要 export，为什么要加 default