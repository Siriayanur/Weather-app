const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


//Define paths for hbs configuration
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))
app.get('', (req,res) => {
    // res.send('Hello Welcome')
    res.render('index',{
        title: 'Weather App',
        name : 'Siri Ayanur'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About ME',
        name:'Siri Ayanur'
    })
   
})

app.get('/help', (req,res) => {
    res.render('help',{
        helpText:'This is some helpful info.',
        title:"Help",
        name: "Siri Ayanur",
        copyright : "2020"
    })
})


app.get('/weather',(req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a location'
        })
    }
    geocode(req.query.address,(error, {latitude,longitude,location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                res.send({ error })
            }
    
            res.send({
                forecast: forecastData.weather,
                location,
                address: req.query.address
            })
        })
    })
})
app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error : 'Please do enter the search field'
        })
    }

    res.send({
        products: []
    })
})


app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Siri Ayanur',
        errorMessage :'Page doesnot exist'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

