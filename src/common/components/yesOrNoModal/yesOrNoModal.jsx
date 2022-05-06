import React from 'react';
import { Modal } from 'antd';
import { BiSave } from "react-icons/bi";

import TituloModal from '../TituloModal/TituloModal';

const YesOrNoModal = ({ title, text, visible, onClose, onOk }) => {
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

export default YesOrNoModal;