// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Location Data
const locationData = {
  dhaka: {
    areas: ['Dhanmondi', 'Gulshan', 'Uttara'],
    stores: {
      'Dhanmondi': ['Shwapno Dhanmondi 27', 'Shwapno Dhanmondi 2'],
      'Gulshan': ['Shwapno Gulshan 1', 'Shwapno Gulshan 2'],
      'Uttara': ['Shwapno Uttara Sector 3', 'Shwapno Uttara Sector 7']
    }
  },
  chittagong: {
    areas: ['Agrabad', 'Nasirabad'],
    stores: {
      'Agrabad': ['Shwapno Agrabad'],
      'Nasirabad': ['Shwapno Nasirabad']
    }
  }
};

// Initialize
document.addEventListener('DOMContentLoaded', function () {
  updateCartUI();
  restoreQuantityControls();
});

// Restore quantity controls for items already in cart
function restoreQuantityControls() {
  // Wait a bit for HTMX to load products
  setTimeout(() => {
    cart.forEach(item => {
      const buttons = document.querySelectorAll(`button[onclick*="addToCart(${item.id},"]`);
      buttons.forEach(button => {
        const container = button.parentElement;
        if (button && !container.querySelector('[data-product-id]')) {
          const qtyDiv = document.createElement('div');
          qtyDiv.className = 'product-box-cart-btn flex overflow-hidden rounded-full shadow-lg md:shadow-none w-auto mx-auto';
          qtyDiv.setAttribute('data-product-id', item.id);

          // Extract parameters from onclick attribute
          const onclickStr = button.getAttribute('onclick');
          const match = onclickStr.match(/addToCart\((\d+),\s*'([^']+)',\s*([\d.]+),\s*'([^']+)'/);

          if (match) {
            const [, id, name, price, image] = match;
            qtyDiv.innerHTML = `
              <button type="button" 
                      onclick="decreaseQuantity(${id}, '${name}', ${price}, '${image}', this.parentElement.parentElement)" 
                      aria-label="decrease quantity" 
                      class="product-qty-minus mr-[-1px] rounded-l-full bg-white px-2 py-[2px] pl-3 text-[13px] font-bold leading-[13px] text-red-600 active:shadow-inner md:border md:border-solid md:border-[#f0c802] md:bg-[#fbbf24] md:py-1 md:text-[18px] md:text-gray-800">−</button>
              
              <button type="button" 
                      class="mx-[1px] hidden h-[28px] bg-white px-3.5 py-[2px] text-[0px] font-medium leading-none text-red-600 active:shadow-inner md:inline-block md:h-auto md:border-y md:border-y-solid md:border-y-[#f0c802] md:bg-[#fbbf24] md:px-2 md:py-1.5 md:text-xs md:text-gray-800">
                ব্যাগে <span class="qty-num">${item.quantity}</span>টি
              </button>
              
              <button type="button" 
                      class="mx-[1px] inline-block h-[28px] bg-white px-3.5 py-[2px] text-sm font-medium leading-none text-red-600 active:shadow-inner md:hidden md:h-auto md:px-2">
                <span class="qty-num">${item.quantity}</span>
              </button>
              
              <button type="button" 
                      onclick="increaseQuantity(${id}, this.parentElement.parentElement)" 
                      aria-label="increase quantity" 
                      class="product-qty-plus ml-[-1px] rounded-r-full bg-white px-2 py-[2px] pr-3 text-[13px] font-bold leading-[13px] text-red-600 active:shadow-inner md:border md:border-solid md:border-[#f0c802] md:bg-[#fbbf24] md:py-1 md:text-[18px] md:leading-none md:text-gray-800">+</button>
            `;

            container.innerHTML = '';
            container.appendChild(qtyDiv);
          }
        }
      });
    });
  }, 500);
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  const sidebar = document.getElementById('mobileSidebar');
  const overlay = document.getElementById('mobileOverlay');

  sidebar.classList.toggle('mobile-menu-open');
  overlay.classList.toggle('overlay-active');
}

// Add to Cart
function addToCart(id, name, price, image, buttonElement) {
  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: id,
      name: name,
      price: price,
      image: image,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();

  // Replace button with quantity controls
  if (buttonElement) {
    replaceWithQuantityControls(buttonElement, id, name, price, image);
  }

  showToast('Product added to cart!');
}

// Replace Add to Cart button with quantity controls
function replaceWithQuantityControls(button, id, name, price, image) {
  const container = button.parentElement;

  const qtyDiv = document.createElement('div');
  qtyDiv.className = 'product-box-cart-btn flex overflow-hidden rounded-full shadow-lg md:shadow-none w-auto mx-auto';
  qtyDiv.setAttribute('data-product-id', id);
  qtyDiv.innerHTML = `
    <button type="button" 
            onclick="decreaseQuantity(${id}, '${name}', ${price}, '${image}', this.parentElement.parentElement)" 
            aria-label="decrease quantity" 
            class="product-qty-minus mr-[-1px] rounded-l-full bg-white px-2 py-[2px] pl-3 text-[13px] font-bold leading-[13px] text-red-600 active:shadow-inner md:border md:border-solid md:border-[#f0c802] md:bg-[#fbbf24] md:py-1 md:text-[18px] md:text-gray-800">−</button>
    
    <button type="button" 
            class="mx-[1px] hidden h-[28px] bg-white px-3.5 py-[2px] text-[0px] font-medium leading-none text-red-600 active:shadow-inner md:inline-block md:h-auto md:border-y md:border-y-solid md:border-y-[#f0c802] md:bg-[#fbbf24] md:px-2 md:py-1.5 md:text-xs md:text-gray-800">
      ব্যাগে <span class="qty-num">1</span>টি
    </button>
    
    <button type="button" 
            class="mx-[1px] inline-block h-[28px] bg-white px-3.5 py-[2px] text-sm font-medium leading-none text-red-600 active:shadow-inner md:hidden md:h-auto md:px-2">
      <span class="qty-num">1</span>
    </button>
    
    <button type="button" 
            onclick="increaseQuantity(${id}, this.parentElement.parentElement)" 
            aria-label="increase quantity" 
            class="product-qty-plus ml-[-1px] rounded-r-full bg-white px-2 py-[2px] pr-3 text-[13px] font-bold leading-[13px] text-red-600 active:shadow-inner md:border md:border-solid md:border-[#f0c802] md:bg-[#fbbf24] md:py-1 md:text-[18px] md:leading-none md:text-gray-800">+</button>
  `;

  container.innerHTML = '';
  container.appendChild(qtyDiv);
}

// Increase quantity
function increaseQuantity(id, container) {
  const item = cart.find(item => item.id === id);

  if (item) {
    item.quantity += 1;
    saveCart();
    updateCartUI();

    // Update all quantity displays on the page
    const allQtyControls = document.querySelectorAll(`[data-product-id="${id}"]`);
    allQtyControls.forEach(control => {
      const qtyNums = control.querySelectorAll('.qty-num');
      qtyNums.forEach(qtyNum => {
        qtyNum.textContent = item.quantity;
      });
    });

    // Refresh cart drawer if it's open
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar && cartSidebar.innerHTML) {
      openCart();
    }
  }
}

// Decrease quantity
function decreaseQuantity(id, name, price, image, container) {
  const item = cart.find(item => item.id === id);

  if (item) {
    item.quantity -= 1;

    if (item.quantity <= 0) {
      // Remove from cart and restore button
      cart = cart.filter(item => item.id !== id);
      saveCart();
      updateCartUI();

      // Restore all buttons for this product
      const allQtyControls = document.querySelectorAll(`[data-product-id="${id}"]`);
      allQtyControls.forEach(control => {
        const parentContainer = control.parentElement;
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'text-red-600 text-[0px] font-normal items-center bg-white flex h-7 w-7 justify-center leading-[0px] border-gray-200 px-0 py-0.5 rounded-full border-0 md:text-white md:text-xs md:font-medium md:bg-red-600 md:h-auto md:w-auto md:leading-4 md:border md:border-red-600 md:px-8 md:py-2 md:rounded-full transition-all duration-200 hover:bg-red-700 md:hover:bg-red-700 before:content-[\'🛒\'] before:block md:before:hidden';
        button.innerHTML = '<span class="hidden md:inline">Add to Bag</span>';
        button.onclick = function () { addToCart(id, name, price, image, this); };

        parentContainer.innerHTML = '';
        parentContainer.appendChild(button);
      });

      // Refresh cart drawer if it's open
      const cartSidebar = document.getElementById('cart-sidebar');
      if (cartSidebar && cartSidebar.innerHTML) {
        openCart();
      }

      showToast('Product removed from cart');
    } else {
      saveCart();
      updateCartUI();

      // Update all quantity displays on the page
      const allQtyControls = document.querySelectorAll(`[data-product-id="${id}"]`);
      allQtyControls.forEach(control => {
        const qtyNums = control.querySelectorAll('.qty-num');
        qtyNums.forEach(qtyNum => {
          qtyNum.textContent = item.quantity;
        });
      });

      // Refresh cart drawer if it's open
      const cartSidebar = document.getElementById('cart-sidebar');
      if (cartSidebar && cartSidebar.innerHTML) {
        openCart();
      }
    }
  }
}

// Update Cart Quantity
function updateCartQuantity(id, change) {
  const item = cart.find(item => item.id === id);

  if (item) {
    item.quantity += change;

    if (item.quantity <= 0) {
      removeFromCart(id);
    } else {
      saveCart();
      updateCartUI();
      // Refresh cart drawer if it's open
      const cartSidebar = document.getElementById('cart-sidebar');
      if (cartSidebar && cartSidebar.innerHTML) {
        openCart();
      }
    }
  }
}

// Remove from Cart
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCartUI();

  // Refresh cart drawer if it's open
  const cartSidebar = document.getElementById('cart-sidebar');
  if (cartSidebar && cartSidebar.innerHTML) {
    openCart();
  }

  // Update product buttons on the page
  const buttons = document.querySelectorAll(`[data-product-id="${id}"]`);
  buttons.forEach(qtyControl => {
    const container = qtyControl.parentElement;
    const onclickStr = qtyControl.querySelector('button').getAttribute('onclick');

    if (onclickStr) {
      const match = onclickStr.match(/decreaseQuantity\((\d+),\s*'([^']+)',\s*([\d.]+),\s*'([^']+)'/);
      if (match) {
        const [, itemId, name, price, image] = match;

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'text-red-600 text-[0px] font-normal items-center bg-white flex h-7 w-7 justify-center leading-[0px] border-gray-200 px-0 py-0.5 rounded-full border-0 md:text-white md:text-xs md:font-medium md:bg-red-600 md:h-auto md:w-auto md:leading-4 md:border md:border-red-600 md:px-8 md:py-2 md:rounded-full transition-all duration-200 hover:bg-red-700 md:hover:bg-red-700 before:content-[\'🛒\'] before:block md:before:hidden';
        button.innerHTML = '<span class="hidden md:inline">Add to Bag</span>';
        button.onclick = function () { addToCart(parseInt(itemId), name, parseFloat(price), image, this); };

        container.innerHTML = '';
        container.appendChild(button);
      }
    }
  });

  showToast('Product removed from cart');
}

// Save Cart to LocalStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Update Cart UI
function updateCartUI() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Update cart count badges
  const desktopCount = document.getElementById('desktopCartCount');
  const mobileCount = document.getElementById('mobileCartCount');
  const desktopTotal = document.getElementById('desktopCartTotal');

  if (desktopCount) desktopCount.textContent = count;
  if (mobileCount) mobileCount.textContent = count;
  if (desktopTotal) desktopTotal.textContent = total.toFixed(2);
}

// Open Cart Sidebar
function openCart() {
  const cartSidebar = document.getElementById('cart-sidebar');

  if (cart.length === 0) {
    cartSidebar.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 z-50" onclick="closeCart()"></div>
      <div class="fixed top-0 right-0 w-full md:w-[400px] h-full bg-stone-50 z-[60] shadow-xl overflow-y-auto thin-scrollbar">
        <div class="bg-yellow-400 px-4 py-3 flex items-center justify-between">
          <h3 class="text-sm md:text-base font-medium">🛒 0 items</h3>
          <button onclick="closeCart()" class="text-xs md:text-sm font-medium">✕ Close</button>
        </div>
        <div class="p-4 text-center py-20">
          <div class="text-6xl mb-4">🛒</div>
          <p class="text-gray-500 mb-4">Your cart is empty</p>
          <a href="shop.html" class="inline-block bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700">
            Continue Shopping
          </a>
        </div>
      </div>
    `;
    return;
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const cartItems = cart.map(item => `
    <div class="bg-white rounded-lg p-3 mb-3 shadow">
      <div class="flex gap-3">
        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-contain">
        <div class="flex-1">
          <h4 class="text-sm font-medium mb-1">${item.name}</h4>
          <p class="text-red-600 font-medium text-sm">৳${item.price}</p>
          <div class="flex items-center gap-2 mt-2">
            <button onclick="updateCartQuantity(${item.id}, -1)" class="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300">-</button>
            <span class="text-sm font-medium">${item.quantity}</span>
            <button onclick="updateCartQuantity(${item.id}, 1)" class="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300">+</button>
          </div>
        </div>
        <button onclick="removeFromCart(${item.id})" class="text-red-600 text-lg">🗑️</button>
      </div>
    </div>
  `).join('');

  cartSidebar.innerHTML = `
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50" onclick="closeCart()"></div>
    <div class="fixed top-0 right-0 w-full md:w-[400px] h-full bg-stone-50 z-[60] shadow-xl flex flex-col">
      <div class="bg-yellow-400 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <h3 class="text-sm md:text-base font-medium">🛒 ${cart.length} items</h3>
        <button onclick="closeCart()" class="text-xs md:text-sm font-medium">✕ Close</button>
      </div>
      <div class="flex-1 overflow-y-auto thin-scrollbar p-3 md:p-4">
        ${cartItems}
      </div>
      <div class="flex-shrink-0 bg-white border-t shadow-lg">
        <div class="p-4">
          <div class="flex justify-between mb-3">
            <span class="font-medium">Total:</span>
            <span class="font-bold text-lg">৳${total.toFixed(2)}</span>
          </div>
          <a href="checkout.html" class="block w-full bg-red-600 text-white text-center py-3 rounded-md hover:bg-red-700 font-medium">
            Proceed to Checkout
          </a>
        </div>
      </div>
    </div>
  `;
}

// Close Cart
function closeCart() {
  document.getElementById('cart-sidebar').innerHTML = '';
}

// Location Modal
function openLocationModal() {
  const modalsContainer = document.getElementById('modals-container');

  modalsContainer.innerHTML = `
    <div class="fixed inset-0 bg-black bg-opacity-50 z-[999] flex items-center justify-center p-4 modal-enter">
      <div class="bg-white rounded-lg p-4 md:p-6 max-w-md w-full">
        <h3 class="text-lg md:text-xl font-semibold mb-4">Select Delivery Location</h3>
        
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">District</label>
          <select id="districtSelect" onchange="updateAreas()" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none">
            <option value="">Select District</option>
            <option value="dhaka">Dhaka</option>
            <option value="chittagong">Chittagong</option>
          </select>
        </div>
        
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Area</label>
          <select id="areaSelect" onchange="updateStores()" disabled class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none">
            <option value="">Select Area</option>
          </select>
        </div>
        
        <div class="mb-6">
          <label class="block text-sm font-medium mb-2">Store</label>
          <select id="storeSelect" disabled class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none">
            <option value="">Select Store</option>
          </select>
        </div>
        
        <div class="flex gap-3">
          <button onclick="confirmLocation()" class="flex-1 bg-red-600 text-white px-4 py-2 text-sm rounded-md hover:bg-red-700 transition">Confirm</button>
          <button onclick="closeLocationModal()" class="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition">Cancel</button>
        </div>
      </div>
    </div>
  `;
}

function updateAreas() {
  const district = document.getElementById('districtSelect').value;
  const areaSelect = document.getElementById('areaSelect');
  const storeSelect = document.getElementById('storeSelect');

  areaSelect.innerHTML = '<option value="">Select Area</option>';
  storeSelect.innerHTML = '<option value="">Select Store</option>';
  storeSelect.disabled = true;

  if (district && locationData[district]) {
    areaSelect.disabled = false;
    locationData[district].areas.forEach(area => {
      const opt = document.createElement('option');
      opt.value = area;
      opt.textContent = area;
      areaSelect.appendChild(opt);
    });
  } else {
    areaSelect.disabled = true;
  }
}

function updateStores() {
  const district = document.getElementById('districtSelect').value;
  const area = document.getElementById('areaSelect').value;
  const storeSelect = document.getElementById('storeSelect');

  storeSelect.innerHTML = '<option value="">Select Store</option>';

  if (district && area && locationData[district].stores[area]) {
    storeSelect.disabled = false;
    locationData[district].stores[area].forEach(store => {
      const opt = document.createElement('option');
      opt.value = store;
      opt.textContent = store;
      storeSelect.appendChild(opt);
    });
  } else {
    storeSelect.disabled = true;
  }
}

function confirmLocation() {
  const area = document.getElementById('areaSelect').value;
  const store = document.getElementById('storeSelect').value;

  if (area && store) {
    const locationText = document.getElementById('location-text');
    if (locationText) {
      locationText.textContent = `${area} - ${store}`;
    }
    localStorage.setItem('selectedLocation', JSON.stringify({ area, store }));
    closeLocationModal();
    showToast('Location updated successfully!');
  } else {
    alert('Please select area and store');
  }
}

function closeLocationModal() {
  document.getElementById('modals-container').innerHTML = '';
}

// Login Modal
function openLoginModal() {
  const modalsContainer = document.getElementById('modals-container');

  modalsContainer.innerHTML = `
    <div class="fixed inset-0 bg-black bg-opacity-50 z-[999] flex items-center justify-center p-4 modal-enter">
      <div class="bg-white rounded-lg p-4 md:p-6 max-w-md w-full">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg md:text-xl font-semibold">Sign In</h3>
          <button onclick="closeLoginModal()" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        
        <form onsubmit="handleLogin(event)" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Phone Number</label>
            <input type="tel" id="loginPhone" pattern="[0-9]{11}" maxlength="11" placeholder="01XXXXXXXXX" required class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none">
            <span class="text-xs text-red-600 hidden" id="phoneError">Enter valid 11-digit phone</span>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2">Password</label>
            <input type="password" id="loginPassword" minlength="6" placeholder="Password" required class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none">
            <span class="text-xs text-red-600 hidden" id="passwordError">Password min 6 characters</span>
          </div>
          
          <button type="submit" class="w-full bg-red-600 text-white px-4 py-2.5 rounded-md hover:bg-red-700 transition font-medium">Sign In</button>
        </form>
      </div>
    </div>
  `;
}

function handleLogin(event) {
  event.preventDefault();

  const phone = document.getElementById('loginPhone').value;
  const password = document.getElementById('loginPassword').value;

  if (!/^[0-9]{11}$/.test(phone)) {
    document.getElementById('phoneError').classList.remove('hidden');
    return;
  }

  if (password.length < 6) {
    document.getElementById('passwordError').classList.remove('hidden');
    return;
  }

  // Simulate login
  localStorage.setItem('user', JSON.stringify({ phone }));
  closeLoginModal();
  showToast('Login successful!');
}

function closeLoginModal() {
  document.getElementById('modals-container').innerHTML = '';
}

// Search Products
function searchProducts() {
  const query = document.getElementById('searchInput').value.trim();
  if (query) {
    window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
  }
}

// Toast Notification
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg';
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ESC key closes modals
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeLocationModal();
    closeLoginModal();
    closeCart();
    toggleMobileMenu();
  }
});
