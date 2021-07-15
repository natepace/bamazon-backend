const router = require('express').Router()
const Products = require('./products-model.js')
// const tokenBuilder = require('../middleware/tokenbuilder.js')
// const bcrypt = require('bcryptjs')
const {
    checkId,
    checkOwnerId,
} = require('./products-middleware.js')

router.get('/', (req, res, next) => {
    Products.getProducts()
        .then(products => {
            res.status(200).json(products)
        })
        .catch(next)
})

router.get('/:product_id', checkId, (req, res, next) => {
    console.log(req.params)
    const id = req.params.product_id
    Products.findProductById(id)
        .then(product => {
            res.status(200).json(product)
        })
        .catch(next)
})

router.get('/owner/:owner_id', checkOwnerId, (req, res, next) => {
    // console.log(req.params)
    // const id = req.params.owner_id
    Products.findOwner(req.params.owner_id)
        .then(owner => {
            res.status(200).json(owner)
        })
        .catch(next)
})

router.post('/newlisting/:owner_id', checkOwnerId, (req, res, next) => {
    const prod = req.body
    console.log(prod)
    Products.createProduct(prod)
        .then(product => {
            res.status(201).json(product)
        })
        .catch(next)
})

router.delete('/removelisting/:owner_id/:product_id', checkId, checkOwnerId, (req, res, next) => {
    const prodID = req.params.product_id
    const ownerID = req.params.owner_id
    Products.deleteProduct(prodID, ownerID)
        .then(count => {
            if (count > 0) {
                res.status(201).json({ message: `listing deleted successfully` })
            } else {
                res.status(404).json({ message: `the listing with the specified ID could not be found` })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
})

module.exports = router