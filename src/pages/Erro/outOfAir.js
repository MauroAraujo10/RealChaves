import React from 'react';
import Fixcomputer from './assets/Fix-Computer.gif';

const OutofAir = () => {
    return (
        <div className='t-center'>
            <h2 className='mt-2'>Sistema momentaneamente fora do ar</h2>
            <h3>Contate o desenvolvedor para mais informações</h3>
            <img src={Fixcomputer} alt={'fix-computer'} />
        </div>
    );
}

export default OutofAir;