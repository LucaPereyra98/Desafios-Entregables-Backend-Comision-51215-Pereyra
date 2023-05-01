const express = require('express')
const ProductManager = require('./productManager')
const nuevaInstancia = new ProductManager('../DesafioEntregable3/products.json')
const fs = require('fs')
const app = express()

app.use(express.urlencoded({extended:true}))

// Ruta a filtrado de productos por ID con un limite, si no hay limite entonces da el array completo
app.get('/products', (req, res) => {
    const limit = parseInt(req.query.limit)
    let products = nuevaInstancia.getProducts()
    if (!limit) {
        return res.send(products)
    } else {
        products = products.slice(0, limit)
        return res.send(products)
    }
})


// Ruta a filtrado de productos por querys
app.get('/products/:productId', (req, res) => {
    const products = nuevaInstancia.getProducts()
    const productsId = parseInt(req.params.productId)
    const product = products.find(product => product.id === productsId)
    if (!product) {
        const error = {error: 'Producto no encontrado'}
        return res.status(404).send(error)
    }
    res.send(product)
})


// Iniciar el servidor en puerto 8080
app.listen(8080, () => {
    console.log('Server corriendo en puerto 8080')
})

// Zona Testing

// Recibir en consola el array vacio
console.log(nuevaInstancia.getProducts())

//Sumar nuevo producto al array
nuevaInstancia.addProducts("manzana", "este es un producto prueba", 200, "sin imagen", "fruta1", 25) 
nuevaInstancia.addProducts("banana", "este es un segundo producto prueba", 200, "sin imagen", "fruta2", 25) 
nuevaInstancia.addProducts("pera", "este es un tercer producto prueba", 200, "sin imagen", "fruta3", 25) 
nuevaInstancia.addProducts("naranja", "este es un cuarto producto prueba", 200, "sin imagen", "fruta4", 25) 
nuevaInstancia.addProducts("sandia", "este es un quinto producto prueba", 200, "sin imagen", "fruta5", 25) 
nuevaInstancia.addProducts("melon", "este es un sexto producto prueba", 200, "sin imagen", "fruta6", 25) 
nuevaInstancia.addProducts("uva", "este es un septimo producto prueba", 200, "sin imagen", "fruta7", 25) 
nuevaInstancia.addProducts("pomelo", "este es un octavo producto prueba", 200, "sin imagen", "fruta8", 25) 
nuevaInstancia.addProducts("limon", "este es un noveno producto prueba", 200, "sin imagen", "fruta9", 25) 
nuevaInstancia.addProducts("cereza", "este es un decimo producto prueba", 200, "sin imagen", "fruta10", 25) 

// Recibir en consola el array vacio
console.log(nuevaInstancia.getProducts())