// Shwapno Website - Working with Existing HTML Structure

document.addEventListener('DOMContentLoaded', function () {

    // ===== LOCATION FUNCTIONALITY =====
    const locationButton = document.querySelector('button[title*="Today"]');
    const locationSpan = locationButton?.querySelector('span');

    // Create location modal (keeping your design intact)
    function createLocationModal() {
        const modal = document.createElement('div');
        modal.id = 'locationModal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-[999] hidden items-center justify-center';
        modal.innerHTML = `
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold mb-4">Select Delivery Location</h3>
        
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">District</label>
          <select id="districtSelect" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500">
            <option value="">Select District</option>
            <option value="dhaka">Dhaka</option>
            <option value="chittagong">Chittagong</option>
            <option value="sylhet">Sylhet</option>
            <option value="rajshahi">Rajshahi</option>
            <option value="khulna">Khulna</option>
            <option value="barisal">Barisal</option>
            <option value="rangpur">Rangpur</option>
            <option value="mymensingh">Mymensingh</option>
          </select>
        </div>
        
        <div class="mb-6">
          <label class="block text-sm font-medium mb-2">Area</label>
          <select id="areaSelect" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500" disabled>
            <option value="">Select Area</option>
          </select>
        </div>
        
        <div class="flex gap-3">
          <button id="useCurrentLocation" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Use Current Location
          </button>
          <button id="confirmLocation" class="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
            Confirm
          </button>
          <button id="closeLocationModal" class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            Cancel
          </button>
        </div>
      </div>
    `;
        document.body.appendChild(modal);
        return modal;
    }

    // Initialize location functionality
    const locationModal = createLocationModal();
    const areaData = {
        dhaka: ['Dhanmondi', 'Gulshan', 'Banani', 'Uttara', 'Mirpur', 'Wari', 'Old Dhaka', 'Tejgaon'],
        chittagong: ['Agrabad', 'Nasirabad', 'Panchlaish', 'Khulshi', 'Halishahar', 'Bayazid'],
        sylhet: ['Zindabazar', 'Amberkhana', 'Subhanighat', 'Chowhatta', 'Tilagarh'],
        rajshahi: ['Shaheb Bazar', 'Boalia', 'Motihar', 'Rajpara', 'Uposhohor'],
        khulna: ['Khalishpur', 'Sonadanga', 'Boyra', 'Daulatpur', 'Khan Jahan Ali'],
        barisal: ['Sadar Road', 'Band Road', 'Nathullabad', 'Kakorir Mor'],
        rangpur: ['Satmatha', 'Shapla Chattar', 'Station Road', 'Mahiganj'],
        mymensingh: ['Charpara', 'Ganginarpar', 'Akua', 'Shambhuganj']
    };

    // Auto-detect location on page load
    function detectLocation() {
        if (navigator.geolocation && locationSpan) {
            locationSpan.textContent = 'Detecting location...';

            navigator.geolocation.getCurrentPosition(
                function (position) {
                    // Simulate reverse geocoding (in real app, use actual API)
                    setTimeout(() => {
                        locationSpan.textContent = 'Dhaka, Dhanmondi';
                    }, 1000);
                },
                function (error) {
                    locationSpan.textContent = 'Select your delivery location';
                }
            );
        }
    }

    // Location button click handler
    if (locationButton) {
        locationButton.addEventListener('click', function () {
            locationModal.classList.remove('hidden');
            locationModal.classList.add('flex');
        });
    }

    // Location modal handlers
    const districtSelect = document.getElementById('districtSelect');
    const areaSelect = document.getElementById('areaSelect');
    const useCurrentLocationBtn = document.getElementById('useCurrentLocation');
    const confirmLocationBtn = document.getElementById('confirmLocation');
    const closeLocationModalBtn = document.getElementById('closeLocationModal');

    // District change handler
    if (districtSelect) {
        districtSelect.addEventListener('change', function () {
            const selectedDistrict = this.value;
            areaSelect.innerHTML = '<option value="">Select Area</option>';

            if (selectedDistrict && areaData[selectedDistrict]) {
                areaSelect.disabled = false;
                areaData[selectedDistrict].forEach(area => {
                    const option = document.createElement('option');
                    option.value = area.toLowerCase().replace(/\s+/g, '-');
                    option.textContent = area;
                    areaSelect.appendChild(option);
                });
            } else {
                areaSelect.disabled = true;
            }
        });
    }

    // Use current location
    if (useCurrentLocationBtn) {
        useCurrentLocationBtn.addEventListener('click', function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        if (locationSpan) {
                            locationSpan.textContent = 'Dhaka, Dhanmondi (Current)';
                        }
                        closeLocationModal();
                    },
                    function (error) {
                        alert('Unable to detect location. Please select manually.');
                    }
                );
            }
        });
    }

    // Confirm location
    if (confirmLocationBtn) {
        confirmLocationBtn.addEventListener('click', function () {
            const district = districtSelect.options[districtSelect.selectedIndex]?.text;
            const area = areaSelect.options[areaSelect.selectedIndex]?.text;

            if (district && area) {
                if (locationSpan) {
                    locationSpan.textContent = `${district}, ${area}`;
                }
                closeLocationModal();
            } else {
                alert('Please select both district and area.');
            }
        });
    }

    // Close modal
    function closeLocationModal() {
        locationModal.classList.add('hidden');
        locationModal.classList.remove('flex');
    }

    if (closeLocationModalBtn) {
        closeLocationModalBtn.addEventListener('click', closeLocationModal);
    }

    // Initialize location detection
    detectLocation();

    // ===== MEGA MENU HOVER FUNCTIONALITY =====
    const categoryContainer = document.querySelector('div.relative.box-border.caret-transparent.min-w-\\[auto\\]');
    const categoryToggle = categoryContainer?.querySelector('div.text-sm.font-medium');
    const megaMenuDiv = categoryContainer?.querySelector('div.fixed.bg-white');
    const menuOverlay = categoryContainer?.querySelector('label.fixed.bg-neutral-800');

    if (categoryContainer && categoryToggle && megaMenuDiv) {
        // Desktop hover functionality
        if (window.innerWidth >= 768) {
            categoryContainer.addEventListener('mouseenter', function () {
                megaMenuDiv.classList.remove('md:hidden');
                megaMenuDiv.style.display = 'block';
                megaMenuDiv.style.left = '0';
                megaMenuDiv.style.opacity = '1';
                megaMenuDiv.style.visibility = 'visible';
            });

            categoryContainer.addEventListener('mouseleave', function () {
                megaMenuDiv.classList.add('md:hidden');
                megaMenuDiv.style.display = 'none';
                megaMenuDiv.style.left = '-350px';
                megaMenuDiv.style.opacity = '0';
                megaMenuDiv.style.visibility = 'hidden';
            });
        }

        // Mobile click functionality
        categoryToggle.addEventListener('click', function () {
            if (window.innerWidth < 768) {
                const isOpen = megaMenuDiv.style.left === '0px';

                if (isOpen) {
                    megaMenuDiv.style.left = '-350px';
                    if (menuOverlay) menuOverlay.style.width = '0';
                    document.body.style.overflow = '';
                } else {
                    megaMenuDiv.style.left = '0px';
                    if (menuOverlay) menuOverlay.style.width = '100vw';
                    document.body.style.overflow = 'hidden';
                }
            }
        });

        // Close mobile menu when overlay is clicked
        if (menuOverlay) {
            menuOverlay.addEventListener('click', function () {
                megaMenuDiv.style.left = '-350px';
                this.style.width = '0';
                document.body.style.overflow = '';
            });
        }
    }

    // ===== ENHANCED MULTIPLE DROPDOWN FUNCTIONALITY =====
    const allMenuItems = document.querySelectorAll('li.box-border.caret-transparent');

    // Initialize dropdown functionality
    function initializeDropdowns() {
        allMenuItems.forEach((item, index) => {
            const link = item.querySelector('a');
            const submenu = item.querySelector('ul');
            const hasArrow = link?.querySelector('button');

            if (link && submenu && hasArrow) {
                // Desktop hover for nested dropdowns
                if (window.innerWidth >= 768) {

                    item.addEventListener('mouseenter', function () {
                        // Close other open submenus at the same level
                        const parentUl = item.parentElement;
                        const siblingItems = parentUl.querySelectorAll('li.box-border.caret-transparent');
                        siblingItems.forEach(sibling => {
                            if (sibling !== item) {
                                const siblingSubmenu = sibling.querySelector('ul');
                                if (siblingSubmenu) {
                                    siblingSubmenu.classList.add('md:hidden');
                                    siblingSubmenu.style.display = 'none';
                                    siblingSubmenu.style.opacity = '0';
                                    siblingSubmenu.style.visibility = 'hidden';
                                }
                            }
                        });

                        // Show current submenu
                        submenu.classList.remove('md:hidden');
                        submenu.style.display = 'block';
                        submenu.style.opacity = '1';
                        submenu.style.visibility = 'visible';

                        // Calculate positioning based on nesting level
                        const nestingLevel = getNestingLevel(item);
                        const leftPosition = 285 + (nestingLevel * 250); // 285px for first level, then +250px for each level

                        submenu.style.left = `${leftPosition}px`;
                        submenu.style.top = '0';
                        submenu.style.zIndex = `${100 + nestingLevel}`;

                        // Add animation class
                        submenu.classList.add('dropdown-slide-in');
                    });

                    item.addEventListener('mouseleave', function () {
                        // Delay hiding to allow mouse movement to submenu
                        setTimeout(() => {
                            if (!item.matches(':hover') && !submenu.matches(':hover')) {
                                submenu.classList.add('md:hidden');
                                submenu.style.display = 'none';
                                submenu.style.opacity = '0';
                                submenu.style.visibility = 'hidden';
                                submenu.classList.remove('dropdown-slide-in');
                            }
                        }, 100);
                    });

                    // Keep submenu open when hovering over it
                    submenu.addEventListener('mouseenter', function () {
                        this.style.display = 'block';
                        this.style.opacity = '1';
                        this.style.visibility = 'visible';
                    });

                    submenu.addEventListener('mouseleave', function () {
                        this.classList.add('md:hidden');
                        this.style.display = 'none';
                        this.style.opacity = '0';
                        this.style.visibility = 'hidden';
                        this.classList.remove('dropdown-slide-in');
                    });

                } else {
                    // Mobile click functionality
                    hasArrow.addEventListener('click', function (e) {
                        e.preventDefault();
                        e.stopPropagation();

                        const isOpen = submenu.style.left === '0px';

                        // Close all other submenus at the same level
                        const parentUl = item.parentElement;
                        const siblingItems = parentUl.querySelectorAll('li.box-border.caret-transparent');
                        siblingItems.forEach(sibling => {
                            if (sibling !== item) {
                                const siblingSubmenu = sibling.querySelector('ul');
                                if (siblingSubmenu) {
                                    siblingSubmenu.style.left = '-100%';
                                }
                            }
                        });

                        if (isOpen) {
                            submenu.style.left = '-100%';
                            hasArrow.style.transform = 'rotate(0deg)';
                        } else {
                            submenu.style.left = '0px';
                            hasArrow.style.transform = 'rotate(90deg)';
                        }
                    });
                }
            }
        });
    }

    // Helper function to calculate nesting level
    function getNestingLevel(item) {
        let level = 0;
        let parent = item.parentElement;

        while (parent) {
            if (parent.tagName === 'UL' && parent.classList.contains('fixed')) {
                level++;
            }
            parent = parent.parentElement;
        }

        return level - 1; // Subtract 1 because first level should be 0
    }

    // Initialize dropdowns
    initializeDropdowns();

    // ===== SEARCH FUNCTIONALITY =====
    const searchInput = document.querySelector('input[placeholder*="Search"]');
    const searchButton = searchInput?.parentElement?.querySelector('button');

    if (searchInput) {
        let searchTimeout;

        // Search on input
        searchInput.addEventListener('input', function () {
            clearTimeout(searchTimeout);

            searchTimeout = setTimeout(() => {
                const searchTerm = this.value.toLowerCase();
                if (searchTerm.length > 2) {
                    console.log(`Searching for: ${searchTerm}`);
                    // Add visual feedback
                    this.style.borderColor = '#dc2626';
                    setTimeout(() => {
                        this.style.borderColor = '';
                    }, 1000);
                }
            }, 500);
        });

        // Search on Enter key
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }

    // Search button click
    if (searchButton) {
        searchButton.addEventListener('click', function () {
            if (searchInput) {
                performSearch(searchInput.value);
            }
        });
    }

    function performSearch(term) {
        if (term.trim().length > 0) {
            console.log(`Searching for: ${term}`);
            // Here you would typically redirect to search results
            // For demo: window.location.href = `/search?q=${encodeURIComponent(term)}`;
        }
    }

    // ===== CART BAG FUNCTIONALITY =====
    // Find cart button by looking for the one with minicart icon or cart content
    let cartButton = null;

    // Try multiple ways to find the cart button
    setTimeout(() => {
        // Method 1: Look for button with specific classes
        cartButton = document.querySelector('button.fixed.text-white.text-xs.font-medium');

        // Method 2: Look for button containing "items" and "৳"
        if (!cartButton) {
            cartButton = Array.from(document.querySelectorAll('button')).find(btn =>
                btn.textContent.includes('items') && btn.textContent.includes('৳')
            );
        }

        // Method 3: Look for button with minicart background
        if (!cartButton) {
            cartButton = Array.from(document.querySelectorAll('button')).find(btn => {
                const span = btn.querySelector('span');
                return span && span.style.backgroundImage && span.style.backgroundImage.includes('minicart');
            });
        }

        // Method 4: Look for button with specific span structure
        if (!cartButton) {
            cartButton = Array.from(document.querySelectorAll('button')).find(btn => {
                const spans = btn.querySelectorAll('span');
                return spans.length >= 2 &&
                    spans[0].textContent.includes('items') &&
                    spans[1].textContent.includes('৳');
            });
        }

        console.log('Cart button found:', cartButton);

        if (cartButton) {
            cartButton.addEventListener('click', function (e) {
                e.preventDefault();
                console.log('Cart button clicked');
                openCartSidebar();
            });
        } else {
            console.log('Cart button not found');
        }
    }, 500);

    let cartSidebar = null;
    let cartCloseButton = null;
    let cartCloseButtonSide = null;

    // Find cart sidebar with multiple methods
    setTimeout(() => {
        cartSidebar = document.querySelector('div.fixed.text-stone-900.bg-stone-50') ||
            document.querySelector('div[class*="fixed"][class*="bg-stone-50"]') ||
            Array.from(document.querySelectorAll('div')).find(div =>
                div.classList.contains('fixed') &&
                (div.classList.contains('bg-stone-50') || div.style.right)
            );

        if (cartSidebar) {
            console.log('Cart sidebar found:', cartSidebar);
            cartCloseButton = cartSidebar.querySelector('button[aria-label="close"]');
            cartCloseButtonSide = cartSidebar.querySelector('button.absolute.text-sm.bg-yellow-400') ||
                cartSidebar.querySelector('button[class*="bg-yellow-400"]');

            // Cart close button handlers
            if (cartCloseButton) {
                cartCloseButton.addEventListener('click', closeCartSidebar);
            }

            if (cartCloseButtonSide) {
                cartCloseButtonSide.addEventListener('click', closeCartSidebar);
            }
        } else {
            console.log('Cart sidebar not found');
        }
    }, 500);

    // Cart state
    let cartItems = [];
    let cartTotal = 0;

    // Cart button will be handled in the setTimeout above

    // Open cart sidebar with exact HTML structure
    function openCartSidebar() {
        console.log('Opening cart sidebar with new structure');

        // Remove existing cart sidebar if any
        const existingCart = document.querySelector('.mini-cart');
        if (existingCart) {
            existingCart.remove();
        }

        // Create the exact mini-cart HTML structure
        const miniCart = document.createElement('div');
        miniCart.className = 'mini-cart lg:mini-cart-height fixed bottom-0 top-0 z-50 h-full w-full bg-[#F8F8F8] text-[#1D1D1B] shadow-mini-cart transition-all duration-300 ease-linear sm:w-[320px] lg:top-[calc(var(--header-height)-var(--header-lower-height))] lg:w-[350px] right-0';

        miniCart.innerHTML = `
            <div class="mini-cart-header relative bg-yellow px-2.5 py-1.5">
                <h3 class="flex items-center text-[14px] font-medium leading-none text-[#1D1D1B]">
                    <span class="icon icon-cart-1 mr-2.5 text-[20px] !font-medium"></span> 
                    ${cartItems.length} টি পণ্য
                </h3>
                <button type="button" aria-label="close" class="cart-close-btn absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium leading-none text-black">
                    <span class="icon icon-times mr-1.5 text-[10px] !font-bold"></span>বন্ধ করুন
                </button>
            </div>
            
            <div class="bg-white px-4 pb-2 text-center">
                <a class="text-center text-xs font-medium leading-5" href="/deals">ডেলিভারিতে ৳১০ বাঁচাতে আরও ৳২৬৫ কিনুন</a>
                <div class="delivery-progress-bar relative h-5 w-full overflow-hidden rounded-2xl border border-[#E4E4E4] bg-[#ECFDF1] shadow-5xl">
                    <div class="progress h-full bg-[#9CEDB4] shadow-attrButton duration-500 ease-linear" style="width: 9%;"></div>
                    <span class="slot absolute top-1/2 z-10 block -translate-x-1/2 -translate-y-1/2 text-[10px] font-medium leading-none text-black" style="left: 20px;">৳৪৯</span>
                    <span class="slot absolute top-1/2 z-10 block -translate-x-1/2 -translate-y-1/2 text-[10px] font-medium leading-none text-black" style="left: 26.6667%;">৳৩৯</span>
                    <span class="max-value absolute top-1/2 z-10 block -translate-y-1/2 text-[10px] font-medium leading-none text-black" style="right: 10px;">৳০</span>
                </div>
            </div>
            
            <div class="shadow-cart-item thin-scrollbar max-h-[calc(100%-70px-var(--miniCart-bottom-height))] overflow-auto pb-4">
                ${generateCartItems()}
            </div>
            
            <div class="absolute bottom-0 left-0 w-full bg-white">
                <span class="hidden"></span>
                <div class="px-3.5 py-3">
                    <div class="discount-coupon">
                        <div class="relative mb-2">
                            <input class="h-8 w-full rounded-[5px] border border-[#DBDADF] px-2 pr-[100px] text-xs" placeholder="কুপন কোড টাইপ করুন" type="text">
                            <button class="absolute right-1 top-1/2 h-6 -translate-y-1/2 rounded-[5px] bg-[#ea0606] px-2 text-xs leading-6 text-white active:bg-main" type="button">কুপন সংযুক্ত করুন</button>
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="flex h-11 w-1/2 items-center justify-center bg-yellow text-sm font-medium leading-none text-black">
                        <h4 class="mr-1 inline-block text-sm font-medium leading-none">মোট: ৳${cartTotal}</h4>
                    </div>
                    <button class="h-11 w-1/2 bg-main text-center text-sm font-medium leading-9 text-white">অর্ডার করুন</button>
                </div>
            </div>
            
            <button type="button" aria-label="close" class="cart-side-close icon icon-arrow-right absolute right-full top-1/2 h-11 w-5 -translate-y-1/2 rounded-l-[10px] bg-yellow text-center text-sm"></button>
        `;

        // Add to body
        document.body.appendChild(miniCart);

        // Add event listeners for close buttons
        const closeBtn = miniCart.querySelector('.cart-close-btn');
        const sideCloseBtn = miniCart.querySelector('.cart-side-close');

        if (closeBtn) {
            closeBtn.addEventListener('click', closeCartSidebar);
        }

        if (sideCloseBtn) {
            sideCloseBtn.addEventListener('click', closeCartSidebar);
        }

        // Add backdrop
        const existingBackdrop = document.querySelector('.cart-backdrop');
        if (!existingBackdrop) {
            const backdrop = document.createElement('div');
            backdrop.className = 'cart-backdrop fixed inset-0 bg-black bg-opacity-50 z-40';
            backdrop.addEventListener('click', closeCartSidebar);
            document.body.appendChild(backdrop);
        }

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Animate in
        setTimeout(() => {
            miniCart.style.transform = 'translateX(0)';
        }, 10);
    }

    // Generate cart items HTML
    function generateCartItems() {
        if (cartItems.length === 0) {
            return `
                <div class="flex items-center justify-center h-40 text-gray-500">
                    <div class="text-center">
                        <p class="text-sm">আপনার ব্যাগ খালি</p>
                        <p class="text-xs mt-1">কেনাকাটা শুরু করুন</p>
                    </div>
                </div>
            `;
        }

        return cartItems.map((item, index) => `
            <div class="flex flex-wrap items-center overflow-hidden border-b border-[#F2F2F2] bg-white px-1.5 py-2.5 first:border-t last:border-0">
                <div class="product-image relative w-11 lg:w-12">
                    <picture>
                        <source media="(min-width: 768px)" srcset="${item.image || 'https://d2t8nl1y0ie1km.cloudfront.net/images/thumbs/65fa94f6115075f231ec6039_ACI-Aroma-Chinigura-Rice-1kg_1_80.webp'}" width="56" height="45">
                        <source srcset="${item.image || 'https://d2t8nl1y0ie1km.cloudfront.net/images/thumbs/65fa94f6115075f231ec6039_ACI-Aroma-Chinigura-Rice-1kg_1_80.webp'}" width="56" height="45">
                        <img alt="${item.name} এর ছবি" title="${item.name} এর ছবি" loading="lazy" width="56" height="45" decoding="async" data-nimg="1" class="max-w-full" src="${item.image || 'https://d2t8nl1y0ie1km.cloudfront.net/images/thumbs/65fa94f6115075f231ec6039_ACI-Aroma-Chinigura-Rice-1kg_1_80.webp'}" style="color: transparent;">
                    </picture>
                </div>
                <div class="car-product-info w-[calc(100%-44px)] pl-1 lg:w-[calc(100%-48px)] lg:pl-2.5">
                    <a class="mb-0.5 block min-w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs font-medium leading-none text-black" href="${item.url || '#'}">${item.name}</a>
                    <div class="relative flex items-center py-1">
                        <div class="flex w-40 flex-wrap items-center">
                            <div class="mr-2">
                                <span class="text-xs font-medium text-main lg:text-sm"><strong>৳${item.price}</strong></span>
                            </div>
                            <div class="justify-self-auto text-[11px] leading-none lg:text-xs">
                                <span class="text-main">৳${item.originalPrice || (item.price + 20)}</span>
                                <span class="mx-1 text-gray-700">|</span>
                                <span class="whitespace-nowrap text-gray-500">${item.unit || 'Piece'}</span>
                            </div>
                        </div>
                        <div class="absolute right-1 top-1/2 flex -translate-y-1/2 items-center">
                            <div class="item-remove ml-auto md:ml-0">
                                <button class="cart-delete-btn mr-3 text-xs text-gray-500 cart-item-delete" aria-label="delete cart item" type="button" data-item-id="${item.id}">🗑️</button>
                            </div>
                            <div class="cart-item-quantity relative ml-auto flex items-center justify-center whitespace-nowrap">
                                <button class="cart-qty-btn-minus absolute left-0 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-lg !font-bold text-main shadow-cart-qty outline-none transition-all duration-300 active:shadow-3xl cart-qty-minus" aria-label="cart quantity decrease" type="button" data-item-id="${item.id}">−</button>
                                <span class="pointer-events-none inline-block h-7 min-w-[90px] max-w-[140px] px-8 py-1.5 text-center text-sm text-main outline-none">${item.quantity}</span>
                                <button class="cart-qty-btn-plus absolute right-0 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-sm !font-bold text-main shadow-cart-qty outline-none transition-all duration-300 active:shadow-3xl cart-qty-plus" aria-label="cart quantity increase" type="button" data-item-id="${item.id}">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap empty:hidden">
                        ${item.discount ? `<div class="mr-2 rounded-md px-1 text-xs leading-none text-gray-500">৳${item.discount} ছাড়</div>` : '<div class="mr-2 rounded-md px-1 text-xs leading-none text-gray-500">৳২০ ছাড়</div>'}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Close cart sidebar
    function closeCartSidebar() {
        const miniCart = document.querySelector('.mini-cart');
        if (miniCart) {
            // Animate out
            miniCart.style.transform = 'translateX(100%)';

            // Remove after animation
            setTimeout(() => {
                miniCart.remove();
            }, 300);
        }

        // Remove backdrop
        const backdrop = document.querySelector('.cart-backdrop');
        if (backdrop) {
            backdrop.remove();
        }

        // Restore body scroll
        document.body.style.overflow = '';
    }

    // Cart close button handlers are now in the setTimeout above

    // Update cart display
    function updateCartDisplay() {
        const cartItemsSpan = cartButton?.querySelector('span:first-child');
        const cartTotalSpan = cartButton?.querySelector('span:last-child');
        const cartHeaderItems = cartSidebar?.querySelector('h3');

        if (cartItemsSpan) {
            cartItemsSpan.textContent = `${cartItems.length} items`;
        }

        if (cartTotalSpan) {
            cartTotalSpan.textContent = `৳${cartTotal}`;
        }

        if (cartHeaderItems) {
            cartHeaderItems.innerHTML = `
        <span class="text-xl box-border caret-transparent block leading-5 mr-2.5 font-iconfont"></span>
        ${cartItems.length} items
      `;
        }

        // Update mobile cart button
        const mobileCartButton = document.querySelector('button.relative.text-white.items-center.bg-red-600');
        const mobileCartCount = mobileCartButton?.querySelector('span.absolute.text-neutral-800');
        if (mobileCartCount) {
            mobileCartCount.textContent = cartItems.length.toString();
        }
    }

    // ===== ADD TO BAG FUNCTIONALITY =====
    // Target buttons with "Add to Bag" text
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        if (button.textContent.includes('Add to Bag') || button.innerHTML.includes('Add to Bag') ||
            button.textContent.includes('ব্যাগে যোগ করুন')) {
            button.addEventListener('click', function (e) {
                e.preventDefault();

                // Animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);

                // Create the exact HTML structure you provided
                const productBoxCartBtn = document.createElement('div');
                productBoxCartBtn.className = 'product-box-cart-btn absolute bottom-[calc(100%+8px)] right-1 order-6 flex overflow-hidden rounded-full shadow-6xl md:static md:shadow-none';
                productBoxCartBtn.innerHTML = `
                    <button type="button" aria-label="decrease quantity" class="product-qty-minus mr-[-1px] rounded-l-full bg-white px-2 py-[2px] pl-3 text-[13px] !font-bold leading-[13px] text-main active:shadow-inner md:border-[1px] md:border-solid md:border-[#f0c802] md:bg-yellow md:py-1 md:text-[18px] md:text-dark">−</button>
                    <button type="button" class="md:border-y-solid mx-[1px] hidden h-[28px] bg-white px-3.5 py-[2px] text-[0px] font-medium leading-none text-main active:shadow-inner md:inline-block md:h-[auto] md:border-y-[1px] md:border-y-[#f0c802] md:bg-yellow md:px-2 md:py-1.5 md:text-xs md:text-dark">ব্যাগে 1টি</button>
                    <button type="button" class="mx-[1px] inline-block h-[28px] bg-white px-3.5 py-[2px] text-sm font-medium leading-none text-main active:shadow-inner md:hidden md:h-[auto] md:px-2"><span class="">1</span></button>
                    <button type="button" class="add-to-cart-button flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white py-[2px] text-[0px] leading-none text-main md:h-[auto] md:w-[auto] md:border md:border-main md:bg-main md:px-6 md:py-1.5 md:text-xs md:font-medium md:text-white !hidden">ব্যাগে যোগ করুন</button>
                    <button type="button" aria-label="increase quantity" class="product-qty-plus ml-[-1px] rounded-r-full bg-white px-2 py-[2px] pr-3 text-[9px] !font-bold leading-[13px] text-main active:shadow-inner md:border-[1px] md:border-solid md:border-[#f0c802] md:bg-yellow md:py-1 md:text-xs md:leading-none md:text-dark">+</button>
                `;

                // Replace the original button with the new structure
                this.parentNode.replaceChild(productBoxCartBtn, this);

                // Add item to cart (no notification)
                addToCart({
                    id: Date.now(),
                    name: 'ACI Aroma Chinigura Rice 1kg',
                    price: 135,
                    originalPrice: 155,
                    image: 'https://d2t8nl1y0ie1km.cloudfront.net/images/thumbs/65fa94f6115075f231ec6039_ACI-Aroma-Chinigura-Rice-1kg_1_80.webp',
                    url: '/aci-aroma-chinigura-rice-1kg',
                    unit: 'Piece',
                    discount: 20,
                    quantity: 1
                });

                console.log('Product added to bag');
            });
        }
    });

    // Add item to cart
    function addToCart(item) {
        // Check if item already exists
        const existingItem = cartItems.find(cartItem => cartItem.name === item.name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            item.quantity = 1;
            cartItems.push(item);
        }

        cartTotal += item.price;
        updateCartDisplay();
        // No notification as requested
    }

    // Handle cart item interactions
    document.addEventListener('click', function (e) {
        // Delete item
        if (e.target.classList.contains('cart-item-delete')) {
            const itemId = parseInt(e.target.dataset.itemId);
            removeFromCart(itemId);

            // Refresh cart display
            const miniCart = document.querySelector('.mini-cart');
            if (miniCart) {
                const cartItemsContainer = miniCart.querySelector('.shadow-cart-item');
                cartItemsContainer.innerHTML = generateCartItems();

                // Update header count
                const headerCount = miniCart.querySelector('h3');
                headerCount.innerHTML = `<span class="icon icon-cart-1 mr-2.5 text-[20px] !font-medium"></span> ${cartItems.length} টি পণ্য`;

                // Update total
                const totalElement = miniCart.querySelector('h4');
                totalElement.textContent = `মোট: ৳${cartTotal}`;
            }
        }

        // Increase quantity
        if (e.target.classList.contains('cart-qty-plus')) {
            const itemId = parseInt(e.target.dataset.itemId);
            const item = cartItems.find(item => item.id === itemId);
            if (item) {
                item.quantity += 1;
                cartTotal += item.price;
                updateCartDisplay();

                // Refresh cart display
                const miniCart = document.querySelector('.mini-cart');
                if (miniCart) {
                    const cartItemsContainer = miniCart.querySelector('.shadow-cart-item');
                    cartItemsContainer.innerHTML = generateCartItems();

                    // Update total
                    const totalElement = miniCart.querySelector('h4');
                    totalElement.textContent = `মোট: ৳${cartTotal}`;
                }
            }
        }

        // Decrease quantity
        if (e.target.classList.contains('cart-qty-minus')) {
            const itemId = parseInt(e.target.dataset.itemId);
            const item = cartItems.find(item => item.id === itemId);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                cartTotal -= item.price;
                updateCartDisplay();

                // Refresh cart display
                const miniCart = document.querySelector('.mini-cart');
                if (miniCart) {
                    const cartItemsContainer = miniCart.querySelector('.shadow-cart-item');
                    cartItemsContainer.innerHTML = generateCartItems();

                    // Update total
                    const totalElement = miniCart.querySelector('h4');
                    totalElement.textContent = `মোট: ৳${cartTotal}`;
                }
            } else if (item && item.quantity === 1) {
                // Remove item if quantity becomes 0
                removeFromCart(itemId);

                // Refresh cart display
                const miniCart = document.querySelector('.mini-cart');
                if (miniCart) {
                    const cartItemsContainer = miniCart.querySelector('.shadow-cart-item');
                    cartItemsContainer.innerHTML = generateCartItems();

                    // Update header count
                    const headerCount = miniCart.querySelector('h3');
                    headerCount.innerHTML = `<span class="icon icon-cart-1 mr-2.5 text-[20px] !font-medium"></span> ${cartItems.length} টি পণ্য`;

                    // Update total
                    const totalElement = miniCart.querySelector('h4');
                    totalElement.textContent = `মোট: ৳${cartTotal}`;
                }
            }
        }
    });

    // Remove item from cart
    function removeFromCart(itemId) {
        const itemIndex = cartItems.findIndex(item => item.id === itemId);
        if (itemIndex > -1) {
            cartTotal -= cartItems[itemIndex].price;
            cartItems.splice(itemIndex, 1);
            updateCartDisplay();
            showNotification('Item removed from cart!', 'info');
        }
    }

    // Mobile cart button click (the floating red button)
    setTimeout(() => {
        const mobileCartButton = document.querySelector('button.relative.text-white.items-center.bg-red-600') ||
            document.querySelector('button[class*="bg-red-600"][class*="relative"]') ||
            Array.from(document.querySelectorAll('button')).find(btn =>
                btn.classList.contains('bg-red-600') &&
                btn.classList.contains('relative')
            );

        if (mobileCartButton) {
            console.log('Mobile cart button found:', mobileCartButton);
            mobileCartButton.addEventListener('click', function (e) {
                e.preventDefault();
                console.log('Mobile cart button clicked');
                openCartSidebar();
            });
        } else {
            console.log('Mobile cart button not found');
        }
    }, 500);

    // Handle quantity button clicks (+ and - buttons) for new HTML structure
    document.addEventListener('click', function (e) {
        const productBoxCartBtn = e.target.closest('.product-box-cart-btn');
        if (productBoxCartBtn) {
            const clickedElement = e.target;

            // Check if clicked on minus button
            if (clickedElement.classList.contains('product-qty-minus') ||
                clickedElement.textContent.trim() === '−' ||
                clickedElement.textContent.trim() === '-') {
                e.preventDefault();
                e.stopPropagation();

                // Find quantity displays
                const desktopQuantityBtn = productBoxCartBtn.querySelector('button:nth-child(2)'); // ব্যাগে 1টি
                const mobileQuantityBtn = productBoxCartBtn.querySelector('button:nth-child(3) span'); // 1

                let currentQuantity = 1;

                // Get current quantity from desktop or mobile display
                if (desktopQuantityBtn && desktopQuantityBtn.textContent.includes('টি')) {
                    const match = desktopQuantityBtn.textContent.match(/(\d+)টি/);
                    currentQuantity = match ? parseInt(match[1]) : 1;
                } else if (mobileQuantityBtn) {
                    currentQuantity = parseInt(mobileQuantityBtn.textContent) || 1;
                }

                if (currentQuantity > 1) {
                    const newQuantity = currentQuantity - 1;

                    // Update both displays
                    if (desktopQuantityBtn) {
                        desktopQuantityBtn.textContent = `ব্যাগে ${newQuantity}টি`;
                    }
                    if (mobileQuantityBtn) {
                        mobileQuantityBtn.textContent = newQuantity.toString();
                    }

                    // Remove one item from cart
                    if (cartItems.length > 0) {
                        cartItems.pop();
                        cartTotal -= 150;
                        updateCartDisplay();
                    }
                } else {
                    // Reset to original "Add to Bag" button
                    const originalButton = document.createElement('button');
                    originalButton.type = 'button';
                    originalButton.className = 'add-to-cart-button bg-red-600 text-white px-4 py-2 rounded';
                    originalButton.textContent = 'ব্যাগে যোগ করুন';

                    // Replace the quantity selector with original button
                    productBoxCartBtn.parentNode.replaceChild(originalButton, productBoxCartBtn);

                    // Remove all items for this product from cart
                    if (cartItems.length > 0) {
                        cartItems.pop();
                        cartTotal -= 150;
                        updateCartDisplay();
                    }
                }
            }
            // Check if clicked on plus button
            else if (clickedElement.classList.contains('product-qty-plus') ||
                clickedElement.textContent.trim() === '+') {
                e.preventDefault();
                e.stopPropagation();

                // Find quantity displays
                const desktopQuantityBtn = productBoxCartBtn.querySelector('button:nth-child(2)'); // ব্যাগে 1টি
                const mobileQuantityBtn = productBoxCartBtn.querySelector('button:nth-child(3) span'); // 1

                let currentQuantity = 1;

                // Get current quantity from desktop or mobile display
                if (desktopQuantityBtn && desktopQuantityBtn.textContent.includes('টি')) {
                    const match = desktopQuantityBtn.textContent.match(/(\d+)টি/);
                    currentQuantity = match ? parseInt(match[1]) : 1;
                } else if (mobileQuantityBtn) {
                    currentQuantity = parseInt(mobileQuantityBtn.textContent) || 1;
                }

                const newQuantity = currentQuantity + 1;

                // Update both displays
                if (desktopQuantityBtn) {
                    desktopQuantityBtn.textContent = `ব্যাগে ${newQuantity}টি`;
                }
                if (mobileQuantityBtn) {
                    mobileQuantityBtn.textContent = newQuantity.toString();
                }

                // Add item to cart
                addToCart({
                    id: Date.now(),
                    name: 'ACI Aroma Chinigura Rice 1kg',
                    price: 135,
                    originalPrice: 155,
                    image: 'https://d2t8nl1y0ie1km.cloudfront.net/images/thumbs/65fa94f6115075f231ec6039_ACI-Aroma-Chinigura-Rice-1kg_1_80.webp',
                    url: '/aci-aroma-chinigura-rice-1kg',
                    unit: 'Piece',
                    discount: 20,
                    quantity: 1
                });
            }
        }
    });

    // ===== MOBILE MENU TOGGLE =====
    // Create mobile menu button for your existing design
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'fixed top-4 left-4 z-[60] bg-red-600 text-white p-2 rounded md:hidden';
    mobileMenuButton.innerHTML = `
    <div class="w-5 h-4 flex flex-col justify-between">
      <span class="block w-full h-0.5 bg-white"></span>
      <span class="block w-full h-0.5 bg-white"></span>
      <span class="block w-full h-0.5 bg-white"></span>
    </div>
  `;

    document.body.appendChild(mobileMenuButton);

    // Mobile menu functionality
    mobileMenuButton.addEventListener('click', function () {
        if (megaMenuDiv && menuOverlay) {
            const isOpen = megaMenuDiv.style.left === '0px';

            if (isOpen) {
                megaMenuDiv.style.left = '-350px';
                menuOverlay.style.width = '0';
                document.body.style.overflow = '';
            } else {
                megaMenuDiv.style.left = '0px';
                menuOverlay.style.width = '100vw';
                document.body.style.overflow = 'hidden';
            }
        }
    });

    // ===== LANGUAGE TOGGLE =====
    const languageButtons = document.querySelectorAll('button');
    languageButtons.forEach(button => {
        if (button.textContent.includes('বাংলা') || button.textContent.includes('English')) {
            button.addEventListener('click', function () {
                console.log('Language toggled');
                // Add your language switching logic here
            });
        }
    });

    // ===== RESPONSIVE HANDLING =====
    function handleResize() {
        const isMobile = window.innerWidth < 768;

        if (isMobile) {
            // Reset desktop hover states
            allMenuItems.forEach(item => {
                const submenu = item.querySelector('ul');
                if (submenu) {
                    submenu.style.left = '-100%';
                    submenu.style.display = 'none';
                }
            });

            if (megaMenuDiv) {
                megaMenuDiv.style.left = '-350px';
                megaMenuDiv.style.display = 'block';
            }
        } else {
            // Reset mobile states
            if (megaMenuDiv) {
                megaMenuDiv.style.left = '';
                megaMenuDiv.classList.add('md:hidden');
            }
            if (menuOverlay) {
                menuOverlay.style.width = '0';
            }
            document.body.style.overflow = '';
        }
    }

    window.addEventListener('resize', handleResize);

    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ===== ACCESSIBILITY IMPROVEMENTS =====
    // Add keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            // Close any open modals/menus
            if (locationModal && !locationModal.classList.contains('hidden')) {
                locationModal.classList.add('hidden');
                locationModal.classList.remove('flex');
            }

            if (megaMenuDiv && megaMenuDiv.style.left === '0px') {
                megaMenuDiv.style.left = '-350px';
                if (menuOverlay) menuOverlay.style.width = '0';
                document.body.style.overflow = '';
            }

            // Close cart sidebar
            if (cartSidebar && (cartSidebar.style.right === '0px' || cartSidebar.classList.contains('cart-open'))) {
                closeCartSidebar();
            }
        }
    });

    // ===== INITIALIZE ALL FUNCTIONALITY =====
    console.log('Shwapno website functionality initialized!');

    // Add visual feedback for interactive elements
    const interactiveElements = document.querySelectorAll('a, button');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.2s ease';
        });
    });

    // Initialize location detection after a short delay
    setTimeout(detectLocation, 500);
});

// ===== UTILITY FUNCTIONS =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 px-4 py-2 rounded text-white z-[9999] text-sm';
    notification.textContent = message;

    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#10b981';
            break;
        case 'error':
            notification.style.backgroundColor = '#ef4444';
            break;
        case 'warning':
            notification.style.backgroundColor = '#f59e0b';
            break;
        default:
            notification.style.backgroundColor = '#3b82f6';
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Make utility available globally
window.showNotification = showNotification;