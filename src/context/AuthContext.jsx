import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../backend/database/supabase';
import { useCart } from './CartContext';

// Import separated backend modules from unified backend services index
import { 
  signUpUser, 
  signInUser, 
  signOutUser, 
  getUserProfile, 
  updateUserProfile, 
  uploadUserAvatar,
  getUserOrders
} from '../backend/services';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [toastMessage, setToastMessage] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Helper to show custom toast
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Helper: Fetch Profile using auth backend file
  const fetchProfile = async (userId) => {
    const result = await getUserProfile(userId);
    if (result.success && result.data) {
      const data = result.data;
      const memberDate = new Date(data.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      
      const tempUser = {
        id: data.id,
        name: data.full_name,
        email: data.email,
        phone: data.phone || '',
        avatar: data.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        memberSince: memberDate,
        loyaltyPoints: 50,
        status: 'Bronze Member'
      };

      setUser(tempUser);
      await fetchOrders(userId, tempUser);
      return tempUser;
    }
    return null;
  };

  // Helper: Fetch Orders using orders backend file
  const fetchOrders = async (userId, currentProfile = null) => {
    const result = await getUserOrders(userId);
    if (result.success && result.data) {
      const formattedOrders = result.data.map(o => {
        const orderDate = new Date(o.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        return {
          id: o.id,
          date: orderDate,
          items: o.order_items.map(item => ({
            id: item.id,
            name: item.product_name,
            quantity: item.quantity,
            price: `$${parseFloat(item.price).toFixed(2)}`,
            img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=75&w=200&auto=format&fit=crop'
          })),
          total: parseFloat(o.total_amount),
          status: o.status,
          address: 'Flat 4B, 12 Kensington High St, London W8 4PX',
          paymentMethod: 'Credit Card',
          shippingCost: 5.00,
          discount: 0.00,
          tax: parseFloat((o.total_amount * 0.08).toFixed(2))
        };
      });

      setOrders(formattedOrders);

      // Adjust loyalty points and level based on actual order count!
      const profileToUpdate = currentProfile || user;
      if (profileToUpdate) {
        const points = formattedOrders.length * 75 + 50;
        let status = 'Bronze Member';
        if (points >= 500) status = 'Platinum Member';
        else if (points >= 300) status = 'Gold Member';
        else if (points >= 150) status = 'Silver Member';

        setUser({
          ...profileToUpdate,
          loyaltyPoints: points,
          status
        });
      }
    }
  };

  // Auth State Listener
  useEffect(() => {
    let active = true;

    // Check active session
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session && active) {
          setIsLoggedIn(true);
          await fetchProfile(session.user.id);
        }
      } catch (err) {
        console.error('Error initializing auth session:', err);
      } finally {
        if (active) {
          setAuthLoading(false);
        }
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        if (session && active) {
          setIsLoggedIn(true);
          await fetchProfile(session.user.id);
        } else if (active) {
          setIsLoggedIn(false);
          setUser(null);
          setOrders([]);
        }
      } catch (err) {
        console.error('Auth state change error:', err);
      } finally {
        if (active) {
          setAuthLoading(false);
        }
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  // Action: Register User calling auth backend file
  const register = async (userData) => {
    const result = await signUpUser(userData);
    if (!result.success) {
      showToast(result.message);
    } else {
      showToast('Registration successful! Welcome to the family.');
    }
    return result;
  };

  // Action: Login User calling auth backend file
  const login = async (email, password) => {
    const result = await signInUser({ email, password });
    if (!result.success) {
      showToast(result.message);
    } else {
      showToast('Welcome back to BAYLEAF Café!');
    }
    return result;
  };

  // Action: Sign out user calling auth backend file
  const logout = async () => {
    const result = await signOutUser();
    if (!result.success) {
      showToast(result.message);
      return;
    }
    setIsLoggedIn(false);
    setUser(null);
    setOrders([]);
    showToast('You have been safely signed out.');
  };

  // Action: Update profile details calling auth backend file
  const updateProfile = async (updatedFields) => {
    if (!user) return { success: false };
    const result = await updateUserProfile(user.id, {
      name: updatedFields.name,
      phone: updatedFields.phone,
      avatarUrl: updatedFields.avatar
    });

    if (!result.success) {
      showToast(result.message);
      return result;
    }

    setUser(prev => ({
      ...prev,
      name: updatedFields.name,
      phone: updatedFields.phone,
      avatar: updatedFields.avatar
    }));

    showToast('Profile updated successfully!');
    return { success: true };
  };

  // Action: Upload image binary file calling auth backend file
  const uploadAvatar = async (file) => {
    if (!user) return null;
    const result = await uploadUserAvatar(user.id, file);
    if (!result.success) {
      showToast('Avatar upload failed: ' + result.message);
      return null;
    }
    return result.publicUrl;
  };

  const updateSettings = (updatedSettings) => {
    setSettings(prev => ({ ...prev, ...updatedSettings }));
    showToast('Preferences and security settings saved.');
  };

  const reorder = (orderId) => {
    const targetOrder = orders.find(o => o.id === orderId);
    if (targetOrder) {
      targetOrder.items.forEach(item => {
        addToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          img: item.img
        }, item.quantity);
      });
      showToast('Items from order added to your cart!');
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
    authLoading,
    login,
    register,
    logout,
    updateProfile,
    uploadAvatar,
    updateSettings,
    reorder,
    showToast,
    fetchOrders
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
