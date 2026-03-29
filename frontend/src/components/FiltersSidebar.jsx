import React from 'react';

const FiltersSidebar = ({ filters, setFilters }) => {
  const categories = ['Living Room', 'Kitchen', 'Bedroom', 'Apothecary', 'Office'];

  const handleCategoryChange = (category) => {
    // If clicking the same category, clear it; otherwise, set it
    setFilters({ 
      ...filters, 
      category: filters.category === category ? '' : category 
    });
  };

  const handlePriceChange = (e) => {
    setFilters({ ...filters, maxPrice: Number(e.target.value) });
  };

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block">
      <div className="sticky top-32 space-y-12">
        
        {/* Collections / Categories */}
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 mb-6">
            Collections
          </h3>
          <ul className="space-y-4">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => handleCategoryChange(cat)}
                  className={`text-sm transition-all duration-300 ${
                    filters.category === cat 
                    ? 'text-orange-600 font-bold translate-x-1' 
                    : 'text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 mb-6">
            Price Filter
          </h3>
          <div className="pr-4">
            <input
              type="range"
              min="0"
              max="2000"
              step="100"
              value={filters.maxPrice}
              onChange={handlePriceChange}
              className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
            <div className="flex justify-between mt-4 text-[11px] font-medium text-slate-400">
              <span>$0</span>
              <span className="text-slate-900 font-bold">Up to ${filters.maxPrice}</span>
            </div>
          </div>
        </div>

        {/* Ratings Filter */}
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 mb-6">
            Minimum Rating
          </h3>
          <div className="space-y-3">
            {[4, 3, 2].map((star) => (
              <label key={star} className="flex items-center group cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  className="hidden"
                  checked={filters.minRating === star}
                  onChange={() => setFilters({ ...filters, minRating: star })}
                />
                <span className={`w-4 h-4 rounded-full border mr-3 transition-all ${
                  filters.minRating === star 
                  ? 'bg-orange-600 border-orange-600 ring-4 ring-orange-50' 
                  : 'border-slate-200 group-hover:border-slate-400'
                }`} />
                <span className={`text-sm transition-colors ${
                  filters.minRating === star ? 'text-slate-900 font-medium' : 'text-slate-500'
                }`}>
                  {star}+ Stars
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Reset Action */}
        <button 
          onClick={() => setFilters({ search: '', category: '', maxPrice: 2000, minRating: 0 })}
          className="pt-4 text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-orange-600 transition-colors border-t border-slate-50 w-full text-left"
        >
          Clear All Filters
        </button>
      </div>
    </aside>
  );
};

export default FiltersSidebar;