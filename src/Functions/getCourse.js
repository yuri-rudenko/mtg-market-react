import axios from "axios"

function getCourse() {

        try {
            let course = axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/dollar_info?json').data[0].rate
            console.log(course, '1111111111')
            return course
        }
        
        catch(error) {
            console.error('Error fetching data:', error)
            return 38
        }
    
}

export default getCourse