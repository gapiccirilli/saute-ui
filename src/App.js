import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import IngredientPage from "./pages/IngredientPage";
import ShoppingListPage from "./pages/ShoppingListPage";
import './App.css';
import AppLayout from './pages/AppLayout';
import RecipeBookPage from './pages/RecipeBookPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="saute" element={<AppLayout />}>
          <Route index element={<Navigate replace to="books" />} />
          <Route path="books" element={<RecipeBookPage />} />
          <Route path="ingredients" element={<IngredientPage />} />
          <Route path="lists" element={<ShoppingListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
