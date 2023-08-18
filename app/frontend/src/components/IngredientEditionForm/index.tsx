import { FormEvent, useEffect, useState } from 'react';
import IngredientEditionFormProps from '../../interfaces/IngredientEditionFormProps';
import styles from './IngredientsEditionForm.module.css';
import axiosApi from '../../api';

export default function IngredientEditionForm({ stock }: IngredientEditionFormProps) {
  const [name, setName] = useState<string>('')
  const [mesure, setMesure] = useState<string>('kg')
  const [price, setPrice] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(0)
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)

  const ingredientList: string[] = stock.map((element) => element.name);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const foundIngredient = stock.find(element => element.name === name)

    if(!foundIngredient) throw new Error('Ingrediente não encontrado')

    const id = foundIngredient.id;

    const data = { id, price, quantity, mesure };
    axiosApi.patch(`/ingredients/${id}`, data)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    window.location.reload();
    
  };

  useEffect(() => {
    if(isFirstLoad){
      setName(ingredientList[0])
      setIsFirstLoad(false);
    }

    const foundIngredient = stock.find(element => element.name === name)

    if(foundIngredient){
      setMesure(foundIngredient?.stock[0].mesure)
      setPrice(foundIngredient.price)
      setQuantity(foundIngredient?.stock[0].quantity)
    }


  }, [ingredientList, isFirstLoad, name, stock])

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="produto">Produto:</label>
        <select 
          id="produto" 
          name="produto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          >
            {
              ingredientList.map((element) => <option value={element} key={ element }>{ element }</option>)
            }
        </select>
      </div>
      <div>
        <label htmlFor="quantity">Quantidade:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="unidade">Unidade:</label>
        <select 
          id="unidade" 
          name="unidade"
          value={mesure}
          onChange={(e) => setMesure(e.target.value)}
          >
          <option value="ml">Mililitros</option>
          <option value="l">Litros</option>
          <option value="g">Gramas</option>
          <option value="kg">Quilogramas</option>
        </select>
      </div>
      <div>
        <label htmlFor="price">Preço:</label>
        <input
          type='number'
          id="price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>
      <button type="submit">Editar</button>
    </form>
  )
}
