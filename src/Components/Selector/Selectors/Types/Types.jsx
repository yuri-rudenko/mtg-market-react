import { Select } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import types from './types';
import { parseLink } from '../../SelectorFunctions/parseLink';

types.sort()

function formUrlTypes(curTypes, setUrlArr) {

    let url = ''

    if (curTypes.length === 0) {
        setUrlArr(prev => ({ ...prev, types: '' }));   
        return
    }

    for(let i = 0; i<curTypes.length; i++) {
        url += `t:${curTypes[i]}+`
    }

    setUrlArr(prev => ({ ...prev, types: url }));
}

function formUrlSubtypes(curSubtypes, setUrlArr) {

    let url = ''

    if (curSubtypes.length === 0) {
        setUrlArr(prev => ({ ...prev, subtypes: '' }));   
        return
    }

    for(let i = 0; i<curSubtypes.length; i++) {
        url += `t:${curSubtypes[i]}+`
    }

    setUrlArr(prev => ({ ...prev, subtypes: url }));
}


const Types = (props) => {

    const setUrlArr = props.setUrlArr
    const params = props.params
    const [selected, setSelected] = useState([])
    const [selectedSub, setSelectedSub] = useState([])

    const urls = [
        'https://api.scryfall.com/catalog/creature-types',
        'https://api.scryfall.com/catalog/planeswalker-types',
        'https://api.scryfall.com/catalog/land-types',
        'https://api.scryfall.com/catalog/artifact-types',
        'https://api.scryfall.com/catalog/enchantment-types',
        'https://api.scryfall.com/catalog/spell-types',
    ]

    const [subTypes, setSubTypes] = useState([])


    useEffect(() => {
        const requests = urls.map((url) => axios.get(url))

        axios.all(requests)
            .then((responses) => {
                let newData = []
                responses.forEach((resp) => {
                    newData = [...newData, ...resp.data.data]
                });

                newData.sort()

                setSubTypes(newData)
            })
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
  
        const all = parseLink(params, 't', ':').map(el => el.code)
        const curTypes = []
        const curSubtypes = []

        all.forEach(el => {
            if (types.includes(el)) {
                curTypes.push(el)
            } else {
                curSubtypes.push(el)
            }
        })
        
        setSelected(curTypes)
        formUrlTypes(curTypes, setUrlArr)

        setSelectedSub(curSubtypes)
        formUrlSubtypes(curSubtypes, setUrlArr)
    
    }, [params, setUrlArr])

    const handleChange = (value) => {

        formUrlTypes(value, setUrlArr)
        setSelected(value)

    }
    
    const handleChangeSub = (value) => {

        formUrlSubtypes(value, setUrlArr)
        setSelectedSub(value)

    }

    return (
        <div>
            <div className='Types'>
                <Select
                        mode="multiple"
                        size="large"
                        placeholder="Types"
                        maxTagCount={3}
                        allowClear
                        style={{ width: '100%', background: '#EBE3D5' }}
                        onChange={handleChange}
                        value={selected}
                    >
                        {
                    types.map(type => {
                        return <Select.Option key={type} value={type}>{type}</Select.Option>
                    })
                        }
                </Select>
            </div>
            <div className='Subtypes'>
                <Select
                        mode="multiple"
                        size="large"
                        placeholder="Subtypes"
                        maxTagCount={3}
                        allowClear
                        style={{ width: '100%', background: '#EBE3D5' }}
                        onChange={handleChangeSub}
                        value={selectedSub}
                    >
                        {
                    subTypes.map(subtype => {
                        return <Select.Option key={subtype} value={subtype}>{subtype}</Select.Option>
                    })
                        }
                </Select>
            </div>
        </div>
    );
}

export default Types;
