import iIngredient from "./ingredient.interface";

export default interface IIgredientsSearchResultsProps {
  searchResults: iIngredient[];
  handleIngredientCheck: (term: number) => void;
}