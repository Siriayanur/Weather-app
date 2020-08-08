const request  = require('postman-request')

const forecast = (latitude,longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=cdbb06b2937ce3c05a74cbcdf6066c7d&query='+latitude+','+longitude+'&units=m'
    request({url,json:true},(error,{body}) => {
        if(error){
            callback('Unable to fetch data. Check Connectivity',undefined)
        } else if(body.error) {
            callback("Parameters aren't correct. Check longitude and latitude",undefined)
        } else {
            callback(undefined,
                // { weather : body.current.weather_descriptions[0],
                //     temperature:body.current.temperature,
                //     feelslike:body.current.feelslike }
                    body.current.weather_descriptions[0] + ". It is currently "+
                body.current.temperature + " degrees out. It feels like "+
                body.current.feelslike + " degrees out. The humidity is " +
                body.current.humidity+ "%."
                )
        }
    })
}
module.exports = forecast;
