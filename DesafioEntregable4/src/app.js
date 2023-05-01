const express = require('express')
const productRouter = require('./routes/products.routes')
const cartsRouter = require('./routes/carts.routes')
const open = require("open")
const morgan = require('morgan')
const { engine } = require('express-handlebars')

const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`))
app.use('/api', productRouter)
app.use('/api', cartsRouter)
app.use(morgan('dev'))
app.engine('handlebars', engine())
app.set('views', __dirname + '/views')
app.set('view engine', "handlebars")

app.listen(PORT, () => {
  console.log(`Servidor conectado en el puerto ${PORT}`)
  open(`http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
  const users = [
    {name: "Luca", lastName: "Pereyra", age: 25, email: "example1@example.com", phoneNumber: 1122334455},
    {name: "Tomas", lastName: "Pereyra", age: 23, email: "example2@example.com", phoneNumber: 1122334455},
    {name: "Maia", lastName: "Pereyra", age: 5, email: "example3@example.com", phoneNumber: 1122334455},
    {name: "Noah", lastName: "Pereyra", age: 5, email: "example4@example.com", phoneNumber: 1122334455},
    {name: "Tito", lastName: "Pereyra", age: 58, email: "example5@example.com", phoneNumber: 1122334455}
  ]
  res.render('index', users[Math.floor(Math.random()*5)])
} )