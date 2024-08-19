document.addEventListener('DOMContentLoaded', function() {
    const fishTitle = document.getElementById('fish-title');
    const featuredDish = document.querySelector('.featured-dish');
    const menu = document.getElementById('menu');
    const menuItems = document.querySelectorAll('.menu-item');
    const menuToggle = document.querySelector('.menu-button');
    const menuOverlay = document.getElementById('menu-overlay');
    const closeMenuButton = document.getElementById('close-menu');
    const alacarteMenu = document.getElementById('alacarte-menu');
    const mainMenu = document.getElementById('main-menu');
    const alacarteMenuItems = document.getElementById('alacarte-menu-items');
    const instagramButton = document.querySelector('.instagram-button');

    function animateContent() {
        fishTitle.classList.add('fade-in');
        
        setTimeout(() => {
            featuredDish.style.opacity = 1;
            featuredDish.style.transform = 'translateY(0)';
        }, 250);

        setTimeout(() => {
            menu.style.opacity = 1;
            menuItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('show-item');
                    item.querySelectorAll('h2, p, .price').forEach(el => {
                        el.style.opacity = 1;
                    });
                }, 200 * index);
            });
        }, 500);
    }

    function toggleMenu(action) {
        menuOverlay.style.display = action === 'open' ? 'block' : 'none';
        setTimeout(() => {
            menuOverlay.style.opacity = action === 'open' ? '1' : '0';
        }, 10);

        if (action === 'open') {
            mainMenu.style.display = 'flex';
            alacarteMenuItems.style.display = 'none';
        }

        const menuItemsToAnimate = document.querySelectorAll('#main-menu li');
        menuItemsToAnimate.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = action === 'open' ? '1' : '0';
                item.style.transform = action === 'open' ? 'translateY(0)' : 'translateY(20px)';
            }, action === 'open' ? 100 + index * 50 : index * 50);
        });

        if (action === 'close') {
            setTimeout(() => {
                alacarteMenuItems.style.display = 'none';
                mainMenu.style.display = 'flex';
            }, 300);
        }
    }

    function toggleAlacarteMenu() {
        mainMenu.style.display = 'none';
        alacarteMenuItems.style.display = 'flex';
        alacarteMenuItems.style.opacity = '0';
        setTimeout(() => {
            alacarteMenuItems.style.opacity = '1';
            alacarteMenuItems.querySelectorAll('li').forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 50);
            });
        }, 10);
    }

    window.addEventListener('load', animateContent);
    menuToggle.addEventListener('click', () => toggleMenu('open'));
    closeMenuButton.addEventListener('click', () => toggleMenu('close'));
    menuOverlay.addEventListener('click', (event) => {
        if (event.target === menuOverlay) toggleMenu('close');
    });
    alacarteMenu.addEventListener('click', function(event) {
        event.preventDefault();
        toggleAlacarteMenu();
    });
    instagramButton.addEventListener('click', function() {
        window.open('https://www.instagram.com/restaurant_den', '_blank');
    });
});