import { Routes, Route } from 'react-router-dom'
import { FavoritesProvider } from './store/favorites'
import { UserRecipesProvider } from './store/userRecipes'
import { ShoppingProvider } from './store/shopping'
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
    <FavoritesProvider>
      <UserRecipesProvider>
        <ShoppingProvider>
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
        </ShoppingProvider>
      </UserRecipesProvider>
    </FavoritesProvider>
  )
}

export default App
