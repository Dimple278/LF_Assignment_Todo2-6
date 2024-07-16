import { Knex } from "knex";

const TABLE_NAME = "users";

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
          name: "user seed",
          email: "userSeed@gmail.com",
          password: "seedpassword@123",
        },
        // {
        //   colName: 'rowValue',
        //   colName2: 'rowValue'
        // }
      ]);
    });
}
