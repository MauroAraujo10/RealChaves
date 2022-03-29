import React, { Component } from 'react';
import { BiSave } from "react-icons/bi";
import { Button } from 'antd'

class BotaoCadastrar extends Component {

    render() {
        const { possuiCancelar, funcaoCancelar } = this.props;

        return (
            <div className="t-right">
                {possuiCancelar &&
                    <Button className="mr-1" onClick={funcaoCancelar}>
                        Cancelar
                    </Button>
                }
                <Button
                    type="primary"
                    htmlType="submit"
                >
                    <BiSave className="mr-1" size={16} />
                    Salvar
                </Button>
            </div>
        );
    }
}

export default BotaoCadastrar;