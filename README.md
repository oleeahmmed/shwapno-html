# HTMX E-Commerce Shop - Dabur Products

A modern, responsive e-commerce website built with HTMX, Tailwind CSS, and vanilla JavaScript. Features a complete shopping experience with cart management, checkout, and product filtering.

## 🚀 Features

- **Homepage**: Hero section, featured products, and category navigation
- **Shop Page**: Product grid with advanced filtering and sorting
- **Product Details**: Detailed product information with related products
- **Checkout**: Complete checkout flow with delivery location selection
- **Shopping Cart**: Persistent cart with localStorage
- **Responsive Design**: Mobile-first design that works on all devices
- **HTMX Integration**: Dynamic content loading without page refreshes
- **No Backend Required**: All data stored in localStorage

## 📁 Project Structure

```
htmx-shop/
├── index.html              # Homepage
├── shop.html               # Products listing page
├── product.html            # Single product details page
├── checkout.html           # Checkout page
├── css/
│   └── styles.css          # Custom styles and animations
├── js/
│   ├── main.js             # Core functionality (cart, modals, etc.)
│   ├── shop.js             # Shop page filtering and sorting
│   └── checkout.js         # Checkout page logic
├── partials/
│   ├── header.html         # Reusable header component
│   ├── footer.html         # Reusable footer component
│   ├── featured-products.html
│   ├── products-grid.html
│   ├── product-details.html
│   └── related-products.html
└── README.md
```

## 🛠️ Technologies Used

- **HTMX**: For dynamic content loading and AJAX requests
- **Tailwind CSS**: For responsive styling
- **Vanilla JavaScript**: For cart management and interactivity
- **LocalStorage**: For persistent data storage

## 🎯 Key Features Explained

### 1. Cart Management
- Add/remove products
- Update quantities
- Persistent storage using localStorage
- Real-time cart updates across all pages

### 2. Product Filtering (Shop Page)
- Filter by category (Honey, Hair Care, Oral Care, Health)
- Filter by price range
- Sort by price (low to high, high to low) or name
- Real-time filtering without page reload

### 3. Location Selection
- Multi-level location selector (District → Area → Store)
- Saves selected location to localStorage
- Used in checkout process

### 4. Checkout Process
- Customer information form
- Delivery address selection
- Payment method selection (COD, bKash, Card)
- Order summary with delivery fee calculation
- Order confirmation

### 5. HTMX Integration
- Header and footer loaded dynamically
- Product grids loaded on demand
- Smooth transitions and loading states

## 🚀 Getting Started

### Option 1: Direct File Access
Simply open `index.html` in your web browser. All files are static HTML/CSS/JS.

### Option 2: Local Server (Recommended)
For better HTMX functionality, use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

## 📱 Pages Overview

### Homepage (`index.html`)
- Hero banner with call-to-action
- Featured products section
- Category cards
- Fully responsive layout

### Shop Page (`shop.html`)
- Sidebar with filters (category, price, sort)
- Product grid (12 products)
- Real-time filtering
- Responsive grid layout

### Product Page (`product.html`)
- Large product image
- Detailed product information
- Key features list
- Delivery information
- Related products section
- Add to cart and Buy Now buttons

### Checkout Page (`checkout.html`)
- Customer information form
- Delivery address selection
- Payment method selection
- Order summary sidebar
- Form validation
- Order confirmation modal

## 🎨 Design Features

- **Color Scheme**: Red (#DC2626) primary, Yellow (#FBBF24) accent
- **Typography**: Rubik font family
- **Icons**: Emoji-based icons for simplicity
- **Animations**: Smooth transitions and hover effects
- **Mobile-First**: Optimized for mobile devices

## 💾 Data Storage

All data is stored in browser's localStorage:

```javascript
// Cart data
localStorage.setItem('cart', JSON.stringify(cartArray));

// Selected location
localStorage.setItem('selectedLocation', JSON.stringify(locationData));

// Orders history
localStorage.setItem('orders', JSON.stringify(ordersArray));
```

## 🔧 Customization

### Adding New Products
Edit `partials/products-grid.html` and add new product cards:

```html
<div class="bg-white rounded-lg shadow hover:shadow-xl transition-shadow p-3 md:p-4 product-card" 
     data-category="category-name" 
     data-price="price">
  <!-- Product content -->
</div>
```

### Changing Colors
Edit `css/styles.css` or modify Tailwind classes in HTML files.

### Adding New Categories
1. Add category to filter sidebar in `shop.html`
2. Add category data attribute to products
3. Update category navigation in header

## 📦 Static Data

The project uses static data for demonstration:

- **Products**: 12 sample Dabur products
- **Locations**: Dhaka and Chittagong with areas and stores
- **Categories**: Honey, Hair Care, Oral Care, Health

## 🌟 Features to Add (Future Enhancements)

- User authentication
- Product reviews and ratings
- Wishlist functionality
- Order tracking
- Backend API integration
- Payment gateway integration
- Product search with autocomplete
- Image zoom on product page
- Product variants (size, color)

## 📄 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This is a demonstration project. Feel free to fork and customize for your needs.

## 📝 License

Free to use for personal and commercial projects.

## 🎓 Learning Resources

- [HTMX Documentation](https://htmx.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)

---

**Note**: This is a frontend-only demonstration. For production use, integrate with a backend API for product management, user authentication, and payment processing.
