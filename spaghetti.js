window.onload = function() {
    const spaghettiTitle = document.getElementById('spaghetti-title');
    const featuredDish = document.querySelector('.featured-dish');
    const menuItems = document.querySelectorAll('.menu-item');
    
    // パスタタイトルを表示
    setTimeout(() => {
        spaghettiTitle.classList.add('fade-in');
    }, 500);

    // フィーチャーディッシュを表示
    setTimeout(() => {
        featuredDish.style.opacity = 1;
        featuredDish.style.transform = 'translateY(0)';
    }, 750);

    // メニュー項目の枠と文字を順に表示
    setTimeout(() => {
        document.getElementById('menu').style.opacity = 1;
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show-item');
                const texts = item.querySelectorAll('h2, p, .price');
                texts.forEach((text) => {
                    text.style.opacity = 1;
                });
            }, 200 * index);
        });
    }, 1000);
};

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
            // メインメニューを表示し、アラカルトメニューを非表示にする
            mainMenu.style.display = 'flex';
            alacarteMenuItems.style.display = 'none';
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
        // メニューを閉じるときに、アラカルトメニューを非表示にし、メインメニューを表示状態にリセット
        alacarteMenuItems.style.display = 'none';
        mainMenu.style.display = 'flex';
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