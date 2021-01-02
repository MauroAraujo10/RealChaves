import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { HiKey } from 'react-icons/hi';
import './style.css'

function Header() {
    return (
        <header>
            <Link to="/">
                <HiKey style={{ marginRight: "10px" }} size={20} color="FF0" />
                Real Chaves
                </Link>
        </header>
    );
}

export default withRouter(Header);