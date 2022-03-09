import React, { Component } from 'react';
import { Table, Breadcrumb, Input, Space, Button, Tooltip, Image, Drawer, Form } from 'antd';
import { Row, Col, Badge } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { Rotas } from '../../../../Routes/rotas';
import { messages } from '../../../../common/Messages/messages';

import service from '../../../../service';
import ChavesEstoquePedidoModal from '../../components/chaves.estoque.pedido.modal';
import TotalRegistros from '../../../../common/components/TotalRegistros/TotalRegistros';
import tabelas from '../../../../common/Messages/tabelas';

import { SearchOutlined } from '@ant-design/icons';
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineDoubleLeft, AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";
import { toast } from 'react-toastify';

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

class Atualizar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chaves: [],
      chavesEstoque: [],
      quantidadeTotal: 0,
      preco: '',
      modalPedidoVisible: false,
      drawerVisible: false,
    };
  }

  componentDidMount() {
    service.app.ref(tabelas.Chave).on('value', (snapshot) => {
      let chaves = [];
      snapshot.forEach((x) => {
        chaves.push({
          Id: x.key,
          Key: x.key,
          Marca: x.val().Marca,
          NumeroSerie: x.val().NumeroSerie,
          Quantidade: x.val().Quantidade,
          Tipo: x.val().Tipo,
          Data: x.val().Data
        })
      })
      this.setState({ chaves: chaves });
    });
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Filtrar ${dataIndex}`}
          onFocus
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Filtrar
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset Filtro
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  handleAddEstoque(chave) {
    const { Id, Key, Marca, Data, NumeroSerie, Quantidade, Tipo } = chave;
    const chavesEstoque = this.state.chavesEstoque;
    const chaveInvalida = chavesEstoque.find(x => x.Id === chave.Id);
    let imgSrc;

    if (chaveInvalida) {
      toast.error(`Esta chave ja foi adicionada a lista de pedidos`);
      return;
    }

    switch (chave.Tipo) {
      case 'Plana': imgSrc = Plana; break;
      case 'PlanaColorida': imgSrc = PlanaColorida; break;
      case 'AutomotivaAco': imgSrc = AutomotivaAco; break;
      case 'AutomotivaLogotipo': imgSrc = AutomotivaLogotipo; break;
      case 'AutomotivaMetalica': imgSrc = AutomotivaMetalica; break;
      case 'AutomotivaPlastica': imgSrc = AutomotivaPlastica; break;
      case 'Cofre': imgSrc = Cofre; break;
      case 'Transponder': imgSrc = Transponder; break;
      case 'Tetra': imgSrc = Tetra; break;
      case 'Gorje': imgSrc = Gorje; break;
      case 'Tubular': imgSrc = Tubular; break;
      default: imgSrc = null; break;
    }

    chavesEstoque.push({
      Id,
      Key,
      Marca,
      Data,
      NumeroSerie,
      Quantidade,
      QuantidadeSolicitada: 0,
      Tipo,
      Image: imgSrc
    });

    this.setState({
      chavesEstoque,
      drawerVisible: true
    });
  }

  handleIncrease(id) {
    const chaves = this.state.chavesEstoque;
    let index = chaves.findIndex(x => x.Id === id);

    if (index >= 0) {
      chaves[index].QuantidadeSolicitada += 1;
      this.setState({ chavesEstoque: chaves });
    }
  }

  handleDecrease(id) {
    const chaves = this.state.chavesEstoque;
    let index = chaves.findIndex(x => x.Id === id);

    if (index >= 0) {
      if (chaves[index].QuantidadeSolicitada === 0)
        return;

      chaves[index].QuantidadeSolicitada -= 1;
      this.setState({ chavesEstoque: chaves });
    }
  }

  handleDelete(chave) {
    let chaves = this.state.chavesEstoque;

    chaves = chaves.filter(x => x.Id !== chave.Id);
    this.setState({ chavesEstoque: chaves });
  }

  submitForm(e) {
    const { chavesEstoque } = this.state;
    let quantidade = 0;

    if (chavesEstoque.length === 0){
      toast.error('Necessário inserir ao menos uma chave na lista');
      return;
    }

    chavesEstoque.forEach((x) => {
      quantidade = quantidade + x.QuantidadeSolicitada;
    })

    this.setState({
      modalPedidoVisible: true,
      quantidadeTotal: quantidade
    });
  }

  render() {
    const { Item } = Breadcrumb;
    const ButtonGroup = Button.Group;

    const columns = [
      { title: 'Marca', dataIndex: 'Marca', key: 'Marca', ...this.getColumnSearchProps('Marca'), width: '20%' },
      { title: 'Número de Série', dataIndex: 'NumeroSerie', key: 'NumeroSerie', ...this.getColumnSearchProps('NumeroSerie'), width: '10%' },
      { title: 'Estoque', dataIndex: 'Quantidade', key: 'Quantidade', ...this.getColumnSearchProps('Quantidade'), width: '10%' },
      {
        title: 'Ações', width: '5%', render: (status, x) => (
          <>
            <Tooltip title="Adicionar ao carrinho">
              <AiOutlineShoppingCart
                className="mr-3 iconVendaChave"
                size={20}
                onClick={() => this.handleAddEstoque(x)}
              />
            </Tooltip>
          </>
        )
      }
    ];

    return (
      <>
        <div className="t-center mt-2">
          <h1>Atualização de Estoque</h1>
          <Breadcrumb>
            <Item>
              <Link to={Rotas.Home}>
                <AiOutlineHome className="mr-2" />
                Início
              </Link>
            </Item>
            <Item>
              <Link to={Rotas.Chaves}>
                Chaves
              </Link>
            </Item>
            <Item>
              Atualização de Estoque
            </Item>
          </Breadcrumb>
        </div>

        <Tooltip title="Lista de Pedidos">
          <Button
            type="primary"
            style={{ float: 'right', marginBottom: '20px' }} //Change Visibility
            onClick={() => this.setState({ drawerVisible: true })}>
            <AiOutlineDoubleLeft size={20} />
          </Button>
        </Tooltip>

        <Row>
          <Col span={20} className="container">

            <TotalRegistros
              numeroRegistros={this.state.chaves.length} />

            <Table
              className="Grid"
              bordered
              dataSource={this.state.chaves}
              columns={columns}>
            </Table>
          </Col>
        </Row>

        <Drawer
          title="Pedido de Estoque"
          headerStyle={{
            color: '#FFF !important',
            background: '#004878',
            borderBottom: '1px dashed #000',
          }}
          footer={(
            <Form onFinish={(e) => this.submitForm(e)}>
              <Form.Item
                name="RS"
                rules={[
                  { required: true, message: messages.CampoObrigatorio }
                ]}>
                <div style={{ display: 'flex' }}>
                  <h2 className="mr-3"> R$ </h2>
                  <Input
                    type="number"
                    placeholder="00,00"
                    min={0}
                    size="small"
                    onChange={(e) => this.setState({ preco: e.target.value })}
                  />
                </div>
              </Form.Item>
              <Button
                block
                htmlType="submit"
                icon={<AiOutlineShoppingCart className="mr-3" size={20} />}
              >
                Fechar Pedido
              </Button>
            </Form>
          )}

          footerStyle={{
            backgroundColor: '#004878',
            borderTop: '1px dashed #000',
            color: '#FFF'
          }}
          placement="right"
          onClose={() => this.setState({ drawerVisible: false })}
          visible={this.state.drawerVisible}>
          {
            this.state.chavesEstoque.map((x) => {
              return (
                <div className="container-estoque" key={x.Id}>
                  <Row gutter={4} >
                    <Col span={10}>
                      <Image
                        className="imgFluid"
                        src={x.Image}
                      />
                    </Col>
                    <Col span={12}>
                      <h2>
                        <strong>{x.Marca} </strong>
                      </h2>
                      <h5>Nº Série: {x.NumeroSerie}</h5>
                      <h5>Tipo: {x.Tipo}</h5>
                    </Col>
                  </Row>

                  <div style={{ textAlign: 'right' }}>
                    <h4>Quantidade:
                    <Badge
                        count={x.QuantidadeSolicitada}
                        showZero
                        style={{ marginLeft: '10px', marginTop: '-5px' }}
                      />
                    </h4>
                  </div>

                  <div className="t-center">
                    <ButtonGroup >
                      <Tooltip title="Diminuir quantidade" placement="bottom">
                        <Button onClick={() => this.handleDecrease(x.Id)}>
                          <AiOutlineMinus />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Aumentar quantidade" placement="bottom">
                        <Button onClick={() => this.handleIncrease(x.Id)}>
                          <AiOutlinePlus />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Remover da Lista" placement="bottom">
                        <Button onClick={() => this.handleDelete(x)}>
                          <AiOutlineDelete
                            style={{ color: '#ff4d4f' }}
                            size={20}
                          />
                        </Button>
                      </Tooltip>
                    </ButtonGroup>
                  </div>
                </div>
              )
            })
          }
        </Drawer>

        <ChavesEstoquePedidoModal
          title="Revise o seu pedido"
          preco={this.state.preco}
          quantidadeTotal={this.state.quantidadeTotal}
          chavesEstoque={this.state.chavesEstoque}
          visible={this.state.modalPedidoVisible}
          onClose={() => this.setState({ modalPedidoVisible: false })}
        />
      </>
    )
  }
}

export default withRouter(Atualizar);