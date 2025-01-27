import { Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';
import { parseLink } from '../../SelectorFunctions/parseLink';

function formUrlUnique(curValue, setUrlArr) {
    
    if(curValue.length === 0) return

    setUrlArr(prev => ({ ...prev, unique: `u:${curValue}+` }))

}

const Unique = (props) => {

    const params = props.params
    const setUrlArr = props.setUrlArr
    const [selected, setSelected] = useState(false)

    useEffect(() => {

        let all = parseLink(params, 'u', ':').map(el => el.code)[0]
        if(all === 'true') all = true
        else all = false

        if(all === true || all === false) {

            formUrlUnique(all, setUrlArr)
            setSelected(all)

        }
    
    }, [params, setUrlArr])

    const handleChange = (value) => {

        const newVal = value.target.checked

        formUrlUnique(newVal, setUrlArr)
        setSelected(newVal)
    }

    return (
        <div className='Unique'>
            <Checkbox
                placeholder='Name' 
                onChange={handleChange}
                checked={selected}
            >
            Show all versions
            </Checkbox>
        </div>
    );
}

export default Unique;
