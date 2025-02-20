import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'remixicon/fonts/remixicon.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from './pages/HomePage.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { Provider } from "react-redux"
import store from "./store/store.js"
import SignUpPage from './pages/SignUpPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import AdminAuthLayout from "./components/AdminAuthLayout.jsx"
import AdminDashboardPage from './pages/AdminDashboardPage.jsx'
import AdminProductsMangementPage from './pages/AdminProductsMangementPage.jsx'
import ProductPage from './pages/ProductPage.jsx'

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
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/:id",
        element: <ProductPage />
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
        path: "/admin",
        element: (
          <AdminAuthLayout>
            <AdminPage />
          </AdminAuthLayout>
        ),
        children: [
          {
            path: "/admin/dashboard",
            element: (
              <AdminAuthLayout>
                <AdminDashboardPage />
              </AdminAuthLayout>
            )
          },
          {
            path: "/admin/manage",
            element: <AdminProductsMangementPage />
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
