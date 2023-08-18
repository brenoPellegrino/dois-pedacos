import { FormEvent, useEffect, useState } from 'react';
import styles from './IngredientsRegitrationForm.module.css';
import axiosApi from '../../api';

export default function IngredientRegistrationForm() {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [mesure, setMesure] = useState<string>('kg');
  const [shouldLoad, setShouldLoad] = useState<boolean>(true);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = { name, price, quantity, mesure };
    axiosApi.post('/ingredients', data)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });

      window.location.reload();
  };

  useEffect(() => {
    if(shouldLoad) {
      setName('')
      setShouldLoad(false)
    }
  }, [shouldLoad])

  return (
    <form 
      onSubmit={handleSubmit}
      className={styles.form}
      >
      <div>
        <label htmlFor="name">Produto:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
      <button type="submit">Cadastrar</button>
    </form>
  )
}
