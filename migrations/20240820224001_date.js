/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('date', function (table) {
        table.increments('id'); // auto-incrementing primary key
        table.timestamp('time_stamp').defaultTo(knex.fn.now()).notNullable(); // auto-incrementing timestamp
        table.string('date', 255).notNullable(); // date column with varchar equivalent
    });
};

export function down(knex) {
    return knex.schema.dropTable('date');
};