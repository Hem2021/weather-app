const path = require('path')  //core node js module
const express = require('express')
const process = require('process')
const hbs = require('hbs')
const geocode = require('./utility/geoCode')
const forecast = require('./utility/forecast')
const app = express()

const newPath = path.join(__dirname, '../Public')  //merges "src" and "Public" directory in one normalized directory
const viewaddress = path.join(__dirname, '../templates/views')
const partialaddress = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')    //to set hbs as view engine 

app.set('views', viewaddress);  //sets views folder to look for template engine in view address
hbs.registerPartials(partialaddress);


// console.log(__dirname)   //immediate directory of current file
// console.log(__filename)   //root se lekar current file tak ka path


app.use(express.static(newPath))  //express.static() to serve static page & app.use allows to use all the files and folders inside Public. localhost://3000/css or /js or panda.jpeg etc all routers are available

// app.get('/about', (req, res)=>{       //localhost://3000/about will receive "This is  about page message"

//     res.send('This is about page'); 
// })


app.get('', (req, res)=>{
    res.render('index', {
        title: ' Weather Home Page',
        content:'Input the address for the weather details'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send('Address query required')
    } else {
        const loc = req.query.address;
        geocode(loc, (error, loc_data) => {
            if (error != undefined) res.send({error});
            else {
                forecast(loc_data, (error, forecast_data) => {
                    if (error != undefined) {
                        res.send({error})
                    } else {
                        // res.write(JSON.stringify(loc_data))
                        // res.write(JSON.stringify(forecast_data))
                        // res.end();
                        res.send(forecast_data);
                    }
                })
            }

        })
    }
})



app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        content: 'This is inside content Page'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help page",
        content: "This is Help page!"
    })
})

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        title: "Not available",
        content: 'Page not found in Help page'
    })
})

app.get('*', (req, res) => {
    res.render('notFound', {
        title: "Not Available",
        content: '404 Page Not Found'
    })
})



app.listen(3000, () => {
    console.log('ONLINE');
})