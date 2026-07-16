// ========== DARK MODE TOGGLE ==========
let darkModeToggle = document.getElementById('darkModeToggle');
const htmlElement = document.documentElement;
const bodyElement = document.body;
const THEME_KEY = 'dlsjbc_theme';
const LEGACY_NEO = 'neo_mode';

function ensureDarkModeToggle() {
    if (darkModeToggle) return darkModeToggle;

    const existingButton = document.querySelector('.dark-mode-toggle');
    if (existingButton) {
        darkModeToggle = existingButton;
        return darkModeToggle;
    }

    const button = document.createElement('button');
    button.className = 'dark-mode-toggle floating-dark-mode-toggle';
    button.id = 'darkModeToggle';
    button.type = 'button';
    button.title = 'Toggle Dark Mode';
    button.innerHTML = '<i class="fas fa-moon"></i>';

    const navActions = document.querySelector('.nav-actions');
    if (navActions) {
        navActions.prepend(button);
    } else {
        document.body.appendChild(button);
    }

    darkModeToggle = button;
    return button;
}

function setDarkMode(isDark) {
    htmlElement.classList.toggle('dark-mode', isDark);
    bodyElement.classList.toggle('dark-mode', isDark);
    htmlElement.style.colorScheme = isDark ? 'dark' : 'light';
    try{
        localStorage.setItem('darkMode', String(isDark));
        localStorage.setItem(LEGACY_NEO, isDark ? 'dark' : 'light');
        localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    }catch(e){}
    updateDarkModeIcon();
}

function updateDarkModeIcon() {
    if (!darkModeToggle) return;

    const isDark = htmlElement.classList.contains('dark-mode');
    const icon = darkModeToggle.querySelector('i') || document.createElement('i');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';

    if (!darkModeToggle.querySelector('i')) {
        darkModeToggle.appendChild(icon);
    }

    darkModeToggle.setAttribute('aria-pressed', String(isDark));
    darkModeToggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

function initializeDarkMode() {
    darkModeToggle = ensureDarkModeToggle();
    if (!darkModeToggle) return;

    const savedPreference = localStorage.getItem('darkMode');
    const savedNeoPreference = localStorage.getItem(LEGACY_NEO);
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDarkMode = (savedTheme === 'dark') ? true : (savedTheme === 'light') ? false : (savedPreference !== null ? savedPreference === 'true' : (savedNeoPreference === 'dark' ? true : (savedNeoPreference === 'light' ? false : prefersDark)));

    setDarkMode(isDarkMode);

    darkModeToggle.addEventListener('click', () => {
        const isCurrentlyDark = htmlElement.classList.contains('dark-mode');
        setDarkMode(!isCurrentlyDark);
    });
}

initializeDarkMode();

// ========== SMOOTH SCROLL ==========
function smoothScroll(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        smoothScroll(targetId);
    });
});

// ========== MOBILE MENU ==========
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

// Skip the loading screen when the Home navigation link is used
const homeLinks = document.querySelectorAll('a[href="index.html"]');
homeLinks.forEach(link => {
    link.addEventListener('click', () => {
        sessionStorage.setItem('skipHomeLoading', 'true');
    });
});

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.style.display = 'none';
            hamburger.classList.remove('active');
        });
    });
}

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY;

    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }

    lastScrollTop = scrollTop;
});

// ========== CONTACT MAP TOGGLE ==========
const terrainToggle = document.getElementById('terrainToggle');
const contactMap = document.getElementById('contactMap');

function updateContactMap() {
    if (!terrainToggle || !contactMap) return;

    const baseMapUrl = 'https://www.google.com/maps?q=De+La+Salle+John+Bosco+College+Mangagoy+Bislig&output=embed';
    const mapType = terrainToggle.checked ? 'terrain' : 'satellite';
    contactMap.src = `${baseMapUrl}&maptype=${mapType}`;
}

if (terrainToggle && contactMap) {
    terrainToggle.addEventListener('change', updateContactMap);
    updateContactMap();
}

// ========== HERO SLIDESHOW ==========
let heroSlideIndex = 1;
let heroSlideTimer;

function showHeroSlide(n) {
    const slideshowContainer = document.getElementById('heroSlideshow');
    if (!slideshowContainer) return;

    const slides = slideshowContainer.querySelectorAll('.news-slide');
    const slideshowControls = document.getElementById('heroSlideshowControls');
    const dots = slideshowControls ? slideshowControls.querySelectorAll('.dot') : [];

    if (n > slides.length) {
        heroSlideIndex = 1;
    }
    if (n < 1) {
        heroSlideIndex = slides.length;
    }

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[heroSlideIndex - 1].classList.add('active');
    if (dots[heroSlideIndex - 1]) {
        dots[heroSlideIndex - 1].classList.add('active');
    }
}

function currentHeroSlide(n) {
    clearTimeout(heroSlideTimer);
    showHeroSlide(heroSlideIndex = n);
    autoHeroSlide();
}

function changeHeroSlide(n) {
    clearTimeout(heroSlideTimer);
    heroSlideIndex += n;
    showHeroSlide(heroSlideIndex);
    autoHeroSlide();
}

function autoHeroSlide() {
    heroSlideTimer = setTimeout(() => {
        heroSlideIndex++;
        showHeroSlide(heroSlideIndex);
        autoHeroSlide();
    }, 5000); // Change slide every 5 seconds
}

function toggleHeroFullscreen() {
    const slideshowContainer = document.getElementById('heroSlideshow');
    if (!slideshowContainer) return;

    const overlay = document.getElementById('fullscreen-overlay-hero');
    const currentSlide = slideshowContainer.querySelector('.news-slide.active');
    const image = currentSlide.querySelector('img');
    
    if (!overlay) {
        // Create fullscreen overlay if it doesn't exist
        const newOverlay = document.createElement('div');
        newOverlay.id = 'fullscreen-overlay-hero';
        newOverlay.className = 'fullscreen-overlay active';
        newOverlay.innerHTML = `
            <button class="fullscreen-close" onclick="closeHeroFullscreen()">
                <i class="fas fa-times"></i>
            </button>
            <button class="fullscreen-nav fullscreen-prev" onclick="changeHeroSlideFullscreen(-1)">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="fullscreen-nav fullscreen-next" onclick="changeHeroSlideFullscreen(1)">
                <i class="fas fa-chevron-right"></i>
            </button>
            <div class="fullscreen-container">
                <img src="${image.src}" alt="Fullscreen" class="fullscreen-image" id="fullscreen-image-hero">
            </div>
        `;
        document.body.appendChild(newOverlay);
        clearTimeout(heroSlideTimer);
    } else {
        overlay.classList.add('active');
        overlay.querySelector('#fullscreen-image-hero').src = image.src;
        clearTimeout(heroSlideTimer);
    }
    
    document.body.style.overflow = 'hidden';
}

function closeHeroFullscreen() {
    const overlay = document.getElementById('fullscreen-overlay-hero');
    if (overlay) {
        overlay.classList.remove('active');
    }
    document.body.style.overflow = 'auto';
    autoHeroSlide();
}

function changeHeroSlideFullscreen(n) {
    const slideshowContainer = document.getElementById('heroSlideshow');
    if (!slideshowContainer) return;

    heroSlideIndex += n;
    const slides = slideshowContainer.querySelectorAll('.news-slide');
    
    if (heroSlideIndex > slides.length) {
        heroSlideIndex = 1;
    }
    if (heroSlideIndex < 1) {
        heroSlideIndex = slides.length;
    }
    
    const currentSlide = slides[heroSlideIndex - 1];
    const image = currentSlide.querySelector('img');
    const fullscreenImage = document.querySelector('#fullscreen-image-hero');
    
    if (fullscreenImage) {
        fullscreenImage.style.opacity = '0';
        setTimeout(() => {
            fullscreenImage.src = image.src;
            fullscreenImage.style.opacity = '1';
        }, 150);
    }
}

// ========== ARTICLE THUMBNAIL FIT ==========
function updateArticleImageFit() {
    document.querySelectorAll('.article-card img').forEach(img => {
        if (!img.complete) {
            img.addEventListener('load', () => updateArticleImageFit(), { once: true });
            return;
        }

        const isHorizontal = img.naturalWidth > img.naturalHeight;
        img.classList.toggle('is-horizontal', isHorizontal);
        img.classList.toggle('is-vertical', !isHorizontal);
    });
}

window.addEventListener('load', updateArticleImageFit);
document.addEventListener('DOMContentLoaded', updateArticleImageFit);

// ========== ARTICLES SLIDESHOW ==========
let articlesSlideIndex = 1;
let articlesSlideTimer;

function populateArticlesSlideshow() {
    const slideshowContainer = document.getElementById('articlesSlideshow');
    if (!slideshowContainer) return;

    const existingSlides = slideshowContainer.querySelectorAll('.news-slide');
    existingSlides.forEach(slide => slide.remove());

    const slidesMarkup = articleFeed.map((article, index) => `
        <div class="news-slide fade${index === 0 ? ' active' : ''}">
            <img src="${article.image}" alt="${article.title}" />
        </div>
    `).join('');

    slideshowContainer.insertAdjacentHTML('beforeend', slidesMarkup);
    articlesSlideIndex = 1;
}

function showArticlesSlide(n) {
    const slideshowContainer = document.getElementById('articlesSlideshow');
    if (!slideshowContainer) return;

    const slides = slideshowContainer.querySelectorAll('.news-slide');
    if (!slides.length) return;

    if (n > slides.length) {
        articlesSlideIndex = 1;
    }
    if (n < 1) {
        articlesSlideIndex = slides.length;
    }

    slides.forEach(slide => slide.classList.remove('active'));
    slides[articlesSlideIndex - 1].classList.add('active');
}

function changeArticlesSlide(n) {
    clearTimeout(articlesSlideTimer);
    articlesSlideIndex += n;
    showArticlesSlide(articlesSlideIndex);
    autoArticlesSlide();
}

function autoArticlesSlide() {
    articlesSlideTimer = setTimeout(() => {
        articlesSlideIndex++;
        showArticlesSlide(articlesSlideIndex);
        autoArticlesSlide();
    }, 5000);
}

function toggleArticlesFullscreen() {
    const slideshowContainer = document.getElementById('articlesSlideshow');
    if (!slideshowContainer) return;

    const overlay = document.getElementById('fullscreen-overlay-articles');
    const currentSlide = slideshowContainer.querySelector('.news-slide.active');
    const image = currentSlide.querySelector('img');

    if (!overlay) {
        const newOverlay = document.createElement('div');
        newOverlay.id = 'fullscreen-overlay-articles';
        newOverlay.className = 'fullscreen-overlay active';
        newOverlay.innerHTML = `
            <button class="fullscreen-close" onclick="closeArticlesFullscreen()">
                <i class="fas fa-times"></i>
            </button>
            <button class="fullscreen-nav fullscreen-prev" onclick="changeArticlesSlideFullscreen(-1)">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="fullscreen-nav fullscreen-next" onclick="changeArticlesSlideFullscreen(1)">
                <i class="fas fa-chevron-right"></i>
            </button>
            <div class="fullscreen-container">
                <img src="${image.src}" alt="Fullscreen" class="fullscreen-image" id="fullscreen-image-articles">
            </div>
        `;
        document.body.appendChild(newOverlay);
        clearTimeout(articlesSlideTimer);
    } else {
        overlay.classList.add('active');
        overlay.querySelector('#fullscreen-image-articles').src = image.src;
        clearTimeout(articlesSlideTimer);
    }

    document.body.style.overflow = 'hidden';
}

function closeArticlesFullscreen() {
    const overlay = document.getElementById('fullscreen-overlay-articles');
    if (overlay) {
        overlay.classList.remove('active');
    }
    document.body.style.overflow = 'auto';
    autoArticlesSlide();
}

function changeArticlesSlideFullscreen(n) {
    const slideshowContainer = document.getElementById('articlesSlideshow');
    if (!slideshowContainer) return;

    articlesSlideIndex += n;
    const slides = slideshowContainer.querySelectorAll('.news-slide');

    if (articlesSlideIndex > slides.length) {
        articlesSlideIndex = 1;
    }
    if (articlesSlideIndex < 1) {
        articlesSlideIndex = slides.length;
    }

    const currentSlide = slides[articlesSlideIndex - 1];
    const image = currentSlide.querySelector('img');
    const fullscreenImage = document.querySelector('#fullscreen-image-articles');

    if (fullscreenImage) {
        fullscreenImage.style.opacity = '0';
        setTimeout(() => {
            fullscreenImage.src = image.src;
            fullscreenImage.style.opacity = '1';
        }, 150);
    }
}

const articleFeed = [
    {
        id: 'admission-2024-2025',
        category: 'Admission',
        date: 'Jun 5, 2024',
        author: 'mis8519',
        views: '3,190 views',
        likes: '2 likes',
        title: 'Admission for SY 2024-2025 is Now Ongoing',
        image: 'Photos/Articles/𝐀𝐃𝐌𝐈𝐒𝐒𝐈𝐎𝐍 𝐅𝐎𝐑 𝐒𝐘 𝟐𝟎𝟐𝟒-𝟐𝟎𝟐𝟓 𝐈𝐒 𝐍𝐎𝐖 𝐎𝐍𝐆𝐎𝐈𝐍𝐆.jpg',
        summary: 'Heads up, future Lasallian enthusiasts! DLSJBC is ready to open doors to all future Lasallian enthusiasts as admission for all levels is now ongoing.',
        body: [
            'De La Salle John Bosco College is now accepting applications for School Year 2024-2025 across its academic levels. The admission process is designed to welcome students who are ready to grow in faith, service, and excellence.',
            'From preschool to senior high school and college programs, the school continues to create a nurturing environment for learners who want to thrive in a Lasallian community. Interested families are encouraged to apply early and complete the required steps for enrollment.'
        ]
    },
    {
        id: 'alumni-homecoming-2024',
        category: 'Community',
        date: 'May 6, 2024',
        author: 'mis8519',
        views: '408 views',
        likes: '2 likes',
        title: 'Alumni Homecoming 2024',
        image: 'Photos/Articles/Alumni Homecoming 2024.jpg',
        summary: 'Mark your calendars for the most exciting event of the year! Get ready for a night filled with nostalgia, laughter, drinks, and dances as alumni reconnect with old friends and mentors.',
        body: [
            'The annual Alumni Homecoming brings together former students, teachers, and friends for a meaningful evening of celebration. It is a chance to honor shared memories while strengthening the bonds that continue beyond graduation.',
            'The program featured fellowship, music, and special moments that reminded everyone of the lasting impact of the Lasallian education they received at DLSJBC.'
        ]
    },
    {
        id: 'pre-enrollment-2024',
        category: 'Enrollment',
        date: 'Apr 2, 2024',
        author: 'mis8519',
        views: '550 views',
        likes: '2 likes',
        title: 'Ready to Write the Next Chapter of Your Academic Journey?',
        image: 'Photos/Articles/𝙍𝙚𝙖𝙙𝙮 𝙩𝙤 𝙬𝙧𝙞𝙩𝙚 𝙩𝙝𝙚 𝙣𝙚𝙭𝙩 𝙘𝙝𝙖𝙥𝙩𝙚𝙧 𝙤𝙛 𝙮𝙤𝙪𝙧 𝙖𝙘𝙖𝙙𝙚𝙢𝙞𝙘 𝙟𝙤𝙪𝙧𝙣𝙚𝙮.jpg',
        summary: 'Prepare to soar as pre-enrollment opens at De La Salle John Bosco College. This is your chance to choose your path, embrace your future, and begin a transformative academic journey.',
        body: [
            'Pre-enrollment is now open for students who are ready to take the next step in their school life. The process allows families to secure a place and prepare for the upcoming school year with confidence.',
            'With a wide range of programs and a supportive academic environment, DLSJBC invites learners to explore opportunities that match their dreams and goals.'
        ]
    },
    {
        id: 'science-benchmarking',
        category: 'Academics',
        date: 'Mar 13, 2024',
        author: 'mis8519',
        views: '2,087 views',
        likes: '1 like',
        title: 'DLSJBC Science Teachers in their Benchmarking Activity at CSU',
        image: 'Photos/Articles/DLSJBC Science Teachers in their benchmarking activity at CSU.jpg',
        summary: 'Our Science Teachers during the benchmarking activity today to take best features and good practices from other institutions to further strengthen science education at DLSJBC.',
        body: [
            'DLSJBC Science Teachers recently participated in a benchmarking activity at CSU to learn from partner institutions and strengthen the quality of science instruction in the school.',
            'The experience provided meaningful insights that will support curriculum development, innovative teaching strategies, and improved student engagement in science education.'
        ]
    },
    {
        id: 'green-and-bright',
        category: 'Athletics',
        date: 'Mar 4, 2024',
        author: 'mis8519',
        views: '147 views',
        likes: '1 like',
        title: 'Green and Bright',
        image: 'Photos/Articles/𝐆𝐑𝐄𝐄𝐍 𝐀𝐍𝐃 𝐁𝐑𝐈𝐆𝐇𝐓.jpg',
        summary: 'As the Citylympics 2024 conclude, we commend the remarkable performances of our Lasallian athletes and coaches who lived up to excellence through discipline and sportsmanship.',
        body: [
            'The Citylympics 2024 showcased the dedication and discipline of DLSJBC athletes and coaches. Their hard work and sportsmanship left a strong impression throughout the competition.',
            'The school celebrates these young leaders whose commitment continues to inspire the broader Lasallian community.'
        ]
    },
    {
        id: 'tokyo-educational-immersion',
        category: 'Professional Development',
        date: 'Mar 4, 2024',
        author: 'mis8519',
        views: '294 views',
        likes: '0 likes',
        title: 'Tokyo Educational Immersion',
        image: 'Photos/Articles/𝐓𝐨𝐤𝐲𝐨 𝐄𝐝𝐮𝐜𝐚𝐭𝐢𝐨𝐧𝐚𝐥 𝐈𝐦𝐦𝐞𝐫𝐬𝐢𝐨𝐧.jpg',
        summary: 'De La Salle John Bosco College BED OIC Principal, Mr. Jonathan C. Villasor, Jr., is one of the sixteen chosen private junior high school leaders to take part in the Tokyo Educational Immersion.',
        body: [
            'The Tokyo Educational Immersion program gave participating educators a valuable opportunity to gain international exposure and learn from global best practices in education.',
            'Through the experience, DLSJBC continues to strengthen its leadership and enrich its commitment to meaningful academic innovation.'
        ]
    },
    {
        id: '60th-anniversary-culmination',
        category: 'Milestone',
        date: 'Jan 31, 2024',
        author: 'mis8519',
        views: '178 views',
        likes: '1 like',
        title: '60th Anniversary Culmination',
        image: 'Photos/Articles/60th ANNIVERSARY CULMINATION.jpg',
        summary: 'In a concerted effort, De La Salle John Bosco College successfully sealed the culmination of the 60th Anniversary by shedding light on its legacy and future aspirations.',
        body: [
            'The 60th Anniversary Culmination marked a meaningful celebration of DLSJBC’s enduring legacy and bright future. The event highlighted the school’s commitment to educational excellence and service.',
            'It also served as a moment of gratitude for the people who helped shape the institution’s story over the decades.'
        ]
    },
    {
        id: 'let-2023',
        category: 'Achievements',
        date: 'Jan 12, 2024',
        author: 'mis8519',
        views: '109 views',
        likes: '4 likes',
        title: 'September 2023 Licensure Examination for Teachers (LET)',
        image: 'Photos/Articles/September 2023 Licensure Examination for Teachers (LET).jpg',
        summary: 'De La Salle John Bosco College achieved a 71.43% first-takers and overall performance rating in the September 2023 Licensure Examination for Teachers.',
        body: [
            'The school celebrated the strong performance of its education graduates in the September 2023 Licensure Examination for Teachers. The result reflected the dedication of both students and faculty.',
            'These accomplishments reinforce DLSJBC’s mission to prepare future educators who are competent, compassionate, and committed to excellence.'
        ]
    },
    {
        id: 'lasallian-ambassadors-2024',
        category: 'Student Leadership',
        date: 'Jan 11, 2024',
        author: 'mis8519',
        views: '204 views',
        likes: '3 likes',
        title: 'Unleash Your Potential: Call for Lasallian Ambassadors 2024',
        image: 'Photos/Articles/lasallian-ambassadors-2024.jpg',
        summary: 'Are you ready to be the face of innovation, inspiration, and impact? The time has come to ignite your potential and become a Lasallian ambassador for 2024.',
        body: [
            'The Lasallian Ambassadors program invites students who are passionate about leadership, service, and representation. It provides a platform to embody the ideals of the school community.',
            'By taking part in this initiative, students contribute to campus life and become role models for others who are eager to make a difference.'
        ]
    },
    {
        id: 'academia-socials-2023',
        category: 'Student Life',
        date: 'Oct 19, 2023',
        author: 'mis8519',
        views: '72 views',
        likes: '9 likes',
        title: 'Academia: The Lasallian Socials 2023',
        image: 'Photos/Articles/Academia The Lasallian Socials 2023.jpg',
        summary: 'This highly anticipated annual event allowed students to socialize and explore the realms of Light and Dark Academia, creating memorable experiences for the community.',
        body: [
            'Academia: The Lasallian Socials 2023 brought together students for a celebration of style, connection, and creativity. The event offered a unique opportunity to bond beyond the classroom.',
            'From themed decor to shared experiences, the gathering highlighted the vibrant social life that supports student growth at DLSJBC.'
        ]
    },
    {
        id: 'quality-lasallian-education',
        category: 'Institution',
        date: 'Jul 7, 2023',
        author: 'DLSJCB',
        views: '300 views',
        likes: '6 likes',
        title: 'Experience Quality Lasallian Education',
        image: 'Photos/Articles/Experience Quality Lasallian Education.jpg',
        summary: 'Experience quality Lasallian education through holistic student development and formation, state-of-the-art facilities, and advanced curricular programs.',
        body: [
            'DLSJBC continues to provide an educational experience rooted in Lasallian values. Students are nurtured through a balance of academics, formation, and personal development.',
            'The school’s facilities and programs are designed to prepare learners for success while fostering compassion, discipline, and service.'
        ]
    },
    {
        id: 'summer-sports-clinic',
        category: 'Programs',
        date: 'Jun 25, 2023',
        author: 'DLSJCB',
        views: '55 views',
        likes: '5 likes',
        title: 'Summer Sports Clinic and Enrichment Classes',
        image: 'Photos/Articles/Summer Sports Clinic and Enrichment Classes.jpg',
        summary: 'Orientation and opening of enrichment classes and sports clinic will be tomorrow, June 26, 2023 at 8:00 AM. For those who are interested, this is a great opportunity to stay active and learn.',
        body: [
            'The Summer Sports Clinic and Enrichment Classes offered students a welcoming place to learn, play, and build confidence during the break. The program combined sporting activities with enrichment opportunities.',
            'These initiatives reflect the school’s commitment to broader development beyond academics and encourage active participation from interested learners.'
        ]
    },
    {
        id: 'senior-high-school-plus',
        category: 'Programs',
        date: 'Jun 23, 2023',
        author: 'DLSJCB',
        views: '115 views',
        likes: '6 likes',
        title: 'Senior High School Plus',
        image: 'Photos/Articles/alumni.jpg',
        summary: 'We fortified our SHS Plus Program with extensive partnership through the work immersion experience of our STEM students at Metro Davao.',
        body: [
            'The Senior High School Plus program continues to develop strong partnerships that enrich the academic experience of students. Work immersion opportunities provide practical exposure and real-world learning.',
            'By broadening learning beyond the classroom, DLSJBC supports students as they prepare for future studies and careers.'
        ]
    }
];

function renderArticlesFeed() {
    const feedContainer = document.getElementById('articlesFeedList');
    const modal = document.getElementById('articleModal');
    const modalImage = document.getElementById('articleModalImage');
    const modalMeta = document.getElementById('articleModalMeta');
    const modalTitle = document.getElementById('articleModalTitle');
    const modalText = document.getElementById('articleModalText');
    const closeButton = document.getElementById('closeArticleModal');

    if (!feedContainer || !modal || !modalImage || !modalMeta || !modalTitle || !modalText || !closeButton) {
        return;
    }

    feedContainer.innerHTML = articleFeed.map(article => `
        <article class="page-card article-card">
            <a class="article-card-link" href="${article.id}.html" data-article-id="${article.id}">
                <img src="${article.image}" alt="${article.title}" />
                <div class="article-content">
                    <span class="article-meta">${article.category} • ${article.date}</span>
                    <h2>${article.title}</h2>
                    <p>${article.summary}</p>
                    <div class="article-card-stats">
                        <span><i class="fas fa-eye"></i> ${article.views}</span>
                        <span><i class="fas fa-heart"></i> ${article.likes}</span>
                    </div>
                </div>
            </a>
        </article>
    `).join('');

    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Initialize slideshow(s) when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    renderArticlesFeed();

    if (document.getElementById('heroSlideshow')) {
        showHeroSlide(heroSlideIndex);
        autoHeroSlide();
    }

    if (document.getElementById('articlesSlideshow')) {
        populateArticlesSlideshow();
        showArticlesSlide(articlesSlideIndex);
        autoArticlesSlide();
    }
});

// Stop autoplay on hover, resume on mouseleave for hero slideshow
const heroSlideshowContainer = document.getElementById('heroSlideshow');
if (heroSlideshowContainer) {
    heroSlideshowContainer.addEventListener('mouseenter', () => {
        clearTimeout(heroSlideTimer);
    });

    heroSlideshowContainer.addEventListener('mouseleave', () => {
        autoHeroSlide();
    });
}

const articlesSlideshowContainer = document.getElementById('articlesSlideshow');
if (articlesSlideshowContainer) {
    articlesSlideshowContainer.addEventListener('mouseenter', () => {
        clearTimeout(articlesSlideTimer);
    });

    articlesSlideshowContainer.addEventListener('mouseleave', () => {
        autoArticlesSlide();
    });
}

// Close fullscreen on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const overlayHero = document.getElementById('fullscreen-overlay-hero');
        if (overlayHero && overlayHero.classList.contains('active')) {
            closeHeroFullscreen();
        }

        const overlayArticles = document.getElementById('fullscreen-overlay-articles');
        if (overlayArticles && overlayArticles.classList.contains('active')) {
            closeArticlesFullscreen();
        }
    }
});

// ========== BUTTON HOVER ANIMATION ==========
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });

    button.addEventListener('click', function() {
        // Ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========== SCROLL REVEAL ANIMATION ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and sections
document.querySelectorAll('.card-hover, .news-card, .program-card, .event-item, .about-card, .info-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ========== FORM SUBMISSION ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email', 'error');
            return;
        }

        // Show success message
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');

        // Reset form
        contactForm.reset();
    });
}

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 9998;
        animation: slideInRight 0.3s ease;
        ${type === 'success' ? 'background-color: #10b981;' : 'background-color: #ef4444;'}
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========== PARALLAX EFFECT ==========
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.scrollY;
        hero.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// ========== IMAGE LAZY LOADING ==========
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src;
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ========== COUNTER ANIMATION ==========
function animateCounter(element, target, duration = 1000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// ========== CARD TILT EFFECT ==========
document.querySelectorAll('.program-card, .news-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPercent = (x / rect.width - 0.5) * 2;
        const yPercent = (y / rect.height - 0.5) * 2;

        card.style.transform = `perspective(1000px) rotateY(${xPercent * 5}deg) rotateX(${-yPercent * 5}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    });
});

// ========== INTERSECTION OBSERVER FOR NAVBAR ACTIVE STATE ==========
const sections = document.querySelectorAll('section');
const navLinksArray = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinksArray.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, { threshold: 0.3 });

sections.forEach(section => sectionObserver.observe(section));

// ========== SCROLL PROGRESS BAR ==========
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #003366, #d4af37);
    width: 0%;
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = window.scrollY;
    const scrollPercent = (scrolled / windowHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', (e) => {
    // Alt + H: Home
    if (e.altKey && e.key === 'h') {
        smoothScroll('home');
    }
    // Alt + A: About
    if (e.altKey && e.key === 'a') {
        smoothScroll('about');
    }
    // Alt + C: Contact
    if (e.altKey && e.key === 'c') {
        smoothScroll('contact');
    }
    // Alt + D: Dark Mode
    if (e.altKey && e.key === 'd') {
        darkModeToggle.click();
    }
});

// ========== TYPED TEXT EFFECT (Optional enhancement) ==========
function typeText(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ========== PAGE LOAD ANIMATION ==========
window.addEventListener('load', () => {
    // Hide loading screen is done by CSS animation
    console.log('🎓 Welcome to Academic Excellence Institute!');
    console.log('Keyboard Shortcuts: Alt+H (Home), Alt+A (About), Alt+C (Contact), Alt+D (Dark Mode)');
});

// ========== SMOOTH PAGE TRANSITIONS ==========
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '1';
});

body.style.opacity = '0';
body.style.transition = 'opacity 0.5s ease';

// ========== MAINTENANCE TIPS ==========
console.log(`
    ╔════════════════════════════════════════════╗
    ║   Academic Excellence Institute Website    ║
    ║                                            ║
    ║   Animation Features Enabled:              ║
    ║   ✓ Loading Screen                         ║
    ║   ✓ Dark Mode Toggle                       ║
    ║   ✓ Smooth Scroll                          ║
    ║   ✓ Button Animations                      ║
    ║   ✓ Card Hover Effects                     ║
    ║   ✓ Image Zoom                             ║
    ║   ✓ Hover Effects                          ║
    ║                                            ║
    ║   Additional Features:                     ║
    ║   ✓ Scroll Progress Bar                    ║
    ║   ✓ Parallax Scrolling                     ║
    ║   ✓ Card Tilt Effect                       ║
    ║   ✓ Ripple Button Effects                  ║
    ║   ✓ Keyboard Shortcuts                     ║
    ║                                            ║
    ╚════════════════════════════════════════════╝
`);
