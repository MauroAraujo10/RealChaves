import React from 'react';
import { Spin } from 'antd';

const Loading = () => {
    return (
        <div className="loader_container">
            <Spin
                className="loader"
                size="large"
            />
        </div>
    );
}

export default Loading;