# 🍔 Food Product Explorer

A modern, elegant web application for exploring food products using the OpenFoodFacts API. Built with React and styled with Tailwind CSS featuring a sophisticated purple-pink color scheme.

![Modern Gourmet Theme](https://img.shields.io/badge/Theme-Modern%20Gourmet-8B5CF6)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwind-css)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Color Scheme](#color-scheme)
- [API Integration](#api-integration)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)

---

## ✨ Features

### 🔍 Search & Filter
- **Search by Name** - Find products by typing their name (e.g., "coca cola")
- **Search by Barcode** - Look up specific products using barcode numbers
- **Category Filter** - Browse products by food categories (beverages, snacks, dairy, etc.)
- **Sort Functionality** - Sort products by:
  - Product Name (A-Z or Z-A)
  - Nutrition Grade (Best to Worst or Worst to Best)
- **Clear Filters** - Reset all filters with one click

### 📄 Pagination
- **Page-based Navigation** - 24 products per page
- **Previous/Next Buttons** - Easy navigation between pages
- **Page Numbers** - Click any page number to jump directly
- **Smart Page Display** - Shows relevant page numbers with ellipsis for large datasets
- **Smooth Scrolling** - Auto-scroll to top when changing pages

### 🛒 Shopping Cart
- **Add to Cart** - Add products from product cards or detail page
- **Dynamic Quantity Controls** - +/- buttons appear on product cards when item is in cart
- **Quantity Management** - Increase or decrease quantities directly
- **Remove Items** - Delete products from cart
- **Real-time Updates** - Cart count updates instantly in header
- **Persistent State** - Cart maintained during session using React Context

### 📦 Product Display
- **Product Cards** - Beautiful card layout with:
  - Product image with hover zoom effect
  - Product name and category
  - Ingredients preview
  - Nutrition grade badge (A-E)
  - Add to cart / quantity controls
- **Product Detail Page** - Comprehensive product information:
  - Large product image
  - Full product details (barcode, brand, category)
  - Complete ingredients list
  - Nutritional values (energy, fat, carbs, protein, fiber, salt)
  - Product labels (vegan, gluten-free, etc.)
  - Nutrition grade with color coding

### 🎨 User Experience
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Smooth Animations** - Transitions and hover effects throughout
- **Loading States** - Spinner and messages during data fetching
- **Empty States** - Helpful messages when no products found
- **Visual Feedback** - Hover effects, shadows, and gradients
- **Gradient Accents** - Premium purple-to-pink gradients on interactive elements

---

## 🛠 Tech Stack

### Frontend Framework
- **React 18.x** - Component-based UI library
- **React Hooks** - useState, useEffect, useContext, useCallback, useRef

### Styling
- **Tailwind CSS 3.x** - Utility-first CSS framework
- **Custom Gradients** - Purple-to-pink color schemes
- **Responsive Design** - Mobile-first approach

### Icons
- **Lucide React** - Beautiful, consistent icon library
  - ShoppingCart, ChevronLeft, ChevronRight, Plus, Minus, Trash2

### State Management
- **React Context API** - Global state management for shopping cart
- **Custom Hooks** - Efficient state handling

### API Integration
- **Fetch API** - Native JavaScript for HTTP requests
- **OpenFoodFacts API** - Real-time food product data

### Development Tools
- **Create React App** - Project setup and build tooling
- **ES6+ JavaScript** - Modern JavaScript features
- **CSS Modules** - Scoped styling

---

## 🎨 Color Scheme

### Modern Gourmet Theme

Our application uses a sophisticated, elegant color palette perfect for a premium food product explorer:

#### Primary Colors
```
Primary Purple:   #8B5CF6 (Purple-600)
Secondary Pink:   #EC4899 (Pink-500)
Accent Amber:     #F59E0B (Amber-500)
```

#### Background Colors
```
Page Background:  #F3F4F6 (Gray-100)
Card Background:  #FFFFFF (White)
Section BG:       #F9FAFB (Gray-50)
```

#### Text Colors
```
Primary Text:     #111827 (Gray-900)
Secondary Text:   #6B7280 (Gray-600)
Accent Text:      #8B5CF6 (Purple-600)
```

#### Gradient Combinations
```css
/* Header Gradient */
background: linear-gradient(to right, #8B5CF6, #EC4899);

/* Button Gradient */
background: linear-gradient(to right, #8B5CF6, #EC4899);

/* Card Gradient Background */
background: linear-gradient(to bottom right, #F5F3FF, #FCE7F3);

/* Nutrition Card Gradients */
/* Purple: */ linear-gradient(to bottom right, #F5F3FF, #E9D5FF);
/* Pink: */ linear-gradient(to bottom right, #FCE7F3, #FBCFE8);
```

#### Nutrition Grade Colors
```
Grade A: #10B981 (Green-500)  - Excellent
Grade B: #FBBF24 (Yellow-400) - Good
Grade C: #FB923C (Orange-400) - Fair
Grade D: #F87171 (Red-400)    - Poor
Grade E: #DC2626 (Red-600)    - Bad
```

#### UI Element Colors
- **Primary Actions**: Purple-600 → Pink-500 gradient
- **Secondary Actions**: Pink-500
- **Tertiary Actions**: Amber-500
- **Destructive Actions**: Red-500
- **Disabled States**: Gray-200
- **Borders**: Purple-100, Pink-100
- **Shadows**: Enhanced with purple tints

---
 
 

### Component Breakdown

#### `App.jsx`
- Main application component
- Header with navigation
- Page routing logic
- Context provider wrapper

#### `HomePage.jsx`
- Product search and filtering
- Category dropdown
- Sort functionality
- Pagination controls
- Product grid display

#### `ProductCard.jsx`
- Product preview card
- Image with hover effect
- Nutrition grade badge
- Dynamic cart controls
- Click to view details

#### `ProductDetailPage.jsx`
- Full product information
- Large product image
- Nutritional facts grid
- Ingredients display
- Labels and certifications
- Add to cart functionality

#### `CartPage.jsx`
- Cart items list
- Quantity controls (+/-)
- Remove item button
- Total items count
- Checkout button

#### `AppContext.jsx`
- Global cart state
- Add to cart function
- Remove from cart function
- Update quantity function

---

## 🚀 Installation

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

### Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd food-product-explorer
```

2. **Install dependencies**
```bash
npm install
```

3. **Install required packages**
```bash
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
```

4. **Initialize Tailwind CSS**
```bash
npx tailwindcss init -p
```

5. **Configure Tailwind** (if not already configured)

Update `tailwind.config.js`:
```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Update `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

6. **Start the development server**
```bash
npm start
```

The app will open at `http://localhost:3000`

---

## 📖 Usage

### Searching for Products

#### By Name
1. Type product name in the first search box (e.g., "pizza", "chocolate")
2. Click the purple **Search** button or press Enter
3. Products matching your search will appear

#### By Barcode
1. Type barcode number in the second search box (e.g., "737628064502")
2. Click the pink **Search** button or press Enter
3. The specific product will be displayed

### Filtering Products

#### By Category
1. Click the **Category** dropdown
2. Select a category (e.g., "Beverages", "Snacks")
3. Products will filter automatically

#### Sorting
1. Click the **Sort By** dropdown
2. Choose your sorting preference:
   - Product Name (A-Z)
   - Product Name (Z-A)
   - Nutrition Grade (Best)
   - Nutrition Grade (Worst)

### Navigating Pages
- Click **Next** to go to the next page
- Click **Previous** to go back
- Click page numbers to jump directly
- Use **Clear All Filters** to reset everything

### Managing Cart

#### Adding Items
- Click **Add to Cart** on any product card
- Button changes to show quantity controls (-, 1, +)
- Click + to increase quantity
- Click - to decrease quantity

#### Viewing Cart
1. Click **Cart** in the header
2. View all items with quantities
3. Adjust quantities using +/- buttons
4. Remove items with the trash icon
5. Click **Proceed to Checkout** when ready

### Viewing Product Details
1. Click anywhere on a product card (except the cart button)
2. View comprehensive product information
3. Check nutritional values
4. Read full ingredients list
5. Add to cart from detail page

---

## 📸 Screenshots

<img width="1920" height="1080" alt="Screenshot (84)" src="https://github.com/user-attachments/assets/12c3aeae-97ad-4437-955b-6443b9465655" />
<img width="1920" height="1080" alt="Screenshot (85)" src="https://github.com/user-attachments/assets/95c6863b-9358-45b3-8b82-23b512012239" />
<img width="1920" height="1080" alt="Screenshot (86)" src="https://github.com/user-attachments/assets/01f2f11a-2eda-4f49-a048-28a0b98c408c" />

### Homepage
- Clean, modern product grid
- Purple-pink gradient header
- Search bars with color-coded buttons
- Pagination controls at bottom

### Product Cards
- Hover effect with lift animation
- Gradient background on images
- Nutrition grade badges (color-coded)
- Dynamic cart controls

### Product Detail Page
- Large product image with gradient background
- Nutrition facts in alternating purple/pink cards
- Gradient text on product title
- Labels with gradient backgrounds

### Shopping Cart
- Items with images and details
- Quantity controls with gradient buttons
- Gradient accent on quantities
- Amber checkout button

---

## 🔧 Configuration

### Tailwind Configuration

Custom configuration in `tailwind.config.js`:
```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B5CF6',
        secondary: '#EC4899',
        accent: '#F59E0B',
      }
    },
  },
  plugins: [],
}
```

### API Configuration

Base URL can be modified in each component:
```javascript
const BASE_URL = 'https://world.openfoodfacts.org';
```

---

## 🌟 Key Features Highlight

✅ **Real-time Search** - Instant product search with OpenFoodFacts API  
✅ **Smart Pagination** - Navigate through 24 products per page  
✅ **Dynamic Cart** - Add/remove items with live quantity updates  
✅ **Nutrition Grades** - Color-coded A-E nutrition scoring  
✅ **Responsive Design** - Perfect on mobile, tablet, and desktop  
✅ **Modern UI** - Purple-pink gradient theme with smooth animations  
✅ **Detailed Info** - Complete nutritional facts and ingredients  
✅ **Category Filtering** - Browse by food categories  
✅ **Barcode Search** - Look up specific products instantly  

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

 

## 🙏 Acknowledgments

- **OpenFoodFacts** - For providing the free food product API
- **Tailwind CSS** - For the amazing utility-first CSS framework
- **Lucide Icons** - For beautiful, consistent icons
- **React Team** - For the powerful UI library

---

 

## 🔮 Future Enhancements

- [ ] User authentication and saved carts
- [ ] Product comparison feature
- [ ] Dietary preference filters (vegan, gluten-free, etc.)
- [ ] Advanced search with multiple filters
- [ ] Product reviews and ratings
- [ ] Favorite/wishlist functionality
- [ ] Export shopping list
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Price tracking integration

---

**Made with ❤️ using React and Tailwind CSS**

*A modern, elegant food product explorer for health-conscious consumers*
