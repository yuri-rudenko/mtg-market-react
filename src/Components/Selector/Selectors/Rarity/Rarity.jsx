import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { parseLink } from '../../SelectorFunctions/parseLink';

const rarities = [
    'Common',
    'Uncommon',
    'Rare',
    'Mythic'
]

function formUrlRarity(curRarity, setUrlArr) {

    let url = ''

    if (curRarity.length === 0) {
        setUrlArr(prev => ({ ...prev, rarity: '' }));   
        return
    }

    for(let i = 0; i<curRarity.length; i++) {
        if(i === 0) url+='('
        url += `r:${curRarity[i]}`
        if(i < curRarity.length-1)url += `+or+`
        if(i === curRarity.length-1) url += `)+`
    }

    setUrlArr(prev => ({ ...prev, rarity: url }));
}

const Rarity = (props) => {

    const setUrlArr = props.setUrlArr
    const params = props.params
    
    const [selected, setSelected] = useState([])

    useEffect(() => {
  
        const all = parseLink(params, 'r', ':').map(el => el.code)
        
        setSelected(all)
        formUrlRarity(all, setUrlArr)
    
    }, [params, setUrlArr])

    const handleChange = (value) => {

        formUrlRarity(value, setUrlArr)
        setSelected(value)

    }


    return (
        <div className='Rarity'>
            <Select
                mode="multiple"
                size="large"
                placeholder="Rarity"
                maxTagCount={3}
                maxTagTextLength={20}
                allowClear
                style={{ width: '100%', background: '#EBE3D5' }}
                onChange={handleChange}
                value={selected}
            >
                {
            rarities.map(rarity => {
                return <Select.Option key={rarity} value={rarity}>{rarity}</Select.Option>
            })
                }
        </Select>
        </div>
    );
}

export default Rarity;
