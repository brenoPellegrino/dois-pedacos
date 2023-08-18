import IStock from "./IStock";

export default interface IIngredients {
  id: number,
  name: string,
  quantity?: number,
  mesure?: string,
  price?: number,
  stock?: IStock[],
  stockVariations?: number,
  
}