import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'remixicon/fonts/remixicon.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ProductPage from './pages/ProductPage'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ShopPage from './pages/ShopPage.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/signup",
        element: <SignUpPage />
      },
      {
        path: "/checkout",
        element: <CheckoutPage />
      },
      {
        path: "/product/:productId",
        element: <ProductPage />
      },
      {
        path: "/category/:categoryId",
        element: <CategoryPage />
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
