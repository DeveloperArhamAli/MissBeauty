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
import PaymentPage from './pages/PaymentPage.jsx'
import OrderSuccessPage from './pages/OrderSuccessPage.jsx'
import OrderFailedPage from './pages/OrderFailedPage.jsx'
import ProtectedRoute from './components/utils/ProtectedRoute.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import WishlistPage from './pages/WishlistPage.jsx'
import OrdersPage from './pages/OrdersPage.jsx'
import TrackOrderPage from './pages/TrackOrderPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import FAQPage from './pages/FAQPage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import BlogPostPage from './pages/BlogPostPage.jsx'

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
        path: "/payment",
        element: <PaymentPage />
      },
      {
        path: "/order-success",
        element: <OrderSuccessPage />
      },
      {
        path: "/order-failed",
        element: <OrderFailedPage />
      },
      {
        path: "/profile",
        element: <ProtectedRoute><ProfilePage /></ProtectedRoute>
      },
      {
        path: "/wishlist",
        element: <ProtectedRoute><WishlistPage /></ProtectedRoute>
      },
      {
        path: "/orders",
        element: <ProtectedRoute><OrdersPage /></ProtectedRoute>
      },
      {
        path: "/track-order",
        element: <TrackOrderPage />
      },
      {
        path: "/track-order/:orderId",
        element: <TrackOrderPage />
      },
      {
        path: "/about",
        element: <AboutPage />
      },
      {
        path: "/contact",
        element: <ContactPage />
      },
      {
        path: "/faq",
        element: <FAQPage />
      },
      {
        path: "/search",
        element: <SearchPage />
      },
      {
        path: "/search/:query",
        element: <SearchPage />
      },
      {
        path: "/product/:productId",
        element: <ProductPage />
      },
      {
        path: "/category/:categoryId",
        element: <CategoryPage />
      },
      {
        path: "/blog",
        element: <BlogPage />
      },
      {
        path: "/blog/:postSlug",
        element: <BlogPostPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
