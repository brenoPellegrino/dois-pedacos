/* eslint-disable max-lines-per-function */
import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert(
      'ingredients',
      [
        {
          name: 'Chocolate Branco Melken ',
          price: 10
        },
      ],
      {},
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('ingredients', {});
  },
};


// ---------------> Exemple