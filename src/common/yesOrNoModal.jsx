import React, { Component } from 'react';
import { Modal } from 'antd';
import { BiSave } from "react-icons/bi";

class YesOrNoModal extends Component {

    render() {
        const { title, text, visible, onClose, onOk } = this.props;

        return (
            <Modal
                title={title}
                visible={visible}
                onCancel={onClose}
                onOk={onOk}
                okText={
                    <>
                        <BiSave className="mr-2" size={16} />
                        Salvar
                    </>
                }
            >
                <p>{text}</p>
            </Modal>
        );
    }
}

export default YesOrNoModal;