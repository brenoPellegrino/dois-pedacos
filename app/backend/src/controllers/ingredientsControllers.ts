import mapStatusHTTP from "../helpers/mapStatusHTTP";
import { IngredientsServices } from "../services";
import { Request, Response } from 'express';

export default class IngredientsControllers {
  constructor (
    private ingredientsService = new IngredientsServices()
  ) {}

  public async registerIngredient(req: Request, res: Response) {
    const ingredientData = req.body;
    const { status, data } = await this.ingredientsService.registerIngredient(ingredientData);

    if (status !== 'successful') return res.status(mapStatusHTTP(status)).json(data);

    return res.status(200).json(data);
  }

  public async getSotckIngredients(_req: Request, res: Response) {
    const { status, data } = await this.ingredientsService.getSotckIngredients();

    if (status !== 'successful') return res.status(mapStatusHTTP(status)).json(data);

    return res.status(200).json(data);
  }

  public async updateIngredients(req: Request, res: Response) {
    const ingredientData = req.body;
    const { status, data } = await this.ingredientsService.updateIngredients( ingredientData);

    if (status !== 'successful') return res.status(mapStatusHTTP(status)).json(data);

    return res.status(200).json(data);
  }

  public async editIngredient(req: Request, res: Response) {
    const ingredientData = req.body;
    const { status, data } = await this.ingredientsService.editIngredient( ingredientData);

    if (status !== 'successful') return res.status(mapStatusHTTP(status)).json(data);

    return res.status(200).json(data);
  }
}