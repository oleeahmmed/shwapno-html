// Enhanced Sidebar Menu Functionality - Like Picture
// Works on both desktop (hover) and mobile (click)

document.addEventListener('DOMContentLoaded', function() {
  
  // ===== MAIN MENU TOGGLE =====
  const categoryToggle = document.querySelector('.text-sm.font-medium.box-border');
  const megaMenuMain = document.querySelector('.fixed.bg-white.box-border.caret-transparent.block.h-full');
  const menuOverlay = document.querySelector('label.fixed.bg-neutral-800');
  
  // Desktop: Hover to open
  if (window.innerWidth >= 768 && categoryToggle && megaMenuMain) {
    const categoryContainer = categoryToggle.closest('.relative.box-border.caret-transparent');
    
    categoryContainer.addEventListener('mouseenter', function() {
      megaMenuMain.style.left = '0';
      megaMenuMain.style.display = 'block';
      megaMenuMain.classList.remove('md:hidden');
    });
    
    categoryContainer.addEventListener('mouseleave', function() {
      megaMenuMain.style.left = '-350px';
      megaMenuMain.classList.add('md:hidden');
    });
    
    // Keep menu open when hovering over it
    megaMenuMain.addEventListener('mouseenter', function() {
      this.style.left = '0';
      this.style.display = 'block';
    });
    
    megaMenuMain.addEventListener('mouseleave', function() {
      this.style.left = '-350px';
    });
  }
  
  // Mobile: Click to open
  if (categoryToggle) {
    categoryToggle.addEventListener('click', function() {
      if (window.innerWidth < 768) {
        const isOpen = megaMenuMain.style.left === '0px';
        
        if (isOpen) {
          megaMenuMain.style.left = '-350px';
          if (menuOverlay) menuOverlay.style.width = '0';
          document.body.style.overflow = '';
        } else {
          megaMenuMain.style.left = '0px';
          if (menuOverlay) menuOverlay.style.width = '100vw';
          document.body.style.overflow = 'hidden';
        }
      }
    });
  }
  
  // Close menu when overlay is clicked
  if (menuOverlay) {
    menuOverlay.addEventListener('click', function() {
      megaMenuMain.style.left = '-350px';
      this.style.width = '0';
      document.body.style.overflow = '';
    });
  }
  
  // ===== SUBMENU FUNCTIONALITY =====
  const allMenuItems = document.querySelectorAll('li.box-border.caret-transparent');
  
  allMenuItems.forEach(function(item) {
    const link = item.querySelector('a');
    const submenu = item.querySelector('ul');
    const arrow = link?.querySelector('button');
    
    if (link && submenu && arrow) {
      
      // Desktop: Hover to show submenu
      if (window.innerWidth >= 768) {
        item.addEventListener('mouseenter', function() {
          // Calculate nesting level
          const level = getMenuLevel(item);
          const leftPosition = 285 + (level * 250);
          
          // Show submenu
          submenu.style.left = leftPosition + 'px';
          submenu.style.top = '0';
          submenu.style.display = 'block';
          submenu.style.height = 'auto';
          submenu.style.maxHeight = 'none';
          submenu.classList.remove('md:hidden');
          submenu.style.opacity = '1';
          submenu.style.visibility = 'visible';
          
          // Rotate arrow
          arrow.style.transform = 'rotate(90deg)';
        });
        
        item.addEventListener('mouseleave', function() {
          setTimeout(function() {
            if (!item.matches(':hover') && !submenu.matches(':hover')) {
              submenu.style.left = '-100%';
              submenu.classList.add('md:hidden');
              submenu.style.opacity = '0';
              submenu.style.visibility = 'hidden';
              arrow.style.transform = 'rotate(0deg)';
            }
          }, 100);
        });
        
        // Keep submenu open when hovering over it
        submenu.addEventListener('mouseenter', function() {
          this.style.display = 'block';
          this.style.opacity = '1';
          this.style.visibility = 'visible';
        });
        
        submenu.addEventListener('mouseleave', function() {
          this.style.left = '-100%';
          this.classList.add('md:hidden');
          this.style.opacity = '0';
          this.style.visibility = 'hidden';
          arrow.style.transform = 'rotate(0deg)';
        });
      }
      
      // Mobile: Click to show submenu
      if (arrow) {
        arrow.addEventListener('click', function(e) {
          if (window.innerWidth < 768) {
            e.preventDefault();
            e.stopPropagation();
            
            const isOpen = submenu.style.left === '0px';
            
            // Close all sibling submenus
            const siblings = item.parentElement.querySelectorAll('li.box-border.caret-transparent');
            siblings.forEach(function(sibling) {
              if (sibling !== item) {
                const siblingSubmenu = sibling.querySelector('ul');
                const siblingArrow = sibling.querySelector('a button');
                if (siblingSubmenu) {
                  siblingSubmenu.style.left = '-100%';
                }
                if (siblingArrow) {
                  siblingArrow.style.transform = 'rotate(0deg)';
                }
              }
            });
            
            // Toggle current submenu
            if (isOpen) {
              submenu.style.left = '-100%';
              arrow.style.transform = 'rotate(0deg)';
            } else {
              submenu.style.left = '0px';
              arrow.style.transform = 'rotate(90deg)';
            }
          }
        });
      }
    }
  });
  
  // Helper function to get menu nesting level
  function getMenuLevel(item) {
    let level = 0;
    let parent = item.parentElement;
    
    while (parent) {
      if (parent.tagName === 'UL' && parent.classList.contains('fixed')) {
        level++;
      }
      parent = parent.parentElement;
    }
    
    return level - 1;
  }
  
  // ===== MOBILE MENU HAMBURGER =====
  const mobileMenuBtn = document.querySelector('label.box-border.caret-transparent.block.min-h-\\[auto\\]');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      if (window.innerWidth < 768) {
        const isOpen = megaMenuMain.style.left === '0px';
        
        if (isOpen) {
          megaMenuMain.style.left = '-350px';
          if (menuOverlay) menuOverlay.style.width = '0';
          document.body.style.overflow = '';
        } else {
          megaMenuMain.style.left = '0px';
          if (menuOverlay) menuOverlay.style.width = '100vw';
          document.body.style.overflow = 'hidden';
        }
      }
    });
  }
  
  // ===== RESPONSIVE HANDLING =====
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      const isMobile = window.innerWidth < 768;
      
      if (!isMobile) {
        // Reset mobile states
        if (megaMenuMain) {
          megaMenuMain.style.left = '';
          megaMenuMain.classList.add('md:hidden');
        }
        if (menuOverlay) {
          menuOverlay.style.width = '0';
        }
        document.body.style.overflow = '';
        
        // Reset all submenus
        allMenuItems.forEach(function(item) {
          const submenu = item.querySelector('ul');
          const arrow = item.querySelector('a button');
          if (submenu) {
            submenu.style.left = '';
            submenu.classList.add('md:hidden');
          }
          if (arrow) {
            arrow.style.transform = 'rotate(0deg)';
          }
        });
      }
    }, 250);
  });
  
  // ===== KEYBOARD NAVIGATION =====
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      // Close main menu
      if (megaMenuMain && megaMenuMain.style.left === '0px') {
        megaMenuMain.style.left = '-350px';
        if (menuOverlay) menuOverlay.style.width = '0';
        document.body.style.overflow = '';
      }
      
      // Close all submenus
      allMenuItems.forEach(function(item) {
        const submenu = item.querySelector('ul');
        const arrow = item.querySelector('a button');
        if (submenu) {
          submenu.style.left = '-100%';
        }
        if (arrow) {
          arrow.style.transform = 'rotate(0deg)';
        }
      });
    }
  });
  
  console.log('Enhanced sidebar menu initialized - works like picture!');
});
