/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
import data from "../data/date.json" assert { type: "json" }

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('date').del()
  await knex('date').insert(
    data
  );
};


