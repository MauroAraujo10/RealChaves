import React, { useEffect, useRef } from 'react';
import Inputmask from 'inputmask';

function MaskedInput({ mask, placeholder, ...props }) {
    const inputRef = useRef();

    useEffect(() => {
        Inputmask({
            mask: mask,
            placeholder: placeholder,
            regex: String.raw`^\([1-9]{2}\) [9]{0,1}[6-9]{1}[0-9]{3}\-[0-9]{4}$`,
          }).mask(inputRef.current);
        }, [mask, placeholder]);

        return <input ref={inputRef} {...props} />;
}

const TelefoneWithMask = () => {
    return (
        <MaskedInput 
        className={'ant-form-item-control-input-content'}
        mask="(99) 99999-9999"  />
    );
};

export default TelefoneWithMask;