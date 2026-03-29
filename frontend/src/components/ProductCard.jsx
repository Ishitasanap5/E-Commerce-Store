import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { Star, Plus } from 'lucide-react';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="group bg-white rounded [2rem] p-4 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
      <div className="relative aspect [4/5] w-full overflow-hidden rounded [1.5rem] bg-[#f9f9f9]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain p-8 transition-transform duration-700 group-hover:scale-110"
        />
        <button 
          onClick={() => dispatch(addToCart(product))}
          className="absolute bottom-4 right-4 bg-white p-3 rounded-2xl shadow-lg translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white"
        >
          <Plus size={20} />
        </button>
      </div>
      
      <div className="mt-5 px-2">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600/80">{product.category}</span>
            <h3 className="text-base font-medium text-gray-900 mt-1 line-clamp-1">{product.name}</h3>
          </div>
          <p className="text-lg font-bold text-gray-900">${product.price}</p>
        </div>
        
        <div className="flex items-center mt-2 space-x-1">
          <Star size={12} className="fill-orange-400 text-orange-400" />
          <span className="text-xs font-bold text-gray-900">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.numReviews})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;