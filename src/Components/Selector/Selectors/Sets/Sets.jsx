import React, { useEffect, useState } from 'react';
import './Sets.css'
import { Select } from 'antd';
import { checkBadSets } from '../../../../Functions/checkBadSets';
import axios from 'axios';
import SetSelectElement from './SetSelectElement';

function formUrlSets(curSets, setUrlArr) {

    if (curSets.length === 0) {
        setUrlArr(prev => ({ ...prev, sets: '' }))
        return
    };
    
    let url = ''
    
    for(let i = 0; i<curSets.length; i++) {
        if(i === 0) url+='('
        url += `e:${curSets[i]}`
        if(i < curSets.length-1)url += `+or+`
        if(i === curSets.length-1) url += `)+`
    }

    setUrlArr(prev => ({ ...prev, sets: url }));
}



const Sets = (props) => {

    const setUrlArr = props.setUrlArr
    const params = props.params
    
    const [sets, setSets] = useState([])
    const [selected, setSelected] = useState([])
    
    useEffect(() => {

        axios.get('https://api.scryfall.com/sets')
            .then(response => {
                response.data.data.forEach(set => {
                    if(checkBadSets(set)) {
                        let objSet = {
                            name: set.name,
                            card_count: set.card_count,
                            image: set.icon_svg_uri,
                            id: set.id,
                            code: set.code,
                        }
                        setSets(prevSets => ([...prevSets, objSet]))
                    }
                })
            })
            .catch(error => {
                console.log(error)
            })
            .finally(console.log(sets, 222))

    }, [])

    useEffect(() => {
  
        const sets = []
        let i = params.indexOf('e:')
    
        while (i !== -1) {
          let ident = '';
          let find = i + 2
    
          while (params[find] !== '+' && params[find] !== ')') {
            ident += params[find]
            find++;
          }
    
          sets.push(ident)
          i = params.indexOf('e:', i + 1)
        }
        
        setSelected(sets)
        formUrlSets(sets, setUrlArr)

    
    }, [params, setUrlArr])

    const handleChange = (value) => {
        formUrlSets(value, setUrlArr)
        setSelected(value)
      }

    return (
        <Select
                mode="multiple"
                size="large"
                placeholder="Set"
                maxTagCount={3}
                maxTagTextLength={10}
                allowClear
                style={{ width: '100%', background: '#EBE3D5' }}
                onChange={handleChange}
                value={selected}
            >
                {
            sets.map(set => {
                return <Select.Option key={set.id} value={set.code}><SetSelectElement set={set}/></Select.Option>
            })
                }
        </Select>
    );
}

export default Sets;
