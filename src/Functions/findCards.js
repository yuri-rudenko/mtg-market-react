import axios from "axios";
import { defaultCards } from "./defaultCards";
import { useNavigate } from "react-router-dom";

function replaceMana(str) {
    const newString = str.replace(/m<=/g, 'mv<=').replace(/m>=/g, 'mv>=')

    return newString
}

function findOrder(inputStr) {

    const str = replaceMana(inputStr)

    const findO = str.indexOf('o:')
    const findPlus = str.indexOf('+', findO)

    if(findO === -1) return [str, 'usd', '&dir=asc&q=']

    const found = str.slice(findO+2, findPlus)

    const order = found.slice(0, -1)
    const newParams = str.slice(0, findO) + str.slice(findPlus+1)

    const last = found.slice(-1)
    let rev = '&dir='
    last == 0? rev += `asc&q=`: rev+=`desc&q=`

    return([newParams, order, rev])

}

function findCards(params, setCards, setLoading) {

    const [newParams, order, reverse] = findOrder(params)

    const newUrl = 'https://api.scryfall.com/cards/search?order=' + order + reverse + newParams
    console.log(newUrl)

    try {
        setLoading(true);
    
        if (newUrl === '/') {
            axios.get("https://api.scryfall.com/cards/search?order=usd&q=e%3ARIX")
                .then((response) => {
                    setCards(response.data.data)
                })
                .finally(() => {
                    setLoading(false)
                });
            return;
        }
    
        axios.get(newUrl)
            .then((response) => {
                setCards(response.data.data)
                console.log('DATA', response.data)
            })
            .catch((error) => {
                axios.get("https://api.scryfall.com/cards/search?order=usd&q=e%3ARIX")
                    .then(response => setCards(response.data.data))
            })
            .finally(() => {
                setLoading(false)
            });
    } catch (error) {
        console.log(error);
    }
    
}

export default findCards;
