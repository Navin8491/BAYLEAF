import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit2, FiLock, FiLogOut, FiCalendar, FiSmartphone, FiMail, FiShoppingBag, FiAward, FiGift, FiChevronRight, FiCheck } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, orders, logout, showToast } = useAuth();
  const navigate = useNavigate();

  const [passwordModal, setPasswordModal] = useState(false);
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);

  // Active orders filter
  const activeOrders = orders.filter(o => o.status === 'Preparing' || o.status === 'On The Way');
  const totalSpent = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.total : 0), 0).toFixed(2);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPwd !== confirmPwd) {
      showToast('New passwords do not match!');
      return;
    }

    setPwdLoading(true);
    setTimeout(() => {
      setPwdLoading(false);
      setPasswordModal(false);
      setCurrentPwd('');
      setNewPwd('');
      setConfirmPwd('');
      showToast('Password updated securely!');
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* 1. Profile Core Card & Quick Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-[var(--color-soft-ivory)]/75 border border-[var(--color-silver-fog)]/30 p-6 rounded-[2rem] shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
            alt={user?.name || 'User'}
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-heading font-bold text-[var(--color-rich-graphite)]">{user?.name || 'User'}</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-[var(--color-muted-teal)]/15 border border-[var(--color-muted-teal)]/20 text-[8px] font-bold tracking-wider uppercase text-[var(--color-muted-teal)] flex items-center gap-1">
                <FiAward size={10} /> {user?.status || 'Member'}
              </span>
            </div>
            
            <div className="flex flex-col gap-1 mt-1 text-[11px] text-[var(--color-gray-blue)] font-light">
              <span className="flex items-center gap-1.5"><FiMail size={12} /> {user?.email || ''}</span>
              <span className="flex items-center gap-1.5"><FiSmartphone size={12} /> {user?.phone || ''}</span>
              <span className="flex items-center gap-1.5"><FiCalendar size={12} /> Member Since: {user?.memberSince || ''}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
          <Link
            to="/profile/edit"
            className="flex-grow md:flex-grow-0 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/70 hover:bg-white border border-[var(--color-silver-fog)]/50 hover:border-[var(--color-muted-teal)]/30 rounded-xl text-[10px] font-bold uppercase tracking-wider text-[var(--color-deep-slate)] shadow-sm hover:shadow transition-all"
          >
            <FiEdit2 size={12} />
            <span>Edit Profile</span>
          </Link>
          <button
            onClick={() => setPasswordModal(true)}
            className="flex-grow md:flex-grow-0 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/70 hover:bg-white border border-[var(--color-silver-fog)]/50 hover:border-[var(--color-muted-teal)]/30 rounded-xl text-[10px] font-bold uppercase tracking-wider text-[var(--color-deep-slate)] shadow-sm hover:shadow transition-all"
          >
            <FiLock size={12} />
            <span>Password</span>
          </button>
          <button
            onClick={logout}
            className="flex-grow md:flex-grow-0 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50/50 hover:bg-red-50 border border-red-100 hover:border-red-200 rounded-xl text-[10px] font-bold uppercase tracking-wider text-red-600 shadow-sm transition-all"
          >
            <FiLogOut size={12} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* 2. Premium Analytics Grid Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        
        {/* Card 1: Total Orders */}
        <div className="bg-white/60 backdrop-blur border border-[var(--color-silver-fog)]/20 p-5 rounded-[1.75rem] shadow-sm hover:shadow-md hover:border-[var(--color-silver-fog)]/40 transition-all flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--color-gray-blue)]/80">Total Orders</span>
            <div className="w-8 h-8 rounded-full bg-[var(--color-powder-blue)]/30 flex items-center justify-center text-[var(--color-muted-teal)]">
              <FiShoppingBag size={14} />
            </div>
          </div>
          <div>
            <h4 className="text-2xl font-heading font-medium text-[var(--color-rich-graphite)]">{orders.length}</h4>
            <p className="text-[9px] text-[var(--color-gray-blue)] font-light mt-0.5">Spent £{totalSpent} total</p>
          </div>
        </div>

        {/* Card 2: Loyalty Balance */}
        <div className="bg-white/60 backdrop-blur border border-[var(--color-silver-fog)]/20 p-5 rounded-[1.75rem] shadow-sm hover:shadow-md hover:border-[var(--color-silver-fog)]/40 transition-all flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--color-gray-blue)]/80">Loyalty Points</span>
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100">
              <FiGift size={14} />
            </div>
          </div>
          <div>
            <h4 className="text-2xl font-heading font-medium text-[var(--color-rich-graphite)]">{user?.loyaltyPoints || 0}</h4>
            <p className="text-[9px] text-[var(--color-gray-blue)] font-light mt-0.5">Equivalent to £{((user?.loyaltyPoints || 0) * 0.05).toFixed(2)} rewards</p>
          </div>
        </div>

        {/* Card 3: Active Shipments */}
        <div className="bg-white/60 backdrop-blur border border-[var(--color-silver-fog)]/20 p-5 rounded-[1.75rem] shadow-sm hover:shadow-md hover:border-[var(--color-silver-fog)]/40 transition-all flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--color-gray-blue)]/80">Active Orders</span>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${activeOrders.length > 0 ? 'bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] shadow-sm animate-pulse' : 'bg-[var(--color-silver-fog)]/30 text-[var(--color-gray-blue)]'}`}>
              {activeOrders.length}
            </div>
          </div>
          <div>
            <h4 className="text-2xl font-heading font-medium text-[var(--color-rich-graphite)]">{activeOrders.length}</h4>
            <p className="text-[9px] text-[var(--color-gray-blue)] font-light mt-0.5">{activeOrders.length > 0 ? 'In preparation or transit' : 'No active shipments'}</p>
          </div>
        </div>

        {/* Card 4: Favorite Beverage */}
        <div className="bg-white/60 backdrop-blur border border-[var(--color-silver-fog)]/20 p-5 rounded-[1.75rem] shadow-sm hover:shadow-md hover:border-[var(--color-silver-fog)]/40 transition-all flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--color-gray-blue)]/80">Top Choice</span>
            <div className="w-8 h-8 rounded-full bg-[var(--color-warm-sand)]/20 flex items-center justify-center text-[var(--color-sand-accent)] border border-[var(--color-warm-sand)]/30">
              <FiAward size={14} />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-heading font-bold text-[var(--color-rich-graphite)] truncate">Matcha Crepe</h4>
            <p className="text-[9px] text-[var(--color-gray-blue)] font-light mt-0.5">Ordered 4 times this month</p>
          </div>
        </div>

      </div>

      {/* 3. Recent Orders & History Sneak-peek */}
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-[var(--color-silver-fog)]/30 pb-2">
          <h3 className="text-md font-heading font-bold text-[var(--color-rich-graphite)] uppercase tracking-wider">Recent Orders</h3>
          <Link
            to="/profile/orders"
            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted-teal)] hover:text-[var(--color-deep-sage-teal)] transition-colors"
          >
            <span>View All</span>
            <FiChevronRight />
          </Link>
        </div>

        {/* Render orders lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders.slice(0, 2).map((order) => {
            const itemCount = order.items.reduce((acc, item) => acc + item.quantity, 0);
            
            // Colors for active status
            const statusStyles = {
              Delivered: 'bg-green-50 border-green-200 text-green-600',
              Preparing: 'bg-amber-50 border-amber-200 text-amber-600',
              'On The Way': 'bg-blue-50 border-blue-200 text-blue-600',
              Cancelled: 'bg-red-50 border-red-200 text-red-600'
            }[order.status] || 'bg-gray-50 border-gray-200 text-gray-600';

            return (
              <div
                key={order.id}
                className="bg-white/50 border border-[var(--color-silver-fog)]/30 rounded-2xl p-4 flex justify-between items-center shadow-sm hover:shadow transition-all group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-heading font-bold text-[var(--color-rich-graphite)]">{order.id}</span>
                    <span className={`px-2 py-0.5 rounded-full border text-[8px] font-bold uppercase tracking-wider ${statusStyles}`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-[10px] text-[var(--color-gray-blue)]/80 font-light">
                    <span>{order.date}</span>
                    <span>&bull;</span>
                    <span>{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
                  </div>
                  
                  <p className="text-[11px] font-bold text-[var(--color-muted-teal)] mt-1.5">
                    £{order.total.toFixed(2)}
                  </p>
                </div>

                <Link
                  to={`/profile/orders?selected=${order.id}`}
                  className="w-8 h-8 rounded-full bg-white border border-[var(--color-silver-fog)]/30 flex items-center justify-center text-[var(--color-deep-slate)] hover:bg-[var(--color-muted-teal)] hover:text-white hover:border-[var(--color-muted-teal)] transition-all duration-300 shadow-sm"
                >
                  <FiChevronRight />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Password Modal Overlay */}
      <AnimatePresence>
        {passwordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#2D333A]/60 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="w-full max-w-sm bg-[#F4F1EC] border border-[var(--color-silver-fog)]/50 rounded-[2.5rem] shadow-luxury p-8 relative"
            >
              <h3 className="text-xl font-heading text-[var(--color-rich-graphite)] font-bold mb-1">Change Password</h3>
              <p className="text-[10px] text-[var(--color-gray-blue)] font-light leading-relaxed mb-6">
                Protect your account by setting a strong, premium passkey combination.
              </p>

              <form onSubmit={handlePasswordChange} className="space-y-4">
                {/* Current pass field */}
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-[0.15em] pl-2 text-[var(--color-deep-slate)]/70">Current Password</label>
                  <input
                    type="password"
                    value={currentPwd}
                    onChange={(e) => setCurrentPwd(e.target.value)}
                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                    className="w-full px-4 py-2.5 bg-white border border-[var(--color-silver-fog)]/50 focus:border-[var(--color-muted-teal)] rounded-xl text-xs font-light focus:outline-none transition-all"
                    required
                  />
                </div>

                {/* New pass field */}
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-[0.15em] pl-2 text-[var(--color-deep-slate)]/70">New Password</label>
                  <input
                    type="password"
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                    className="w-full px-4 py-2.5 bg-white border border-[var(--color-silver-fog)]/50 focus:border-[var(--color-muted-teal)] rounded-xl text-xs font-light focus:outline-none transition-all"
                    required
                  />
                </div>

                {/* Confirm pass field */}
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-[0.15em] pl-2 text-[var(--color-deep-slate)]/70">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPwd}
                    onChange={(e) => setConfirmPwd(e.target.value)}
                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                    className="w-full px-4 py-2.5 bg-white border border-[var(--color-silver-fog)]/50 focus:border-[var(--color-muted-teal)] rounded-xl text-xs font-light focus:outline-none transition-all"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={pwdLoading}
                  className="w-full py-3.5 bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] text-white text-[9px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center"
                >
                  {pwdLoading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    'Update Passkey'
                  )}
                </button>
              </form>

              <button
                onClick={() => {
                  setPasswordModal(false);
                  setCurrentPwd('');
                  setNewPwd('');
                  setConfirmPwd('');
                }}
                className="mt-6 w-full text-center text-[10px] font-bold uppercase tracking-wider text-[var(--color-gray-blue)] hover:text-[var(--color-rich-graphite)] transition-colors focus:outline-none"
              >
                Cancel Action
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default Profile;
