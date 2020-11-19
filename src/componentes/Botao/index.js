import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import './style.css';

class Botao extends Component {
    constructor(props) {
        super(props);
        this.Redirect = this.Redirect.bind(this);
    }

    Redirect(){
        const {url} = this.props;
        this.props.history.replace(`${url}`);
    }

    render() {
        return (
            <button 
                className="BotaoHome"
                style={{backgroundColor: this.props.color}} 
                onClick={this.Redirect}>
                {this.props.icon}
                {this.props.text}
            </button>
        );
    }
}

export default withRouter(Botao);