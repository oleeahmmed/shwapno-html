// Shop Page Filtering and Sorting

function applyFilters() {
  const products = document.querySelectorAll('.product-card');
  const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
  const selectedPrice = document.querySelector('input[name="price"]:checked').value;
  const sortBy = document.getElementById('sortSelect').value;
  
  let visibleCount = 0;
  let productsArray = [];
  
  // Filter products
  products.forEach(product => {
    const category = product.dataset.category;
    const price = parseFloat(product.dataset.price);
    
    let showProduct = false;
    
    // Category filter
    if (selectedCategories.includes('all') || selectedCategories.includes(category)) {
      showProduct = true;
    }
    
    // Price filter
    if (showProduct && selectedPrice !== 'all') {
      const [min, max] = selectedPrice.split('-').map(Number);
      if (price < min || price > max) {
        showProduct = false;
      }
    }
    
    if (showProduct) {
      product.style.display = 'block';
      visibleCount++;
      productsArray.push({
        element: product,
        price: price,
        name: product.querySelector('h3').textContent
      });
    } else {
      product.style.display = 'none';
    }
  });
  
  // Sort products
  if (sortBy !== 'default') {
    const container = document.getElementById('products-container');
    
    if (sortBy === 'price-low') {
      productsArray.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      productsArray.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      productsArray.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    // Reorder DOM elements
    productsArray.forEach(item => {
      container.appendChild(item.element);
    });
  }
  
  // Update count
  document.getElementById('product-count').textContent = `Showing ${visibleCount} products`;
}

// Handle URL parameters
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  const search = urlParams.get('search');
  
  if (category) {
    // Uncheck "all" and check specific category
    document.querySelector('input[name="category"][value="all"]').checked = false;
    const categoryCheckbox = document.querySelector(`input[name="category"][value="${category}"]`);
    if (categoryCheckbox) {
      categoryCheckbox.checked = true;
      applyFilters();
    }
  }
  
  if (search) {
    // Filter products by search term
    const products = document.querySelectorAll('.product-card');
    let visibleCount = 0;
    
    products.forEach(product => {
      const name = product.querySelector('h3').textContent.toLowerCase();
      if (name.includes(search.toLowerCase())) {
        product.style.display = 'block';
        visibleCount++;
      } else {
        product.style.display = 'none';
      }
    });
    
    document.getElementById('product-count').textContent = `Showing ${visibleCount} products for "${search}"`;
  }
});

// Auto-apply filters on checkbox/radio change
document.addEventListener('change', function(e) {
  if (e.target.classList.contains('filter-checkbox') || e.target.classList.contains('filter-radio')) {
    applyFilters();
  }
});

// Auto-apply on sort change
document.getElementById('sortSelect')?.addEventListener('change', applyFilters);
