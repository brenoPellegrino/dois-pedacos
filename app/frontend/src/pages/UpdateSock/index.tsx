import { useEffect, useState } from 'react';
import iIngredient from '../../interfaces/ingredient.interface';
import api from '../../api/index';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import IngredientsSearchForm from '../../components/IngredientsSearchForm';
import IgredientSearchResults from '../../components/IgredientSearchResults';
import StockHandle from '../../components/StockHandle';

function UpdateStock() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [ingredientslist, setIngredientlist] = useState<iIngredient[]>([]);
  const [searchResults, setSearchResults] = useState<iIngredient[]>(ingredientslist);
  const [isChecked, setIsChecked] = useState<iIngredient[]>([]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [editionMode, setEditionMode] = useState<iIngredient[]>([]);

  useEffect(() => {
    if (isFirstRender) {
      api.get('/ingredients')
        .then(response => {
          const initialIngredients: iIngredient[] = response.data.map((ingredient: iIngredient) => ({
            ...ingredient,
            checked: false,
          }));
          setIngredientlist(initialIngredients);
          setSearchResults(initialIngredients);
          setIsFirstRender(false);
        });
    } else {
      setIsChecked(ingredientslist.filter(ingredient => ingredient.checked));
    }
  }, [isFirstRender, ingredientslist]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);

    const filteredResults = ingredientslist.filter(
      ingredient => ingredient.name.toLowerCase().includes(term.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  const handleIngredientCheck = (id: number) => {
    const updatedIngredients = ingredientslist.map(ingredient => {
      if (ingredient.id === id) {
        return {
          ...ingredient,
          checked: !ingredient.checked,
        };
      }
      return ingredient;
    });

    setIngredientlist(updatedIngredients);
    setSearchResults(updatedIngredients.filter(ingredient => ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())));

    const checkedIngredientsList = ingredientslist.filter(ingredient => ingredient.checked);

    setIsChecked(checkedIngredientsList);
  };

  const editionHandler = (id: number, value: number) => {
    const updatedIngredient = editionMode.map(item => {
      if (item.id === id) {
        return { ...item, stockVariations: value };
      }
      return item;
    });

    const updatedIngredients = [{ ...ingredientslist.find(ingredient => ingredient.id === id), stockVariations: value }, ...editionMode.filter(item => item.id !== id)];

    if (updatedIngredient) {
      setEditionMode(updatedIngredients as iIngredient[]);
    }
  };

  const updateDB = () => {
    const itensToUpdate = editionMode.filter(item => item.stockVariations);
    api.patch('/ingredients', itensToUpdate)
    alert('Estoque atualizado com sucesso!');
    setIsFirstRender(true);
  }

  return (
    <div>
      <Header />
      <div className="App">
        <h1>Formulário de Pesquisa de Ingredientes</h1>
        <IngredientsSearchForm searchTerm={searchTerm} handleSearch={handleSearch} />

        <div>
          <h2>Resultados da Pesquisa:</h2>
          <IgredientSearchResults searchResults={searchResults} handleIngredientCheck={handleIngredientCheck} />
        </div>
        <StockHandle isChecked={isChecked} editionHandler={editionHandler} />
        <button
          onClick={updateDB}
        >
          Confirma alterações
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default UpdateStock;
