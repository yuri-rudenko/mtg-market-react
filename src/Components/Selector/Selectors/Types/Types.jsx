import { Select } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import types from './types';

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

    // useEffect(() => {
  
    //     const types = []
    //     let i = params.indexOf('e:')
    
    //     while (i !== -1) {
    //       let ident = '';
    //       let find = i + 2
    
    //       while (params[find] !== '+' && params[find] !== ')') {
    //         ident += params[find]
    //         find++;
    //       }
    
    //       types.push(ident)
    //       i = params.indexOf('e:', i + 1)
    //     }
        
    //     setSelected(types)
    //     formUrlTypes(types, setUrlArr)
    
    // }, [params, setUrlArr])

    const handleChange = (value) => {

        formUrlTypes(value, setUrlArr)
        setSelected(value)

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
                        onChange={(elements) => formUrlTypes(elements, setUrlArr)}
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
                        onChange={(elements) => formUrlSubtypes(elements, setUrlArr)}
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
