import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';
import { Trash2, Minus, Plus, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';

const Cart = () => {
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link to="/" className="flex items-center text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-black mb-10 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Continue Shopping
        </Link>
        
        <h1 className="text-4xl font-serif mb-12 text-slate-900">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded[2rem]">
            <p className="text-slate-500 mb-6">Your cart is currently empty.</p>
            <Link to="/" className="bg-black text-white px-8 py-4 rounded-full font-medium">Browse Products</Link>
          </div>
        ) : (
          <div className="space-y-8">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-6 pb-8 border-b border-slate-100">
                <img src={item.image} alt={item.name} className="w-24 h-32 object-contain bg-slate-50 rounded-2xl p-4" />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-slate-900">{item.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">${item.price}</p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-slate-200 rounded-full px-2 py-1">
                      <button onClick={() => dispatch(updateQuantity({ id: item._id, qty: Math.max(1, item.qty - 1) }))} className="p-1 hover:text-orange-600"><Minus size={14} /></button>
                      <span className="px-4 text-sm font-bold">{item.qty}</span>
                      <button onClick={() => dispatch(updateQuantity({ id: item._id, qty: item.qty + 1 }))} className="p-1 hover:text-orange-600"><Plus size={14} /></button>
                    </div>
                    <button onClick={() => dispatch(removeFromCart(item._id))} className="text-slate-300 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <p className="text-lg font-bold text-slate-900">${(item.price * item.qty).toFixed(2)}</p>
              </div>
            ))}

            <div className="pt-10 flex flex-col items-end">
              <div className="w-full md:w-80 space-y-4">
                <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
                <div className="flex justify-between text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
                  <span>Total</span><span>${totalPrice.toFixed(2)}</span>
                </div>
                <Link to="/checkout" className="block w-full bg-black text-white text-center py-5 rounded-full font-bold mt-8 hover:bg-slate-800 transition-all">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;