exports.seed = function (knex) {
    return knex('products').insert([
        {
            owner_id: 1,
            product_name: 'Ferbie Doll',
            price: 69.69,
            product_description: "Totally not haunted toy from the golden era of toys! Lightly used. Smell is normal.",
            product_type_id: 6,

        },
        {
            owner_id: 2,
            product_name: 'Broken phone',
            price: 5.00,
            product_description: "Can't even take pictures.",
            product_type_id: 2,

        }
    ])
}