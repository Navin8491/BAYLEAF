import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiClock, FiMapPin, FiCreditCard, FiRefreshCw, FiDownload, FiMessageSquare, FiCheck, FiInfo, FiSend, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, reorder, showToast } = useAuth();
  
  const [supportOpen, setSupportOpen] = useState(false);
  const [supportMsg, setSupportMsg] = useState('');
  const [supportHistory, setSupportHistory] = useState([
    { sender: 'bot', text: "Hello Eleanor, how can I help you with your order " + id + " today? Feel free to ask about delivery updates, item modifications, or refund claims." }
  ]);

  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="text-center py-16 bg-white/40 border border-[var(--color-silver-fog)]/30 rounded-[2.25rem]">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 mx-auto mb-3">
          <FiInfo size={20} />
        </div>
        <h4 className="text-sm font-bold text-[var(--color-rich-graphite)] uppercase tracking-wider">Order Not Found</h4>
        <p className="text-xs text-[var(--color-gray-blue)]/80 font-light mt-1 mb-4">The order ID could not be matched.</p>
        <button
          onClick={() => navigate('/profile/orders')}
          className="px-6 py-2.5 bg-[var(--color-muted-teal)] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl shadow-sm"
        >
          Return to Orders
        </button>
      </div>
    );
  }

  // Calculate timeline state index
  // Delivered: index 3, On The Way: index 2, Preparing: index 1, Cancelled: custom
  const statusSteps = ['Placed', 'Preparing', 'On The Way', 'Delivered'];
  const currentStepIndex = {
    Placed: 0,
    Preparing: 1,
    'On The Way': 2,
    Delivered: 3,
    Cancelled: -1
  }[order.status];

  const handleSupportSend = (e) => {
    e.preventDefault();
    if (!supportMsg.trim()) return;
    
    const userMsg = { sender: 'user', text: supportMsg };
    setSupportHistory(prev => [...prev, userMsg]);
    setSupportMsg('');
    
    // Simulate support bot response
    setTimeout(() => {
      setSupportHistory(prev => [...prev, {
        sender: 'bot',
        text: "Thank you for reaching out. We have flagged this ticket for order " + id + ". A BAYLEAF Café representative will contact you at your phone number " + order.address.split(',')[0] ? "+44 7911 123456" : "promptly!"
      }]);
    }, 1500);
  };

  const handleDownloadInvoice = () => {
    // Elegant browser print trigger styled specifically for the invoice card
    window.print();
    showToast('Invoice PDF preview triggered!');
  };

  const handleReorderClick = () => {
    reorder(order.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 print:bg-white print:p-0 print:m-0"
    >
      
      {/* Header back button */}
      <div className="flex justify-between items-center print:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/profile/orders')}
            className="w-8 h-8 rounded-full bg-[var(--color-soft-ivory)]/80 hover:bg-[var(--color-silver-fog)]/30 border border-[var(--color-silver-fog)]/50 flex items-center justify-center text-[var(--color-deep-slate)] transition-colors focus:outline-none"
          >
            <FiArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-heading font-bold text-[var(--color-rich-graphite)] uppercase tracking-wider">{order.id}</h3>
              <span className={`px-2 py-0.5 rounded-full border text-[7px] font-bold uppercase tracking-wider ${
                order.status === 'Delivered' ? 'bg-green-50 border-green-200 text-green-600' :
                order.status === 'Preparing' ? 'bg-amber-50 border-amber-200 text-amber-600' :
                order.status === 'On The Way' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-red-50 border-red-200 text-red-600'
              }`}>
                {order.status}
              </span>
            </div>
            <p className="text-[10px] text-[var(--color-gray-blue)]/80 font-light mt-0.5">Placed on {order.date}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex gap-2">
          <button
            onClick={handleReorderClick}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-[var(--color-soft-ivory)] border border-[var(--color-silver-fog)]/50 rounded-xl text-[9px] font-bold uppercase tracking-wider text-[var(--color-deep-slate)] transition-all shadow-sm focus:outline-none"
          >
            <FiRefreshCw size={12} />
            <span className="hidden sm:inline">Reorder</span>
          </button>
          <button
            onClick={handleDownloadInvoice}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-[var(--color-soft-ivory)] border border-[var(--color-silver-fog)]/50 rounded-xl text-[9px] font-bold uppercase tracking-wider text-[var(--color-deep-slate)] transition-all shadow-sm focus:outline-none"
          >
            <FiDownload size={12} />
            <span className="hidden sm:inline">Invoice</span>
          </button>
          <button
            onClick={() => setSupportOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-[var(--color-muted-teal)] border border-[var(--color-silver-fog)]/50 hover:text-white hover:border-[var(--color-muted-teal)] rounded-xl text-[9px] font-bold uppercase tracking-wider text-[var(--color-deep-slate)] transition-all shadow-sm focus:outline-none"
          >
            <FiMessageSquare size={12} />
            <span>Support</span>
          </button>
        </div>
      </div>

      {/* 1. Interactive Delivery Status Timeline (Hidden on Cancelled) */}
      {order.status !== 'Cancelled' ? (
        <div className="bg-[var(--color-soft-ivory)]/75 border border-[var(--color-silver-fog)]/30 p-6 rounded-[2rem] shadow-sm print:hidden">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--color-rich-graphite)] mb-6 flex items-center gap-1.5">
            <FiClock /> <span>Delivery Timeline</span>
          </h4>
          
          <div className="relative flex justify-between items-center w-full max-w-2xl mx-auto px-4">
            {/* Timeline Line Bar */}
            <div className="absolute inset-x-8 top-4.5 h-1 bg-[var(--color-silver-fog)]/40 -z-10 rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStepIndex / 3) * 100}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>

            {statusSteps.map((step, idx) => {
              const active = idx <= currentStepIndex;
              const current = idx === currentStepIndex;

              return (
                <div key={step} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                      current
                        ? 'bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] text-white border-[var(--color-muted-teal)] scale-110 shadow-md ring-4 ring-[var(--color-muted-teal)]/15'
                        : active
                        ? 'bg-[var(--color-muted-teal)] text-white border-[var(--color-muted-teal)]'
                        : 'bg-white text-[var(--color-gray-blue)]/50 border-[var(--color-silver-fog)]/50'
                    }`}
                  >
                    {active ? <FiCheck size={14} className="stroke-[3px]" /> : <span className="text-[10px] font-bold">{idx + 1}</span>}
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-wider ${active ? 'text-[var(--color-muted-teal)]' : 'text-[var(--color-gray-blue)]/60'}`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-red-50/50 border border-red-200/50 p-5 rounded-[2rem] shadow-sm flex items-center gap-3 print:hidden">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <FiInfo size={18} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-700">Order Cancelled</h4>
            <p className="text-[10px] text-red-600/80 font-light mt-0.5 leading-relaxed">
              This order was cancelled on request and fully refunded back to your payment method.
            </p>
          </div>
        </div>
      )}

      {/* 2. Core Invoice Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Invoice Summary Items List Card */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white/60 backdrop-blur border border-[var(--color-silver-fog)]/20 p-6 rounded-[2rem] shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--color-rich-graphite)] mb-4 border-b border-[var(--color-silver-fog)]/20 pb-2">
              Invoice Items
            </h4>
            
            <div className="divide-y divide-[var(--color-silver-fog)]/20">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-4 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <img src={item.img} alt={item.name} className="w-12 h-12 rounded-2xl object-cover border border-[var(--color-silver-fog)]/20 shadow-sm" />
                    <div>
                      <h5 className="text-xs font-bold text-[var(--color-rich-graphite)] leading-tight">{item.name}</h5>
                      <span className="text-[10px] text-[var(--color-gray-blue)]/80 font-light">Quantity: {item.quantity}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs font-bold text-[var(--color-rich-graphite)]">{item.price}</span>
                    <span className="text-[9px] text-[var(--color-gray-blue)]/60 font-light">Total: £{(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Invoice Details Column Card */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Order Totals Summary Card */}
          <div className="bg-white/60 backdrop-blur border border-[var(--color-silver-fog)]/20 p-6 rounded-[2rem] shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--color-rich-graphite)] mb-4 border-b border-[var(--color-silver-fog)]/20 pb-2">
              Payment Summary
            </h4>
            
            <div className="space-y-3 text-xs font-light text-[var(--color-gray-blue)]">
              {/* Calculating details dynamically based on mock parameters */}
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[var(--color-rich-graphite)]">£{(order.total - order.shippingCost - order.tax + order.discount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping / Service Fee</span>
                <span className="font-medium text-[var(--color-rich-graphite)]">£{order.shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated VAT (Tax)</span>
                <span className="font-medium text-[var(--color-rich-graphite)]">£{order.tax.toFixed(2)}</span>
              </div>
              
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600 font-bold">
                  <span>Loyalty Discount Applied</span>
                  <span>-£{order.discount.toFixed(2)}</span>
                </div>
              )}
              
              <hr className="border-[var(--color-silver-fog)]/20 my-2" />
              
              <div className="flex justify-between text-sm font-bold text-[var(--color-rich-graphite)] pt-1">
                <span>Grand Total</span>
                <span className="text-[var(--color-muted-teal)]">£{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Delivery Coordinates Details Card */}
          <div className="bg-white/60 backdrop-blur border border-[var(--color-silver-fog)]/20 p-6 rounded-[2rem] shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--color-rich-graphite)] mb-4 border-b border-[var(--color-silver-fog)]/20 pb-2">
              Fulfillment Info
            </h4>
            
            <div className="space-y-4 text-xs font-light text-[var(--color-gray-blue)]">
              {/* Address details */}
              <div className="flex gap-2.5 items-start">
                <FiMapPin size={16} className="text-[var(--color-muted-teal)] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[8px] font-bold uppercase tracking-widest text-[var(--color-deep-slate)]/70">Delivery Address</span>
                  <p className="mt-1 leading-relaxed text-[11px] text-[var(--color-rich-graphite)] font-light">{order.address}</p>
                </div>
              </div>

              {/* Payment Card details */}
              <div className="flex gap-2.5 items-start">
                <FiCreditCard size={16} className="text-[var(--color-muted-teal)] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[8px] font-bold uppercase tracking-widest text-[var(--color-deep-slate)]/70">Payment Method</span>
                  <p className="mt-1 text-[11px] text-[var(--color-rich-graphite)] font-light">{order.paymentMethod}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Slide-out Interactive Support Panel drawer */}
      <AnimatePresence>
        {supportOpen && (
          <>
            {/* Modal backdrop blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSupportOpen(false)}
              className="fixed inset-0 bg-[#2D333A] z-40"
            />

            {/* Sidebar drawer container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#F4F1EC] border-l border-[var(--color-silver-fog)]/40 shadow-2xl p-6 z-50 flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="flex justify-between items-center border-b border-[var(--color-silver-fog)]/30 pb-4 mb-4">
                <div>
                  <h4 className="text-md font-heading font-bold text-[var(--color-rich-graphite)] uppercase tracking-wider">Order Support</h4>
                  <p className="text-[10px] text-[var(--color-gray-blue)]/80 font-light">Direct runner communication desk</p>
                </div>
                <button
                  onClick={() => setSupportOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-[var(--color-silver-fog)]/30 flex items-center justify-center text-[var(--color-deep-slate)] focus:outline-none"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Chat history logs area */}
              <div className="flex-grow overflow-y-auto space-y-4 mb-4 pr-1 scrollbar-none">
                {supportHistory.map((chat, idx) => (
                  <div
                    key={idx}
                    className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                        chat.sender === 'user'
                          ? 'bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] text-white shadow-sm rounded-br-none'
                          : 'bg-white border border-[var(--color-silver-fog)]/20 text-[var(--color-rich-graphite)] rounded-bl-none shadow-sm font-light'
                      }`}
                    >
                      {chat.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input form area */}
              <form onSubmit={handleSupportSend} className="flex gap-2">
                <input
                  type="text"
                  value={supportMsg}
                  onChange={(e) => setSupportMsg(e.target.value)}
                  placeholder="Ask a question about your order..."
                  className="flex-grow px-4 py-3 bg-white border border-[var(--color-silver-fog)]/40 focus:border-[var(--color-muted-teal)] rounded-xl text-xs font-light focus:outline-none transition-all shadow-inner"
                />
                <button
                  type="submit"
                  className="w-11 h-11 bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] text-white rounded-xl shadow flex items-center justify-center hover:shadow-md transition-shadow"
                >
                  <FiSend size={16} />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default OrderDetails;
