import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            servico: '',
            valor: undefined
        };
    }
    render() {
        return (
            <div>
                <label>Marca:</label>
                <input type="text"></input>
            </div>
        );
    }
}

export default Form;