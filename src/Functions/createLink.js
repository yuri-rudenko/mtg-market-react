function createLink(url, addUrl, urlArr, navigate) {

    let link = ''

    const searchParams = new URLSearchParams(urlArr)
    const paramsIterator = searchParams.entries()
    const paramsArray = Array.from(paramsIterator)
    paramsArray.forEach(arr => {
        if(arr[0] !== 'order') {
            if(arr[1]) {
                link+=arr[1]
            }
        }
    })
    addUrl({link})
    navigate(`${link}`)
}

export default createLink;