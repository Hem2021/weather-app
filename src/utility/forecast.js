const request = require('request');
forecast = (data, callback)=>{
    const forecast_url = 'http://api.weatherapi.com/v1/current.json?key=6850a7e612e1495496c174209230601&q='+data.lat+','+data.long+'&aqi=yes';
    request({url : forecast_url, json : true},(error, response)=>{
        if(error!= undefined && error!=1006) callback("Internet issue", undefined);
        else if(error ==1006) callback("No matching location found", undefined)
        else{
            details = {
                // temp_c : response.body.current.temp_c,
                // lat : response.body.location.lat,
                // long : response.body.location.lon,
                // local_time : response.body.location.localtime,
                // last_updated : response.body.current.last_updated,
                // detail : response.body.current.condition.text,
                report : response.body.current.condition.text + ',' + response.body.current.temp_c + 'deg C and it feels like ' + response.body.current.feelslike_c + 'deg C',
                label : data.label

            }
            callback(undefined, details);
        }
    })

}

module.exports = forecast;