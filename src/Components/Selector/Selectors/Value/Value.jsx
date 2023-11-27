import React from 'react';
import { Input, Slider } from 'antd';
import './Value.css'

function formUrlColors(curValue, setUrlArr, course) {

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

    const setUrlArr = props.setUrlArr

    const handleChange = (value) => {
        console.log('Slider Value:', value)
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
                onChange={(value) => formUrlColors(value, setUrlArr, props.course)}
            />
        </div>
    );
};

export default MySlider;
