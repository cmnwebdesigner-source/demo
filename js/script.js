let historyStack = ['home'];
        let intersectionObserver = null;

        function initApp() {
            const yearEl = document.getElementById('current-year');
            if (yearEl) {
                yearEl.textContent = new Date().getFullYear();
            }

            setupAnimations();
            navigateTo('home', true);

            const loader = document.getElementById('loader');
            if (loader) {
                setTimeout(() => {
                    loader.classList.add('hidden-loader');
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 650);
                }, 1000);
            }
        }

        function setupAnimations() {
            if (!('IntersectionObserver' in window)) {
                document.querySelectorAll('.reveal-up').forEach(el => {
                    el.classList.add('is-visible');
                });
                return;
            }

            intersectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        intersectionObserver.unobserve(entry.target);
                    }
                });
            }, {
                root: null,
                rootMargin: '0px 0px -30px 0px',
                threshold: 0.1
            });
        }

        function resetAnimationsForTab(tabId) {
            const tab = document.getElementById(tabId);
            if (!tab) return;

            const elements = tab.querySelectorAll('.reveal-up');
            elements.forEach(el => {
                el.classList.remove('is-visible');

                if (intersectionObserver) {
                    intersectionObserver.observe(el);
                } else {
                    el.classList.add('is-visible');
                }
            });

            requestAnimationFrame(() => {
                elements.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        el.classList.add('is-visible');
                        if (intersectionObserver) intersectionObserver.unobserve(el);
                    }
                });
            });
        }

        function navigateTo(tabId, skipHistory = false) {
            const target = document.getElementById(tabId);
            if (!target) return;

            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
                tab.classList.add('hidden');
            });

            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active-nav');

                const onClickValue = link.getAttribute('onclick') || '';
                if (onClickValue.includes("'" + tabId + "'")) {
                    link.classList.add('active-nav');
                }
            });

            target.classList.remove('hidden');

            requestAnimationFrame(() => {
                target.classList.add('active');
                resetAnimationsForTab(tabId);
            });

            if (!skipHistory && historyStack[historyStack.length - 1] !== tabId) {
                historyStack.push(tabId);
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
            closeMobileMenu();
        }

        function goBack() {
            if (historyStack.length > 1) {
                historyStack.pop();
                navigateTo(historyStack[historyStack.length - 1], true);
                return;
            }

            navigateTo('home', true);
        }

        function toggleMobileMenu() {
            const mobileMenu = document.getElementById('mobile-menu');
            if (!mobileMenu) return;

            if (mobileMenu.classList.contains('translate-x-full')) {
                openMobileMenu();
            } else {
                closeMobileMenu();
            }
        }

        function openMobileMenu() {
            const mobileMenu = document.getElementById('mobile-menu');
            const overlay = document.getElementById('mobile-overlay');
            if (!mobileMenu || !overlay) return;

            mobileMenu.classList.remove('translate-x-full');
            overlay.classList.remove('hidden');

            requestAnimationFrame(() => {
                overlay.classList.remove('opacity-0');
            });

            document.body.style.overflow = 'hidden';
        }

        function closeMobileMenu() {
            const mobileMenu = document.getElementById('mobile-menu');
            const overlay = document.getElementById('mobile-overlay');
            if (!mobileMenu || !overlay) return;

            mobileMenu.classList.add('translate-x-full');
            overlay.classList.add('opacity-0');

            setTimeout(() => {
                if (mobileMenu.classList.contains('translate-x-full')) {
                    overlay.classList.add('hidden');
                }
            }, 300);

            document.body.style.overflow = '';
        }

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeMobileMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1280) {
                closeMobileMenu();
            }
        });

const artworks = [
    {
        "title": "Tradition",
        "size": "90 x 70 cm",
        "price": "700 EUR",
        "technique": "Acrylic",
        "images": [
            "assets/images/tradition-room.jpg",
            "assets/images/tradition-detail.jpg"
        ],
        "description": "This painting embodies both feminine tenderness and strength - a quiet power woven through generations. Women's traditions form the soul of folk culture, preserving ancient eproduction series and customs, beauty, and timeless wisdom that still inspire us today.\n\nto accuratel\n\nTo accurately reflect the original colors and texture.\n\nnatural light and interior an\n\nA celebration of heritage, femininity, and the deep connection between past and present.\n\nEvery detail carries emotion, memory, and the spirit of tradition reimagined through contemporary art.\n\nOriginal Painting for Sale\n\nSize: 90 x 70 cm\n\nCertificate of Authenticity included\n\nPrice: 700 EUR"
    },
    {
        "title": "Fragility Woven from Light",
        "size": "100 x 100 cm",
        "price": "1000 EUR",
        "technique": "Original Painting",
        "images": [
            "assets/images/fragility-woven-from-light-room.jpg",
            "assets/images/fragility-woven-from-light-detail.jpg"
        ],
        "description": "A soul woven from light, strength, and scars.\n\nWhere fragility becomes beauty... and every crack tells a story.\n\nOriginal Painting for Sale\n\nSize: 100 x 100 cm\n\nCertificate of Authenticity included\n\nPrice: 1000 EUR"
    },
    {
        "title": "Rebirth",
        "size": "90 x 70 cm",
        "price": "900 EUR",
        "technique": "Acrylic on canvas",
        "images": [
            "assets/images/rebirth-room.jpg",
            "assets/images/rebirth-detail.jpg"
        ],
        "description": "A soul cracked, yet still glowing with life.\n\nFrom pain, beauty rises again.\n\nThis original painting was created as a reflection of healing, transformation, and inner strength the quiet rebirth that happens after every storm.\n\nAcrylic on canvas\n\n90 x 70 cm\n\nOriginal artwork\n\nCertificate of Authenticity included\n\nAvailable 900 EUR"
    },
    {
        "title": "Enchanted",
        "size": "100 x 100 cm",
        "price": "1000 EUR",
        "technique": "Original Painting",
        "images": [
            "assets/images/enchanted-room.jpg",
            "assets/images/enchanted-detail.jpg"
        ],
        "description": "A soul woven from light, strength, and scars.\n\nWhere fragility becomes beauty... and every crack tells a story.\n\nOriginal Painting for Sale\n\nSize: 100 x 100 cm\n\nCertificate of Authenticity included\n\nPrice: 1000 EUR"
    },
    {
        "title": "Black & white",
        "size": "80 x 70 cm",
        "price": "900 EUR",
        "technique": "Original artwork",
        "images": [
            "assets/images/black-and-white-room.jpg",
            "assets/images/black-and-white-detail.jpg"
        ],
        "description": "A woman suspended between silence and emotion...\n\nBlack & white realism touched by flowing pink silk like thoughts you can almost see, but never fully hold.\n\nThe silk becomes memory, emotion, time...\n\nsoftly weaving through her face, her breath, her story.\n\nFreedom. Longing. Femininity. Strength.\n\nOriginal artwork\n\n80 x 70 cm\n\n900 EUR\n\nCertificate of Authenticity included"
    },
    {
        "title": "Emerald Silence",
        "size": "50 x 70 cm",
        "price": "350 EUR",
        "technique": "Mixed Technique",
        "images": [
            "assets/images/emerald-silence-room.jpg",
            "assets/images/emerald-silence-detail.jpg"
        ],
        "description": "Original Painting for Sale\n\n50x70 cm. Mixed Technique\n 350 eur\nHand-painted original artwork\n\nCertificate de Autenticitate included\n\nA portrait of mystery, feminine strength, and hidden emotions wrapped in vibrant color and gold textures."
    },
    {
        "title": "Silk Thoughts",
        "size": "90 x 70 cm",
        "price": "900 EUR",
        "technique": "Original painting",
        "images": [
            "assets/images/silk-thoughts-room.jpg",
            "assets/images/silk-thoughts-detail.jpg"
        ],
        "description": "Sometimes the loudest feelings exist in complete silence.\n\nThis painting was created in one of those moments when the world faded away and only emotion remained between me and the canvas. The soft pink ribbon became a symbol of thoughts, memories, and invisible emotions we carry inside ourselves.\n\nOriginal painting available\n\n90 x 70 cm\n\n900 EUR\n\nCertificate of Authenticity included"
    }
];

function escapeHtml(value) {
    return String(value || '').replace(/[&<>'"]/g, (char) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#039;',
        '"': '&quot;'
    }[char]));
}

function renderArtworks() {
    const grid = document.getElementById('artworks-grid');
    if (!grid) return;

    grid.innerHTML = artworks.map((artwork, index) => `
        <article class="artwork-card reveal-up" style="transition-delay: ${Math.min(index * 60, 240)}ms">
            <button type="button" class="block w-full text-left" onclick="openArtworkModal(${index})" aria-label="Vezi detalii pentru ${escapeHtml(artwork.title)}">
                <div class="artwork-img-wrap">
                    <img src="${escapeHtml(artwork.images[0])}" alt="${escapeHtml(artwork.title)}" loading="lazy">
                </div>
                <div class="p-5 md:p-6 bg-white">
                    <p class="text-[9px] md:text-[10px] uppercase tracking-[0.22em] text-gold font-medium mb-2">Original Painting for Sale</p>
                    <h3 class="font-serif text-2xl md:text-3xl text-elegantBlack mb-3">${escapeHtml(artwork.title)}</h3>
                    <div class="flex flex-wrap gap-2 mb-5 text-[10px] md:text-xs uppercase tracking-widest text-darkBrown/70">
                        <span class="border border-beige rounded-full px-3 py-1">${escapeHtml(artwork.size)}</span>
                        <span class="border border-beige rounded-full px-3 py-1">${escapeHtml(artwork.price)}</span>
                    </div>
                    <p class="text-[12px] md:text-[13px] text-darkBrown/70 font-light leading-relaxed line-clamp-3">${escapeHtml(artwork.description).split('\n').filter(Boolean).slice(0,2).join(' ')}</p>
                    <div class="mt-5 pt-4 border-t border-beige/40 flex items-center justify-between">
                        <span class="text-[10px] md:text-xs uppercase tracking-widest font-medium text-darkBrown">Vezi detalii</span>
                        <span class="text-gold"><i class="fas fa-long-arrow-alt-right"></i></span>
                    </div>
                </div>
            </button>
        </article>
    `).join('');
}

function openArtworkModal(index) {
    const artwork = artworks[index];
    const modal = document.getElementById('artwork-modal');
    if (!artwork || !modal) return;

    document.getElementById('modal-art-title').textContent = artwork.title;
    document.getElementById('modal-art-size').textContent = artwork.size;
    document.getElementById('modal-art-price').textContent = artwork.price;
    document.getElementById('modal-art-technique').textContent = artwork.technique || '';
    document.getElementById('modal-art-description').textContent = artwork.description;

    const mainImage = document.getElementById('modal-art-image');
    mainImage.src = artwork.images[0];
    mainImage.alt = artwork.title;

    const thumbs = document.getElementById('modal-art-thumbs');
    thumbs.innerHTML = artwork.images.map((src, imageIndex) => `
        <button type="button" class="modal-thumb ${imageIndex === 0 ? 'active' : ''} rounded-lg overflow-hidden border border-beige/60" onclick="setModalImage('${escapeHtml(src)}', ${imageIndex}, '${escapeHtml(artwork.title)}')">
            <img src="${escapeHtml(src)}" alt="${escapeHtml(artwork.title)} ${imageIndex + 1}" class="w-16 h-16 md:w-20 md:h-20 object-cover" loading="lazy">
        </button>
    `).join('');

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
}

function setModalImage(src, activeIndex, title) {
    const image = document.getElementById('modal-art-image');
    if (image) {
        image.src = src;
        image.alt = title;
    }
    document.querySelectorAll('.modal-thumb').forEach((thumb, index) => {
        thumb.classList.toggle('active', index === activeIndex);
    });
}

function closeArtworkModal() {
    const modal = document.getElementById('artwork-modal');
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
}

function contactForArtwork() {
    closeArtworkModal();
    navigateTo('contact');
}

// completează shop-ul după încărcarea paginii
const originalInitApp = initApp;
initApp = function() {
    originalInitApp();
    renderArtworks();
};

// închidere modal cu Escape
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeArtworkModal();
        closeMobileMenu();
    }
});
