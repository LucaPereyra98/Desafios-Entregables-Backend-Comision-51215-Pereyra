const fs = require('fs')

class ProductManager {
    constructor(path) {
        this.path = path
        this.products = []
    }

    getPath() {
        return this.path
    }

    getProducts() {
        return this.products
    }

    addProducts(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error('Todos los parámetros son obligatorios')
        }

        const productVerificator = this.products.find( product => product.code === code)
        if (productVerificator) {
            console.log(`El producto ya fue incluido en la lista`)
            return
        }

        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: this.products.length + 1
        }

        this.products.push(newProduct)
        
        console.log(`El producto con codigo ${code} ha sido agregado con exito al array`)
    }

    getProductsById(id) {
        const searchProduct = this.products.find(product => product.id === id)
        if (searchProduct) {
            return console.log(searchProduct)
        } else {
            console.log(`No se encontro ningun producto con el ID ${id}`)
        }
    }

    updateProducts(id, property, value) {
        const productIndex = this.products.findIndex(product => product.id === id)
        if (productIndex === -1) {
            throw new Error (`No se encontro el producto con el id: ${id} para actualizar`)
        }
        this.products[productIndex][property] = value

        const productsJSON = JSON.stringify(this.products)
        fs.writeFile(this.path, productsJSON, (err) => {
            if (err) {
                throw new Error(`Error al escribir archivo: ${err}`)
            } else {
                console.log(`El producto con ID ${id} ha sido actualizado con exito`)
            }
        })
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id)
        if (index === -1) {
            console.log(`El producto con el id: ${id} que esta intentando borrar no existe.`)
            return
        }
        this.products.splice(index, 1)
        console.log(`El producto con el código ${id} ha sido eliminado.`)
        this.exportProductsToJSON(this.path)
    }

    exportProductsToJSON(fileName) {
        const productsJSON = JSON.stringify(this.products)
        const filePath = this.path
        fs.truncate(filePath, 0, () => {
            fs.writeFile(filePath, productsJSON, (err) => {
                if (err) {
                    throw new Error (`Error al escribir archivo: ${err}`)
                } else {
                    console.log(`Los productos se han agregado exitosamente al archivo ${fileName}`)
                }
            })
        })
    }
}


// Zona de pruebas:

// Nueva instancia
const nuevaInstancia = new ProductManager('../DesafioEntregable2/products.json')

// Recibir en consola el array vacio
console.log(nuevaInstancia.getProducts())

// Recibir en consola el path
console.log(nuevaInstancia.getPath())

//Sumar nuevo producto al array
nuevaInstancia.addProducts("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25) 
nuevaInstancia.addProducts("producto prueba2", "este es un segundo producto prueba", 300, "sin imagen", "abc124", 30)
nuevaInstancia.addProducts("producto prueba3", "este es un tercer producto prueba", 256, "sin imagen", "abc125", 35)

// Recibir en consola el array nuevo
console.log(nuevaInstancia.getProducts())

// Buscar el producto por el ID
nuevaInstancia.getProductsById(1) 
nuevaInstancia.getProductsById(2) 
nuevaInstancia.getProductsById(3)
nuevaInstancia.getProductsById(4)

// Editar un producto
nuevaInstancia.updateProducts(2, 'title', 'nuevo segundo titulo de producto prueba')

// Recibir en consola el array nuevo
console.log(nuevaInstancia.getProducts())

// Eliminar el producto del array
nuevaInstancia.deleteProduct(1)

// Error al eliminar el producto del array
nuevaInstancia.deleteProduct(4)

// Recibir en consola el array nuevo
console.log(nuevaInstancia.getProducts())