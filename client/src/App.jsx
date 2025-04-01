import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductCategory from './pages/ProductCategory';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import ShippingPolicy from './pages/policies/ShippingPolicy';
import ReturnPolicy from './pages/policies/ReturnPolicy';
import PrivacyPolicy from './pages/policies/PrivacyPolicy';
import Payment from './pages/Payment';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Checkout from './pages/Checkout';
import useStore from './store/useStore';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderDetail from './pages/OrderDetail';
import SearchResults from './pages/SearchResults';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProductList from './pages/admin/AdminProductList';
import AdminProductEdit from './pages/admin/AdminProductEdit';
import AdminOrderList from './pages/admin/AdminOrderList';
import AdminUserList from './pages/admin/AdminUserList';
import AdminUserEdit from './pages/admin/AdminUserEdit';

// Protected route component to ensure user authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Admin route component to ensure admin authorization
const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useStore();
  
  if (!isAuthenticated || !user?.isAdmin) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/category/:category" element={<ProductCategory />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/shipping-policy" element={<ShippingPolicy />} />
      <Route path="/return-policy" element={<ReturnPolicy />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/search" element={<SearchResults />} />
      
      {/* Protected routes */}
      <Route path="/checkout" element={
        <ProtectedRoute>
          <Checkout />
        </ProtectedRoute>
      } />
      <Route path="/payment" element={
        <ProtectedRoute>
          <Payment />
        </ProtectedRoute>
      } />
      <Route path="/account" element={
        <ProtectedRoute>
          <Account />
        </ProtectedRoute>
      } />
      <Route path="/order/:orderId" element={
        <ProtectedRoute>
          <OrderDetail />
        </ProtectedRoute>
      } />
      <Route path="/order-confirmation" element={
        <ProtectedRoute>
          <OrderConfirmation />
        </ProtectedRoute>
      } />

      {/* Admin routes */}
      <Route path="/admin" element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      } />
      <Route path="/admin/products" element={
        <AdminRoute>
          <AdminProductList />
        </AdminRoute>
      } />
      <Route path="/admin/products/new" element={
        <AdminRoute>
          <AdminProductEdit />
        </AdminRoute>
      } />
      <Route path="/admin/products/:id/edit" element={
        <AdminRoute>
          <AdminProductEdit />
        </AdminRoute>
      } />
      <Route path="/admin/orders" element={
        <AdminRoute>
          <AdminOrderList />
        </AdminRoute>
      } />
      <Route path="/admin/users" element={
        <AdminRoute>
          <AdminUserList />
        </AdminRoute>
      } />
      <Route path="/admin/users/:id/edit" element={
        <AdminRoute>
          <AdminUserEdit />
        </AdminRoute>
      } />
    </Routes>
  );
};

export default App;