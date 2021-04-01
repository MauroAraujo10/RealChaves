import React, { Component } from 'react';
import { Card, Radio } from 'antd';
import { Area } from '@ant-design/charts';

class Vendas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1
        };
        this.onChangeRadio = this.onChangeRadio.bind(this);
    }

    onChangeRadio(e) {
        this.setState({
            value: e.target.value,
        });
    }

    render() {
        const { value } = this.state;
        return (
            <div className="container">
                <h1>Vendas</h1>
                <br />
                <div className="site-card-wrapper">
                    <Card title="Controle de informações" bordered>
                        <Radio.Group onChange={this.onChangeRadio}>
                            <Radio value={1}>Anual</Radio>
                            <Radio value={2}>Mensal</Radio>
                        </Radio.Group>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Vendas;