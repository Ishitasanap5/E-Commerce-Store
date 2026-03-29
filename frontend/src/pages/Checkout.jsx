import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { clearCart } from '../redux/cartSlice';

const Checkout = () => {
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          product: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          qty: item.qty
        })),
        totalPrice
      };
      await API.post('/orders', orderData);
      dispatch(clearCart());
      alert("Order placed successfully!");
      navigate('/');
    } catch (err) {
      alert("Order failed: " + err.message);
    }
  };

  return (
    <div className="bg-[#FDFCFB] min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-serif mb-8 text-slate-900">Checkout</h2>
          <div className="bg-white p-8 rounded [2rem] border border-slate-100 space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">Shipping Details</h4>
            <p className="text-sm text-slate-600 italic">This section is for demo purposes. Orders are currently processed as "Standard Delivery".</p>
          </div>
        </div>

        <div className="bg-white p-10 rounded[2rem] border border-slate-100 shadow-sm self-start">
          <h3 className="text-xl font-serif mb-8">Order Summary</h3>
          <div className="space-y-4 mb-8">
            {cartItems.map(item => (
              <div key={item._id} className="flex justify-between text-sm">
                <span className="text-slate-500">{item.name} (x{item.qty})</span>
                <span className="font-medium">${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-100 pt-6 flex justify-between text-lg font-bold">
            <span>Total</span><span>${totalPrice.toFixed(2)}</span>
          </div>
          <button 
            onClick={handlePlaceOrder}
            className="w-full bg-black text-white py-5 rounded-2xl font-bold mt-10 hover:bg-slate-800 transition-all"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;