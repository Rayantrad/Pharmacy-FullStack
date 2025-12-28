import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./Pages/HomePage";
import MainLayout from "./Layouts/MainLayout";
import ProtectedRoutes from "./Functions/ProdectedRoutes";
import Login from "./Pages/Login";
import ProductDetailPage from "./Pages/ProductDetailPage";
import CartPage from "./Pages/CartPage";
import CheckOutPage from "./Pages/CheckOutPage";
import Products from "./Pages/Products";
import FavouriteproductsPage from "./Pages/FavouritrproductPage";
import Contactus from "./Pages/Contactus";
import ServicesPage from "./Pages/Services";
import BlogPage from "./Pages/Blog";
import AboutPage from "./Pages/About";
import AdminDashboard from "./Pages/AdminDashboard";
import SignUp from "./Pages/SignUp";
import MyOrdersPage from "./Pages/MyOrdersPage";


const router = createBrowserRouter(
  [
    {
      element: <MainLayout />,
      children: [{ path: "/", element: <HomePage /> }],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",          
      element: <SignUp />,
    },
    {
      element: (
        <ProtectedRoutes>
          <MainLayout />
        </ProtectedRoutes>
      ), // Requires login and applies layout
      children: [
        { path: "/products", element: <Products /> },
        { path: "/:type/:id", element: <ProductDetailPage /> },
        { path: "/cart", element: <CartPage /> },
        { path: "/checkout", element: <CheckOutPage /> },
        { path: "/favourites", element: <FavouriteproductsPage /> },
        { path: "/contactus", element: <Contactus /> },
        { path: "/services", element: <ServicesPage /> },
        { path: "/blog", element: <BlogPage /> },
        { path: "/about", element: <AboutPage /> },
       { path:"/orders", element:<MyOrdersPage />},
        {
          path: "/dashboard",
          element: (
            <ProtectedRoutes role="admin">
              <AdminDashboard />
            </ProtectedRoutes>
          ),
        },
      ],
    },
  ],
 
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
