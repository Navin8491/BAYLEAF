import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';

// Lazy load page components
const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const Services = lazy(() => import('./pages/Services'));
const Blog = lazy(() => import('./pages/Blog'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Shop = lazy(() => import('./pages/Shop'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const ProductSingle = lazy(() => import('./pages/ProductSingle'));

// Auth Pages & Dashboard components
const SignIn = lazy(() => import('./pages/SignIn'));
const Register = lazy(() => import('./pages/Register'));
const DashboardLayout = lazy(() => import('./components/DashboardLayout'));
const Profile = lazy(() => import('./pages/Profile'));
const EditProfile = lazy(() => import('./pages/EditProfile'));
const OrderHistory = lazy(() => import('./pages/OrderHistory'));
const OrderDetails = lazy(() => import('./pages/OrderDetails'));
const Settings = lazy(() => import('./pages/Settings'));

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

// Premium loading placeholder for split routes
const PageLoader = () => (
  <div className="bg-[var(--color-soft-ivory)] min-h-screen text-[var(--color-gray-blue)] font-body flex items-center justify-center relative overflow-hidden">
    <div className="text-center">
      <div className="w-10 h-10 rounded-full border-4 border-[var(--color-muted-teal)]/30 border-t-[var(--color-muted-teal)] animate-spin mx-auto mb-4" />
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-muted-teal)] animate-pulse">Loading Bayleaf...</p>
    </div>
  </div>
);

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
          <Suspense fallback={<PageLoader />}>
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
          </Suspense>
          <ToastNotification />
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
