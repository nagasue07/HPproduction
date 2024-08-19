document.addEventListener("DOMContentLoaded", function() {
    const centerText = document.querySelector('.center-text');
    const images = document.querySelectorAll('.image-container img');
    const labels = document.querySelectorAll('.course-label');

    // Step 1: Show center text with fade-in effect
    setTimeout(() => {
        centerText.classList.add('show');
    }, 100);

    // Step 2: Show images with fade-in effect
    setTimeout(() => {
        images.forEach(img => img.classList.add('show'));
    }, 600); // Wait for 0.5 seconds (500ms) + 100ms delay for smooth transition

    // Step 3: Show course labels with fade-in effect
    setTimeout(() => {
        labels.forEach(label => label.classList.add('show'));
    }, 2100); // Wait for 1.5 seconds (1500ms) + 600ms delay for smooth transition
});

    // メニューボタンの機能
    const menuToggle = document.querySelector('.menu-button');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuItems = document.querySelectorAll('#main-menu li');
    const closeMenuButton = document.getElementById('close-menu');
    const alacarteMenu = document.getElementById('alacarte-menu');
    const mainMenu = document.getElementById('main-menu');
    const alacarteMenuItems = document.getElementById('alacarte-menu-items');

    function openMenu() {
        menuOverlay.style.display = 'block';
        setTimeout(() => {
            menuOverlay.style.opacity = '1';
            setTimeout(() => {
                menuItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }, 300);
        }, 10);
    }

    function closeMenu() {
        menuOverlay.style.opacity = '0';
        menuItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
        });
        setTimeout(() => {
            menuOverlay.style.display = 'none';
        }, 1000);
    }

    menuToggle.addEventListener('click', openMenu);
    closeMenuButton.addEventListener('click', closeMenu);

    menuOverlay.addEventListener('click', (event) => {
        if (event.target === menuOverlay) {
            closeMenu();
        }
    });

    // アラカルトメニューのリンクをクリックしたときの動作
    alacarteMenu.addEventListener('click', function(event) {
        event.preventDefault();
        mainMenu.style.display = 'none';
        alacarteMenuItems.style.display = 'flex';
        alacarteMenuItems.style.opacity = '0';
        setTimeout(() => {
            alacarteMenuItems.style.opacity = '1';
            alacarteMenuItems.querySelectorAll('li').forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 10);
    });

    // Instagramボタンの機能
    const instagramButton = document.querySelector('.instagram-button');
    instagramButton.addEventListener('click', function() {
        window.open('https://www.instagram.com/restaurant_den', '_blank');
    });

