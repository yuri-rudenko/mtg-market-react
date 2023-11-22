import React from 'react';
import { Slider } from 'antd';

function formUrlColors(curValue, setUrlArr, course) {

    if (curValue === '') {
        setUrlArr(prev => ({ ...prev, value: '' }))
        return
    }

    let url = ''

    if(curValue[0] !== 0) url += `usd>=${Math.floor(curValue[0]/course * 1000)/1000}+`
    if(curValue[1] !== 20000) url += `usd<=${Math.floor(curValue[1]/course * 1000)/1000}+`
    
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

        <Slider
            range
            marks={{ 0: '0₴', 5000: '5000₴', 10000: '10000₴', 15000: '15000₴', 20000: '20000+' }}
            min={0}
            max={20000}
            step={50}
            tooltip={{ formatter }}
            defaultValue={[0, 20000]}
            onChange={(value) => formUrlColors(value, setUrlArr, props.course)}

        />
    );
};

export default MySlider;
