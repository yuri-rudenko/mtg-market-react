export function checkBadSets(set) {
    const badTypes = ['alchemy', 'masterpiece', 'treasure_chest ', 'funny', 'promo', 'token', 'memorabilia', 'minigame',]

    const date = new Date()
    if(new Date(set.released_at) > date) return false

    if(set.digital == true) return false
    if(set.digital || set.card_count < 20) return false
    for(let type of badTypes) {
        if(set.set_type === type) return false
    }

    return true
}