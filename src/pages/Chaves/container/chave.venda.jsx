import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import { Table, Breadcrumb, Input, Space, Button } from 'antd';

import TotalRegistros from '../../../common/components/TotalRegistros/TotalRegistros';

import { SearchOutlined } from '@ant-design/icons';
import { AiOutlineHome } from "react-icons/ai";

class Venda extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount(){

    }    

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Filtrar ${dataIndex}`}
                    onFocus
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Filtrar
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset Filtro
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };



    render() {
        const columns = [
            { title: 'Marca', dataIndex: 'Marca', key: 'Marca', ...this.getColumnSearchProps('Marca'), width: '30%' },
        ];
        return (
            <h1>Ainda tenho que pensar</h1>
            // <div className="mt-2">
            //     <div className="t-center">
            //         <h1>Chaves Vendidas</h1>
            //         <Breadcrumb>
            //             <Breadcrumb.Item>
            //                 <Link to="/">
            //                     <AiOutlineHome className="mr-2" />
            //                     Início
            //                 </Link>
            //             </Breadcrumb.Item>
            //             <Breadcrumb.Item>
            //                 Chaves
            //             </Breadcrumb.Item>
            //         </Breadcrumb>
            //     </div>

            //     <div className="container">
            //         <TotalRegistros
            //             numeroRegistros={80} />

            //         <Table
            //             className="Grid"
            //             bordered
            //             dataSource={this.state.chaves}
            //             columns={columns}>
            //         </Table>
            //     </div>
            // </div>
        );
    }
}

export default withRouter(Venda);