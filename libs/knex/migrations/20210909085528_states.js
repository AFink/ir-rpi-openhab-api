exports.up = function (knex) {
    return knex.schema.createTable('states', function (table) {
        table.increments();
        table.timestamp('on_timestamp').defaultTo(knex.fn.now())
        table.timestamp('off_timestamp').nullable()
        table.timestamps(false, true)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('states');
};