import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { messages } from '../../../common/Enum/messages';
import { toast } from "react-toastify";

import ChavesVendaModal from '../components/chave.copia.modal';
import ChavesDescarteModal from '../components/chaves.descarte.modal';
import ChavesEditModal from '../components/chaves.edit.modal';
import YesOrNoModal from '../../../common/components/yesOrNoModal/yesOrNoModal';

import Loading from '../../../common/components/Loading/Loading';
import Grid from '../../../common/components/Grid/Grid';
import HeaderForm from '../../../common/components/HeaderForm/HeaderForm';
import service from '../../../service';
import chaveService from '../service/chave.service';
import tabelas from '../../../common/Enum/tabelas';

import { AiOutlineSnippets, AiOutlineDownSquare, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const ChaveTabela = () => {
    const [chaves, setChaves] = useState([]);
    const [loading, setLoading] = useState(false);
    const [chaveSelecionada, setChaveSelecionada] = useState([]);
    const [modalEditVisible, setModalEditVisible] = useState(false);
    const [modalVendaVisible, setModalVendaVisible] = useState(false);
    const [modalDescarteVisible, setModalDescarteVisible] = useState(false);
    const [modalExclusaoVisible, setModalExclusaoVisible] = useState(false);

    useEffect(() => {
        setLoading(true);
        service.app.ref(tabelas.Chave).on('value', (snapshot) => {
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
                    ListaNumeroSerie: x.val().ListaNumeroSerie ? x.val().ListaNumeroSerie : []
                })
            })
            setChaves(chaves);
            setLoading(false);
        });
    }, []);

    const columns = [
        { title: 'Data de Cadastro', dataIndex: 'Data', key: 'Data', width: '15%' },
        { title: 'Marca', dataIndex: 'Marca', key: 'Marca', width: '15%' },
        { title: 'Número de Série', dataIndex: 'NumeroSerie', key: 'NumeroSerie', width: '15%' },
        { title: 'Quantidade em estoque', dataIndex: 'Quantidade', key: 'Quantidade', width: '10%' },
        { title: 'Tipo', dataIndex: 'Tipo', key: 'Tipo', width: '10%' },
        {
            title: 'Ações', key: 'acoes', width: '10%', render: (status, dto) => (
                <div style={{ display: 'flex' }}>

                    <Tooltip title="Cópia de Chave">
                        <AiOutlineSnippets
                            className="mr-2 iconVendaChave"
                            size={20}
                            onClick={() => { funcaoAbrirModal(dto, 'Copia') }}
                        />
                    </Tooltip>
                    <Tooltip title="Descartar">
                        <AiOutlineDownSquare
                            className="mr-2 iconDescarte"
                            size={20}
                            onClick={() => { funcaoAbrirModal(dto, 'Descarte') }}
                        />
                    </Tooltip>
                    <Tooltip title="Editar">
                        <AiOutlineEdit
                            className="mr-2 iconEdit"
                            size={20}
                            onClick={() => { funcaoAbrirModal(dto, 'Editar') }}
                        />
                    </Tooltip>
                    <Tooltip title="Deletar">
                        <AiOutlineDelete
                            className="iconExcluir"
                            size={20}
                            onClick={() => { funcaoAbrirModal(dto, 'Deletar') }}
                        />
                    </Tooltip>
                </div>
            )
        }
    ];

    const funcaoAbrirModal = (dto, funcionalidade) => {
        switch (funcionalidade) {

            case 'Copia':
                if (Number(dto.Quantidade === 0)) {
                    toast.warning(messages.estoqueZerado);
                    return;
                }
                setModalVendaVisible(true);
                setChaveSelecionada(dto);
                break;

            case 'Descarte':
                if (Number(dto.Quantidade === 0)) {
                    toast.warning('Não é possível realizar esta operação pois não há chaves no estoque !');
                    return;
                }
                setModalDescarteVisible(true);
                setChaveSelecionada(dto);
                break;

            case 'Editar':
                setModalEditVisible(true);
                setChaveSelecionada(dto);
                break;

            case 'Deletar':
                setModalExclusaoVisible(true);
                setChaveSelecionada(dto);
                break;

            default:
                break;
        }
    }

    const deleteChave = (id) => {
        chaveService.delete(id)
            .then(() => {
                toast.success(messages.exclusaoSucesso());
                setModalExclusaoVisible(false);
            })
            .catch(() => {
                toast.error(messages.exclusaoErro());
            })
    }
    return (
        <div className="mt-2">
            <HeaderForm
                titulo={'Chaves em estoque'}
                listaCaminhos={['Chaves']}
            />
            {
                loading ?
                    <Loading /> :
                    <Grid
                        dataSource={chaves}
                        columns={columns}
                    />
            }

            <ChavesEditModal
                visible={modalEditVisible}
                chaveSelecionada={chaveSelecionada}
                onClose={() => setModalEditVisible(false)}
            />
            <ChavesVendaModal
                visible={modalVendaVisible}
                chaveSelecionada={chaveSelecionada}
                onClose={() => setModalVendaVisible(false)}
            />
            <ChavesDescarteModal
                visible={modalDescarteVisible}
                chaveSelecionada={chaveSelecionada}
                onClose={() => setModalDescarteVisible(false)}
            />
            <YesOrNoModal
                title={'Exclusão de Chave'}
                text={'Deseja realmente excluir esta chave ?'}
                visible={modalExclusaoVisible}
                onClose={() => setModalExclusaoVisible(false)}
                onOk={() => deleteChave(chaveSelecionada.key)}
            />
        </div >
    );

}

export default ChaveTabela;