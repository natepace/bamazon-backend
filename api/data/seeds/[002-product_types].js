exports.seed = function (knex) {
    return knex('product_types').insert([
        // { product_type: "wires and cables" },
        { product_type: "phones" },
        { product_type: "computers" },
        // { product_type: "printers" },
        // { product_type: "radios" },
        { product_type: "toys" },
        { product_type: "kitchen appliances" },
        { product_type: "gaming consoles" }
    ]);
}