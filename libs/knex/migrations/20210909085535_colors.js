
exports.up = function(knex) {
    return knex.schema.createTable('colors', function(table) {
        table.increments();
        table.date('date').defaultTo(knex.fn.now())
        table.string('color')
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('colors');
};
