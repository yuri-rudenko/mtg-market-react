import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import axios from 'axios';
import { parseLink } from '../../SelectorFunctions/parseLink';
import formats from './defFormats';

function formUrlFormats(curFormats, setUrlArr) {

    let url = ''

    if (curFormats.length === 0) {
        setUrlArr(prev => ({ ...prev, formats: '' }));   
        return
    }

    for(let i = 0; i<curFormats.length; i++) {
        url += `f:${curFormats[i]}+`
    }

    setUrlArr(prev => ({ ...prev, formats: url }));
}

const Formats = (props) => {

    const setUrlArr = props.setUrlArr
    const params = props.params
    
    const [selected, setSelected] = useState([])

    useEffect(() => {
  
        const all = parseLink(params, 'f', ':').map(el => el.code)
        
        setSelected(all)
        formUrlFormats(all, setUrlArr)
    
    }, [params, setUrlArr])

    const handleChange = (value) => {

        formUrlFormats(value, setUrlArr)
        setSelected(value)

    }


    return (
        <div className='Formats'>
            <Select
                mode="multiple"
                size="large"
                placeholder="Format"
                maxTagCount={3}
                maxTagTextLength={20}
                allowClear
                style={{ width: '100%', background: '#EBE3D5' }}
                onChange={handleChange}
                value={selected}
            >
                {
            formats.map(format => {
                return <Select.Option key={format} value={format}>{format}</Select.Option>
            })
                }
        </Select>
        </div>
    );
}

export default Formats;
