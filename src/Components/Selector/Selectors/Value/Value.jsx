import { Slider } from 'antd';
import React from 'react';

const Value = () => {
    
    const formatter = (value) => `${value} ₴`;

    return (
        <div className='Value'>
            <Slider range marks={{0:'0₴', 5000:'5000₴', 10000:'10000₴', 15000:'15000₴', 20000:'20000+'}} min={0} max={20000} step={50} tooltip={{ formatter }} defaultValue={[0, 20000]} />
        </div>
    );
}

export default Value;
