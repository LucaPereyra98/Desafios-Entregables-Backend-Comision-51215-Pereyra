const fs = require('fs')
const path = require("path")
const ProductsManager = require('./productsManager')

class CartManager {
  productsManager = new ProductsManager()
  constructor() {
    this.path = path.join(__dirname, "./data/carts.json")
  }
  async getAllCarts() {
    const cartsJson = await fs.promises.readFile(this.path, 'utf-8')
    if (!cartsJson.trim()) {
      return []
    }
    const cartsParse = JSON.parse(cartsJson)
    return cartsParse
  }
  async getCartById(id) {
    const carts = await this.getAllCarts()
    const cart = carts.find((cart) => cart.id === id)
    if (!cart) return 'No se encontró ningún cart'
    return cart
  }
  async createCart() {
    const carts = await this.getAllCarts()
    console.log(carts)
    const newCart = {
      id: Date.now(),
      products: [],
    }
    carts.push(newCart)
    await fs.promises.writeFile(this.path, JSON.stringify(carts))
    return carts
  }
  async addProductToCart(idCart, idProduct) {
    const carts = await this.getAllCarts()
    const product = await this.productsManager.getProductById(idProduct)
    const cartIndex = carts.findIndex(cart => cart.id === idCart)
    if (cartIndex === -1) return `No se encontró el cart buscado con el id ${id}`
    carts[cartIndex].products.push(product)
    await fs.promises.writeFile(this.path, JSON.stringify(carts))
    return carts
  }
  async deleteCart(id) {
    const carts = await this.getAllCarts()
    const cart = carts.find((cart) => cart.id === id)
    if (!cart) return `No se encontró el carrito buscado con el id ${id}`
    const cartFilter = carts.filter((cart) => cart.id !== id)
    await fs.promises.writeFile(this.path, JSON.stringify(cartFilter))
    return cartFilter
  }
}
module.exports = CartManager