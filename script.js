document.addEventListener('DOMContentLoaded', function() {
    const introScreen = document.querySelector('.intro-screen');
    const introImage = document.querySelector('.intro-content img');
    const mainImageSection = document.querySelector('.main-image');

    // 初期状態で画像を完全に隠す
    introImage.style.maskImage = 'linear-gradient(135deg, black 0%, black 100%)';
    introImage.style.webkitMaskImage = 'linear-gradient(135deg, black 0%, black 100%)';
    introImage.style.opacity = '0';

    function animateMask(progress) {
        // グラデーションの開始点と終了点を計算
        const start = Math.max(0, progress * 2 - 100);
        const end = progress * 2;
        
        const maskImage = `linear-gradient(135deg, 
            black ${start}%, 
            transparent ${end}%)`;
        introImage.style.maskImage = maskImage;
        introImage.style.webkitMaskImage = maskImage;
    }

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    function revealImage() {
        introImage.style.opacity = '1';
        let progress = 0;
        const duration = 4000; // 4秒間のアニメーション
        const interval = 20; // より滑らかなアニメーションのために間隔を短く
        const steps = duration / interval;
        const increment = 1 / steps;

        const animation = setInterval(() => {
            progress += increment;
            const easedProgress = easeInOutCubic(progress) * 100;
            animateMask(easedProgress);
            if (progress >= 1) {  
                clearInterval(animation);
                // アニメーション完了後、すぐにフェードアウト開始
                introScreen.style.transition = 'opacity 2s ease-in-out';
                introScreen.style.opacity = '0';
                setTimeout(() => {
                    introScreen.style.display = 'none';
                    window.scrollTo({ top: mainImageSection.offsetTop, behavior: 'smooth' });
                }, 2000);
            }
        }, interval);
    }

    // アニメーションの開始（遅延なし）
    revealImage();

    // スライドショーの処理
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides[currentSlide].classList.remove('active');
        slides[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    function startSlideshow() {
        // 最初のスライドを表示
        showSlide(0);
        // 既存のインターバルをクリア（安全のため）
        clearInterval(slideInterval);
        // 新しいインターバルを設定
        slideInterval = setInterval(nextSlide, 6000);
    }

    // 全ての画像が読み込まれたらスライドショーを開始
    window.addEventListener('load', function() {
        startSlideshow();
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

    // スクロールアニメーションの処理
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.visibility = 'visible';
                    entry.target.querySelector('.background').style.opacity = '1';
                    entry.target.querySelector('h2').style.opacity = '1';

                    const paragraphs = entry.target.querySelectorAll('p');
                    paragraphs.forEach((p, index) => {
                        setTimeout(() => {
                            p.style.opacity = '1';
                        }, 1000 * (index + 1));
                    });
                }, 500);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('main > section').forEach(section => {
        observer.observe(section);
    });

    // セクション1とセクション2のアニメーション
    const section1 = document.querySelector('.section-1');
    const section2 = document.querySelector('.section-2');

    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY + window.innerHeight;

        if (scrollPos > section1.offsetTop + 100) {
            section1.style.opacity = '1';
            section1.style.visibility = 'visible';
            const leftContent1 = section1.querySelector('.left-content h3');
            const rightImages1 = section1.querySelectorAll('.right-content img');
            const leftP1 = section1.querySelector('.left-content p');

            setTimeout(() => leftContent1.style.opacity = '1', 1000);
            setTimeout(() => rightImages1[0].style.opacity = '1', 1500);
            setTimeout(() => rightImages1[1].style.opacity = '1', 2000);
            setTimeout(() => leftP1.style.opacity = '1', 3000);
        }

        if (scrollPos > section2.offsetTop + 100) {
            section2.style.opacity = '1';
            section2.style.visibility = 'visible';
            const rightContent2 = section2.querySelector('.right-content h3');
            const leftImages2 = section2.querySelectorAll('.left-content img');
            const rightP2 = section2.querySelector('.right-content p');

            setTimeout(() => rightContent2.style.opacity = '1', 1000);
            setTimeout(() => leftImages2[0].style.opacity = '1', 1500);
            setTimeout(() => leftImages2[1].style.opacity = '1', 2000);
            setTimeout(() => rightP2.style.opacity = '1', 3000);
        }
    });

    // スムーズスクロールスナップの実装
    const sections = document.querySelectorAll('main > section, .main-image, footer');
    let isScrolling = false;
    let startY;
    let currentIndex = 0;

    function lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }

    function scrollToSection(index) {
        isScrolling = true;
        const targetSection = sections[index];
        const startPosition = window.pageYOffset;
        const targetPosition = targetSection.offsetTop;
        const startTime = performance.now();
        const duration = 1000; // 1秒間のアニメーション

        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeInOutCubic(progress);
            const currentPosition = lerp(startPosition, targetPosition, easedProgress);

            window.scrollTo(0, currentPosition);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                isScrolling = false;
            }
        }

        requestAnimationFrame(step);
    }

    function handleWheel(e) {
        if (isScrolling) return;
        e.preventDefault();

        const delta = e.deltaY;
        if (delta > 0 && currentIndex < sections.length - 1) {
            currentIndex++;
            scrollToSection(currentIndex);
        } else if (delta < 0 && currentIndex > 0) {
            currentIndex--;
            scrollToSection(currentIndex);
        }
    }

    function handleTouchStart(e) {
        startY = e.touches[0].clientY;
    }

    function handleTouchMove(e) {
        if (isScrolling) {
            e.preventDefault();
            return;
        }

        const currentY = e.touches[0].clientY;
        const diff = startY - currentY;

        if (Math.abs(diff) > 50) { // 50pxのスワイプで次のセクションに移動
            if (diff > 0 && currentIndex < sections.length - 1) {
                currentIndex++;
                scrollToSection(currentIndex);
            } else if (diff < 0 && currentIndex > 0) {
                currentIndex--;
                scrollToSection(currentIndex);
            }
            startY = currentY;
        }
    }

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // 初期位置の設定
    window.addEventListener('load', function() {
        const hash = window.location.hash;
        if (hash) {
            const targetSection = document.querySelector(hash);
            if (targetSection) {
                currentIndex = Array.from(sections).indexOf(targetSection);
                scrollToSection(currentIndex);
            }
        }
    });

    // ウィンドウのリサイズ時にスクロール位置を調整
    window.addEventListener('resize', function() {
        scrollToSection(currentIndex);
    });
});