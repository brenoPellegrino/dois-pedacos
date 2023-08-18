import { log } from "console";
import { ServiceResponse } from "../interfaces/ServiceResponse";
import IIngredients from "../interfaces/ingredients/IIngredients";
import { IngredientsModel } from "../models";

export default class IngredientsServices {
  constructor(
    private ingredientsModel = new IngredientsModel()
  ) {}

  public async registerIngredient(ingredientData: IIngredients): Promise<ServiceResponse<IIngredients[]>> {
    const ingredientslist = (await this.ingredientsModel.getAllIngredients()).map((ingredient) => ingredient.name)

    if (ingredientslist.includes(ingredientData.name)) {
      return {status: 'conflict', data: {message: 'product already registered'}}
    }
    const modelResponse = await this.ingredientsModel.registerIngredient(ingredientData)
    return { status: 'successful', data: [] }
  }

  public async getSotckIngredients(): Promise<ServiceResponse<IIngredients[]>> {
    const modelResponse = await this.ingredientsModel.getSotckIngredients()
    return { status: 'successful', data: modelResponse }
  }

  public async updateIngredients(ingredientData: IIngredients[]):  Promise<ServiceResponse<IIngredients[]>> {
    const modelResponse = await this.ingredientsModel.updateIngredients(ingredientData)
    return { status: 'successful', data: [] }
  }

  public async editIngredient(ingredientData: IIngredients):  Promise<ServiceResponse<IIngredients[]>> {
    const modelResponse = await this.ingredientsModel.editIngredient(ingredientData)
    return { status: 'successful', data: [] }
  }
}