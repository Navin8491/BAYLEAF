import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Services from './pages/Services';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductSingle from './pages/ProductSingle';

// Auth Pages & Dashboard components
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import DashboardLayout from './components/DashboardLayout';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import OrderHistory from './pages/OrderHistory';
import OrderDetails from './pages/OrderDetails';
import Settings from './pages/Settings';

// Context Providers
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Global Toast notification for interactive feedback
const ToastNotification = () => {
  const { toastMessage } = useAuth();
  
  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-[9999] px-6 py-4 bg-[#2D333A] text-white border border-[var(--color-silver-fog)]/20 rounded-2xl shadow-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 backdrop-blur-xl"
        >
          <div className="w-2 h-2 rounded-full bg-[var(--color-muted-teal)] animate-ping" />
          <span>{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Import AnimatePresence/motion for Toast
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="menu" element={<Menu />} />
              <Route path="services" element={<Services />} />
              <Route path="blog" element={<Blog />} />
              <Route path="about" element={<About />} />
              <Route path="shop" element={<Shop />} />
              <Route path="contact" element={<Contact />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="product/:id" element={<ProductSingle />} />
              <Route path="blog/:id" element={<Blog />} />
              
              {/* Authentication Routes */}
              <Route path="login" element={<SignIn />} />
              <Route path="register" element={<Register />} />
              
              {/* Cohesive User Dashboard Panel Nested Routes */}
              <Route path="profile" element={<DashboardLayout />}>
                <Route index element={<Profile />} />
                <Route path="edit" element={<EditProfile />} />
                <Route path="orders" element={<OrderHistory />} />
                <Route path="orders/:id" element={<OrderDetails />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>
          </Routes>
          <ToastNotification />
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
