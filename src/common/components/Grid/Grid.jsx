import React, { useEffect, useState, useRef } from 'react';
import { Input, Button, Table } from 'antd';

import TotalRegistros from '../TotalRegistros/TotalRegistros';
import { AiOutlineSearch } from "react-icons/ai";

const Grid = ({ dataSource, columns, QuantidadeTotal }) => {
    const [column, setColumn] = useState([]);
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    useEffect(() => {
        let newColumns = [];
        columns.map((x, index) => {
            if (x.key === 'acoes')
                newColumns.push({
                    title: x.title,
                    width: x.width,
                    render: x.render
                });
            else
                newColumns.push({
                    title: x.title,
                    dataIndex: x.dataIndex,
                    key: x.key,
                    ...getColumnSearchProps(x.key),
                    width: x.width
                });
        })
        setColumn(newColumns);
    }, [dataSource]);

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }} >
                <Input
                    ref={searchInput}
                    placeholder={`Buscar  ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<AiOutlineSearch className="mr-1" size={16} />}
                    size="small"
                    style={{ width: 90, marginRight: '10px' }}
                >
                    Buscar
              </Button>
                <Button
                    onClick={() => clearFilters && handleReset(clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                >
                    Resetar Filtros
              </Button>
            </div>
        ),
        filterIcon: (filtered) => (
            <AiOutlineSearch
                size={16}
                style={{ color: filtered ? '#FFF' : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? ( <></>) : ( text),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
    };

    return (
        <div className="container">
            <TotalRegistros
                numeroRegistros={dataSource.length}
                QuantidadeTotal={QuantidadeTotal}
            />
            <Table
                className="Grid"
                bordered
                dataSource={dataSource}
                columns={column}
                pagination={true}
            />
        </div>
    );
}

export default Grid;