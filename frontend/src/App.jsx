import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  // Global filter state shared between Navbar (Search) and Home (Display)
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: 0,
    maxPrice: 2000,
    minRating: 0,
  });

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#FDFCFB] selection:bg-orange-100 selection:text-orange-900">
        
        {/* Navbar is always visible and handles the Search Bar */}
        <Navbar filters={filters} setFilters={setFilters} />

        {/* Main Content Area */}
        <div className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={<Home filters={filters} setFilters={setFilters} />} 
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/checkout" element={<Checkout />} />
            </Route>

            {/* Fallback to Home */}
            <Route path="*" element={<Home filters={filters} setFilters={setFilters} />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;