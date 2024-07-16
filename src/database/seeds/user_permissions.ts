import { Knex } from "knex";

const TABLE_NAME = "user_permissions";

/**
 * Delete existing entries and seed values for table user_permissions.
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
          user_id: "3",
          permission_id: "1",
        },
      ]);
    });
}
