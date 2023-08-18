import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Ingredients from './pages/Ingredients';
import UpdateStock from './pages/UpdateSock';
import RegisterRecipes from './pages/RegisterRecipes';

export default function AppRoutes() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/ingredients' element={<Ingredients />}/>
      <Route path='/stock' element={<UpdateStock />}/>
      <Route path='/recipes' element={<RegisterRecipes />}/>
    </Routes>

    </BrowserRouter>
  )
}