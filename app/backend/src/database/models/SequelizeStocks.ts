/* eslint-disable max-lines */
import {
  CreationOptional,
  DataTypes, InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import db from '.';
import SequelizeIngredients from './SequelizeIngredients';

class SequelizeStocks extends Model<InferAttributes<SequelizeStocks>,
InferCreationAttributes<SequelizeStocks>> {
  declare id: CreationOptional<number>;
  declare ingredientId: CreationOptional<number>;
  declare quantity: number
  declare mesure: string

}

SequelizeStocks.init({
  id: {
    type: DataTypes.NUMBER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  ingredientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ingredients',
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  mesure: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
}, {
  sequelize: db,
  modelName: 'stocks',
  timestamps: false,
  underscored: true,
});

SequelizeStocks.belongsTo(SequelizeIngredients, { foreignKey: 'id', as: 'stock' });
SequelizeIngredients.hasMany(SequelizeStocks, { foreignKey: 'id', as: 'stock' });

export default SequelizeStocks;
