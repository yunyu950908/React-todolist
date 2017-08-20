import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


class Welcome extends React.Component {
    render() {
        return <h1>Hello, Component</h1>;
    }
}

ReactDOM.render(
    <Welcome/>,
    document.getElementById('root')
)




