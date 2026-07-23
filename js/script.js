// ======================================
// PixelQuest v1.1
// Main JavaScript
// ======================================

let wallpapers = [];
let visibleWallpapers = 8;

let favourites =
    JSON.parse(localStorage.getItem("pixelquestFav")) || [];


// ======================================
// Page Elements
// ======================================

const sortSelect =
    document.getElementById("sort-select");

const loadMoreBtn =
    document.getElementById("loadMoreBtn");


// ======================================
// Load wallpapers.json
// ======================================

const wallpapersPath =
    window.location.pathname.includes("/pages/")
        ? "../wallpapers.json"
        : "wallpapers.json";

fetch(
    window.location.pathname.includes("/pages/")
        ? "../wallpapers.json"
        : "wallpapers.json"
)
    .then(response => {

        if (!response.ok) {
            throw new Error("Could not load wallpapers.json");
        }

        return response.json();

    })
    .then(data => {

        wallpapers = data;
        updateHeroStatistics(wallpapers);
        displayHeroPopularGames(wallpapers);
        displayHeroFeaturedWallpaper(wallpapers);

        // Featured Wallpapers
        displayFeaturedWallpapers(
            wallpapers.filter(item => item.featured)
        );

        // Trending Games
        displayTrendingGames(wallpapers);

        // Latest Wallpapers
        applySorting();

    })
    .catch(error => {

        console.error(error);

        const latestContainer =
            document.getElementById("latest-wallpapers");

        const featuredContainer =
            document.getElementById("featured-wallpapers");

        const gamesContainer =
            document.getElementById("games-grid");

        if (latestContainer) {

            latestContainer.innerHTML =
                "<p>Wallpapers could not be loaded.</p>";

        }

        if (featuredContainer) {

            featuredContainer.innerHTML =
                "<p>Featured wallpapers could not be loaded.</p>";

        }

        if (gamesContainer) {

            gamesContainer.innerHTML =
                "<p>Trending games could not be loaded.</p>";

        }

    });


// ======================================
// Wallpaper Card HTML
// ======================================

function createWallpaperCard(item) {

    const liked =
        favourites.includes(Number(item.id));

    // Check if wallpaper is new
    const today = new Date();

    const uploadDate =
        new Date(item.date);

    const differenceInDays =
        (today - uploadDate) /
        (1000 * 60 * 60 * 24);

    const isNew =
        Number.isFinite(differenceInDays) &&
        differenceInDays >= 0 &&
        differenceInDays <= 30;

    return `

        <article class="wallpaper-card">

            <a
                href="pages/wallpaper.html?id=${item.id}"
                class="wallpaper-image">

                <img
                    src="${item.thumbnail}"
    alt="${item.title} ${item.game} gaming wallpaper"
    loading="lazy"
    decoding="async"
    width="640"
    height="360"
                    onerror="this.onerror=null; this.src='${item.image}'">

                <div class="image-gradient"></div>

                ${
                    isNew
                        ? `<span class="new-badge">NEW</span>`
                        : ""
                }

                <span class="badge">
                    ${item.resolution}
                </span>

            </a>

            <div class="wallpaper-content">

                <div class="wallpaper-heading">

                    <div>

                        <h3>${item.title}</h3>

                        <p>${item.game}</p>

                    </div>

                    <button
                        type="button"
                        class="fav-btn"
                        data-id="${item.id}"
                        aria-label="${
                            liked
                                ? "Remove from favourites"
                                : "Add to favourites"
                        }">

                        ${liked ? "❤️" : "🤍"}

                    </button>

                </div>

                <div class="wallpaper-meta">

                    <span>
                        👁 ${item.views}
                    </span>

                    <span>
                        ⬇ ${item.downloads}
                    </span>

                    <span>
                        📅 ${item.date}
                    </span>

                </div>

                <div class="card-buttons">

                    <a
                        href="pages/wallpaper.html?id=${item.id}"
                        class="details-btn">

                        View Wallpaper

                    </a>

                    <button
                        type="button"
                        class="download-btn"
                        data-image="${item.image}"
                        data-title="${item.title}">

                        Download

                    </button>

                </div>

            </div>

        </article>

    `;

}


// ======================================
// Sort Wallpapers
// ======================================

function getSortedWallpapers() {

    const selectedSort =
        sortSelect
            ? sortSelect.value
            : "newest";

    // Copy array so original JSON order is not changed
    const sortedWallpapers =
        [...wallpapers];

    switch (selectedSort) {

        case "downloads":

            sortedWallpapers.sort(
                (a, b) =>
                    Number(b.downloads || 0) -
                    Number(a.downloads || 0)
            );

            break;


        case "views":

            sortedWallpapers.sort(
                (a, b) =>
                    Number(b.views || 0) -
                    Number(a.views || 0)
            );

            break;


        case "az":

            sortedWallpapers.sort(
                (a, b) =>
                    String(a.title || "")
                        .localeCompare(
                            String(b.title || ""),
                            undefined,
                            {
                                sensitivity: "base"
                            }
                        )
            );

            break;


        case "newest":
        default:

            sortedWallpapers.sort(
                (a, b) => {

                    const dateA =
                        new Date(a.date).getTime();

                    const dateB =
                        new Date(b.date).getTime();

                    return dateB - dateA;

                }
            );

            break;

    }

    return sortedWallpapers;

}


// ======================================
// Apply Current Sorting
// ======================================

function applySorting() {

    const sortedWallpapers =
        getSortedWallpapers();

    displayWallpapers(
        sortedWallpapers
    );

    updateLoadMoreButton(
        sortedWallpapers.length
    );

}


// ======================================
// Sort Dropdown Event
// ======================================

if (sortSelect) {

    sortSelect.addEventListener(
        "change",
        function () {

            // Reset to first 8 after changing sort
            visibleWallpapers = 8;

            applySorting();

        }
    );

}


// ======================================
// Display Latest Wallpapers
// ======================================

function displayWallpapers(data) {

    const container =
        document.getElementById(
            "latest-wallpapers"
        );

    if (!container) return;

    container.innerHTML = "";

    const visibleItems =
        data.slice(
            0,
            visibleWallpapers
        );

    if (visibleItems.length === 0) {

        container.innerHTML =
            "<p>No wallpapers found.</p>";

        return;

    }

    visibleItems.forEach(item => {

        container.insertAdjacentHTML(
            "beforeend",
            createWallpaperCard(item)
        );

    });

}


// ======================================
// Display Featured Wallpapers
// ======================================

function displayFeaturedWallpapers(data) {

    const container =
        document.getElementById(
            "featured-wallpapers"
        );

    if (!container) return;

    container.innerHTML = "";

    const featuredItems =
        data.slice(0, 4);

    if (featuredItems.length === 0) {

        container.innerHTML =
            "<p>No featured wallpapers found.</p>";

        return;

    }

    featuredItems.forEach(item => {

        container.insertAdjacentHTML(
            "beforeend",
            createWallpaperCard(item)
        );

    });

}


// ======================================
// Display Trending Games
// ======================================

function displayTrendingGames(data) {

    const container =
        document.getElementById(
            "games-grid"
        );

    if (!container) return;

    container.innerHTML = "";

    const games = [];

    data.forEach(item => {

        if (!item.game) return;

        const gameAlreadyExists =
            games.some(
                game =>
                    game.game === item.game
            );

        if (!gameAlreadyExists) {

            games.push(item);

        }

    });

    if (games.length === 0) {

        container.innerHTML =
            "<p>No trending games found.</p>";

        return;

    }

    games
        .slice(0, 4)
        .forEach(game => {

            container.insertAdjacentHTML(
                "beforeend",
                `

                    <a
                        href="pages/game.html?game=${encodeURIComponent(game.game)}"
                        class="game-card">

                        <img
                            src="${game.thumbnail}"
                            alt="${game.game} gaming wallpapers"
                            loading="lazy"
                            onerror="this.onerror=null; this.src='${game.image}'">

                        <div class="game-overlay">

                            <h3>
                                ${game.game}
                            </h3>

                            <span>
                                Browse Wallpapers →
                            </span>

                        </div>

                    </a>

                `
            );

        });

}


// ======================================
// Homepage Search
// ======================================

const searchInput =
    document.querySelector(
        ".search-box input"
    );

const searchButton =
    document.querySelector(
        ".search-box button"
    );


function openSearchPage() {

    if (!searchInput) return;

    const keyword =
        searchInput.value.trim();

    if (!keyword) {

        searchInput.focus();

        return;

    }

    window.location.href =
        `pages/search.html?q=${encodeURIComponent(keyword)}`;

}


if (searchButton) {

    searchButton.addEventListener(
        "click",
        openSearchPage
    );

}


if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                openSearchPage();

            }

        }
    );

}


// ======================================
// Download and Favourite Buttons
// ======================================

document.addEventListener(
    "click",
    function (event) {

        // Download button
        const downloadButton =
            event.target.closest(
                ".download-btn"
            );

        if (downloadButton) {

            const image =
                downloadButton.dataset.image;

            const title =
                downloadButton.dataset.title;

            downloadWallpaper(
                image,
                title
            );

            return;

        }


        // Favourite button
        const favouriteButton =
            event.target.closest(
                ".fav-btn"
            );

        if (favouriteButton) {

            const id =
                Number(
                    favouriteButton.dataset.id
                );

            if (favourites.includes(id)) {

                favourites =
                    favourites.filter(
                        itemId =>
                            itemId !== id
                    );

            } else {

                favourites.push(id);

            }

            localStorage.setItem(
                "pixelquestFav",
                JSON.stringify(favourites)
            );

            // Refresh featured cards
            displayFeaturedWallpapers(
                wallpapers.filter(
                    item => item.featured
                )
            );

            // Refresh latest cards
            // without losing selected sorting
            applySorting();

        }

    }
);


// ======================================
// Load More
// ======================================

if (loadMoreBtn) {

    loadMoreBtn.addEventListener(
        "click",
        function () {

            visibleWallpapers += 8;

            // Keep current sorting selected
            applySorting();

        }
    );

}


// ======================================
// Update Load More Button
// ======================================

function updateLoadMoreButton(totalItems) {

    if (!loadMoreBtn) return;

    if (visibleWallpapers >= totalItems) {

        loadMoreBtn.style.display =
            "none";

    } else {

        loadMoreBtn.style.display =
            "inline-block";

    }

}
/* ======================================
   MOBILE NAVIGATION
====================================== */

const mobileMenuButton =
    document.getElementById("mobile-menu-button");

const mobileNav =
    document.getElementById("mobile-nav");

if (mobileMenuButton && mobileNav) {

    /* Open and close menu */

    mobileMenuButton.addEventListener(
        "click",
        function () {

            const isOpen =
                mobileNav.classList.toggle("active");

            mobileMenuButton.classList.toggle(
                "active",
                isOpen
            );

            mobileMenuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            mobileMenuButton.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

            mobileNav.setAttribute(
                "aria-hidden",
                String(!isOpen)
            );

            if (isOpen) {

                mobileNav.removeAttribute("inert");

            } else {

                mobileNav.setAttribute(
                    "inert",
                    ""
                );

            }

        }
    );


    /* Close menu after clicking a link */

    const mobileNavLinks =
        mobileNav.querySelectorAll("a");

    mobileNavLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                mobileNav.classList.remove(
                    "active"
                );

                mobileMenuButton.classList.remove(
                    "active"
                );

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                mobileMenuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                mobileNav.setAttribute(
                    "aria-hidden",
                    "true"
                );

                mobileNav.setAttribute(
                    "inert",
                    ""
                );

            }
        );

    });


    /* Close menu when switching to desktop */

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 768) {

                mobileNav.classList.remove(
                    "active"
                );

                mobileMenuButton.classList.remove(
                    "active"
                );

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                mobileMenuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                mobileNav.setAttribute(
                    "aria-hidden",
                    "true"
                );

                mobileNav.setAttribute(
                    "inert",
                    ""
                );

            }

        }
    );

}
/* ======================================
   DYNAMIC HERO STATISTICS
====================================== */

function updateHeroStatistics(wallpaperData) {

    const wallpaperCountElement =
        document.getElementById("wallpaper-count");

    const gameCountElement =
        document.getElementById("game-count");

    const downloadCountElement =
        document.getElementById("download-count");


    if (!Array.isArray(wallpaperData)) {
        return;
    }


    /* Total wallpapers */

    const totalWallpapers =
        wallpaperData.length;


    /* Total unique games */

    const uniqueGames =
        new Set(
            wallpaperData
                .map(function (item) {

                    return item.game
                        ? item.game.trim().toLowerCase()
                        : "";

                })
                .filter(Boolean)
        );

    const totalGames =
        uniqueGames.size;


    /* Total downloads */

    const totalDownloads =
        wallpaperData.reduce(
            function (total, item) {

                return total + (Number(item.downloads) || 0);

            },
            0
        );


    if (wallpaperCountElement) {

        animateCounter(
            wallpaperCountElement,
            totalWallpapers
        );

    }


    if (gameCountElement) {

        animateCounter(
            gameCountElement,
            totalGames
        );

    }


    if (downloadCountElement) {

        animateCounter(
            downloadCountElement,
            totalDownloads
        );

    }

}


/* ======================================
   COUNTER ANIMATION
====================================== */

function animateCounter(element, targetNumber) {

    const duration = 900;

    const startTime =
        performance.now();


    function updateCounter(currentTime) {

        const elapsedTime =
            currentTime - startTime;

        const progress =
            Math.min(
                elapsedTime / duration,
                1
            );

        const easedProgress =
            1 - Math.pow(1 - progress, 3);

        const currentNumber =
            Math.floor(
                targetNumber * easedProgress
            );

        element.textContent =
            currentNumber.toLocaleString();


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        } else {

            element.textContent =
                targetNumber.toLocaleString();

        }

    }


    requestAnimationFrame(
        updateCounter
    );

}
/* ======================================
   DYNAMIC HERO STATISTICS
====================================== */

function updateHeroStatistics(wallpaperData) {

    if (!Array.isArray(wallpaperData)) {
        return;
    }

    const wallpaperCountElement =
        document.getElementById("wallpaper-count");

    const gameCountElement =
        document.getElementById("game-count");

    const downloadCountElement =
        document.getElementById("download-count");


    /* Total wallpapers */

    const totalWallpapers =
        wallpaperData.length;


    /* Total unique games */

    const uniqueGames = new Set(
        wallpaperData
            .map(function (wallpaper) {

                return wallpaper.game
                    ? wallpaper.game.trim().toLowerCase()
                    : "";

            })
            .filter(Boolean)
    );

    const totalGames =
        uniqueGames.size;


    /* Total downloads from wallpapers.json */

    const totalDownloads =
        wallpaperData.reduce(
            function (total, wallpaper) {

                return total +
                    (Number(wallpaper.downloads) || 0);

            },
            0
        );


    animateHeroCounter(
        wallpaperCountElement,
        totalWallpapers
    );

    animateHeroCounter(
        gameCountElement,
        totalGames
    );

    animateHeroCounter(
        downloadCountElement,
        totalDownloads
    );

}


/* ======================================
   HERO COUNTER ANIMATION
====================================== */

function animateHeroCounter(element, targetNumber) {

    if (!element) {
        return;
    }

    const duration = 900;

    const startTime =
        performance.now();


    function updateCounter(currentTime) {

        const elapsedTime =
            currentTime - startTime;

        const progress =
            Math.min(
                elapsedTime / duration,
                1
            );

        const easedProgress =
            1 - Math.pow(1 - progress, 3);

        const currentNumber =
            Math.floor(
                targetNumber * easedProgress
            );

        element.textContent =
            currentNumber.toLocaleString();


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        } else {

            element.textContent =
                targetNumber.toLocaleString();

        }

    }

    requestAnimationFrame(updateCounter);

}
/* ======================================
   DYNAMIC HERO POPULAR GAMES
====================================== */

function displayHeroPopularGames(wallpaperData) {

    const popularGamesContainer =
        document.getElementById("hero-popular-games");

    if (
        !popularGamesContainer ||
        !Array.isArray(wallpaperData)
    ) {
        return;
    }


    const gameCounts = {};


    wallpaperData.forEach(function (wallpaper) {

        if (!wallpaper.game) {
            return;
        }

        const gameName =
            wallpaper.game.trim();

        gameCounts[gameName] =
            (gameCounts[gameName] || 0) + 1;

    });


    const popularGames =
        Object.entries(gameCounts)
            .sort(function (firstGame, secondGame) {

                return secondGame[1] - firstGame[1];

            })
            .slice(0, 5);


    popularGamesContainer.innerHTML = "";


    popularGames.forEach(function (gameEntry) {

        const gameName =
            gameEntry[0];

        const gameLink =
            document.createElement("a");

        gameLink.href =
            "pages/game.html?game=" +
            encodeURIComponent(gameName);

        gameLink.textContent =
            gameName;

        popularGamesContainer.appendChild(
            gameLink
        );

    });

}
/* ======================================
   DYNAMIC HERO FEATURED WALLPAPER
====================================== */

function displayHeroFeaturedWallpaper(wallpaperData) {

    if (!Array.isArray(wallpaperData)) {
        return;
    }


    const heroImage =
        document.getElementById("hero-featured-image");

    const heroResolution =
        document.getElementById("hero-featured-resolution");

    const heroTitle =
        document.getElementById("hero-featured-title");

    const heroDetails =
        document.getElementById("hero-featured-details");

    const heroLink =
        document.getElementById("hero-featured-link");


    if (
        !heroImage ||
        !heroResolution ||
        !heroTitle ||
        !heroDetails ||
        !heroLink
    ) {
        return;
    }


    /* Get the newest featured wallpaper */

    const featuredWallpapers =
        wallpaperData
            .filter(function (wallpaper) {

                return wallpaper.featured === true;

            })
            .sort(function (firstWallpaper, secondWallpaper) {

                return new Date(secondWallpaper.date) -
                    new Date(firstWallpaper.date);

            });


    const featuredWallpaper =
        featuredWallpapers[0] || wallpaperData[0];


    if (!featuredWallpaper) {
        return;
    }


    heroImage.src =
        featuredWallpaper.thumbnail;

    heroImage.alt =
        featuredWallpaper.title +
        " gaming wallpaper";


    heroResolution.textContent =
        featuredWallpaper.resolution || "HD";


    heroTitle.textContent =
        featuredWallpaper.title;


    const category =
        featuredWallpaper.category || "Gaming";

    const game =
        featuredWallpaper.game || "Wallpaper";


    heroDetails.textContent =
        category + " • " + game;


    heroLink.href =
        "pages/wallpaper.html?id=" +
        encodeURIComponent(featuredWallpaper.id);

}
/* ======================================
   SCROLL REVEAL
====================================== */

function initializeScrollReveal() {

    const revealObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "reveal-visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    function observeRevealElements() {

        const revealElements =
            document.querySelectorAll(
                [
                    ".section-title",
                    ".section-header",
                    ".wallpaper-card",
                    ".game-card",
                    ".ad-box",
                    ".about-content",
                    ".stat-card",
                    ".footer-column",
                    ".footer-brand"
                ].join(",")
            );


        revealElements.forEach(function (element) {

            if (
                element.classList.contains(
                    "reveal-item"
                )
            ) {
                return;
            }

            element.classList.add(
                "reveal-item"
            );

            revealObserver.observe(
                element
            );

        });

    }


    /* Observe existing elements */

    observeRevealElements();


    /*
       Detect wallpaper and game cards that are
       added later through JavaScript
    */

    const pageObserver =
        new MutationObserver(function () {

            observeRevealElements();

        });


    pageObserver.observe(
        document.body,
        {
            childList: true,
            subtree: true
        }
    );

}


/* Start after the page structure is ready */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initializeScrollReveal
    );

} else {

    initializeScrollReveal();

}
/* ======================================
   BACK TO TOP BUTTON
====================================== */

const backToTopButton =
    document.getElementById("back-to-top");


if (backToTopButton) {

    function updateBackToTopButton() {

        if (window.scrollY > 500) {

            backToTopButton.classList.add(
                "visible"
            );

        } else {

            backToTopButton.classList.remove(
                "visible"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateBackToTopButton,
        {
            passive: true
        }
    );


    backToTopButton.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    updateBackToTopButton();

}
