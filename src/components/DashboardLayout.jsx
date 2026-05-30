import React from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiShoppingBag, FiSettings, FiLogOut, FiAward, FiCompass } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Route protection for design prototype
  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  const menuItems = [
    { name: 'Profile Overview', path: '/profile', icon: FiUser, end: true },
    { name: 'Order History', path: '/profile/orders', icon: FiShoppingBag, end: false },
    { name: 'Account Settings', path: '/profile/settings', icon: FiSettings, end: true }
  ];

  // Loyalty calculation
  const nextTierPoints = 500;
  const currentPoints = user.loyaltyPoints || 0;
  const progressPercent = Math.min(100, (currentPoints / nextTierPoints) * 100);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[var(--color-soft-ivory)] relative overflow-hidden">

      {/* Premium Floating Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-10 left-[10%] w-[35vw] h-[35vw] max-w-[400px] bg-[var(--color-powder-blue)]/20 rounded-full blur-[60px] transform-gpu"
          animate={{ x: [0, 15, -10, 0], y: [0, 8, 15, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] max-w-[350px] bg-[var(--color-mist-sage)]/15 rounded-full blur-[50px] transform-gpu"
          animate={{ x: [0, -15, 10, 0], y: [0, -8, 12, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-12 max-w-7xl">
        {/* Dynamic breadcrumb header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[var(--color-silver-fog)]/30 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--color-gray-blue)]/70 mb-1.5">
              <span>Home</span>
              <span>&bull;</span>
              <span className="text-[var(--color-muted-teal)]">Dashboard</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-medium text-[var(--color-rich-graphite)] tracking-tight">
              Welcome back, <span className="text-[var(--color-muted-teal)] font-medium">{user.name.split(' ')[0]}</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 rounded-full bg-[var(--color-warm-sand)]/20 border border-[var(--color-warm-sand)]/40 text-[10px] tracking-widest font-bold uppercase text-[var(--color-sand-accent)] flex items-center gap-1.5 shadow-sm">
              <FiAward className="animate-pulse" /> {user.status}
            </span>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Dashboard Sidebar Section */}
          <aside className="lg:col-span-1">
            <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-[2.25rem] p-6 shadow-luxury flex flex-col items-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-powder-blue)]/10 rounded-full blur-xl pointer-events-none"></div>

              {/* Profile Card Header with User Avatar */}
              <div className="relative mb-4 group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] rounded-full blur-md opacity-25 group-hover:opacity-40 transition-opacity"></div>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="relative w-20 h-20 rounded-full object-cover border-2 border-white/80 shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] text-white p-1 rounded-full text-xs shadow-md border border-white/90">
                  <FiAward size={12} />
                </span>
              </div>

              <h2 className="text-lg font-heading text-[var(--color-rich-graphite)] font-bold">{user.name}</h2>
              <p className="text-xs text-[var(--color-gray-blue)]/80 font-light mb-5">{user.email}</p>

              {/* Loyalty Gauge Meter Card */}
              <div className="w-full bg-[var(--color-soft-ivory)]/70 border border-[var(--color-silver-fog)]/30 rounded-2xl p-4 mb-6 shadow-inner">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--color-deep-slate)]/70 mb-2">
                  <span>Loyalty Tier</span>
                  <span className="text-[var(--color-muted-teal)]">{currentPoints} / {nextTierPoints} Pts</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-[var(--color-silver-fog)]/40 rounded-full overflow-hidden mb-2">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] rounded-full shadow-[0_0_8px_rgba(95,124,123,0.4)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </div>

                <p className="text-[9px] text-[var(--color-gray-blue)]/70 font-light text-center leading-relaxed">
                  Earn {nextTierPoints - currentPoints} more points to reach the <strong className="text-[var(--color-sand-accent)]">Platinum</strong> status.
                </p>
              </div>

              {/* Navigation Menu Links */}
              <nav className="w-full flex flex-col gap-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  // Custom active matching logic since nested subpages of orders should also highlight order history
                  const isActive = item.end
                    ? location.pathname === item.path
                    : location.pathname.startsWith(item.path);

                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      className={() =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 relative overflow-hidden group/item ${isActive
                          ? 'text-white'
                          : 'text-[var(--color-deep-slate)]/80 hover:text-[var(--color-muted-teal)] hover:bg-[var(--color-silver-fog)]/20'
                        }`
                      }
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-sidebar-bg"
                          className="absolute inset-0 bg-gradient-to-r from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] rounded-xl -z-10 shadow-[0_4px_12px_rgba(95,124,123,0.25)]"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                      <Icon size={16} className={`transition-transform duration-300 group-hover/item:scale-110 ${isActive ? 'text-white' : 'text-[var(--color-gray-blue)]'}`} />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}

                {/* Separator */}
                <hr className="my-3 border-[var(--color-silver-fog)]/30" />

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-red-600/80 hover:text-red-700 hover:bg-red-50/40 transition-all duration-300 w-full text-left"
                >
                  <FiLogOut size={16} />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Dashboard Main Content Panel */}
          <main className="lg:col-span-3">
            <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-[2.25rem] p-6 md:p-8 shadow-luxury min-h-[500px]">
              <Outlet />
            </div>
          </main>

        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
