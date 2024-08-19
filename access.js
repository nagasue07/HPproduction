document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    const container = document.querySelector('.container');
    const title = document.getElementById('title');
    const info = document.querySelector('.info');
    const mapContainer = document.querySelector('.map-container');
    // ステップ1: 背景色を0.5秒かけて表示
    setTimeout(() => {
        body.style.opacity = 1;
    }, 100);
    // ステップ2: accessの文字を0.5秒かけて表示
    setTimeout(() => {
        container.style.opacity = 1;
        title.style.opacity = 1;
    }, 600); // 0.5秒（500ms）+ 100ms の遅延
    // ステップ3: 情報（住所、駐車場、駅）を0.5秒かけて表示
    setTimeout(() => {
        info.style.opacity = 1;
    }, 1100); // 0.5秒（500ms）+ 600ms の遅延
    // ステップ4: 地図を0.5秒かけて表示
    setTimeout(() => {
        mapContainer.style.opacity = 1;
    }, 1600); // 0.5秒（500ms）+ 1100ms の遅延
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