import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import { AppProvider } from './context/AppContext';

export default function FoodExplorer() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <AppProvider>
      <div className="flex flex-col h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div
              className="text-2xl font-bold cursor-pointer hover:text-purple-100 transition-colors"
              onClick={() => {
                setCurrentPage('home');
                setSelectedProduct(null);
              }}
            >
              🍽️ Food Explorer
            </div>
            <nav className="flex items-center space-x-6">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setSelectedProduct(null);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 'home' && !selectedProduct
                    ? 'bg-white/20 backdrop-blur-sm'
                    : 'hover:bg-white/10'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setCurrentPage('cart')}
                className={`relative px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  currentPage === 'cart'
                    ? 'bg-white/20 backdrop-blur-sm'
                    : 'hover:bg-white/10'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                Cart
              </button>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {selectedProduct ? (
            <ProductDetailPage
              product={selectedProduct}
              onBack={() => setSelectedProduct(null)}
            />
          ) : currentPage === 'home' ? (
            <HomePage
              onProductSelect={setSelectedProduct}
            />
          ) : (
            <CartPage />
          )}
        </div>
      </div>
    </AppProvider>
  );
}