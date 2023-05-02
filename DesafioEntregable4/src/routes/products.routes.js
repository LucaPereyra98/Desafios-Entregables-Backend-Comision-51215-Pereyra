const { Router } = require('express')
const ProductsManager = require('../managers/productsManager')
const products = new ProductsManager()
const path = 'products'
const router = Router()

router.get(`/${path}`, async (req, res) => {
  try {
    const resProducts = await products.getAllProducts()
    res.status(200).json(resProducts)
  } catch (error) {
    console.log(error)
  }
})
router.get(`/${path}/:id`, async (req, res) => {
  const { id } = req.params
  try {
    const resProducts = await products.getProductById(parseInt(id))
    res.status(200).json(resProducts)
  } catch (error) {
    console.log(error)
  }
})
router.post(`/${path}`, async (req, res) => {
  const body = req.body
  try {
    const resProducts = await products.addProduct(body)
    res.status(200).json(resProducts)
  } catch (error) {
    console.log(error)
  }
})
router.put(`/${path}/:id`, async (req, res) => {
  const { id } = req.params
  const body = req.body
  try {
    const resProducts = await products.updateProduct(parseInt(id), body)
    res.status(200).json(resProducts)
  } catch (error) {
    console.log(error)
  }
})
router.delete(`/${path}/:id`, async (req, res) => {
  const { id } = req.params
  try {
    const resProducts = await products.deleteProduct(parseInt(id))
    res.status(200).json(resProducts)
  } catch (error) {
    console.log(error)
  }
})
module.exports = router