import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Tooltip, Image, Drawer, Row, Col, Badge } from 'antd';
import { Link } from 'react-router-dom';
import { Rotas } from '../../../../Routes/rotas';
import { toast } from 'react-toastify';

import service from '../../../../service';
import Grid from '../../../../common/components/Grid/Grid';
import ChavesEstoquePedidoModal from '../../components/chaves.estoque.pedido.modal';
import tabelas from '../../../../common/Messages/tabelas';

import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineDoubleLeft, AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";

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

const ChaveEstoquePedido = () => {
  const ButtonGroup = Button.Group;
  const [chaves, setChaves] = useState([]);
  const [listaPedidos, setListaPedidos] = useState([]);
  const [quantidadeTotal, setQuantidadeTotal] = useState(0);

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [pedidoModalVisible, setPedidoModalVisible] = useState(false);

  useEffect(() => {
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
      setChaves(chaves);
    });

    return () => {
      setChaves([]);
      setListaPedidos([]);
      setQuantidadeTotal(0);
      setDrawerVisible(false);
      setPedidoModalVisible(false);
      // Implementar validação se vai sair mesmo do form
    }
  }, []);

  const handleAddDrawer = (chave) => {

    if (listaPedidos.some(x => x.Id === chave.Id)) {
      toast.error(`Esta chave ja foi adicionada a lista de pedidos`);
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

    let chaveAddLista = listaPedidos;
    chave.QuantidadeSolicitada = 1;
    chaveAddLista.push(chave);

    setListaPedidos(chaveAddLista);
    setDrawerVisible(true);
  }

  const handleAddQuantidadeChave = (id) => {
    let chaves = listaPedidos;
    let index = chaves.findIndex(x => x.Id === id);

    if (index >= 0) {
      chaves[index].QuantidadeSolicitada += 1;
      setListaPedidos(chaves);
    }
  }
  const handleMinQuantidadeChave = (id) => {
    let chaves = listaPedidos;
    let index = chaves.findIndex(x => x.Id === id);

    if (index >= 0) {
      if (chaves[index].QuantidadeSolicitada === 0)
        return;

      chaves[index].QuantidadeSolicitada -= 1;
      setListaPedidos(chaves);
    }
  }

  const handleDeleteChave = (id) => {
    const chaves = listaPedidos.filter(x => x.Id !== id);
    setListaPedidos(chaves);
  }

  const submitForm = (form) => {
    if (listaPedidos.length <= 0) {
      toast.error('Lista de pedido de chave não pode estar vazia !');
      return;
    }

    let quantidade = 0;
    listaPedidos.forEach((x) => {
      quantidade += x.QuantidadeSolicitada;
    })

    setQuantidadeTotal(quantidade);
    setPedidoModalVisible(true);
  }

  const columns = [
    { title: 'Marca', dataIndex: 'Marca', key: 'Marca', width: '20%' },
    { title: 'Número de Série', dataIndex: 'NumeroSerie', key: 'NumeroSerie', width: '10%' },
    { title: 'Estoque', dataIndex: 'Quantidade', key: 'Quantidade', width: '10%' },
    {
      title: 'Ações', width: '5%', render: (status, x) => (
        <>
          <Tooltip title="Adicionar ao carrinho">
            <AiOutlineShoppingCart
              className="mr-3 iconVendaChave"
              size={20}
              onClick={() => handleAddDrawer(x)}
            />
          </Tooltip>
        </>
      )
    }
  ];

  return (
    <div className="mt-2">
      <div className="t-center">
        <h1>Pedido de Chaves</h1>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={Rotas.Home}>
              <AiOutlineHome className="mr-1" />
              Início
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Pedido de Estoque</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="t-right">
        <Tooltip title="Lista de Pedidos">
          <Button
            type="primary"
            onClick={() => setDrawerVisible(true)}
          >
            <AiOutlineDoubleLeft size={20} />
          </Button>
        </Tooltip>
      </div>

      <Grid
        dataSource={chaves}
        columns={columns}
      />

      <Drawer
        title="Lista do Pedido"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}

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
              Número de Itens {listaPedidos.length}
            </label>
            <Button
              block
              onClick={submitForm}
              icon={<AiOutlineShoppingCart className="mr-1" size={20} />}
            >
              Fechar Pedido
            </Button>
          </>
        )}
      >
        {listaPedidos.map((x) => (
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
              <ButtonGroup >
                <Tooltip title="Diminuir quantidade" placement="bottom">
                  <Button onClick={() => handleMinQuantidadeChave(x.Id)}>
                    <AiOutlineMinus />
                  </Button>
                </Tooltip>
                <Tooltip title="Aumentar quantidade" placement="bottom">
                  <Button onClick={() => handleAddQuantidadeChave(x.Id)}>
                    <AiOutlinePlus />
                  </Button>
                </Tooltip>
                <Tooltip title="Remover da Lista" placement="bottom">
                  <Button onClick={() => handleDeleteChave(x.Id)}>
                    <AiOutlineDelete
                      style={{ color: '#ff4d4f' }}
                      size={20}
                    />
                  </Button>
                </Tooltip>
              </ButtonGroup>
            </div>
          </div>
        ))}
      </Drawer>

      <ChavesEstoquePedidoModal
        title="Revise o seu pedido"
        quantidadeTotal={quantidadeTotal}
        listaPedidos={listaPedidos}
        visible={pedidoModalVisible}
        onClose={() => setPedidoModalVisible(false)}
      />
    </div>
  );
}

export default ChaveEstoquePedido;