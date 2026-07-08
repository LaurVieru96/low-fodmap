import { Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import GuidePage from './pages/GuidePage'
import FoodsPage from './pages/FoodsPage'
import RecipesPage from './pages/RecipesPage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import MyRecipePage from './pages/MyRecipePage'
import FavoritesPage from './pages/FavoritesPage'
import ShoppingPage from './pages/ShoppingPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<GuidePage />} />
        <Route path="/alimente" element={<FoodsPage />} />
        <Route path="/retete" element={<RecipesPage />} />
        <Route path="/retete/:id" element={<RecipeDetailPage />} />
        <Route path="/reteta-mea" element={<MyRecipePage />} />
        <Route path="/favorite" element={<FavoritesPage />} />
        <Route path="/cumparaturi" element={<ShoppingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
