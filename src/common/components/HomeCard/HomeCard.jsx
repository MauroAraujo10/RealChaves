import React from 'react';

const HomeCard = ({ icon, title, value, color, text }) => {
    return (
        <div className="container t-center">
            {icon}
            <h1>{title}: {value}</h1>
            <h4 style={{ color: color }}>
                {text}
            </h4>
        </div>
    );
}

export default HomeCard;