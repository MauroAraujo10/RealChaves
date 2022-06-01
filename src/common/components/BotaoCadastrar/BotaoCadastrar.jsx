import React from 'react';
import { Button } from 'antd'
import { AiOutlineSave } from 'react-icons/ai'

const BotaoCadastrar = ({ isView, funcaoCancelar }) => {
    return (
        <div className="t-right mt-2">
            {
                isView &&
                <Button className="mr-1" onClick={funcaoCancelar}>
                    Fechar
                </Button>
            }
            {
                !isView &&
                <>
                    <Button className="mr-1" onClick={funcaoCancelar}>
                        Cancelar
                    </Button>
                    <Button type="primary" htmlType="submit">
                        <AiOutlineSave className="mr-1" size={16} />
                        Salvar
                    </Button>
                </>
            }
        </div>
    );
}

export default BotaoCadastrar;