import axios from "axios";

export async function defaultCards() {
    try {
        let cards = []
        let response = await axios.get('https://api.scryfall.com/cards/search?order=usd&dir=desc&q=-is%3Afunny+-is:digital')
        let data = response.data
        cards = data.data.splice(0, 24)
        data.data = cards
        
        // while (data.has_more) {
        //     response = await axios.get(data.next_page)
        //     data.data = data.data.concat(response.data.data)
        //     data.has_more = response.data.has_more
        //     cards = [...cards, ...data.data]
        // }

        return data
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error
    }
}
