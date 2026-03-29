import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Search } from 'lucide-react';
import { useSelector } from 'react-redux';

const Navbar = ({ filters, setFilters }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#FDFCFB]/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* Brand */}
        <Link to="/" className="text-xl font-serif tracking-tighter text-slate-900">
          ShopNow<span className="text-orange-600">.</span>
        </Link>

        {/* Integrated Search - The only "Header" element left */}
        <div className="flex-1 max-w-md mx-10 relative group">
          <input
            type="text"
            placeholder="Search collections..."
            value={filters?.search || ''}
            onChange={(e) => {
              setFilters({ ...filters, search: e.target.value });
              if (window.location.pathname !== '/') navigate('/');
            }}
            className="w-full bg-slate-100/50 border-none rounded-full py-2 pl-11 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all outline-none"
          />
          <Search className="absolute left-4 top-2.5 text-slate-300 group-focus-within:text-orange-600 transition-colors" size={18} strokeWidth={1.5} />
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-6 text-slate-700">
          <Link to="/login" className="hover:text-orange-600 transition-colors">
            <User size={20} strokeWidth={1.5} />
          </Link>
          <Link to="/cart" className="relative hover:text-orange-600 transition-colors">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[8px] flex items-center justify-center rounded-full font-bold">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;