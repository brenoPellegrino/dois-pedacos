import { useState } from "react";

export default function IngredientSelects(ingredientOptions: string[]) {
  
  const [numberOfIngredients, setNumberOfIngredients] = useState<number>(1);

  const ingredientSelects = [];
  for (let i = 0; i < numberOfIngredients; i++) {
    ingredientSelects.push(
      <select key={i}>
        {ingredientOptions.map((ingredient, index) => (
          <option key={index} value={ingredient}>
            {ingredient}
          </option>
        ))}
      </select>
    );
  }

  return (
    <div>{ingredientSelects}</div>
  )
}
