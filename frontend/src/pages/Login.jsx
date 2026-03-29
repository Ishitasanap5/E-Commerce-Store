import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setCredentials } from '../redux/authSlice';
import API from '../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', { email, password });
      dispatch(setCredentials(data));
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB] px-6">
      <div className="max-w-md w-full bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-100">
        <h2 className="text-3xl font-serif text-center mb-2">Welcome Back</h2>
        <p className="text-slate-400 text-center text-sm mb-10">Enter your details to access your account.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4 mb-2 block">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-orange-100 transition-all outline-none" 
              value={email} onChange={(e) => setEmail(e.target.value)} required 
            />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4 mb-2 block">Password</label>
            <input 
              type="password" 
              className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-orange-100 transition-all outline-none" 
              value={password} onChange={(e) => setPassword(e.target.value)} required 
            />
          </div>
          <button className="w-full bg-black text-white py-5 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-100">
            Sign In
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-slate-500">
          New here? <Link to="/register" className="text-black font-bold border-b border-black">Create account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;