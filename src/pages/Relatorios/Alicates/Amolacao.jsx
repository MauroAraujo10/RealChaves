import React, { Component } from 'react';
import { Input, Space, Button, Tooltip } from 'antd';


import Grid from '../../../common/components/Grid';
import tabelas from '../../../common/Messages/tabelas';
import service from '../../../service';

import { AiOutlineEye } from "react-icons/ai";

class RelatorioAlicateAmolacao extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alicates: []
        }
    }

    componentDidMount() {
        service.app.ref(tabelas.AmolacaoAlicate).on('value', (snapshot) => {
            let alicate = [];
            snapshot.forEach((x) => {
                alicate.push({
                    Id: x.key,
                    key: x.key,
                    IdAlicate: x.val().IdAlicate,
                    DataEntrega: x.val().DataEntrega,
                    Quantidade: x.val().Quantidade,
                    Valor: x.val().Valor,
                })
            })
            this.setState({ alicates: alicate });
        })
    }

    render() {
        const iconSize = 20;
        const columns = [
            { title: 'IdAlicate', dataIndex: 'IdAlicate', width: '20%' },
            { title: 'DataEntrega', dataIndex: 'DataEntrega', width: '20%' },
            { title: 'Quantidade', dataIndex: 'Quantidade', width: '20%' },
            { title: 'Valor', dataIndex: 'Valor', width: '20%' },
            {
                title: 'Ações', width: '10%', render: (status, dto) => (
                    <>
                        <Tooltip title="Visualizar">
                            <AiOutlineEye
                                size={iconSize}
                            />
                        </Tooltip>
                    </>
                )
            }
        ];
        
        return (
            <>
                <Grid
                    dataSource={this.state.alicates}
                    columns={columns}
                />
            </>
        );
    }
}

export default RelatorioAlicateAmolacao;