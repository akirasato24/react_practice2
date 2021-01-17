import React, { Component }   from 'react'

export default class Hello extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div style={{marginTop: "50px"}}>
                <h1>ようこそ、このページはreact学習の為のページです。</h1>
            </div>
        );
    }
}