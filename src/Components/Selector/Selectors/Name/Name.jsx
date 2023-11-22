import { Input } from 'antd';
import React from 'react';

function formUrlName(curValue, setUrlArr) {

    if (curValue === '') {
        setUrlArr(prev => ({ ...prev, name: '' }))
        return
    }
    
    setUrlArr(prev => ({ ...prev, name: `${curValue}+` }))
}

const Name = (props) => {

    const setUrlArr = props.setUrlArr

    return (
        <div className='Name'>
            <Input placeholder='Name' onChange={(e) => (formUrlName(e.target.value, setUrlArr))}></Input>
        </div>
    );
}

export default Name;
