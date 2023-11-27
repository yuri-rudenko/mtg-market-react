import React, { useEffect, useState } from 'react';
import './Sets.css'
import { Select } from 'antd';
import { checkBadSets } from '../../../../Functions/checkBadSets';
import axios from 'axios';
import SetSelectElement from './SetSelectElement';
import { parseLink } from '../../SelectorFunctions/parseLink';

function formUrlSets(curSetsFull, setUrlArr) {

    const curSets = curSetsFull.map(el => (el.code))

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

        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.scryfall.com/sets')
                const newSets = response.data.data.filter(set => checkBadSets(set)).map(set => ({
                    name: set.name,
                    card_count: set.card_count,
                    image: set.icon_svg_uri,
                    id: set.id,
                    code: set.code,
                }));
                setSets(prevSets => [...prevSets, ...newSets])
            } catch (error) {
                console.log(error)
            }
        };
    
        fetchData()
    }, []); 
    
    useEffect(() => {
        const parsedSets = parseLink(params, 'e', ':');
    
        if (sets.length > 0 && parsedSets.length > 0) {

            for (let set of parsedSets) {
                const foundSet = sets.find(el => el.code === set.code)
                if (foundSet) set.name = foundSet.name
            }
    
            setSelected(parsedSets);
            formUrlSets(parsedSets, setUrlArr)
        }
        else {
            setSelected([]);
            formUrlSets([], setUrlArr)
        }
    }, [params, setUrlArr, sets])

    const handleChange = (value) => {

        const newVal = value.map(val => ({name: val}))

        for(let set of newVal) {

            const foundSet = sets.find(el => el.name === set.name)
            if(foundSet) set.code = foundSet.code

        }

        formUrlSets(newVal, setUrlArr)
        setSelected(newVal)

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
                value={selected.map(el => (el.name))}
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
