import React from 'react';
import { useHistory } from 'react-router-dom';
import { Tooltip, Button } from 'antd';

const ButtonNovoRegistro = ({ tooltipTitle, route,  icon, buttonText }) => {
    const history = useHistory();

    const handleClick = () => {
        history.push(route);
    }

    return (
        <div className='t-right mr-1'>
            <Tooltip
                placement='top'
                title={tooltipTitle}
            >
                <Button 
                    onClick={() => handleClick()}
                    style={{
                        background: '#28a745',
                        borderColor: '#28a745',
                        color: '#FFF',
                        fontWeight: '700',
                        height: '40px'
                    }}
                >
                    {icon}
                    {buttonText}
                </Button>

            </Tooltip>
        </div>
    )
}

export default ButtonNovoRegistro;