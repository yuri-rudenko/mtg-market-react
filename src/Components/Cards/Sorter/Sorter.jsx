import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { parseLink } from '../../Selector/SelectorFunctions/parseLink';
import items from '../items';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';


function formUrlOrder(curOrder, setUrlArr) {

    setUrlArr(prev => ({ ...prev, order: `o:${curOrder.value}+` }));
  
}

const Sorter = (props) => {

    const params = useParams()['*']
    const setUrlArr = props.setUrlArr

    const [selected, setSelected] = useState(items[0])

    const onClick = ({ key }) => {

      const selectedItem = items.find((item) => item.key === key)

      setSelected(selectedItem);
      formUrlOrder(selectedItem, setUrlArr)

    }

    useEffect(() => {

      const all = (parseLink(params, 'o', ':').map(el => el.code))[0]

      if(all) {
        const cur = items.find((item) => item.value === all)
      
        setSelected(cur)
        formUrlOrder(cur, setUrlArr)

    }
  
  }, [params, setUrlArr])

    return (
        <Dropdown
            menu={{ items, onClick }}
            trigger={['click']}
            value={selected.label}
          >
            <div className='sortingContainer' onClick={(e) => e.preventDefault()}>
              <Space>
                <p className='sortBy'>Sort by: </p>
                <Button className='sorting'>
                    <p className='label'>{selected.label}</p>
                    <DownOutlined />
                  </Button>
              </Space>
            </div>
          </Dropdown>
    );
}

export default Sorter;
