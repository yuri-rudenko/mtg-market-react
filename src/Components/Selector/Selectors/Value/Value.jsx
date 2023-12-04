import React, { useEffect, useState } from 'react';
import { Slider } from 'antd';
import './Value.css'

export function toHryvnas(value, course) {
    return Math.floor(value*course * 1000)/1000
}

function formUrlValue(curValue, setUrlArr, course) {

    if (curValue === '') {
        setUrlArr(prev => ({ ...prev, value: '' }))
        return
    }

    let url = ''

    if(curValue[0] !== 0) url += `usd>=${Math.floor(curValue[0]/course * 1000)/1000}+`
    if(curValue[1] !== 5000) url += `usd<=${Math.floor(curValue[1]/course * 1000)/1000}+`
    
    setUrlArr(prev => ({ ...prev, value: `${url}` }))
}

const MySlider = (props) => {
    
    const params = props.params
    const course = props.course
    const setUrlArr = props.setUrlArr

    const [selected, setSelected] = useState([0, 5000])

    useEffect(() => {

        const iLowest = params.indexOf('usd>=')
        const iHighest = params.indexOf('usd<=')

        let lowest = ''
        let highest = ''

        if(iLowest !== -1) {
            let i = iLowest+5
            while(params[i] !== '+') {
                lowest += params[i]
                i++
            }
        }
        if(iHighest !== -1) {
            let i = iHighest+5
            while(params[i] !== '+') {
                highest += params[i]
                i++
            }
        }

        if(lowest === '') lowest = 0
        if(highest === '') highest = 5000/course

        formUrlValue([toHryvnas(lowest, course), toHryvnas(highest, course)], setUrlArr, course)
        setSelected([toHryvnas(lowest, course), toHryvnas(highest, course)])
    
    }, [params, setUrlArr, course])

    const handleChange = (value) => {

        formUrlValue(value, setUrlArr, course)
        setSelected(value)
        
    }

    const formatter = (value) => {
        return `${value}₴`
    }

    return (
        <div className='slider'>
            <Slider
                range
                marks={{ 0: '0₴', 1250: '1250₴', 2500: '2500₴', 3750: '3750₴', 5000: '5000+' }}
                min={0}
                max={5000}
                step={10}
                tooltip={{ formatter }}
                defaultValue={[0, 5000]}
                value={selected}
                onChange={handleChange}
            />
        </div>
    );
};

export default MySlider;
