import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import RecipeBookPage from "./pages/RecipeBookPage";
import IngredientPage from "./pages/IngredientPage";
import ShoppingListPage from "./pages/ShoppingListPage";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="/books" index element={<RecipeBookPage />} />
          <Route path="/ingredients" element={<IngredientPage />} />
          <Route path="/lists" element={<ShoppingListPage />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
