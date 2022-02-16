import React from 'react';
import { BiSave } from "react-icons/bi";
import { Button } from 'antd'

export default function BotaoCadastrar() {
    return (
        <div className='t-right'>
            <Button
                type="primary"
                htmlType="submit"
            >
                <BiSave className="mr-2" size={16} />
                Salvar
            </Button>
        </div>
    );
}