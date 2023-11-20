import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import './Selector.css'
import axios from 'axios';
import { checkBadSets } from '../../Functions/checkBadSets';

const Selector = () => {

    const [sets, setSets] = useState([])

    useEffect(() => {

        axios.get('https://api.scryfall.com/sets')
            .then(response => {
                console.log(response.data.data)
                response.data.data.map(set => {
                    if(checkBadSets(set)) {
                        let objSet = {
                            name: set.name,
                            card_count: set.card_count,
                            image: set.icon_svg_uri,
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
        <div className='Selector'>
            <h1>Selector</h1>
            <Select
                mode="multiple"
                size="large"
                placeholder="Set"
                style={{ width: '100%', background: '#EBE3D5' }}
            >
                {
                sets.map(set => {
                    return <Select.Option key={set.name} value={set.name}>{set.name}</Select.Option>
                })
                }
            </Select>
        </div>
    );
}

export default Selector;


