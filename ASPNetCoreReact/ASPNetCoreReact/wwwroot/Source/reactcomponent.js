
import * as React from 'react';

// import * as ReactDOM from 'react-dom';

export default class Counter extends React.Component {
    constructor() {
        super();
        this.state = { currentCount: 0 };
    }

    render() {
        return <div><button className='btn btn-secondary padalicious' onClick={() => { this.incrementCounter() }}>Click Number {this.state.currentCount}</button></div>;
    }

    incrementCounter() {
        this.setState({
            currentCount: this.state.currentCount + 1
        });
    }
}