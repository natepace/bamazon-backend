const Products = require('./products-model.js');


const checkId = (req, res, next) => {
    const id = req.params.product_id
    Products.findProductById(id)
        .then(product => {
            if (!product) {
                res.status(404).json({
                    message: "Product not found"
                })
            } else {
                next()
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
}

const checkOwnerId = (req, res, next) => {
    const id = req.params.owner_id
    Products.findOwner(id)
        .then(owner => {
            if (!owner) {
                res.status(404).json({
                    message: "Lister not found"
                })
            } else {
                next()
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
}

module.exports = {
    checkId,
    checkOwnerId,
}