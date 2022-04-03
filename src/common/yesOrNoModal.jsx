import React, { Component } from 'react';
import { Modal } from 'antd';
import { BiSave } from "react-icons/bi";

import TituloModal from './components/TituloModal/TituloModal';

class YesOrNoModal extends Component {

    render() {
        const { title, text, visible, onClose, onOk } = this.props;

        return (
            <Modal
                visible={visible}
                onCancel={onClose}
                onOk={onOk}
                okText={
                    <>
                        <BiSave className="mr-1" size={16} />
                        Sim
                    </>
                }
            >
                <TituloModal
                    titulo={title}
                    subTitulo={text} />
            </Modal>
        );
    }
}

export default YesOrNoModal;