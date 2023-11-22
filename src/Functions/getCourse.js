import axios from "axios"

function getCourse() {
    let course = 36

    async function getCourse() {

        try {
            course = (await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/dollar_info?json')).data[0].rate
            console.log(course)
        }
        
        catch(error) {
          console.error('Error fetching data:', error)
        }
    }

    getCourse()
    return course
}

export default getCourse