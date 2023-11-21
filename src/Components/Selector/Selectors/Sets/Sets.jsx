import React, { useEffect, useState } from 'react';
import './Sets.css'
import { Select } from 'antd';
import { checkBadSets } from '../../../../Functions/checkBadSets';
import axios from 'axios';
import SetSelectElement from './SetSelectElement';

function formUrlSets(curSets, sets, setUrlSets) {
    if (curSets.length === 0) {
        setUrlSets(prev => ({ ...prev, sets: '' }))
        return
    };

    let codes = []
    let url = ''

    for (let setName of curSets) {
        const set = sets.find(element => element.name === setName)

        if (set && set.code) {
            codes.push(set.code);
        }
    }
    
    for(let i = 0; i<codes.length; i++) {
        if(i === 0 && codes.length>1) url+='('
        url += `e:${codes[i]}`
        if(i < codes.length-1)url += `+or+`
        if(i === codes.length-1 && codes.length>1) url += `)+`
    }

    setUrlSets(prev => ({ ...prev, sets: url }));
}



const Sets = (props) => {

    const setUrlSets = props.setUrlArr
    
    const [sets, setSets] = useState([])
    
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

    return (
        <Select
                mode="multiple"
                size="large"
                placeholder="Set"
                maxTagCount={3}
                maxTagTextLength={10}
                allowClear
                style={{ width: '100%', background: '#EBE3D5' }}
                onChange={(selectedValues) => formUrlSets(selectedValues, sets, setUrlSets)}
            >
                {
            sets.map(set => {
                return <Select.Option key={set.id} value={set.name}><SetSelectElement set={set}/></Select.Option>
            })
                }
        </Select>
    );
}

export default Sets;
