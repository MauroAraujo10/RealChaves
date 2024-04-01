import React, { useEffect, useState, useRef } from 'react';

import TotalRegistros from '../TotalRegistros/TotalRegistros';
import { AiOutlineSearch } from "react-icons/ai";

import { Button, Input, Space, Table } from 'antd';

const Grid = ({ dataSource, columns, QuantidadeTotal }) => {
  const [column, setColumn] = useState([]);
  const searchInput = useRef(null);

  const handleSearch = (confirm) => {
    confirm();
  };

  const handleReset = (clearFilters) => {
    clearFilters();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(confirm)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(confirm)}
            icon={<AiOutlineSearch />}
            size="small"
            style={{
              width: 90,
            }}
          >
            &nbsp; Buscar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Resetar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <AiOutlineSearch
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => text
  });


  useEffect(() => {
    let newColumns = [];
    columns.forEach((x) => {
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
  }, []);

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
      />
    </div>
  );
}

export default Grid;