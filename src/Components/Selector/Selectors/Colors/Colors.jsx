import { Select } from "antd";
import colorImages from "./colorImages";
import combinations from "./combinations";
import './Colors.css'
import { useEffect, useState } from "react";
import { parseLink } from "../../SelectorFunctions/parseLink";

function formUrlColors(curColors, setUrlArr) {

    if (curColors.length === 0) {
        setUrlArr(prev => ({ ...prev, colors: '' }));   
        return
    }

    let url = ''

    for(let i = 0; i<curColors.length; i++) {

        if(curColors[i] == '5 Color') curColors[i] = 'wubrg'

        if(i === 0) url+='('
        url += `c=${curColors[i]}`
        if(i < curColors.length-1)url += `+or+`
        if(i === curColors.length-1) url += `)+`
    }

    setUrlArr(prev => ({ ...prev, colors: url }));
}

const Colors = (props) => {
  
    const params = props.params
    const setUrlArr = props.setUrlArr
  
    const [selected, setSelected] = useState([])
  
    useEffect(() => {

      const colors = parseLink(params, 'c', '=')
  
      formUrlColors(colors, setUrlArr)
      setSelected(colors)
  
    }, [params, setUrlArr])


    const handleChange = (value) => {

      formUrlColors(value, setUrlArr)
      setSelected(value)
      
    }
  
    return (
      <div className="Colors">
        <Select
          size="large"
          mode="multiple"
          placeholder="Colors"
          maxTagCount={3}
          maxTagTextLength={10}
          allowClear
          style={{ width: '100%', background: '#EBE3D5' }}
          onChange={handleChange}
          value={selected}
        >
          {combinations.map((combination) => (
            <Select.Option key={combination.code} value={combination.name}>
              <div className="colorOption">
                {combination.code.split('').map((colorChar) => (
                  <img
                    key={colorImages[colorChar].id}
                    src={colorImages[colorChar].src}
                    alt={colorImages[colorChar].alt}
                    style={{ marginRight: '8px' }}
                  />
                ))}
                {combination.name}
              </div>
            </Select.Option>
          ))}
        </Select>
      </div>
    );
  };
  
  export default Colors;