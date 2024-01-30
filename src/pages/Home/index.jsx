import React from 'react';
import { Link } from 'react-router-dom';
import { Rotas } from '../../Routes/rotas';

import { FcKey, FcShare, FcSupport } from "react-icons/fc";

const Home = () => {
    return (
        <>
            <div className='home-container'>
                <div className='home-container-title-background'>
                    <h1 className='t-center'>Real Chaves</h1>
                    <h3 className='t-center'>A sua solução em chaves</h3>
                </div>

                <div className='home-footer'>
                    <Link to={Rotas.Chaves}>
                        <div className='home-footer-item t-center'>
                            <FcKey size={60} className='mt-1' />
                            <br />
                            Chaves
                        </div>
                    </Link>
                    <Link to={Rotas.AmolacaoEstoque}>
                        <div className='home-footer-item t-center'>
                            <FcShare size={60} className='mt-1' />
                            <br />
                            Amolações
                        </div>
                    </Link>
                    <Link to={Rotas.AmolacaoEstoque}>
                        <div className='home-footer-item t-center'>
                            <FcSupport size={60} className='mt-1' />
                            <br />
                            Serviços
                        </div>
                    </Link>
                </div>

            </div>


        </>
    );
}

export default Home;