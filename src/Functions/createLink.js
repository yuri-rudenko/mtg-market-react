function createLink(url, addUrl, urlArr, navigate) {

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
    addUrl({link})
    navigate(`${link}`)
}

export default createLink;