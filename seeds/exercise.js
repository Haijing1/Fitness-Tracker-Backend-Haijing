/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
import data from "../data/exercise.json" assert { type: "json" }

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('exercise').del()
  await knex('exercise').insert(
    data
  );
};
