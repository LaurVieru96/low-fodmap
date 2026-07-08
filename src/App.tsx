import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { APP_NAME } from './lib/constants'
import { ThemeProvider } from './store/theme'
import { FavoritesProvider } from './store/favorites'
import { UserRecipesProvider } from './store/userRecipes'
import { ShoppingProvider } from './store/shopping'
import { ProfileProvider } from './store/profile'
import { ReintroProvider } from './store/reintro'
import AppLayout from './components/layout/AppLayout'
import GuidePage from './pages/GuidePage'
import FoodsPage from './pages/FoodsPage'
import RecipesPage from './pages/RecipesPage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import MyRecipePage from './pages/MyRecipePage'
import FavoritesPage from './pages/FavoritesPage'
import ShoppingPage from './pages/ShoppingPage'
import RecomandariPage from './pages/RecomandariPage'
import JurnalPage from './pages/JurnalPage'
import NotFoundPage from './pages/NotFoundPage'

const PAGE_TITLES: Record<string, string> = {
  '/': `${APP_NAME} — ghid low-FODMAP`,
  '/alimente': `Alimente · ${APP_NAME}`,
  '/retete': `Rețete · ${APP_NAME}`,
  '/reteta-mea': `Rețeta mea · ${APP_NAME}`,
  '/favorite': `Favorite · ${APP_NAME}`,
  '/cumparaturi': `Cumpărături · ${APP_NAME}`,
  '/recomandari': `Recomandări · ${APP_NAME}`,
  '/jurnal': `Jurnal · ${APP_NAME}`,
}

/** Resets scroll and sets the document title on every route change. */
function RouteMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title =
      PAGE_TITLES[pathname] ??
      (pathname.startsWith('/retete/') ? `Rețetă · ${APP_NAME}` : `${APP_NAME} — ghid low-FODMAP`)
  }, [pathname])
  return null
}

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <UserRecipesProvider>
          <ShoppingProvider>
            <ProfileProvider>
              <ReintroProvider>
                <RouteMeta />
                <Routes>
                  <Route element={<AppLayout />}>
                    <Route path="/" element={<GuidePage />} />
                    <Route path="/alimente" element={<FoodsPage />} />
                    <Route path="/retete" element={<RecipesPage />} />
                    <Route path="/retete/:id" element={<RecipeDetailPage />} />
                    <Route path="/reteta-mea" element={<MyRecipePage />} />
                    <Route path="/favorite" element={<FavoritesPage />} />
                    <Route path="/cumparaturi" element={<ShoppingPage />} />
                    <Route path="/recomandari" element={<RecomandariPage />} />
                    <Route path="/jurnal" element={<JurnalPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>
                </Routes>
              </ReintroProvider>
            </ProfileProvider>
          </ShoppingProvider>
        </UserRecipesProvider>
      </FavoritesProvider>
    </ThemeProvider>
  )
}

export default App
