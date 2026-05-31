import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { supabase } from '../../backend/database/supabase';
import { useCart } from './CartContext';

// Import separated backend modules from unified backend services index
import { 
  signUpUser, 
  signInUser, 
  signOutUser, 
  getUserProfile, 
  updateUserProfile, 
  uploadUserAvatar,
  getUserOrders,
  syncUserSessionProfile
} from '../../backend/services';

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
  const lastProcessedUserIdRef = useRef(undefined);

  // Helper to show custom toast
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Helper: Fetch Profile using auth backend file
  const fetchProfile = async (userId, session = null) => {
    try {
      console.log(`fetchProfile [Before fetch]: User ID = ${userId}`);
      let currentSession = session;
      if (!currentSession) {
        console.log('fetchProfile: No session provided, calling getSession...');
        const sessionPromise = supabase.auth.getSession();
        const getSessionTimeout = new Promise((_, reject) => setTimeout(() => reject(new Error('getSession timeout')), 15000));
        const { data: { session: fetchedSession } } = await Promise.race([sessionPromise, getSessionTimeout]);
        currentSession = fetchedSession;
      }
      const email = currentSession?.user?.email || '';
      const name = currentSession?.user?.user_metadata?.full_name || currentSession?.user?.user_metadata?.name || '';
      
      let result;
      const apiTimeout = new Promise((_, reject) => setTimeout(() => reject(new Error('API request timeout')), 15000));
      if (email) {
        result = await Promise.race([syncUserSessionProfile(userId, email, name), apiTimeout]);
      } else {
        result = await Promise.race([getUserProfile(userId), apiTimeout]);
      }
      
      console.log(`fetchProfile [After fetch]: Result success = ${result.success}`);
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
      } else {
        // Safe local fallback if database profile record sync fails
        if (currentSession) {
          const tempUser = {
            id: currentSession.user.id,
            name: currentSession.user.user_metadata?.full_name || currentSession.user.user_metadata?.name || currentSession.user.email.split('@')[0],
            email: currentSession.user.email,
            phone: currentSession.user.phone || '',
            avatar: currentSession.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
            memberSince: 'Joined Today',
            loyaltyPoints: 0,
            status: 'Bronze Member'
          };
          setUser(tempUser);
          await fetchOrders(currentSession.user.id, tempUser);
          return tempUser;
        }
      }
    } catch (err) {
      console.error('Error fetching/syncing user profile:', err);
      // Safe local fallback on any errors/timeouts
      const fallbackSession = session || currentSession;
      if (fallbackSession) {
        const tempUser = {
          id: fallbackSession.user.id,
          name: fallbackSession.user.user_metadata?.full_name || fallbackSession.user.user_metadata?.name || fallbackSession.user.email.split('@')[0],
          email: fallbackSession.user.email,
          phone: fallbackSession.user.phone || '',
          avatar: fallbackSession.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
          memberSince: 'Joined Today',
          loyaltyPoints: 0,
          status: 'Bronze Member'
        };
        setUser(tempUser);
        await fetchOrders(fallbackSession.user.id, tempUser);
        return tempUser;
      }
    }
    return null;
  };

  // Helper: Fetch Orders using orders backend file
  const fetchOrders = async (userId, currentProfile = null) => {
    try {
      console.log(`fetchOrders [Before fetch]: User ID = ${userId}`);
      const apiTimeout = new Promise((_, reject) => setTimeout(() => reject(new Error('API request timeout')), 15000));
      const result = await Promise.race([getUserOrders(userId), apiTimeout]);
      console.log(`fetchOrders [After fetch]: Result success = ${result.success}`);
      if (result.success && result.data) {
        const formattedOrders = result.data.map(o => {
          const orderDate = new Date(o.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          return {
            id: o.id,
            date: orderDate,
            items: (o.order_items || []).map(item => ({
              id: item.id,
              name: item.product_name,
              quantity: item.quantity,
              price: `$${parseFloat(item.price).toFixed(2)}`,
              img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=75&w=200&auto=format&fit=crop'
            })),
            total: parseFloat(o.total_amount),
            status: o.status,
            address: o.shipping_address || 'Flat 4B, 12 Kensington High St, London W8 4PX',
            paymentMethod: o.payment_status === 'Paid' ? 'Credit Card' : 'Pending',
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
    } catch (err) {
      console.error('Error fetching user orders:', err);
    }
  };

  // Auth State Listener
  useEffect(() => {
    let active = true;
    console.log('Auth initialization started');

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const userId = session?.user?.id || null;
      
      // Prevent duplicate parallel processing
      if (userId === lastProcessedUserIdRef.current) {
        console.log(`Auth event ${event}: User ID ${userId} already processed, skipping.`);
        return;
      }
      
      lastProcessedUserIdRef.current = userId;
      console.log(`Auth event ${event}: Session loaded, user ID: ${userId}`);

      try {
        setAuthLoading(true);
        if (session && active) {
          setIsLoggedIn(true);
          await fetchProfile(session.user.id, session);
        } else if (active) {
          setIsLoggedIn(false);
          setUser(null);
          setOrders([]);
        }
      } catch (err) {
        console.error('Auth state change handling error:', err);
      } finally {
        if (active) {
          setAuthLoading(false);
          console.log('Auth loading complete');
        }
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
      lastProcessedUserIdRef.current = undefined;
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
      avatar: updatedFields.avatar
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
    return result.data;
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
