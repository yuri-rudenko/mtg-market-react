import React, { useEffect, useState } from 'react';
import { Slider } from 'antd';

function formUrlCost(curCost, setUrlArr) {

    if (curCost === '') {
        setUrlArr(prev => ({ ...prev, cost: '' }))
        return
    }

    let url = ''

    if(curCost[0] !== 0) url += `m>=${curCost[0]}+`
    if(curCost[1] !== 20) url += `m<=${curCost[1]}+`
    
    setUrlArr(prev => ({ ...prev, cost: `${url}` }))
}


const Manacost = (props) => {

    const params = props.params
    const setUrlArr = props.setUrlArr

    const [selected, setSelected] = useState([0, 20])

    useEffect(() => {

        const iLowest = params.indexOf('m>=')
        const iHighest = params.indexOf('m<=')

        let lowest = ''
        let highest = ''

        if(iLowest !== -1) {
            let i = iLowest+3
            while(params[i] !== '+') {
                lowest += params[i]
                i++
            }
        }
        if(iHighest !== -1) {
            let i = iHighest+3
            while(params[i] !== '+') {
                highest += params[i]
                i++
            }
        }

        if(lowest === '') lowest = 0
        if(highest === '') highest = 20

        formUrlCost([lowest, highest], setUrlArr)
        setSelected([lowest, highest])
    
    }, [params, setUrlArr])

    const handleChange = (Cost) => {

        formUrlCost(Cost, setUrlArr)
        setSelected(Cost)
        
    }

    return (
        <div className='Manacost'>
            <p>Mana Cost</p>
            <Slider
                range
                marks={{ 0: '0', 5: '5', 10: '10', 15: '15', 20: '20' }}
                min={0}
                max={20}
                step={1}
                defaultCost={[0, 20]}
                value={selected}
                onChange={handleChange}
            />
        </div>
    );
}

export default Manacost;
