import React, { Component } from 'react';
import { Modal, Form, Radio } from 'antd';
import { Row, Col } from 'antd';
import { messages } from '../../../common/Messages/messages';
import { toast } from "react-toastify";

import { descarte } from '../../../common/Messages/descarte'

import service from '../service/chave.service';
import moment from 'moment';

class ChavesDescarteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const { visible, onClose } = this.props;

        const onChangeRadio = () => {

        }

        return (
            <Modal
                visible={visible}
                onCancel={onClose}
                destroyOnClose
            >
                <h2 className="t-center">
                    Descarte de Chave
                </h2>

                <Form layout="vertical">
                    {/* <Radio.Group onChange={onChangeRadio} value={value}> */}
                    <Radio.Group onChange={onChangeRadio}>
                        <Radio value={1}>descarte.Quebrou</Radio>
                    </Radio.Group>
                </Form>

            </Modal>
        );
    }
}

export default ChavesDescarteModal;