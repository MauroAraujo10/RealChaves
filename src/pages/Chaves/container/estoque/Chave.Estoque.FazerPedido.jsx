import React, { Component } from 'react'
import { Button, Tooltip, Image, Drawer, Row, Col, Badge } from 'antd';
import { toast } from 'react-toastify';
import service from '../../../../service';
import tabelas from '../../../../common/Enum/tabelas';
import Grid from '../../../../common/components/Grid/Grid';
import HeaderForm from '../../../../common/components/HeaderForm/HeaderForm';
import ChavesEstoquePedidoModal from '../../components/chaves.estoque.pedido.modal';
import Loading from '../../../../common/components/Loading/Loading';
import { AiOutlineShoppingCart, AiOutlineDoubleLeft, AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";

import Plana from '../../assets/Plana.jpg';
import PlanaColorida from '../../assets/PlanaColorida.jpg';
import AutomotivaAco from '../../assets/AutomotivaAco.jpg';
import AutomotivaLogotipo from '../../assets/AutomotivaLogotipo.jpg';
import AutomotivaMetalica from '../../assets/AutomotivaMetalica.jpg';
import AutomotivaPlastica from '../../assets/AutomotivaPlastica.jpg';
import Cofre from '../../assets/Cofre.jpg';
import Transponder from '../../assets/Transponder.jpg';
import Tetra from '../../assets/Tetra.jpg';
import Gorje from '../../assets/Gorje.jpg';
import Tubular from '../../assets/Tubular.jpg';

class ChaveEstoqueFazerPedido extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chaves: [],
            listaPedidos: [],
            quantidadeTotal: 0,
            loading: false,
            drawerVisible: false,
            pedidoModalVisible: false
        };
    }

    componentDidMount() {
        this.setState({ loading: true });

        service.app.ref(tabelas.Chave).once('value', (snapshot) => {
            let chaves = [];
            snapshot.forEach((x) => {
                chaves.push({
                    Id: x.key,
                    key: x.key,
                    Marca: x.val().Marca,
                    NumeroSerie: x.val().NumeroSerie,
                    Quantidade: x.val().Quantidade,
                    Tipo: x.val().Tipo,
                    Data: x.val().Data,
                    QuantidadeSolicitada: 1,
                    ListaNumeroSerie: x.val().ListaNumeroSerie ? x.val().ListaNumeroSerie : [],
                })
            })

            this.setState({
                chaves,
                listaPedidos: [],
                loading: false
            });
        });
    }

    handleAddDrawer(chave) {
        if (this.state.listaPedidos.some(x => x.Id === chave.Id)) {
            toast.warning(`Esta chave ja foi adicionada na lista de pedidos`);
            return;
        }

        switch (chave.Tipo) {
            case 'Plana': chave.Image = Plana; break;
            case 'PlanaColorida': chave.Image = PlanaColorida; break;
            case 'AutomotivaAco': chave.Image = AutomotivaAco; break;
            case 'AutomotivaLogotipo': chave.Image = AutomotivaLogotipo; break;
            case 'AutomotivaMetalica': chave.Image = AutomotivaMetalica; break;
            case 'AutomotivaPlastica': chave.Image = AutomotivaPlastica; break;
            case 'Cofre': chave.Image = Cofre; break;
            case 'Transponder': chave.Image = Transponder; break;
            case 'Tetra': chave.Image = Tetra; break;
            case 'Gorje': chave.Image = Gorje; break;
            case 'Tubular': chave.Image = Tubular; break;
            default: chave.Image = null; break;
        }

        this.setState({ listaPedidos: [...this.state.listaPedidos, chave] });
        this.setState({ drawerVisible: true })
    }

    handleDiminuiQuantidadeChave(_, index) {
        let lista = this.state.listaPedidos;
        if (lista[index].QuantidadeSolicitada === 1) return;

        lista[index].QuantidadeSolicitada--;
        this.setState({ listaPedidos: lista });
    }

    handleAumentaQuantidadeChave(_, index) {
        let lista = this.state.listaPedidos;
        lista[index].QuantidadeSolicitada++;
        this.setState({ listaPedidos: lista });
    }

    handleDeleteChave(id) {
        this.setState({ listaPedidos: this.state.listaPedidos.filter(x => x.Id !== id) })
    }

    submitForm() {
        if (this.state.listaPedidos.length <= 0) {
            toast.error('Lista de pedidos de chave não pode estar vazia !');
            return;
        }

        let quantidade = 0;
        this.state.listaPedidos.forEach((x) => {
            quantidade += x.QuantidadeSolicitada;
        })

        this.setState({
            quantidadeTotal: quantidade,
            pedidoModalVisible: true
        });
    }

    render() {

        const columns = [
            { title: 'Marca', dataIndex: 'Marca', key: 'Marca', width: '20%' },
            { title: 'Número de Série', dataIndex: 'NumeroSerie', key: 'NumeroSerie', width: '10%' },
            { title: 'Tipo de Chave', dataIndex: 'Tipo', key: 'Tipo', width: '10%' },
            { title: 'Quantidade em Estoque', dataIndex: 'Quantidade', key: 'Quantidade', width: '10%' },
            {
                title: 'Ações', key: 'acoes', width: '5%', render: (status, x) => (
                    <>
                        <Tooltip title="Adicionar ao carrinho">
                            <AiOutlineShoppingCart
                                className="mr-3 iconVendaChave"
                                size={20}
                                onClick={() => this.handleAddDrawer(x)}
                            />
                        </Tooltip>
                    </>
                )
            }
        ];

        return (
            <div className="mt-2">
                <HeaderForm
                    titulo={'Fazer pedido de Estoque'}
                    listaCaminhos={['Pedido de Estoque']}
                />

                <div className="t-right">
                    <Tooltip title="Lista de Pedidos">
                        <Button
                            type="primary"
                            onClick={() => this.setState({ drawerVisible: true })}
                        >
                            <AiOutlineDoubleLeft size={20} />
                        </Button>
                    </Tooltip>
                </div>

                {
                    this.state.loading ?
                        <Loading /> :
                        <Grid
                            dataSource={this.state.chaves}
                            columns={columns}
                        />
                }

                <Drawer
                    title="Lista do Pedido"
                    placement="right"
                    onClose={() => this.setState({ drawerVisible: false })}
                    visible={this.state.drawerVisible}
                    headerStyle={{
                        color: '#FFF !important',
                        background: '#004878',
                        borderBottom: '1px dashed #000',
                    }}
                    footerStyle={{
                        backgroundColor: '#004878',
                        borderTop: '1px dashed #000',
                        color: '#FFF'
                    }}
                    footer={(
                        <>
                            <label className="t-white">
                                Número de Itens {this.state.listaPedidos.length}
                            </label>
                            <Button
                                block
                                onClick={() => this.submitForm()}
                                icon={<AiOutlineShoppingCart className="mr-1" size={20} />}
                            >
                                Fechar Pedido
                          </Button>
                        </>
                    )}
                >
                    {this.state.listaPedidos.map((x, index) => (
                        <div className="container-estoque" key={x.Id}>
                            <Row gutter={4} >
                                <Col span={10}>
                                    <Image
                                        className="imgFluid"
                                        src={x.Image}
                                    />
                                </Col>
                                <Col span={14}>
                                    <h2>
                                        <strong>{x.Marca} </strong>
                                    </h2>
                                    <h5>Nº Série: {x.NumeroSerie}</h5>
                                    <h5>Tipo: {x.Tipo}</h5>
                                </Col>
                            </Row>

                            <div className="t-right">
                                <h4>Quantidade:
                                    <Badge
                                        count={x.QuantidadeSolicitada}
                                        showZero
                                        style={{ marginLeft: '10px', marginTop: '-5px' }}
                                    />
                                </h4>
                            </div>

                            <div className="t-center">
                                <Button.Group>
                                    <Tooltip title="Diminuir quantidade" placement="bottom">
                                        <Button onClick={() => this.handleDiminuiQuantidadeChave(x, index)}>
                                            <AiOutlineMinus />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Aumentar quantidade" placement="bottom">
                                        <Button onClick={() => this.handleAumentaQuantidadeChave(x, index)}>
                                            <AiOutlinePlus />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Remover da Lista" placement="bottom">
                                        <Button onClick={() => this.handleDeleteChave(x.Id)}>
                                            <AiOutlineDelete
                                                style={{ color: '#ff4d4f' }}
                                                size={20}
                                            />
                                        </Button>
                                    </Tooltip>
                                </Button.Group>
                            </div>
                        </div>
                    ))}
                </Drawer>

                <ChavesEstoquePedidoModal
                    visible={this.state.pedidoModalVisible}
                    onClose={() => this.setState({ pedidoModalVisible: false })}
                    closeDrawer={() => this.setState({drawerVisible: false})}
                    quantidadeTotal={this.state.quantidadeTotal}
                    listaPedidos={this.state.listaPedidos}
                />

            </div>
        )
    }
}

export default ChaveEstoqueFazerPedido;