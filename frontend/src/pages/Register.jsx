import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setCredentials } from '../redux/authSlice';
import API from '../utils/api';
import Navbar from '../components/Navbar';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { name, email, password, confirmPassword } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      // Hits your POST /api/auth/register route
      const { data } = await API.post('/auth/register', { name, email, password });
      
      // Saves user & token to Redux and LocalStorage
      dispatch(setCredentials(data));
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      <Navbar />
      <div className="flex items-center justify-center py-20 px-6">
        <div className="max-w-md w-full bg-white p-10 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100">
          <header className="text-center mb-10">
            <h2 className="text-3xl font-serif text-slate-900 mb-2">Create Account</h2>
            <p className="text-slate-400 text-sm">Join our community of intentional living.</p>
          </header>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4 mb-2 block">
                Full Name
              </label>
              <input 
                type="text" 
                name="name"
                className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-orange-100 transition-all outline-none text-sm" 
                placeholder="Ishita Sanap"
                value={name} 
                onChange={onChange} 
                required 
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4 mb-2 block">
                Email Address
              </label>
              <input 
                type="email" 
                name="email"
                className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-orange-100 transition-all outline-none text-sm" 
                placeholder="ishita@example.com"
                value={email} 
                onChange={onChange} 
                required 
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4 mb-2 block">
                Password
              </label>
              <input 
                type="password" 
                name="password"
                className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-orange-100 transition-all outline-none text-sm" 
                placeholder="••••••••"
                value={password} 
                onChange={onChange} 
                required 
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4 mb-2 block">
                Confirm Password
              </label>
              <input 
                type="password" 
                name="confirmPassword"
                className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-orange-100 transition-all outline-none text-sm" 
                placeholder="••••••••"
                value={confirmPassword} 
                onChange={onChange} 
                required 
              />
            </div>

            <button className="w-full bg-black text-white py-5 rounded-2xl font-bold mt-4 hover:bg-slate-800 transition-all shadow-xl shadow-slate-100 active:scale-[0.98]">
              Create Account
            </button>
          </form>

          <footer className="mt-10 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-black font-bold border-b border-black hover:text-orange-600 hover:border-orange-600 transition-colors">
              Sign In
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Register;