import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import api from "../../api"
import IngredientRegistrationForm from "../../components/IngredientRegistrationForm";
import Ingredient from "../../interfaces/ingredient.interface";
import IngredientEditionForm from "../../components/IngredientEditionForm";

function Ingredients () {
  const [stock, setStock] = useState<Ingredient[]>([]);
  const [edtionMode, setEditionMode] = useState<boolean>(false)
  const [isFirstLoad, setIsFirstLoad] = useState(true)

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
    if (isFirstLoad) {
      getStock().then(apiResponse => {
        setStock(apiResponse);
      }).finally(() => {
        setIsFirstLoad(false);
      });
    }
  }, [isFirstLoad]);

  return (
    <>
      <Header />
      <button onClick={() => setEditionMode(!edtionMode)}>
        {edtionMode ? 'Edição' : 'Cadastro'}
      </button>
      {edtionMode ? <IngredientEditionForm stock={stock} />: <IngredientRegistrationForm />}
      <button onClick={() => console.log(stock)}>Estoque</button>
      <Footer/>
    </>
  );
}

export default Ingredients;
