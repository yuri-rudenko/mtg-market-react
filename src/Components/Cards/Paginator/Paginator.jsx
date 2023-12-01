import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { parseLink } from '../../Selector/SelectorFunctions/parseLink';
import { Pagination } from 'antd';
import findCards from '../../../Functions/findCards';

function processString(inputString) {

    inputString = inputString.replace(/p:[^+]*\+/g, '')
  
    inputString = inputString.replace(/s:[^+]*\+/g, '')
  
    return inputString
}

function formUrlPage(curPage, setUrlArr) {

    if(!curPage) {
        return
    }

    setUrlArr(prev => ({ ...prev, page: `p:${curPage}+` }));
}

function formUrlShow(curShow, setUrlArr) {

    if(!curShow) {
        return
    }

    setUrlArr(prev => ({ ...prev, show: `s:${curShow}+` }));
}

const Paginator = (props) => {

    const data = props.data
    const setUrlArr = props.setUrlArr
    const setCards = props.setCards
    const setLoading = props.setLoading
    const params = useParams()['*']

    const [selectedPage, setSelectedPage] = useState(0)
    const [selectedShow, setSelectedShow] = useState(36)

    useEffect(() => {

        const all = (parseLink(params, 'p', ':').map(el => el.code))[0]
  
        if(all) {

            setSelectedPage(Number(all))
            formUrlPage(all, setUrlArr)

        }
    
    }, [params, setUrlArr])

    useEffect(() => {

        const all = (parseLink(params, 's', ':').map(el => el.code))[0]
  
        if(all) {

            setSelectedShow(all)
            formUrlShow(all, setUrlArr)

        }
    
    }, [params, setUrlArr])

    const handleChange = (value, length) => {

        formUrlPage(value, setUrlArr)
        setSelectedPage(value)

        formUrlShow(length, setUrlArr)
        setSelectedShow(length)

        const newParams = processString(params) + `p:${value}+` + `s:${length}+`

        findCards(newParams, setCards, setLoading, true)

    }
    

    // p, s

    return (
        <div className='Paginator'>
            <Pagination 
            current={selectedPage} 
            defaultCurrent={1} 
            total={data.total_cards} 
            defaultPageSize={36} 
            pageSize={selectedShow}
            pageSizeOptions={[36, 72, 100, 175, 525]}
            onChange={handleChange}
            />
        </div>
    );
}

export default Paginator;
