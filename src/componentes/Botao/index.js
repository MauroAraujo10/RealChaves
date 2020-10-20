import React, { Component } from 'react';
import './style.css'
import { FaKey } from 'react-icons/fa';

class Botao extends Component {
    constructor(props) {
        super(props);
        this.Redirect = this.Redirect.bind(this);
    }

    Redirect(){
    }

    render() {
        return (
            <button 
            style={{backgroundColor: this.props.color}}
            onClick={this.Redirect}>
                <FaKey size={30} color="#FF0"/>
                {this.props.text}
            </button>
        );
    }
}

export default Botao;