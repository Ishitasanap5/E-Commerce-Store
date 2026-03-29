import React from 'react';
import { FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa';
import { ArrowRight } from 'lucide-react'; // keep ArrowRight from lucide

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="text-2xl font-serif tracking-tight text-slate-900">
              ShopNow<span className="text-orange-600">.</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Elevating the everyday through curated design and sustainable craftsmanship. Join us in our journey toward a more intentional lifestyle.
            </p>
            <div className="flex space-x-4 text-slate-400">
              <FaInstagram size={20} className="hover:text-orange-600 cursor-pointer transition-colors" />
              <FaTwitter size={20} className="hover:text-orange-600 cursor-pointer transition-colors" />
              <FaFacebookF size={20} className="hover:text-orange-600 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="/new" className="hover:text-orange-600 transition-colors">New Arrivals</a></li>
              <li><a href="/best-sellers" className="hover:text-orange-600 transition-colors">Best Sellers</a></li>
              <li><a href="/home-decor" className="hover:text-orange-600 transition-colors">Home Decor</a></li>
              <li><a href="/apothecary" className="hover:text-orange-600 transition-colors">Apothecary</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">Assistance</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="/shipping" className="hover:text-orange-600 transition-colors">Shipping & Delivery</a></li>
              <li><a href="/returns" className="hover:text-orange-600 transition-colors">Returns & Exchanges</a></li>
              <li><a href="/faq" className="hover:text-orange-600 transition-colors">FAQs</a></li>
              <li><a href="/contact" className="hover:text-orange-600 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">Journal</h4>
            <p className="text-sm text-slate-500 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full border-b border-slate-200 py-3 text-sm focus:outline-none focus:border-orange-600 transition-colors pr-10 bg-transparent"
              />
              <button className="absolute right-0 top-3 text-slate-400 hover:text-orange-600">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            © 2026 Essence Collective. All Rights Reserved.
          </p>
          <div className="flex space-x-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <span className="hover:text-slate-900 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-900 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;