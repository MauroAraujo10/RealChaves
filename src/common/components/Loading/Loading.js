import React from 'react';
import { Spin } from 'antd';

const Loading = () => {
    return (
        <div className="loader_container t-center">
            <Spin
                className="loader"
                size="large"
            />
            <h4>
                Carregando...
            </h4>
        </div>
    );
}

export default Loading;