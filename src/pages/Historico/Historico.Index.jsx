import React, { useState } from 'react';
import { Button, Select } from 'antd';
import { toast } from 'react-toastify';

import HeaderForm from '../../common/components/HeaderForm/HeaderForm';

import ChaveService from '../../services/chave.service';
import PedidoEstoqueService from '../../services/pedido.estoque.service';
import AmolacaoService from '../../services/amolacao.service';
//import ServicosService from '../../services/ser'
import Grid from '../../common/components/Grid/Grid';
import Loading from '../../common/components/Loading/Loading';

const HistoricoIndex = () => {
    const { Option } = Select;
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [selectedValue, setSelectedValue] = useState();
    const [loading, setLoading] = useState(false);

    const handleEscolherHistorico = async() => {

        setLoading(false);

        switch (selectedValue) {
            case 'Copias':
                    await ChaveService.GetAllCopias()
                        .then((copias) => {
                            debugger;
                            let columns = [
                                { title: 'Data da Cópia', dataIndex: 'Data', key: 'Data', width: '15%' },
                                { title: 'Marca', dataIndex: 'Marca', key: 'Marca', width: '20%' },
                                { title: 'Número de Série', dataIndex: 'NumeroSerie', key: 'NumeroSerie', width: '20%' },
                                { title: 'Quantidade', dataIndex: 'Quantidade', key: 'Quantidade', width: '20%' },
                                { title: 'Valor', dataIndex: 'Valor', key: 'Valor', width: '10%' },
                                { title: 'Tipo de Pagamento', dataIndex: 'TipoPagamento', key: 'TipoPagamento', width: '15%' },
                            ];

                            setLoading(false);
                            setColumns(columns);
                            setData(copias);
                        })

                break;
            case 'Descarte':
                break;
            case 'PedidosEstoque':
                break;
            case 'Amolacoes':
                break;
            case 'Servicos':
                break;
            default:
                toast.warning('Selecione um valor');
                break;
        }
    }

    return (
        <div className='mr-2'>

            <HeaderForm
                titulo={'Históricos'}
                listaCaminhos={['Históricos']}
            />

            <div className='container t-center'>
                <Select
                    style={{ width: '1000px', marginRight: '20px' }}
                    defaultValue="Selecione"
                    onChange={(value) => setSelectedValue(value)}
                    tabIndex={0}
                >
                    <Option value="Copias">Cópias de chaves</Option>
                    <Option value="Descarte">Descarte de chaves</Option>
                    <Option value="PedidosEstoque">Pedidos de Estoque</Option>
                    <Option value="Amolacoes">Amolações</Option>
                    <Option value="Servicos">Serviços</Option>
                </Select>
                <Button
                    type={'primary'}
                    onClick={() => handleEscolherHistorico()}
                >
                    Selecionar
                </Button>

                {
                    loading ? 
                        <Loading />
                    :
                    <Grid
                        dataSource={data}
                        columns={columns}
                        QuantidadeTotal={data.length}
                    />
                }

            </div>

        </div>
    );
}

export default HistoricoIndex;