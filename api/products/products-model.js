const db = require('../data/db-config.js');

function getProducts() {
    return db('products');
}

function findProductById(product_id) {
    return db('products').where({ product_id }).first()
}

function createProduct(product) {
    return db('products').insert(product)
}

function findOwner(owner_id) {
    return db('products')
        .select('product_id', 'product_name', 'owner_id')
        .where('owner_id', owner_id)
}

function updateProduct(product_id, owner_id) {
    return db('products')
        .where('product_id', product_id)
        .update('owner_id', owner_id)
}

function deleteProduct(product_id, owner_id) {
    return db('products')
        .select('owner_id', owner_id)
        .where('product_id', product_id)
        .del()
}

module.exports = {
    getProducts,
    findProductById,
    createProduct,
    findOwner,
    updateProduct,
    deleteProduct

}