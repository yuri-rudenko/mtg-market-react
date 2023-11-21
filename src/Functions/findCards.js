import axios from "axios";
import { defaultCards } from "./defaultCards";
import { useNavigate } from "react-router-dom";

function findCards(url, urlArr, setCards, setLoading, navigate) {
    let newUrl = url;

    for (let el in urlArr) {
        if (urlArr[el]) {
            if (newUrl[newUrl.length - 1] !== "+") {
                newUrl += "&q=";
            }
            newUrl += urlArr[el];
        }
    }

    console.log(newUrl)

    let link = ''

    const searchParams = new URLSearchParams(urlArr)
    const paramsIterator = searchParams.entries()
    const paramsArray = Array.from(paramsIterator)
    paramsArray.forEach(arr => {
        if(arr[1]) {
            link+=arr[1]
        }
    })
    navigate(`mtg-market-react/shop/${link}`)

    try {
        setLoading(true);
    
        if (newUrl === url) {
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
