const express = require('express')
const productRouter = require('./routes/products.routes')
const cartsRouter = require('./routes/carts.routes')
const viewsRouter = require('./routes/views.routes')
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
app.use('/', viewsRouter)
app.use(morgan('dev'))
app.engine('handlebars', engine())
app.set('views', __dirname + '/views')
app.set('view engine', "handlebars")

app.listen(PORT, () => {
  console.log(`Servidor conectado en el puerto ${PORT}`)
  open(`http://localhost:${PORT}`)
})

