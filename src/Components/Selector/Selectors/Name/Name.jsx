import { Input } from 'antd';
import React, { useEffect, useState } from 'react';

function formUrlName(curValue, setUrlArr) {

    if (curValue === '') {
        setUrlArr(prev => ({ ...prev, name: '' }))
        return
    }
    
    setUrlArr(prev => ({ ...prev, name: `${curValue}+` }))
}

const Name = (props) => {

    const params = props.params
    const setUrlArr = props.setUrlArr
    const [selected, setSelected] = useState('')

    useEffect(() => {

        const splited = params.split('+')
        console.log(splited, 'SPLITED')

        if(!(splited[0].includes('=') || splited[0].includes(':'))) {

            formUrlName(splited[0], setUrlArr)
            setSelected(splited[0])

        }
    
    }, [params, setUrlArr])

    const handleChange = (value) => {

        const newVal = value.target.value

        formUrlName(newVal, setUrlArr)
        setSelected(newVal)
        
    }

    return (
        <div className='Name'>
            <Input
                placeholder='Name' 
                onChange={handleChange}
                value={selected}
            >
            </Input>
        </div>
    );
}

export default Name;
