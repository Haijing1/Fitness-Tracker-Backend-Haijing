/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
import data from "../data/sets.json" assert { type: "json" }

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('sets').del()
  await knex('sets').insert(
    data
  );
};
