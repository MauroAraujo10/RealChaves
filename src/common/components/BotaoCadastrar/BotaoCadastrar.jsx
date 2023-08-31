import React from 'react';
import { Button, Tooltip } from 'antd'
import { AiOutlineSave } from 'react-icons/ai'

const BotaoCadastrar = ({ isView, funcaoCancelar }) => {
    return (
        <div className="t-right mt-2">
            {
                isView &&
                <Tooltip placement='top' title='Cancelar'>
                    <Button className="mr-1" onClick={funcaoCancelar}>
                        Fechar
                    </Button>
                </Tooltip>
            }
            {
                !isView &&
                <>
                <Tooltip placement='top' title='Cancelar'>
                    <Button className="mr-1" onClick={funcaoCancelar}>
                        Cancelar
                    </Button>
                </Tooltip>

                <Tooltip placement='top' title='Salvar registro'>
                    <Button type="primary" htmlType="submit" icon={<AiOutlineSave size={18} className="mr-1" />}>
                        Salvar
                    </Button>
                </Tooltip>
                </>
            }
        </div>
    );
}

export default BotaoCadastrar;