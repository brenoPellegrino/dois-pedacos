/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { DataTypes, Model, QueryInterface } from 'sequelize';
import IIngredients from '../../interfaces/ingredients/IIngredients';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IIngredients>>('ingredients', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },

    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('ingredients');
  },
};