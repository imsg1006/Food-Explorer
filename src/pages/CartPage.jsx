import React, { useContext } from 'react';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const CartPage = () => {
  const context = useContext(AppContext);
  const { cart, removeFromCart, addToCart, updateQuantity } = context || {};

  const total = cart?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

  const handleIncreaseQuantity = (item) => {
    addToCart(item);
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      if (updateQuantity) {
        updateQuantity(item.code, item.quantity - 1);
      }
    } else {
      removeFromCart(item.code);
    }
  };

  if (!cart) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center border border-purple-100">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-12 h-12 text-purple-600" />
            </div>
            <p className="text-gray-600 text-lg">Your cart is empty</p>
            <p className="text-gray-400 text-sm mt-2">Start adding some delicious products!</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-purple-100">
            <div className="divide-y divide-purple-50">
              {cart.map(item => (
                <div key={item.code} className="p-6 flex items-center justify-between hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all">
                  <div className="flex items-center space-x-4 flex-1">
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.product_name}
                        className="w-20 h-20 object-cover rounded-lg border-2 border-purple-200 shadow-md"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.product_name}</h3>
                      <p className="text-sm text-gray-600">{item.categories}</p>
                      
                      
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => handleDecreaseQuantity(item)}
                          className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 rounded-lg transition-all shadow-sm"
                        >
                          <Minus className="w-4 h-4 text-gray-700" />
                        </button>
                        
                        <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent min-w-[40px] text-center">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => handleIncreaseQuantity(item)}
                          className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg transition-all shadow-sm"
                        >
                          <Plus className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                   
                  <button
                    onClick={() => removeFromCart(item.code)}
                    className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-red-200 hover:border-red-300"
                    title="Remove from cart"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-t-2 border-purple-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-800">Total Items:</span>
                <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  {total}
                </span>
              </div>
              <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;