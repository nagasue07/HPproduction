document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const container = document.querySelector('.container');
    const title = document.getElementById('title');
    const subtitle = document.getElementById('subtitle');
    const contactInfo = document.querySelector('.contact-info');
    const formContainer = document.querySelector('.form-container');
    const form = document.getElementById('reservation-form');
    const thankYouMessage = document.getElementById('thank-you-message');

    const menuToggle = document.querySelector('.menu-button');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuItems = document.querySelectorAll('#main-menu li');
    const closeMenuButton = document.getElementById('close-menu');
    const alacarteMenu = document.getElementById('alacarte-menu');
    const mainMenu = document.getElementById('main-menu');
    const alacarteMenuItems = document.getElementById('alacarte-menu-items');

    // 初期表示のアニメーション
    setTimeout(() => {
        body.style.opacity = 1;
    }, 50);

    setTimeout(() => {
        title.style.opacity = 1;
        subtitle.style.opacity = 1;
        container.style.opacity = 1;
    }, 550);

    setTimeout(() => {
        contactInfo.style.opacity = 1;
        contactInfo.style.transform = 'translateY(0)';
        formContainer.style.opacity = 1;
        formContainer.style.transform = 'translateY(0)';
    }, 1050);

    // メニュー関連の機能
    function openMenu() {
        menuOverlay.style.display = 'block';
        setTimeout(() => {
            menuOverlay.style.opacity = '1';
            setTimeout(() => {
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

    // フォーム送信の改善された処理
    if (form) {
        form.addEventListener('submit', async function (event) {
            event.preventDefault();
            console.log('Form submission started');

            if (!validateForm()) {
                return;
            }

            showLoading();

            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    formContainer.style.display = 'none';
                    contactInfo.style.display = 'none';
                    thankYouMessage.style.display = 'block';
                    form.reset();
                } else {
                    throw new Error(data.error || 'Form submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('エラーが発生しました。もう一度お試しください。エラー詳細: ' + error.message);
            } finally {
                hideLoading();
            }
        });
    }

    function validateForm() {
        const requiredFields = form.querySelectorAll('[required]');
        for (let field of requiredFields) {
            if (!field.value.trim()) {
                alert(`${field.name} は必須項目です。`);
                return false;
            }
        }
        return true;
    }

    function showLoading() {
        const loadingElement = document.createElement('div');
        loadingElement.id = 'loading';
        loadingElement.textContent = '送信中...';
        form.appendChild(loadingElement);
    }

    function hideLoading() {
        const loadingElement = document.getElementById('loading');
        if (loadingElement) {
            loadingElement.remove();
        }
    }
});