import IIngredients from "../interfaces/ingredients/IIngredients";
import SequelizeIngredients from "../database/models/SequelizeIngredients";
import SequelizeStocks from "../database/models/SequelizeStocks";

export default class IngredientsModel {
  constructor(
    private sequelizeIgredients = SequelizeIngredients,
    private sequelizeStocks = SequelizeStocks
    ) {}

  public async registerIngredient(ingredientData: IIngredients): Promise<string> {
    try {
      let {name, quantity, mesure, price} = ingredientData
      if (!quantity || !price || !mesure) {
        throw new Error('failure');
      }
      const isRegistered = await this.sequelizeIgredients.findOne({ where: { name } });
      if (isRegistered) {
        return 'failure';
      }
      const ingredient = await this.sequelizeIgredients.create({ name, price });
      
      if(typeof quantity !== 'number' || quantity < 0) {
        quantity = 0;
      }

      await this.sequelizeStocks.create({ ingredientId: ingredient.dataValues.id, quantity, mesure })
    
      return 'success'
    } catch (error) {
      return 'failure'
    }
  }

  public async getAllIngredients(): Promise<IIngredients[]> {
    const dbData = await this.sequelizeIgredients.findAll();

    const response = dbData.map((data) => data.dataValues);
    
    return response;
  }

  public async getSotckIngredients(): Promise<IIngredients[]> {
    const dbData = await this.sequelizeIgredients.findAll({
      include: [
        {
          model: this.sequelizeStocks,
          as: 'stock',
          attributes: ['quantity', 'mesure'],
        }
      ],
    }
    );

    const response = dbData.map((data) => data.dataValues);
    
    return response;
  }

  public async updateIngredients(ingredientData: IIngredients[]): Promise<string> {
    try {
      await Promise.all(ingredientData.map(async(ingredient) => {
        const { id, stock, stockVariations } = ingredient;
          if(stock && stockVariations) {
            const newQuantity = stock[0].quantity as number + stockVariations;
            await this.sequelizeStocks.update({ quantity: newQuantity  }, { where: { ingredientId: id } });
            return 'success';
          }
        }));        
        return 'success';
    } catch (error) {
      return 'failure'
    }
  }

  public async editIngredient(ingredientData: IIngredients): Promise<string> {
    try {
      console.log(ingredientData);
        const { id, mesure, quantity, price } = ingredientData;
          if(mesure) {
            await this.sequelizeStocks.update({ quantity, mesure }, { where: { ingredientId: id } });
            await this.sequelizeIgredients.update({ price }, { where: { id } })
            console.log('deu certo')
            return 'success';
          }
          console.log("deu ruim")        
        throw new Error('failure');
    } catch (error) {
      return 'failure'
    }
  }
}