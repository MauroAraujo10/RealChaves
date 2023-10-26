import React from 'react';
import { Link } from 'react-router-dom';
import { Rotas } from '../../../Routes/rotas';
import './navbar.css';

import { VscKey } from "react-icons/vsc";
import {
    AiOutlineTable,
    AiOutlineTool,
    AiOutlinePlus,
    AiOutlineDatabase,
    AiOutlineAppstore,
    AiOutlineKey,
    AiOutlineMenu
} from 'react-icons/ai';


const NavBar = () => {
    return(
        <header>
            <Link to={Rotas.Home} className="navbar-logo">
                <VscKey size={20} className='mr-1'/>
                Real Chaves
            </Link>

            <input type="checkbox" id="menu-bar" />
            <label htmlFor="menu-bar">
                <AiOutlineMenu size={20} />
            </label>

            <nav className="navbar">
                <ul> <li> <Link to={Rotas.Home}>Início</Link> </li>
                <li> 
                    <Link>Chaves</Link>
                        <ul>
                            <li> 
                                <Link to={Rotas.Chaves}>
                                    <AiOutlineTable size={16} className='mr-1'/> 
                                    Tabela
                                </Link> 
                            </li>
                            <li> 
                                <Link to={Rotas.ChavesCadastro}>
                                    <AiOutlinePlus size={16} className='mr-1'/>
                                    Cadastrar
                                </Link> 
                            </li>
                            <li> 
                                <Link to={Rotas.ChavePedidoEstoque}>
                                    <AiOutlineDatabase size={16} className='mr-1' />
                                    Pedidos de estoque
                                </Link>
                                <ul>
                                    <li>
                                        <Link to={Rotas.ChavePedidoEstoqueCadastro}>
                                            <AiOutlinePlus size={16} className='mr-1'/>
                                            Novo pedido 
                                        </Link>
                                    </li>
                                </ul>
                                
                            </li>
                        </ul>
                </li>
                <li>
                    <Link>Amolação</Link>
                        <ul>
                            <li>
                                <Link to={Rotas.AmolacaoEstoque}>
                                <AiOutlineTable size={16} className='mr-1'/> 
                                    Tabela
                                </Link>
                            </li>
                            <li>
                                <Link to={Rotas.AmolacaoCadastro}>
                                <AiOutlinePlus size={16} className='mr-1'/> 
                                    Cadastrar
                                </Link>
                            </li>
                        </ul>
                </li>
                <li>
                    <Link>Serviços</Link>
                        <ul>
                            <li>
                                <Link to={Rotas.Servico}>
                                <AiOutlineTable size={16} className='mr-1'/> 
                                    Tabela
                                </Link>
                            </li>
                            <li>
                                <Link to={Rotas.ServicoNew}>
                                <AiOutlinePlus size={16} className='mr-1'/> 
                                    Cadastrar
                                </Link>
                            </li>
                        </ul>
                </li>
                <li>
                    <Link>Estatísticas</Link>
                        <ul>
                            <li>
                                <Link to={Rotas.EstatisticasChave}>
                                <AiOutlineKey size={16} className='mr-1'/> 
                                    Chaves
                                </Link>
                            </li>
                            <li>
                                <Link to={Rotas.EstatisticasAmolacoes}>
                                <AiOutlineAppstore size={16} className='mr-1'/> 
                                    Produtos
                                </Link>
                            </li>
                            <li>
                                <Link to={Rotas.EstatisticasServicos}>
                                <AiOutlineTool size={16} className='mr-1'/> 
                                    Serviços
                                </Link>
                            </li>
                        </ul>
                </li>
                <li>
                    <Link to={Rotas.Configuracoes}>Configurações</Link>
                </li>
                </ul>
            </nav>

        </header>
    )

}

export default NavBar;