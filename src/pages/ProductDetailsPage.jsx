import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const ProductDetailPage = ({ product, onBack }) => {
  const { addToCart } = useContext(AppContext);

  const nutriScore = product.nutrition_grades || 'N/A';
  const nutriScoreColor = {
    'a': 'bg-green-500',
    'b': 'bg-yellow-400',
    'c': 'bg-orange-400',
    'd': 'bg-red-400',
    'e': 'bg-red-600'
  }[nutriScore.toLowerCase()] || 'bg-gray-400';

  const labels = product.labels ? product.labels.split(',').map(l => l.trim()) : [];

  return (
    <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 border border-purple-100">
        <button
          onClick={onBack}
          className="mb-6 text-purple-600 hover:text-purple-800 font-medium flex items-center gap-2 transition-colors"
        >
          ← Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           
          <div className="md:col-span-1">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg h-80 flex items-center justify-center overflow-hidden border-2 border-purple-100">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.product_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400 text-center">No Image Available</div>
              )}
            </div>
            <div className={`${nutriScoreColor} text-white text-center py-3 rounded-lg mt-4 text-2xl font-bold shadow-md`}>
              Grade: {nutriScore.toUpperCase()}
            </div>
          </div>
 
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                {product.product_name || 'Unknown Product'}
              </h1>
              <p className="text-gray-600 mt-3">
                <span className="font-semibold text-purple-700">Barcode:</span> {product.code || 'N/A'}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold text-purple-700">Category:</span> {product.categories || 'Uncategorized'}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold text-purple-700">Brand:</span> {product.brands || 'N/A'}
              </p>
            </div>
 
            {labels.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Labels</h3>
                <div className="flex flex-wrap gap-2">
                  {labels.map((label, i) => (
                    <span key={i} className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium border border-purple-200">
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            )}
 
            {product.ingredients_text && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Ingredients</h3>
                <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-purple-100">
                  {product.ingredients_text}
                </p>
              </div>
            )}
 
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Nutritional Values (per 100g)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                  <p className="text-gray-600 text-sm">Energy</p>
                  <p className="text-xl font-bold text-purple-700">{product.nutriments?.energy_kcal_100g || 'N/A'} kcal</p>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-lg border border-pink-200">
                  <p className="text-gray-600 text-sm">Fat</p>
                  <p className="text-xl font-bold text-pink-700">{product.nutriments?.fat_100g || 'N/A'} g</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                  <p className="text-gray-600 text-sm">Carbohydrates</p>
                  <p className="text-xl font-bold text-purple-700">{product.nutriments?.carbohydrates_100g || 'N/A'} g</p>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-lg border border-pink-200">
                  <p className="text-gray-600 text-sm">Protein</p>
                  <p className="text-xl font-bold text-pink-700">{product.nutriments?.proteins_100g || 'N/A'} g</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                  <p className="text-gray-600 text-sm">Fiber</p>
                  <p className="text-xl font-bold text-purple-700">{product.nutriments?.fiber_100g || 'N/A'} g</p>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-lg border border-pink-200">
                  <p className="text-gray-600 text-sm">Salt</p>
                  <p className="text-xl font-bold text-pink-700">{product.nutriments?.salt_100g || 'N/A'} g</p>
                </div>
              </div>
            </div>

             
            <button
              onClick={() => addToCart(product)}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;