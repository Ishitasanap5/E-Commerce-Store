import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import FiltersSidebar from '../components/FiltersSidebar';

const Home = ({ filters, setFilters }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // These keys match the destructuring in your productController.js
        const { data } = await API.get('/products', {
          params: { 
            search: filters.search, 
            category: filters.category,
            maxPrice: filters.maxPrice, 
            minRating: filters.minRating 
          }
        });
        setProducts(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search slightly if needed, or fetch immediately on filter change
    fetchProducts();
  }, [filters]);

  return (
    <div className="bg-[#FDFCFB] min-h-screen flex flex-col">
      {/* Navbar is handled at App.jsx level, but if you have it here, 
          ensure it receives the same props */}
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col md:flex-row gap-12 flex-grow w-full">
        {/* Sidebar for Marketplace-style filtering */}
        <FiltersSidebar filters={filters} setFilters={setFilters} />
        
        <div className="flex-1">
          {/* Subtle Page Info */}
          <div className="flex justify-between items-end mb-10 border-b border-slate-100 pb-6">
            <div>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300 mb-2">
                {filters.category ? `Collections / ${filters.category}` : 'Collections / All Objects'}
              </h2>
              <p className="text-sm font-medium text-slate-900">
                {loading ? 'Updating collection...' : `${products.length} Items Available`}
              </p>
            </div>
          </div>

          {loading ? (
            /* Loading Shimmer State */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="space-y-4">
                  <div className="h-96 bg-slate-100 animate-pulse rounded-[2rem]" />
                  <div className="h-4 w-2/3 bg-slate-50 animate-pulse rounded-full" />
                  <div className="h-4 w-1/4 bg-slate-50 animate-pulse rounded-full" />
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            /* Product Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="py-40 text-center">
              <h3 className="text-xl font-serif text-slate-900 mb-2">No results found</h3>
              <p className="text-slate-400 text-sm mb-8">Try adjusting your filters or search terms.</p>
              <button 
                onClick={() => setFilters({ search: '', category: '', maxPrice: 2000, minRating: 0 })}
                className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-orange-600 hover:border-orange-600 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;