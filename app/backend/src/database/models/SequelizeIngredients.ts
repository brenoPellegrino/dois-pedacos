/* eslint-disable max-lines */
import {
  CreationOptional,
  DataTypes, InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import db from '.';

class SequelizeIngredients extends Model<InferAttributes<SequelizeIngredients>,
InferCreationAttributes<SequelizeIngredients>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare price: number;

}

SequelizeIngredients.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  
}, {
  sequelize: db,
  modelName: 'ingredients',
  timestamps: false,
  underscored: true,
});

export default SequelizeIngredients;
