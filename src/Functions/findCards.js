import axios from "axios";
import { defaultCards } from "./defaultCards";
import { useNavigate } from "react-router-dom";

function replaceMana(str) {
    const newString = str.replace(/m<=/g, 'mv<=').replace(/m>=/g, 'mv>=')

    return newString
}

function replaceUnique(str) {

    const uValueRegex = /u:([^+]+)\+/
    const match = str.match(uValueRegex)

    if (match && match[1]) {

        let uValue = match[1]
        if(uValue === 'true') uValue = true
        else uValue = false

        const modifiedString = str.replace(`u:${uValue}+`, '')

        return [modifiedString, uValue]

    } else {

        const modifiedString = str += `u:${false}+`
        return [modifiedString, false]
    }
}

function findValue(str, symbol) {


    const find = str.indexOf(`${symbol}:`)
    const findPlus = str.indexOf('+', find)

    const found = str.slice(find+2, findPlus)

    const foundValue = symbol === 'o'? found.slice(0, -1): found
    const newParams = str.slice(0, find) + str.slice(findPlus+1)

    switch(symbol) {

        case 'o':
            if(find === -1) return [str, 'usd', '&dir=desc&q=']

            const last = found.slice(-1)
            return([newParams, foundValue, last])
        case 'p':
            if(find === -1) return [str, 1]
            break;
        case 's':
            if(find === -1) return [str, 24]
            break;
        default:
            
    }

    return([newParams, foundValue])

}

function newValues(inputStr) {

    const str = replaceMana(inputStr)
    const [strU, unique] = replaceUnique(str)

    const [newParamsO, order, last] = findValue(strU, 'o')
    const [newParamsP, page] = findValue(newParamsO, 'p')
    const [newParams, show] = findValue(newParamsP, 's')

    let rev = '&dir='
    last == 0? rev += `asc&q=`: rev+=`desc&q=`

    return([newParams, order, rev, Number(page) - 1, Number(show), unique])

}

function findCards(params, setCards, setLoading, setSelectedPage) {

    let [newParams, order, reverse, page, show, unique] = newValues(params)

    if(page===-1) page = 0

    const startingPage = Math.floor(((page)*show)/175) + 1

    // console.log([newParams, order, reverse, page, show, startingPage, unique], "LOT OF DATA")

    const newUrl = 'https://api.scryfall.com/cards/search?' +
        `page=${startingPage}&` +
        'order=' + order + reverse + newParams + '-is%3Afunny+-is:digital' +
        (unique===false ? '' : '&unique=prints')

    console.log(newUrl)

    try {
        setLoading(true);
    
        if (newUrl === '/') {
            axios.get("https://api.scryfall.com/cards/search?order=usd&dir=desc&q=-is%3Afunny+-is:digital")
                .then((response) => {
                    setCards(response.data)
                })
                .finally(() => {
                    setLoading(false)
                });
            return;
        }
    
        axios.get(newUrl)
            .then((response) => {
                let newCards = []
                let first = page * show
            
                while (first > 174) {
                    first -= 175;
                }
            
                newCards.push(...response.data.data.slice(first, first + show))
            
                if (first + show > 174 && response.data.next_page) {
                    
                    Promise.all([
                        axios.get(response.data.next_page),
                    ])

                    .then(([newResponse]) => {
                        newCards.push(...newResponse.data.data.slice(0, first + show - 175))
                        if(newCards.length < 1) throw new Error()
                        setCards({...response.data, data: [...newCards]})
                        console.log('DATA', response.data)
                    })

                    .catch(error => {
                        console.error("Error fetching next page:", error)
                    })
                } 

                else {
                    if(newCards.length < 1) throw new Error()
                    setCards({...response.data, data: [...newCards]})
                }
            })        
            .catch((error) => {
                try {
                    const updatedUrl = 'https://api.scryfall.com/cards/search?' + `page=1&` + 'order=' + order + reverse + newParams + '-is%3Afunny+-is:digital'
                    axios.get(updatedUrl)
                        .then((response) => {

                            setSelectedPage(1)

                            let newCards = []
                            let first = 0 * show
                        
                            while (first > 174) {
                                first -= 175;
                            }
                        
                            newCards.push(...response.data.data.slice(first, first + show))
                        
                            if (first + show > 174 && response.data.next_page) {

                                Promise.all([
                                    axios.get(response.data.next_page),
                                ])
                            
                                .then(([newResponse]) => {
                                    newCards.push(...newResponse.data.data.slice(0, first + show - 175))
                                    setCards({...response.data, data: [...newCards]})
                                    console.log('DATA', response.data)
                                })
                            
                                .catch(error => {
                                    console.error("Error fetching next page:", error)
                                })
                            } 
                        
                            else {
                                setCards({...response.data, data: [...newCards]})
                            }
                        })
                        .catch(error => {
                            setCards({data: []})
                        })
                }
                catch {
                    setCards({data: []})
                }
            })
            .finally(() => {
                setLoading(false)
            });
    } catch (error) {
        console.log(error);
    }
    
}

export default findCards;
