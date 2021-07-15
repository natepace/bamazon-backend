
exports.up = function (knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments('user_id')
            tbl.string('username').notNullable().unique()
            tbl.string('name').notNullable()
            tbl.string('email_address').notNullable().unique()
            tbl.string('phone_number').notNullable().unique()
            tbl.string('address_line').notNullable()
            tbl.string('address_state').notNullable()
            tbl.string('address_city').notNullable()
            tbl.integer('zip_code').notNullable()
            tbl.string('password').notNullable()
        })
        .createTable('product_types', tbl => {
            tbl.increments('product_type_id')
            tbl.string('product_type').notNullable()
        })
        .createTable('products', tbl => {
            tbl.increments('product_id')
            tbl.integer('owner_id')
                .unsigned()
                .notNullable()
                .references('user_id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            tbl.string('product_name').notNullable()
            tbl.double('price').notNullable()
            tbl.text('product_description', 'mediumtext')
            tbl.integer('product_type_id')
                .unsigned()
                .notNullable()
                .references('product_type_id')
                .inTable('product_types')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')


        })
        .createTable('product_sales', tbl => {
            tbl.increments('product_sale_id')
            tbl.integer('product_id')
                .unsigned()
                .notNullable()
                .references('product_id')
                .inTable('products')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            tbl.integer('purchaser')
                .unsigned()
                .notNullable()
                .references('user_id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')

        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('product_sales')
        .dropTableIfExists('products')
        .dropTableIfExists('product_types')
        .dropTableIfExists('users')
};
