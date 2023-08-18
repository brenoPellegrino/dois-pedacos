/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { DataTypes, Model, QueryInterface } from 'sequelize';
import IQuantity from '../../interfaces/ingredients/IQuantity';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IQuantity>>('stocks', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ingredientId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'ingredients',
          key: 'id',
        },
        field: 'ingredient_id',
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mesure: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      

    },);
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('stocks');
  },
};