import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiSliders, FiCalendar, FiChevronRight, FiCoffee, FiShoppingBag, FiInfo } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const OrderHistory = () => {
  const { orders } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, highest, lowest

  // 1. Filter Logic
  const filteredOrders = orders.filter(order => {
    // Status Filter
    if (statusFilter !== 'All' && order.status !== statusFilter) {
      return false;
    }

    // Search Query (matches Order ID or any Item Name)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const idMatch = order.id.toLowerCase().includes(query);
      const itemsMatch = order.items.some(item => item.name.toLowerCase().includes(query));
      return idMatch || itemsMatch;
    }

    return true;
  });

  // 2. Sort Logic
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date) - new Date(a.date);
    }
    if (sortBy === 'oldest') {
      return new Date(a.date) - new Date(b.date);
    }
    if (sortBy === 'highest') {
      return b.total - a.total;
    }
    if (sortBy === 'lowest') {
      return a.total - b.total;
    }
    return 0;
  });

  const filterTabs = ['All', 'Preparing', 'On The Way', 'Delivered', 'Cancelled'];

  const statusStyles = {
    Delivered: 'bg-green-50 border-green-200 text-green-600',
    Preparing: 'bg-amber-50 border-amber-200 text-amber-600',
    'On The Way': 'bg-blue-50 border-blue-200 text-blue-600',
    Cancelled: 'bg-red-50 border-red-200 text-red-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header section */}
      <div>
        <h3 className="text-lg font-heading font-bold text-[var(--color-rich-graphite)] uppercase tracking-wider">Order History</h3>
        <p className="text-[10px] text-[var(--color-gray-blue)]/80 font-light">Track active café runs or inspect past invoices</p>
      </div>

      {/* Search, Filter, Sort Panel */}
      <div className="bg-[var(--color-soft-ivory)]/75 border border-[var(--color-silver-fog)]/30 p-4 rounded-3xl space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search bar */}
          <div className="relative flex-grow">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[var(--color-gray-blue)]/50">
              <FiSearch size={16} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order ID or item name..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[var(--color-silver-fog)]/40 rounded-xl text-xs font-light focus:outline-none focus:border-[var(--color-muted-teal)] transition-all shadow-inner placeholder-[var(--color-gray-blue)]/40"
            />
          </div>

          {/* Sort Menu */}
          <div className="relative min-w-[160px]">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[var(--color-gray-blue)]/50 pointer-events-none">
              <FiSliders size={14} />
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-white border border-[var(--color-silver-fog)]/40 rounded-xl text-xs font-bold uppercase tracking-wider text-[var(--color-deep-slate)] focus:outline-none focus:border-[var(--color-muted-teal)] transition-all appearance-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Price: High to Low</option>
              <option value="lowest">Price: Low to High</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[var(--color-gray-blue)]">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
            </div>
          </div>
        </div>

        {/* Filter Pills scroll area */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--color-gray-blue)]/70 mr-1 hidden sm:inline">Status:</span>
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3.5 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all focus:outline-none flex-shrink-0 ${
                statusFilter === tab
                  ? 'bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] text-white shadow-sm'
                  : 'bg-white hover:bg-[var(--color-silver-fog)]/20 text-[var(--color-deep-slate)]/70 border border-[var(--color-silver-fog)]/20'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Orders list container */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {sortedOrders.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 gap-4"
            >
              {sortedOrders.map((order, idx) => {
                const totalItems = order.items.reduce((acc, it) => acc + it.quantity, 0);
                
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    key={order.id}
                    className="bg-white/60 hover:bg-white border border-[var(--color-silver-fog)]/20 hover:border-[var(--color-muted-teal)]/30 rounded-3xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300 group"
                  >
                    {/* Left Column: ID, Status, Items Preview */}
                    <div className="flex flex-col gap-2.5 flex-grow w-full md:w-auto">
                      <div className="flex items-center flex-wrap gap-2.5">
                        <span className="text-sm font-heading font-bold text-[var(--color-rich-graphite)] tracking-wide">{order.id}</span>
                        <span className={`px-3 py-0.5 rounded-full border text-[8px] font-bold uppercase tracking-widest ${statusStyles[order.status] || 'bg-gray-50 border-gray-200'}`}>
                          {order.status}
                        </span>
                        <span className="flex items-center gap-1 text-[9px] text-[var(--color-gray-blue)]/80 font-bold uppercase tracking-widest ml-auto md:ml-0"><FiCalendar size={12} /> {order.date}</span>
                      </div>

                      {/* Small visual items thumbnail row */}
                      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-1">
                        {order.items.map((item, key) => (
                          <div key={key} className="flex items-center gap-1.5 bg-[var(--color-soft-ivory)] border border-[var(--color-silver-fog)]/20 pl-1 pr-2.5 py-0.5 rounded-full flex-shrink-0">
                            <img src={item.img} alt={item.name} className="w-5 h-5 rounded-full object-cover" />
                            <span className="text-[9px] text-[var(--color-deep-slate)]/95 font-medium truncate max-w-[120px]">{item.name} <strong className="text-[var(--color-muted-teal)]">x{item.quantity}</strong></span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Pricing & Link */}
                    <div className="flex justify-between md:justify-end items-center gap-6 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-[var(--color-silver-fog)]/20">
                      <div className="text-left md:text-right">
                        <span className="block text-[8px] font-bold uppercase tracking-widest text-[var(--color-gray-blue)]/70">Grand Total</span>
                        <span className="text-sm font-bold text-[var(--color-rich-graphite)]">£{order.total.toFixed(2)}</span>
                      </div>
                      
                      <button
                        onClick={() => navigate(`/profile/orders/${order.id}`)}
                        className="px-4 py-2 bg-white border border-[var(--color-silver-fog)]/40 group-hover:bg-[var(--color-muted-teal)] group-hover:text-white group-hover:border-[var(--color-muted-teal)] rounded-xl text-[9px] font-bold uppercase tracking-widest text-[var(--color-deep-slate)] transition-all duration-300 shadow-sm flex items-center gap-1"
                      >
                        <span>Details</span>
                        <FiChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 bg-white/40 border border-dashed border-[var(--color-silver-fog)]/40 rounded-[2.25rem]"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--color-silver-fog)]/20 flex items-center justify-center text-[var(--color-gray-blue)]/60 mx-auto mb-3">
                <FiInfo size={20} />
              </div>
              <h4 className="text-sm font-bold text-[var(--color-rich-graphite)] uppercase tracking-wider">No Orders Found</h4>
              <p className="text-xs text-[var(--color-gray-blue)]/80 font-light mt-1 max-w-xs mx-auto">
                No orders match your search parameters. Try clearing your filters or look at our tasty menu!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </motion.div>
  );
};

export default OrderHistory;
