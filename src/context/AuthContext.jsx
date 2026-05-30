import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCart } from './CartContext';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const DEFAULT_USER = {
  name: 'Eleanor Vance',
  email: 'eleanor.vance@premium.com',
  phone: '+44 7911 123456',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
  memberSince: 'Oct 2025',
  loyaltyPoints: 340,
  status: 'Gold Member'
};

const DEFAULT_ORDERS = [
  {
    id: 'BYF-9741',
    date: 'May 30, 2026',
    items: [
      { id: 'item-3', name: 'Ceremonial Matcha Crepe', quantity: 1, price: '$8.50', img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=75&w=200&auto=format&fit=crop' },
      { id: 'item-4', name: 'Cold Brew Rose Infusion', quantity: 1, price: '$6.20', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=75&w=200&auto=format&fit=crop' }
    ],
    total: 17.20,
    status: 'Preparing',
    address: 'Flat 4B, 12 Kensington High St, London W8 4PX',
    paymentMethod: 'Visa ending in 4242',
    shippingCost: 2.50,
    discount: 2.00,
    tax: 1.40
  },
  {
    id: 'BYF-9824',
    date: 'May 28, 2026',
    items: [
      { id: 'item-1', name: 'Single Origin Flat White', quantity: 2, price: '$5.50', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=75&w=200&auto=format&fit=crop' },
      { id: 'item-2', name: 'Artisanal Almond Croissant', quantity: 1, price: '$4.75', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=75&w=200&auto=format&fit=crop' }
    ],
    total: 15.75,
    status: 'Delivered',
    address: 'Flat 4B, 12 Kensington High St, London W8 4PX',
    paymentMethod: 'Apple Pay',
    shippingCost: 2.50,
    discount: 0.00,
    tax: 1.25
  },
  {
    id: 'BYF-9610',
    date: 'May 25, 2026',
    items: [
      { id: 'item-5', name: 'Sourdough Avocado & Poached Eggs', quantity: 1, price: '$12.90', img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=75&w=200&auto=format&fit=crop' },
      { id: 'item-6', name: 'Iced Pistachio Latte', quantity: 2, price: '$6.50', img: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?q=75&w=200&auto=format&fit=crop' }
    ],
    total: 28.40,
    status: 'On The Way',
    address: 'Flat 4B, 12 Kensington High St, London W8 4PX',
    paymentMethod: 'Visa ending in 4242',
    shippingCost: 2.50,
    discount: 5.00,
    tax: 2.20
  },
  {
    id: 'BYF-9452',
    date: 'May 10, 2026',
    items: [
      { id: 'item-7', name: 'V60 Drip Brew (Ethiopian Yirgacheffe)', quantity: 1, price: '$6.00', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=75&w=200&auto=format&fit=crop' }
    ],
    total: 8.50,
    status: 'Cancelled',
    address: 'Flat 4B, 12 Kensington High St, London W8 4PX',
    paymentMethod: 'MasterCard ending in 9876',
    shippingCost: 2.50,
    discount: 0.00,
    tax: 0.70
  }
];

const DEFAULT_SETTINGS = {
  marketingEmails: true,
  smsUpdates: true,
  twoFactorAuth: false,
  publicProfile: false,
  dataSharing: true,
  birthday: '1995-08-15',
  defaultAddress: 'Flat 4B, 12 Kensington High St, London W8 4PX'
};

export const AuthProvider = ({ children }) => {
  const { addToCart } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem('bayleaf_logged_in');
    return saved ? JSON.parse(saved) : true; // Logged in by default so the user sees the dashboard, but can log out
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('bayleaf_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('bayleaf_orders');
    return saved ? JSON.parse(saved) : DEFAULT_ORDERS;
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('bayleaf_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('bayleaf_logged_in', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('bayleaf_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('bayleaf_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('bayleaf_settings', JSON.stringify(settings));
  }, [settings]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const login = (email, password) => {
    // Elegant mock login validation
    if (email && password) {
      setIsLoggedIn(true);
      showToast('Welcome back to BAYLEAF Café!');
      return { success: true };
    }
    return { success: false, message: 'Please provide valid credentials.' };
  };

  const register = (userData) => {
    const newUser = {
      name: userData.name || 'Valued Guest',
      email: userData.email,
      phone: userData.phone || '+44 7911 000000',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop', // Beautiful default female/neutral face
      memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      loyaltyPoints: 50, // Register bonus!
      status: 'Bronze Member'
    };
    setUser(newUser);
    setIsLoggedIn(true);
    setOrders(DEFAULT_ORDERS); // set default orders for newly registered user so history has content
    showToast('Registration successful! Welcome to the family.');
    return { success: true };
  };

  const logout = () => {
    setIsLoggedIn(false);
    showToast('You have been safely signed out.');
  };

  const updateProfile = (updatedFields) => {
    setUser(prev => {
      const next = { ...prev, ...updatedFields };
      // Loyalty points level check
      if (next.loyaltyPoints >= 500) {
        next.status = 'Platinum Member';
      } else if (next.loyaltyPoints >= 300) {
        next.status = 'Gold Member';
      } else if (next.loyaltyPoints >= 150) {
        next.status = 'Silver Member';
      } else {
        next.status = 'Bronze Member';
      }
      return next;
    });
    showToast('Profile details updated successfully!');
  };

  const updateSettings = (updatedSettings) => {
    setSettings(prev => ({ ...prev, ...updatedSettings }));
    showToast('Preferences and security settings saved.');
  };

  const reorder = (orderId) => {
    const targetOrder = orders.find(o => o.id === orderId);
    if (targetOrder) {
      targetOrder.items.forEach(item => {
        // Adapt format to what CartContext expects: id, name, price (string/float), img, and quantity
        addToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          img: item.img
        }, item.quantity);
      });
      showToast('Items from order ' + orderId + ' added to your cart!');
      return true;
    }
    return false;
  };

  const value = {
    user,
    orders,
    settings,
    isLoggedIn,
    toastMessage,
    login,
    register,
    logout,
    updateProfile,
    updateSettings,
    reorder,
    showToast
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
