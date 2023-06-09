const express = require('express')
const productRouter = require('./routes/products.routes')
const cartsRouter = require('./routes/carts.routes')
const viewsRouter = require('./routes/views.routes')
const ProductsManager = require('./Managers/productsManager')
const products = new ProductsManager()

const open = require("open")
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const { Server } = require('socket.io')


const PORT = 8080
const app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', productRouter)
app.use('/api', cartsRouter)
app.use('/', viewsRouter)
app.use(morgan('dev'))
app.engine('handlebars', engine())
app.set('views', __dirname + '/views')
app.set('view engine', "handlebars")

const httpServer = app.listen(PORT, () => {
  console.log(`Server listening in ${PORT}`)
  open(`http://localhost:${PORT}`)
})

const io = new Server(httpServer)

io.on('connection', async (socket) => {
  console.log('New client connected')
  const resProducts = await products.getAllProducts()
  socket.emit('productList', resProducts)
})
