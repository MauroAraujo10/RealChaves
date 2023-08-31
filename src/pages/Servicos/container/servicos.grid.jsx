import React, { useState, useEffect } from 'react';
import { messages } from '../../../common/Enum/messages';
import { Tooltip } from 'antd';
import { toast } from "react-toastify";
import service from '../../../services';
import servicosService from '../service/servicos.service';
import tabelas from '../../../common/Enum/tabelas';
import Loading from '../../../common/components/Loading/Loading';
import HeaderForm from '../../../common/components/HeaderForm/HeaderForm';
import Grid from '../../../common/components/Grid/Grid';
import ServicosEditModal from '../components/servicos.edit.modal';
import YesOrNoModal from '../../../common/components/yesOrNoModal/yesOrNoModal';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const ServicosTabela = () => {
    const [servicos, setServicos] = useState([]);
    const [quantidadeTotal, setQuantidadeTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [servicoSelecionado, setServicoSelecionado] = useState();
    const [modalEditServicoVisible, setModalEditServicoVisible] = useState(false);
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);

    useEffect(() => {
        setLoading(true);
        service.app.ref(tabelas.Servicos).on('value', (snapshot) => {

            let servicos = [];
            
            snapshot.forEach((x) => {
                servicos.push({
                    Id: x.key,
                    key: x.key,
                    Data: x.val().Data,
                    Descricao: x.val().Descricao,
                    Valor: x.val().Valor,
                    ValorGrid: x.val().Valor?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}),
                    Pago: x.val().Pago ? 'Sim' : 'Não'
                })
            })

            setServicos(servicos);
            setQuantidadeTotal(servicos.length);
            setLoading(false);
        });
    }, []);

    const columns = [
        { title: 'Descrição', dataIndex: 'Descricao', key: 'Descricao', width: '60%' },
        { title: 'Data do Serviço', dataIndex: 'Data', key: 'Data', width: '10%' },
        { title: 'Pago', dataIndex: 'Pago', key: 'Pago', width: '10%' },
        { title: 'Valor', dataIndex: 'ValorGrid', key: 'ValorGrid', width: '10%' },
        {
            title: 'Ações', key: 'acoes', width: '10%', render: (status, dto) => (
                <div style={{ display: 'flex' }}>
                    <Tooltip title="Editar">
                        <AiOutlineEdit
                            className="mr-2 iconEdit"
                            size={20}
                            onClick={() => funcaoAbrirModal(dto, 'Editar')}
                        />
                    </Tooltip>
                    <Tooltip title="Deletar">
                        <AiOutlineDelete
                            className="iconExcluir"
                            size={20}
                            onClick={() => funcaoAbrirModal(dto, 'Deletar')}
                        />
                    </Tooltip>
                </div>
            )
        }
    ];

    const funcaoAbrirModal = (dto, funcionalidade) => {
        setServicoSelecionado(dto);
        switch (funcionalidade) {
            case 'Editar':
                setModalEditServicoVisible(true);
                break;

            case 'Deletar':
                setModalDeleteVisible(true);
                break;

            default:
                break;
        }
    }

    const DeletarServico = async (id) => {
        await servicosService.Delete(id)
            .then(() => {
                toast.success(messages.exclusaoSucesso());
                setModalDeleteVisible(false);
            })
            .catch(() => {
                toast.error(messages.exclusaoErro('Serviço'));
            })
    }

    return (
        <div className="mt-2">

            <HeaderForm
                titulo={'Tabelas de Serviços'}
                listaCaminhos={['Serviços', 'Tabelas de Serviços']}
            />  

            {
                loading ?
                    <Loading /> :
                    <Grid
                        dataSource={servicos}
                        columns={columns}
                        QuantidadeTotal={quantidadeTotal}
                    />
            }

            <ServicosEditModal
                visible={modalEditServicoVisible}
                onClose={() => setModalEditServicoVisible(false)}
                servicoSelecionado={servicoSelecionado}
            />

            <YesOrNoModal
                title={'Exclusão de Serviço'}
                text={messages.excluirRegistro('Serviço')}
                visible={modalDeleteVisible}
                onClose={() => setModalDeleteVisible(false)}
                onOk={() => DeletarServico(servicoSelecionado?.Id)}
            />
        </div>
    );
}

export default ServicosTabela;
