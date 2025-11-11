// Checkout Page Logic

document.addEventListener('DOMContentLoaded', function() {
  loadCheckoutItems();
  setupLocationSelects();
});

function loadCheckoutItems() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const checkoutItems = document.getElementById('checkout-items');
  const deliveryFee = 60;
  
  if (cart.length === 0) {
    window.location.href = 'shop.html';
    return;
  }
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + deliveryFee;
  
  checkoutItems.innerHTML = cart.map(item => `
    <div class="flex gap-3 pb-3 border-b">
      <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-contain">
      <div class="flex-1">
        <h4 class="text-sm font-medium">${item.name}</h4>
        <p class="text-xs text-gray-600">Qty: ${item.quantity}</p>
        <p class="text-red-600 font-medium text-sm">৳${(item.price * item.quantity).toFixed(2)}</p>
      </div>
    </div>
  `).join('');
  
  document.getElementById('checkout-subtotal').textContent = `৳${subtotal.toFixed(2)}`;
  document.getElementById('checkout-total').textContent = `৳${total.toFixed(2)}`;
}

function setupLocationSelects() {
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
  
  const districtSelect = document.getElementById('checkout-district');
  const areaSelect = document.getElementById('checkout-area');
  const storeSelect = document.getElementById('checkout-store');
  
  districtSelect.addEventListener('change', function() {
    const district = this.value;
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
  });
  
  areaSelect.addEventListener('change', function() {
    const district = districtSelect.value;
    const area = this.value;
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
  });
}

function placeOrder() {
  const form = document.getElementById('checkout-form');
  
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  
  const formData = new FormData(form);
  const orderData = {
    customer: {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      phone: formData.get('phone'),
      email: formData.get('email')
    },
    delivery: {
      district: formData.get('district'),
      area: formData.get('area'),
      store: formData.get('store'),
      address: formData.get('address')
    },
    payment: formData.get('payment'),
    items: JSON.parse(localStorage.getItem('cart')) || [],
    total: parseFloat(document.getElementById('checkout-total').textContent.replace('৳', '')),
    orderDate: new Date().toISOString()
  };
  
  // Save order to localStorage (in real app, send to server)
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push(orderData);
  localStorage.setItem('orders', JSON.stringify(orders));
  
  // Clear cart
  localStorage.removeItem('cart');
  
  // Show success message
  showOrderSuccess();
}

function showOrderSuccess() {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-[999] flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="bg-white rounded-lg p-6 md:p-8 max-w-md w-full text-center modal-enter">
      <div class="text-6xl mb-4">✅</div>
      <h2 class="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
      <p class="text-gray-600 mb-6">Thank you for your order. We'll contact you soon to confirm delivery.</p>
      <div class="space-y-3">
        <a href="index.html" class="block w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 font-medium">
          Back to Home
        </a>
        <a href="shop.html" class="block w-full border border-gray-300 py-3 rounded-md hover:bg-gray-50 font-medium">
          Continue Shopping
        </a>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
}
