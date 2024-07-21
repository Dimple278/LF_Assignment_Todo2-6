import { Knex } from "knex";

const TABLE_NAME = "tasks";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          title: "eat",
          user_id: 1,
          status_id: 1,
        },
        {
          title: "sleep",
          user_id: 2,
          status_id: 2,
        },
        {
          title: "code",
          user_id: 2,
          status_id: 3,
        },
        {
          title: "abc",
          user_id: 3,
          status_id: 1,
        },
        {
          title: "xyz",
          user_id: 3,
          status_id: 2,
        },
        {
          title: "pqr",
          user_id: 3,
          status_id: 2,
        },
      ]);
    });
}
