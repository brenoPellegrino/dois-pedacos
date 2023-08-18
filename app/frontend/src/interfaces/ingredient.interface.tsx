export default interface Ingredient {
  id: number;
  name: string;
  checked: boolean;
  stock: {quantity: number, mesure: string}[]
  stockVariations: number;
  price: number;
}
