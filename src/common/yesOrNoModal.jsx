import React, { Component } from 'react';
import { Modal } from 'antd';

class YesOrNoModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { title, text, visible, onClose, onOk } = this.props;

        return (
            <Modal
                title={title}
                visible={visible}
                onCancel={onClose}
                onOk={onOk}>
                <p>{text}</p>
            </Modal>
        );
    }
}

export default YesOrNoModal;