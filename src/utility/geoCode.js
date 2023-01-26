const request = require('request');
const geocode = (address, callback)=>{
    const url_geocoding = 'http://api.positionstack.com/v1/forward?access_key=60bf13501a28c3002ea316f82ed95f40&query='+encodeURIComponent(address)+'&limit=1';
    request({url: url_geocoding, json:true}, (error, response)=>{
        if(error) callback('no internet', undefined);
        else if(response.body.data.length == 0) callback('Be specific to your search term!', undefined); //seems like length <3 is not defined so any query character less than 3 will result in .length not defined 
        else{
            data = response.body.data[0];
            details ={
                lat : data.latitude,
                long : data.longitude,
                label : data.label
            }
            callback(undefined, details);
        }
    })
} 
module.exports = geocode