import iIngredient from "./ingredient.interface";

export default interface IStockHandlerFormProps {
  isChecked: iIngredient[];
  editionHandler: (id: number, value: number) => void;
}