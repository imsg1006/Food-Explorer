import React, { useContext } from 'react';
import { Plus, Minus } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const ProductCard = ({ product, onClick }) => {
  const { addToCart, cart, updateQuantity } = useContext(AppContext);
  
   
  const cartItem = cart?.find(item => item.code === product.code);
  const isInCart = !!cartItem;
  const quantity = cartItem?.quantity || 0;
  
  const nutriScore = product.nutrition_grades || 'N/A';
  const nutriScoreColor = {
    'a': 'bg-green-500',
    'b': 'bg-yellow-400',
    'c': 'bg-orange-400',
    'd': 'bg-red-400',
    'e': 'bg-red-600'
  }[nutriScore.toLowerCase()] || 'bg-gray-400';

  const handleIncrease = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    if (quantity > 1) {
      updateQuantity(product.code, quantity - 1);
    } else {
      updateQuantity(product.code, 0);  
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-100">
      <div
        className="relative w-full h-48 bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden cursor-pointer group"
        onClick={onClick}
      >
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.product_name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        <div className={`absolute top-2 right-2 ${nutriScoreColor} text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg`}>
          {nutriScore.toUpperCase()}
        </div>
      </div>

      <div className="p-4 cursor-pointer" onClick={onClick}>
        <h3 className="font-semibold text-gray-800 line-clamp-2 hover:text-purple-600 transition-colors">
          {product.product_name || 'Unknown Product'}
        </h3>
        <p className="text-sm text-gray-600 mt-1">{product.categories || 'Uncategorized'}</p>
        <p className="text-xs text-gray-500 mt-2 line-clamp-2">
          {product.ingredients_text ? product.ingredients_text.substring(0, 50) + '...' : 'No ingredients listed'}
        </p>
      </div>

      <div className="px-4 pb-4 pt-2 border-t border-purple-50">
        {isInCart ? (
          
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleDecrease}
              className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 rounded-lg transition-all shadow-sm"
            >
              <Minus className="w-5 h-5 text-gray-700" />
            </button>
            
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent min-w-[40px] text-center">
              {quantity}
            </span>
            
            <button
              onClick={handleIncrease}
              className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg transition-all shadow-sm"
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>
        ) : (
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;