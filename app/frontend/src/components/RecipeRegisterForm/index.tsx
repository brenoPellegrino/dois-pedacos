import { FormEvent, useEffect, useState } from 'react';
import RecipesRegisterFormProps from '../../interfaces/IngredientEditionFormProps';
import axiosApi from '../../api';

export default function RecipeRegisterForm({ stock }: RecipesRegisterFormProps) {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [recipeName, setRecipeName] = useState('');
  const [numberOfIngredients, setNumberOfIngredients] = useState<number>(1);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<number[]>([]);

  const ingredientOptions = stock.map((ingredient) => ingredient.name);

  useEffect(() => {
    if (isFirstLoad && stock) {
      setIsFirstLoad(false);
    }
  }, [isFirstLoad, stock]);

  const handleAddNumber = () => {
    if (numberOfIngredients < stock.length) {
      setNumberOfIngredients(numberOfIngredients + 1);
    }
  };

  const handleIngredientChange = (index: number, selectedIngredient: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = selectedIngredient;
    setIngredients(updatedIngredients);
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = newQuantity;
    setQuantities(updatedQuantities);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!recipeName) throw new Error('Nome da receita não pode ser vazio');

    const ingredientData = {
      recipeName,
      ingredients,
      quantities,
    }
    
    axiosApi.post('/recipes', ingredientData)
      .then(response => {
        console.log(response.data);
      }
      )
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <p>Insira o nome de sua receita</p>
          <input
            type="text"
            placeholder="Nome da receita"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
          />
        </div>
        <div>
          <p>Insira os ingredientes de sua receita</p>
          {[...Array(numberOfIngredients)].map((_, index) => (
            <div key={index}>
              <select
                id={`ingredient-${index}`}
                name={`ingredient-${index}`}
                value={ingredients[index] || ''}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
              >
                <option value="" disabled>
                  Selecione um ingrediente
                </option>
                {ingredientOptions.map((element) => (
                  <option key={element} value={element}>
                    {element}
                  </option>
                ))}
              </select>
              <label htmlFor={`quantity-${index}`}>Quantidade:</label>
              <input
                id={`quantity-${index}`}
                name={`quantity-${index}`}
                type="number"
                value={quantities[index] || ''}
                onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
              />
            </div>
          ))}
          <button type="button" onClick={handleAddNumber}>
            Adicionar Ingrediente
          </button>
        </div>
        <button type="submit">Registrar Receita</button>
      </form>
    </div>
  );
}
