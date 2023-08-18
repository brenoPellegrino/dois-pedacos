import { useEffect, useState } from 'react';
import iIngredient from '../../interfaces/ingredient.interface';
import api from '../../api/index';
import RecipeRegisterForm from '../../components/RecipeRegisterForm';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function RegisterRecipes() {
  const [stock, setStock] = useState<iIngredient[]>([])
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  const getStock = async () => {
    try {
      const response = await api.get('/ingredients');
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    if(isFirstLoad){
      getStock().then((response) => {
        setStock(response)
      } )
      setIsFirstLoad(false)
    }
  }, [isFirstLoad])
  return (
    <div>
      <Header />
      <RecipeRegisterForm stock={stock} />

      <Footer />

    </div>
  );
}

export default RegisterRecipes;
