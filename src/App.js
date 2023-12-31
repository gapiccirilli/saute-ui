import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import IngredientPage from "./pages/IngredientPage";
import ShoppingListPage from "./pages/ShoppingListPage";
import AppLayout from './pages/AppLayout';
import RecipeBookPage from './pages/RecipeBookPage';
import RecipePage from './pages/RecipePage';
import SingleRecipePage from './pages/SingleRecipePage';
import Settings from "./pages/Settings";
import PageNotFound from "./pages/PageNotFound";
import './App.css';
import SingleShoppingListPage from './pages/SingleShoppingListPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="saute" element={<AppLayout />}>
          <Route index element={<Navigate replace to="books" />} />
          <Route path="books" element={<RecipeBookPage />} />
          <Route path="books/:bookId" element={<RecipePage />} />
          <Route path="books/:bookId/recipes/:recipeId" element={<SingleRecipePage />} />
          <Route path="ingredients" element={<IngredientPage />} />
          <Route path="lists" element={<ShoppingListPage />} />
          <Route path="lists/:listId" element={<SingleShoppingListPage />} />
        </Route>
        {/* <Route path="settings" element={<Settings />} /> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
