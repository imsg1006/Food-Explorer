import React, { useState } from 'react';

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(p => p.code === product.code);
      if (existing) {
        return prev.map(p => 
          p.code === product.code 
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productCode) => {
    setCart(prev => prev.filter(p => p.code !== productCode));
  };

  const updateQuantity = (productCode, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productCode);
      return;
    }
    
    setCart(prev => 
      prev.map(p => 
        p.code === productCode 
          ? { ...p, quantity: newQuantity }
          : p
      )
    );
  };

  return (
    <AppContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </AppContext.Provider>
  );
};