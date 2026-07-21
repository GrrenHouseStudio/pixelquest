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
            throw new Error("Could not load wallpapers.json");
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
                item.game.toLowerCase() ===
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

    if (!gameHero) return;

    const featuredWallpaper =
        gameWallpapers.find(item => item.featured) ||
        gameWallpapers[0];

    const gameName =
        featuredWallpaper.game;

    gameHero.innerHTML = `

        <div class="game-hero-card">

            <img
                src="../${featuredWallpaper.image}"
                alt="${gameName} wallpapers"
                class="game-hero-image">

            <div class="game-hero-overlay"></div>

            <div class="game-hero-content">

                <nav class="breadcrumbs">

                    <a href="../index.html">
                        Home
                    </a>

                    <span>›</span>

                    <a href="../index.html#games">
                        Games
                    </a>

                    <span>›</span>

                    <strong>
                        ${gameName}
                    </strong>

                </nav>

                <p class="section-label">
                    Gaming Wallpapers
                </p>

                <h1>
                    ${gameName}
                </h1>

                <p class="game-hero-description">

                    Explore ${gameWallpapers.length}
                    high-quality ${gameName} wallpaper${gameWallpapers.length === 1 ? "" : "s"}
                    for desktop and laptop screens.

                </p>

                <div class="game-hero-stats">

                    <span>
                        🖼 ${gameWallpapers.length}
                        Wallpaper${gameWallpapers.length === 1 ? "" : "s"}
                    </span>

                    <span>
                        🎮 ${gameName}
                    </span>

                </div>

                <a
                    href="#game-collection"
                    class="about-button">

                    Browse Collection

                </a>

            </div>

        </div>

    `;

    const collectionSection =
        document.querySelector(".game-wallpapers-section");

    if (collectionSection) {
        collectionSection.id = "game-collection";
    }

}


// ======================================
// Create wallpaper card
// ======================================

function createGameWallpaperCard(item) {

    return `

        <article class="wallpaper-card">

            <a
                href="wallpaper.html?id=${item.id}"
                class="wallpaper-image">

                <img
                    src="../${item.thumbnail}"
                    alt="${item.title}"
                    loading="lazy">

                <div class="image-gradient"></div>

                <span class="badge">
                    ${item.resolution}
                </span>

            </a>

            <div class="wallpaper-content">

                <div class="wallpaper-heading">

                    <div>

                        <h3>
                            ${item.title}
                        </h3>

                        <p>
                            ${item.game}
                        </p>

                    </div>

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
                        href="wallpaper.html?id=${item.id}"
                        class="details-btn">

                        View Wallpaper

                    </a>

                    <button
                        class="download-btn"
                        data-image="../${item.image}"
                        data-title="${item.title}">

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

    if (!gameWallpapersContainer) return;

    gameWallpapersContainer.innerHTML = "";

    if (gameWallpaperTitle) {

        gameWallpaperTitle.textContent =
            `${gameWallpapers[0].game} Wallpapers`;

    }

    gameWallpapers.forEach(item => {

        gameWallpapersContainer.innerHTML +=
            createGameWallpaperCard(item);

    });

}


// ======================================
// Display other games
// ======================================

function displayOtherGames(
    wallpapers,
    currentGame
) {

    if (!otherGamesContainer) return;

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

    uniqueGames
        .slice(0, 4)
        .forEach(game => {

            otherGamesContainer.innerHTML += `

                <a
                    href="game.html?game=${encodeURIComponent(game.game)}"
                    class="game-card">

                    <img
                        src="../${game.thumbnail}"
                        alt="${game.game} gaming wallpapers"
                        loading="lazy">

                    <div class="game-overlay">

                        <h3>
                            ${game.game}
                        </h3>

                        <span>
                            Explore Wallpapers →
                        </span>

                    </div>

                </a>

            `;

        });

}


// ======================================
// Download wallpaper
// ======================================

document.addEventListener(
    "click",
    function (event) {

        const downloadButton =
            event.target.closest(".download-btn");

        if (!downloadButton) return;

        const image =
            downloadButton.dataset.image;

        const title =
            downloadButton.dataset.title;

        const link =
            document.createElement("a");

        link.href = image;

        link.download =
            title
                .toLowerCase()
                .replaceAll(" ", "-");

        document.body.appendChild(link);

        link.click();

        link.remove();

    }
);


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

                <h1>Game Not Found</h1>

                <p>
                    We could not find wallpapers for this game.
                </p>

                <a
                    href="../index.html#games"
                    class="details-home-btn">

                    Browse Games

                </a>

            </div>

        `;

    }

    if (gameWallpapersContainer) {
        gameWallpapersContainer.innerHTML = "";
    }

}


// ======================================
// Loading error
// ======================================

function showGameLoadError() {

    if (!gameHero) return;

    gameHero.innerHTML = `

        <div class="page-message">

            <h1>Games could not be loaded</h1>

            <p>
                Please return to the homepage and try again.
            </p>

            <a
                href="../index.html"
                class="details-home-btn">

                Return Home

            </a>

        </div>

    `;

}