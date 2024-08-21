/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('sets', function (table) {
        table.increments('id'); // auto-incrementing primary key
        table.integer('setNumber').notNullable();
        table.integer('reps').notNullable();
        table.integer('weight').notNullable();
        table.integer('rest').notNullable();
        table.string('note', 255); // varchar equivalent
        table.integer('exercise_id').unsigned().notNullable(); // foreign key reference

        table.foreign('exercise_id').references('id').inTable('exercise').onDelete('CASCADE');
    });
};

export function down(knex) {
    return knex.schema.dropTable('sets');
};

