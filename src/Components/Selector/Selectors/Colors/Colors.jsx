import { Select } from "antd";
import colorImages from "./colorImages";
import combinations from "./combinations";
import './Colors.css'

const Colors = () => {

    return (
        <div className='Colors'>
           <Select
                mode="multiple"
                size="large"
                placeholder="Colors"
                maxTagCount={3}
                maxTagTextLength={10}
                allowClear
                style={{ width: '100%', background: '#EBE3D5' }}
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
