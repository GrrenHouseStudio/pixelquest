// ======================================
// PixelQuest Game Page
// ======================================

const gameHero =
    document.getElementById("game-hero");

const gameWallpapersContainer =
    document.getElementById("game-wallpapers");

const otherGamesContainer =
    document.getElementById("other-games");

const gameWallpaperTitle =
    document.getElementById("game-wallpaper-title");

const pageParameters =
    new URLSearchParams(window.location.search);

const selectedGame =
    pageParameters.get("game");


fetch("../wallpapers.json")
    .then(response => {

        if (!response.ok) {
            throw new Error(
                "Could not load wallpapers.json"
            );
        }

        return response.json();

    })
    .then(wallpapers => {

        if (!selectedGame) {

            showGameNotFound();

            return;

        }

        const gameWallpapers =
            wallpapers.filter(item =>
                String(item.game)
                    .toLowerCase() ===
                selectedGame.toLowerCase()
            );

        if (gameWallpapers.length === 0) {

            showGameNotFound();

            return;

        }

        displayGameHero(gameWallpapers);

        displayGameWallpapers(gameWallpapers);

        displayOtherGames(
            wallpapers,
            gameWallpapers[0].game
        );

        updateGamePageInformation(
            gameWallpapers[0].game,
            gameWallpapers.length
        );

    })
    .catch(error => {

        console.error(error);

        showGameLoadError();

    });


// ======================================
// Display game hero
// ======================================

function displayGameHero(gameWallpapers) {

    if (!gameHero) {
        return;
    }

    const featuredWallpaper =
        gameWallpapers.find(
            item => item.featured
        ) || gameWallpapers[0];

    const gameName =
        featuredWallpaper.game;

    /*
        IMPORTANT:

        The hero displays the optimized WebP thumbnail.

        It does not display the original full-resolution image.
    */

    const heroImage =
        getGamePageAssetPath(
            featuredWallpaper.thumbnail
        );

    gameHero.innerHTML = `

        <div class="game-hero-card">

            <img
                src="${heroImage}"
                alt="${escapeGameHtml(gameName)} wallpapers"
                class="game-hero-image"
                width="1280"
                height="720"
                decoding="async"
                fetchpriority="high"
                draggable="false"
            >

            <div class="game-hero-overlay"></div>

            <div class="game-hero-content">

                <nav
                    class="breadcrumbs"
                    aria-label="Breadcrumb"
                >

                    <a href="../">
                        Home
                    </a>

                    <span>›</span>

                    <a href="../#games">
                        Games
                    </a>

                    <span>›</span>

                    <strong>
                        ${escapeGameHtml(gameName)}
                    </strong>

                </nav>

                <p class="section-label">
                    Gaming Wallpapers
                </p>

                <h1>
                    ${escapeGameHtml(gameName)}
                </h1>

                <p class="game-hero-description">

                    Explore ${gameWallpapers.length}
                    high-quality ${escapeGameHtml(gameName)}
                    wallpaper${gameWallpapers.length === 1 ? "" : "s"}
                    for desktop and laptop screens.

                </p>

                <div class="game-hero-stats">

                    <span>
                        🖼 ${gameWallpapers.length}
                        Wallpaper${gameWallpapers.length === 1 ? "" : "s"}
                    </span>

                    <span>
                        🎮 ${escapeGameHtml(gameName)}
                    </span>

                </div>

                <a
                    href="#game-collection"
                    class="about-button"
                >
                    Browse Collection
                </a>

            </div>

        </div>

    `;

    const collectionSection =
        document.querySelector(
            ".game-wallpapers-section"
        );

    if (collectionSection) {
        collectionSection.id =
            "game-collection";
    }

}


// ======================================
// Create wallpaper card
// ======================================

function createGameWallpaperCard(item) {

    const thumbnailPath =
        getGamePageAssetPath(item.thumbnail);

    const originalPath =
        getGamePageAssetPath(item.image);

    const title =
        escapeGameHtml(
            item.title || "Gaming Wallpaper"
        );

    const game =
        escapeGameHtml(
            item.game || "Gaming"
        );

    const resolution =
        escapeGameHtml(
            item.resolution || "HD"
        );

    const date =
        escapeGameHtml(
            item.date || ""
        );

    const views =
        Number(item.views || 0)
            .toLocaleString();

    const downloads =
        Number(item.downloads || 0)
            .toLocaleString();

    return `

        <article class="wallpaper-card">

            <a
                href="wallpaper.html?id=${encodeURIComponent(item.id)}"
                class="wallpaper-image"
            >

                <img
                    src="${thumbnailPath}"
                    alt="${title}"
                    loading="lazy"
                    decoding="async"
                    width="640"
                    height="360"
                >

                <div class="image-gradient"></div>

                <span class="badge">
                    ${resolution}
                </span>

            </a>

            <div class="wallpaper-content">

                <div class="wallpaper-heading">

                    <div>

                        <h3>
                            ${title}
                        </h3>

                        <p>
                            ${game}
                        </p>

                    </div>

                </div>

                <div class="wallpaper-meta">

                    <span>
                        👁 ${views}
                    </span>

                    <span>
                        ⬇ ${downloads}
                    </span>

                    <span>
                        📅 ${date}
                    </span>

                </div>

                <div class="card-buttons">

                    <a
                        href="wallpaper.html?id=${encodeURIComponent(item.id)}"
                        class="details-btn"
                    >
                        View Wallpaper
                    </a>

                    <button
                        class="download-btn"
                        type="button"
                        data-image="${originalPath}"
                        data-title="${title}"
                        data-id="${escapeGameHtml(item.id)}"
                        data-game="${game}"
                        data-category="${escapeGameHtml(item.category || "")}"
                        data-resolution="${resolution}"
                    >
                        Download
                    </button>

                </div>

            </div>

        </article>

    `;

}


// ======================================
// Display game wallpapers
// ======================================

function displayGameWallpapers(gameWallpapers) {

    if (!gameWallpapersContainer) {
        return;
    }

    gameWallpapersContainer.innerHTML = "";

    if (gameWallpaperTitle) {

        gameWallpaperTitle.textContent =
            `${gameWallpapers[0].game} Wallpapers`;

    }

    gameWallpapersContainer.innerHTML =
        gameWallpapers
            .map(createGameWallpaperCard)
            .join("");

}


// ======================================
// Display other games
// ======================================

function displayOtherGames(
    wallpapers,
    currentGame
) {

    if (!otherGamesContainer) {
        return;
    }

    otherGamesContainer.innerHTML = "";

    const uniqueGames = [];

    wallpapers.forEach(item => {

        const alreadyExists =
            uniqueGames.find(game =>
                game.game === item.game
            );

        if (
            !alreadyExists &&
            item.game !== currentGame
        ) {
            uniqueGames.push(item);
        }

    });

    otherGamesContainer.innerHTML =
        uniqueGames
            .slice(0, 4)
            .map(game => {

                const thumbnailPath =
                    getGamePageAssetPath(
                        game.thumbnail
                    );

                const gameName =
                    escapeGameHtml(
                        game.game || "Gaming"
                    );

                return `

                    <a
                        href="game.html?game=${encodeURIComponent(game.game)}"
                        class="game-card"
                    >

                        <img
                            src="${thumbnailPath}"
                            alt="${gameName} gaming wallpapers"
                            loading="lazy"
                            decoding="async"
                            width="640"
                            height="360"
                        >

                        <div class="game-overlay">

                            <h3>
                                ${gameName}
                            </h3>

                            <span>
                                Explore Wallpapers →
                            </span>

                        </div>

                    </a>

                `;

            })
            .join("");

}


// ======================================
// Download wallpaper
// ======================================

document.addEventListener(
    "click",
    function (event) {

        const downloadButton =
            event.target.closest(
                ".download-btn"
            );

        if (!downloadButton) {
            return;
        }

        const image =
            downloadButton.dataset.image;

        const title =
            downloadButton.dataset.title ||
            "pixelquest-wallpaper";

        if (!image) {
            return;
        }

        trackGamePageDownload(
            downloadButton
        );

        const link =
            document.createElement("a");

        link.href = image;

        link.download =
            createGameDownloadFilename(
                title,
                image
            );

        document.body.appendChild(link);

        link.click();

        link.remove();

    }
);


// ======================================
// Google Analytics download tracking
// ======================================

function trackGamePageDownload(
    downloadButton
) {

    if (typeof window.gtag !== "function") {
        return;
    }

    window.gtag(
        "event",
        "wallpaper_download",
        {
            wallpaper_id:
                downloadButton.dataset.id || "",

            wallpaper_title:
                downloadButton.dataset.title || "",

            game:
                downloadButton.dataset.game || "",

            category:
                downloadButton.dataset.category || "",

            resolution:
                downloadButton.dataset.resolution || "",

            download_location:
                "game_page"
        }
    );

}


// ======================================
// Update page information
// ======================================

function updateGamePageInformation(
    gameName,
    wallpaperCount
) {

    document.title =
        `${gameName} Wallpapers | PixelQuest`;

    const description =
        document.querySelector(
            'meta[name="description"]'
        );

    if (description) {

        description.content =
            `Browse and download ${wallpaperCount} high-quality ${gameName} gaming wallpapers from PixelQuest.`;

    }

}


// ======================================
// Game not found
// ======================================

function showGameNotFound() {

    if (gameHero) {

        gameHero.innerHTML = `

            <div class="page-message">

                <h1>
                    Game Not Found
                </h1>

                <p>
                    We could not find wallpapers for this game.
                </p>

                <a
                    href="../#games"
                    class="details-home-btn"
                >
                    Browse Games
                </a>

            </div>

        `;

    }

    if (gameWallpapersContainer) {

        gameWallpapersContainer.innerHTML =
            "";

    }

}


// ======================================
// Loading error
// ======================================

function showGameLoadError() {

    if (!gameHero) {
        return;
    }

    gameHero.innerHTML = `

        <div class="page-message">

            <h1>
                Games Could Not Be Loaded
            </h1>

            <p>
                Please return to the homepage and try again.
            </p>

            <a
                href="../"
                class="details-home-btn"
            >
                Return Home
            </a>

        </div>

    `;

}


// ======================================
// Helper: asset path
// ======================================

function getGamePageAssetPath(path) {

    if (!path) {
        return "";
    }

    if (
        path.startsWith("http://") ||
        path.startsWith("https://") ||
        path.startsWith("../")
    ) {
        return path;
    }

    return `../${path}`;

}


// ======================================
// Helper: download filename
// ======================================

function createGameDownloadFilename(
    title,
    imagePath
) {

    const cleanTitle =
        String(title)
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

    const cleanImagePath =
        String(imagePath)
            .split("?")[0]
            .split("#")[0];

    const extensionMatch =
        cleanImagePath.match(
            /\.([a-zA-Z0-9]+)$/
        );

    const extension =
        extensionMatch
            ? extensionMatch[1]
            : "png";

    return `${cleanTitle}.${extension}`;

}


// ======================================
// Helper: escape HTML
// ======================================

function escapeGameHtml(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}
