const { Router } = require('express')
const ProductsManager = require('../managers/productsManager')
const products = new ProductsManager()
const path = 'realtimeproducts'
const router = Router()


router.get('/', async (req, res) => {
    try {
        const resProducts = await products.getAllProducts()
        res.render('home', {resProducts})
    } catch (error) {
        console.log(error)
    }
})

router.get(`/${path}`, async (req, res) => {
    try {
        res.render(`${path}`, {})
    } catch (error){
        console.log(error)
    }
})

module.exports = router