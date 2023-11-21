import { Select } from "antd";
import colorImages from "./colorImages";
import combinations from "./combinations";
import './Colors.css'

function formUrlColors(curColors, setUrlArr) {

    if (curColors === '') {
        setUrlArr(prev => ({ ...prev, colors: '' }));   
        return
    }

    setUrlArr(prev => ({ ...prev, colors: `c=${curColors}+` }));
}

const Colors = (props) => {

    const setUrlArr = props.setUrlArr

    return (
        <div className='Colors'>
           <Select
                size="large"
                placeholder="Colors"
                maxTagCount={3}
                maxTagTextLength={10}
                allowClear
                style={{ width: '100%', background: '#EBE3D5' }}
                onChange={(value) => formUrlColors(value, setUrlArr)}
            >
            {combinations.map(combination => (
                <Select.Option key={combination.code} value={combination.code}>
                <div className="colorOption">
                    {combination.code.split("").map(colorChar => (
                    <img
                        key={colorImages[colorChar].id}
                        src={colorImages[colorChar].src}
                        alt={colorImages[colorChar].alt}
                        style={{marginRight: '8px' }}
                    />
                    ))}
                    {combination.name}
                </div>
              </Select.Option>
            ))}
        </Select>
        </div>
    );
}

export default Colors;
