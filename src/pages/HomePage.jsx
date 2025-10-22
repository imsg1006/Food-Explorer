import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HomePage = ({ onProductSelect }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [barcodeQuery, setBarcodeQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 24;
 
  useEffect(() => {
    fetchInitialProducts();
    fetchCategories();
  }, []);

  const fetchInitialProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://world.openfoodfacts.org/cgi/search.pl?search_terms=&page_size=200&json=true');
      const data = await response.json();
      console.log('Initial products loaded:', data.products?.length || 0);
      setAllProducts(data.products || []);
    } catch (error) {
      console.error('Error loading initial products:', error);
      setAllProducts([]);
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://world.openfoodfacts.org/categories.json');
      const data = await response.json();
      if (data.tags) {
        const cats = Object.keys(data.tags).slice(0, 30);
        setCategories(cats);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
 
  const handleSearchByName = async () => {
    if (!searchQuery.trim()) {
      fetchInitialProducts();
      return;
    }
    
    setLoading(true);
    setCurrentPage(1);
    try {
      const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(searchQuery)}&page_size=200&json=true`);
      const data = await response.json();
      console.log('Search results:', data.products?.length || 0);
      setAllProducts(data.products || []);
    } catch (error) {
      console.error('Error searching products:', error);
      setAllProducts([]);
    }
    setLoading(false);
  };
 
  const handleSearchByBarcode = async () => {
    if (!barcodeQuery.trim()) {
      fetchInitialProducts();
      return;
    }
    
    setLoading(true);
    setCurrentPage(1);
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcodeQuery.trim()}.json`);
      const data = await response.json();
      console.log('Barcode search result:', data);
      if (data.status === 1 && data.product) {
        setAllProducts([data.product]);
      } else {
        setAllProducts([]);
        alert('Product not found with this barcode');
      }
    } catch (error) {
      console.error('Error searching by barcode:', error);
      setAllProducts([]);
    }
    setLoading(false);
  };
 
  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setBarcodeQuery('');
    
    if (!category) {
      fetchInitialProducts();
      return;
    }
    
    setLoading(true);
    setCurrentPage(1);
    try {
      const response = await fetch(`https://world.openfoodfacts.org/category/${encodeURIComponent(category)}.json`);
      const data = await response.json();
      console.log('Category products:', data.products?.length || 0);
      setAllProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching category:', error);
      setAllProducts([]);
    }
    setLoading(false);
  };
 
  const sortedProducts = [...allProducts].sort((a, b) => {
    if (sortBy === 'name') {
      return (a.product_name || '').localeCompare(b.product_name || '');
    } else if (sortBy === 'name-desc') {
      return (b.product_name || '').localeCompare(a.product_name || '');
    } else if (sortBy === 'nutrition-asc') {
      const gradeA = (a.nutrition_grades || 'z').charCodeAt(0);
      const gradeB = (b.nutrition_grades || 'z').charCodeAt(0);
      return gradeA - gradeB;
    } else if (sortBy === 'nutrition-desc') {
      const gradeA = (a.nutrition_grades || 'z').charCodeAt(0);
      const gradeB = (b.nutrition_grades || 'z').charCodeAt(0);
      return gradeB - gradeA;
    }
    return 0;
  });
 
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

   
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

   
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-100">
       
      <div className="bg-white p-6 shadow-md sticky top-0 z-10 border-b-2 border-purple-100">
        <div className="max-w-7xl mx-auto space-y-4">
           
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search by product name (e.g., 'coca cola')..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setBarcodeQuery('');
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchByName()}
                className="flex-1 px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleSearchByName}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors shadow-md hover:shadow-lg"
              >
                Search
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search by barcode (e.g., '737628064502')..."
                value={barcodeQuery}
                onChange={(e) => {
                  setBarcodeQuery(e.target.value);
                  setSearchQuery('');
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchByBarcode()}
                className="flex-1 px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button
                onClick={handleSearchByBarcode}
                className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 font-medium transition-colors shadow-md hover:shadow-lg"
              >
                Search
              </button>
            </div>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="name">Product Name (A-Z)</option>
                <option value="name-desc">Product Name (Z-A)</option>
                <option value="nutrition-asc">Nutrition Grade (Best)</option>
                <option value="nutrition-desc">Nutrition Grade (Worst)</option>
              </select>
            </div>
          </div>

           
          {(searchQuery || barcodeQuery || selectedCategory) && (
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setBarcodeQuery('');
                  setSelectedCategory('');
                  fetchInitialProducts();
                }}
                className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-medium transition-colors shadow-md hover:shadow-lg"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

       
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : currentProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md p-8 border border-purple-100">
            <p className="text-gray-500 text-xl mb-4">No products found</p>
            <p className="text-gray-400">Try searching for "coca cola" or select a category</p>
          </div>
        ) : (
          <>
            
            <div className="mb-6 flex justify-between items-center">
              <div className="text-gray-700 font-medium">
                Showing {startIndex + 1}-{Math.min(endIndex, sortedProducts.length)} of {sortedProducts.length} products
              </div>
              {totalPages > 1 && (
                <div className="text-gray-700">
                  Page {currentPage} of {totalPages}
                </div>
              )}
            </div>
             
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentProducts.map((product, index) => (
                <ProductCard
                  key={product.code || `product-${index}`}
                  product={product}
                  onClick={() => onProductSelect(product)}
                />
              ))}
            </div>

             
            {totalPages > 1 && (
              <div className="mt-12 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                   
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                      currentPage === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                 
                  <div className="flex items-center gap-2">
                    {getPageNumbers().map((pageNum, index) => (
                      pageNum === '...' ? (
                        <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                          ...
                        </span>
                      ) : (
                        <button
                          key={pageNum}
                          onClick={() => handlePageClick(pageNum)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 min-w-[44px] ${
                            currentPage === pageNum
                              ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md'
                              : 'bg-white text-gray-700 hover:bg-purple-50 border-2 border-purple-200 hover:border-purple-300'
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    ))}
                  </div>

                   
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                      currentPage === totalPages
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg'
                    }`}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                 
                <div className="text-center text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;