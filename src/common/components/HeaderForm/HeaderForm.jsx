import React from 'react';
import { Rotas } from '../../../Routes/rotas';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai'

const HeaderForm = ({ titulo, listaCaminhos }) => {
    return (
        <div className="t-center mt-100">

            <h1>{titulo}</h1>

            <Breadcrumb className='mb-2'>

                <Breadcrumb.Item>
                    <Link to={Rotas.Home}>
                        <AiOutlineHome className="mr-1" />
                        Inicio
                </Link>
                </Breadcrumb.Item>

                {listaCaminhos.map((x) => (
                    <Breadcrumb.Item key={x}>
                        {x}
                    </Breadcrumb.Item>
                ))}

            </Breadcrumb>
        </div>
    )
}

export default HeaderForm;