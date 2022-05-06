import React from 'react';
import { BiSave } from "react-icons/bi";
import { Button } from 'antd'

const BotaoCadastrar = ({ funcaoCancelar }) => {
    return (
        <div className="t-right mt-2">
            <Button className="mr-1" onClick={funcaoCancelar}>
                Cancelar
            </Button>
            <Button type="primary" htmlType="submit">
                <BiSave className="mr-1 mt-1" size={16} />
                Salvar
            </Button>
        </div>
    );
}

export default BotaoCadastrar;