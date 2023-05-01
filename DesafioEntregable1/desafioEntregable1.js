class ProductManager {
    constructor() {
        this.products = []
    }

    getProducts() {
        return this.products
    }

    addProducts(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error('Todos los parámetros son obligatorios')
            return
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
}

// Zona de pruebas

const nuevaInstancia = new ProductManager()

console.log(nuevaInstancia.getProducts())

nuevaInstancia.addProducts("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25)
nuevaInstancia.addProducts("producto prueba2", "este es un segundo producto prueba", 300, "sin imagen", "abc124", 30)
nuevaInstancia.addProducts("producto prueba3")
nuevaInstancia.addProducts("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25)

console.log(nuevaInstancia.getProducts())

nuevaInstancia.getProductsById(1)
nuevaInstancia.getProductsById(2)
nuevaInstancia.getProductsById(3)

