/* eslint-disable max-lines-per-function */
import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert(
      'stocks',
      [
        {
          ingredient_id: 1,
          quantity: 1,
          mesure: 'kg',
        },
      ],
      { },
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('stocks', {});
  },
};


// ---------------> Exemple