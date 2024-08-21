/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('exercise', function (table) {
        table.increments('id'); // auto-incrementing primary key
        table.text('exercise').notNullable(); // exercise column with varchar(MAX) equivalent
        table.integer('date_id').unsigned().notNullable(); // foreign key reference to date_id

        table.foreign('date_id').references('id').inTable('date').onDelete('CASCADE');
    });
};

export function down(knex) {
    return knex.schema.dropTable('exercise');
};