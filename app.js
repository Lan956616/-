const express = require('express')
const app = express()
const {engine} = require('express-handlebars')
const restaurants = require('./public/jsons/restaurant.json').results
const port = 3000
app.use(express.static('public'))
app.engine('.hbs', engine({extname:'.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')

app.get('/', (req,res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req,res) => {
  res.render('index', {restaurants})
})

app.get('/restaurants/:id', (req,res) => {
  const id = req.params.id
  const restaurant = restaurants.find(resta => resta.id.toString() === id)
  res.render('detail', {restaurant})
})

app.get('/search', (req,res) => {
  const keyword = req.query.keyword?.trim()
  const matchedRestaurants = keyword ? restaurants.filter((rt) =>
    Object.values(rt).some((property) => {
      if (typeof property === 'string') {
        return property.toLowerCase().includes(keyword.toLowerCase())
      }
      return false
    })
  ) : restaurants
  console.log("matchedRestaurants" ,matchedRestaurants)
  res.render('index', {restaurants : matchedRestaurants, keyword})
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
  
})