/* ======================================
   PIXELQUEST CATEGORY PAGE
====================================== */

document.addEventListener("DOMContentLoaded", function () {

    const categoryFilterList =
        document.getElementById("category-filter-list");

    const categoryWallpapers =
        document.getElementById("category-wallpapers");

    const categoryResultsTitle =
        document.getElementById("category-results-title");

    const categoryResultCount =
        document.getElementById("category-result-count");

    const categoryPageTitle =
        document.getElementById("category-page-title");

    const categoryPageDescription =
        document.getElementById("category-page-description");

    const emptyMessage =
        document.getElementById("category-empty-message");


    if (
        !categoryFilterList ||
        !categoryWallpapers ||
        !categoryResultsTitle ||
        !categoryResultCount
    ) {
        return;
    }


    let allWallpapers = [];

    const urlParameters =
        new URLSearchParams(window.location.search);

    const requestedCategory =
        urlParameters.get("category") || "All";


    /* ======================================
       LOAD WALLPAPERS
    ======================================= */

    fetch("../wallpapers.json")

        .then(function (response) {

            if (!response.ok) {

                throw new Error(
                    "Could not load wallpapers.json"
                );

            }

            return response.json();

        })

        .then(function (wallpaperData) {

            if (!Array.isArray(wallpaperData)) {

                throw new Error(
                    "Wallpaper data is not valid."
                );

            }

            allWallpapers = wallpaperData;

            createCategoryButtons();

            displayCategory(requestedCategory);

        })

        .catch(function (error) {

            console.error(
                "Category page error:",
                error
            );

            categoryWallpapers.innerHTML = `
                <div class="category-loading-error">

                    <h2>Unable to Load Wallpapers</h2>

                    <p>
                        Please check wallpapers.json and refresh the page.
                    </p>

                </div>
            `;

        });


    /* ======================================
       CREATE CATEGORY BUTTONS
    ======================================= */

    function createCategoryButtons() {

        const categories =
            [...new Set(
                allWallpapers
                    .map(function (wallpaper) {

                        return wallpaper.category
                            ? wallpaper.category.trim()
                            : "";

                    })
                    .filter(Boolean)
            )]
            .sort(function (firstCategory, secondCategory) {

                return firstCategory.localeCompare(
                    secondCategory
                );

            });


        categoryFilterList.innerHTML = "";


        const allButton =
            createCategoryButton("All");

        categoryFilterList.appendChild(allButton);


        categories.forEach(function (category) {

            const categoryButton =
                createCategoryButton(category);

            categoryFilterList.appendChild(
                categoryButton
            );

        });

    }


    function createCategoryButton(categoryName) {

        const button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "category-filter-button";

        button.textContent =
            categoryName === "All"
                ? "All Categories"
                : categoryName;

        button.dataset.category =
            categoryName;


        button.addEventListener(
            "click",
            function () {

                displayCategory(categoryName);

                updatePageAddress(categoryName);

            }
        );


        return button;

    }


    /* ======================================
       DISPLAY SELECTED CATEGORY
    ======================================= */

    function displayCategory(categoryName) {

        const normalizedCategory =
            categoryName.trim().toLowerCase();


        const filteredWallpapers =
            normalizedCategory === "all"
                ? allWallpapers
                : allWallpapers.filter(
                    function (wallpaper) {

                        return (
                            wallpaper.category &&
                            wallpaper.category
                                .trim()
                                .toLowerCase() ===
                                normalizedCategory
                        );

                    }
                );


        updateActiveButton(categoryName);

        updateCategoryHeading(
            categoryName,
            filteredWallpapers.length
        );

        renderWallpapers(filteredWallpapers);

    }


    /* ======================================
       UPDATE CATEGORY HEADINGS
    ======================================= */

    function updateCategoryHeading(
        categoryName,
        wallpaperCount
    ) {

        const isAllCategories =
            categoryName.toLowerCase() === "all";


        categoryResultsTitle.textContent =
            isAllCategories
                ? "All Categories"
                : categoryName + " Wallpapers";


        categoryResultCount.textContent =
            wallpaperCount +
            (wallpaperCount === 1
                ? " Wallpaper"
                : " Wallpapers");


        if (categoryPageTitle) {

            categoryPageTitle.textContent =
                isAllCategories
                    ? "Browse Gaming Wallpapers by Category"
                    : categoryName + " Gaming Wallpapers";

        }


        if (categoryPageDescription) {

            categoryPageDescription.textContent =
                isAllCategories
                    ? "Explore free HD and 2K gaming wallpapers from action, racing, RPG, superhero, battle royale and other genres."
                    : "Browse free HD and 2K " +
                      categoryName +
                      " gaming wallpapers for desktop, laptop and mobile.";

        }


        document.title =
            isAllCategories
                ? "Gaming Wallpaper Categories | PixelQuest"
                : categoryName +
                  " Gaming Wallpapers | PixelQuest";

    }


    /* ======================================
       ACTIVE CATEGORY BUTTON
    ======================================= */

    function updateActiveButton(categoryName) {

        const categoryButtons =
            categoryFilterList.querySelectorAll(
                ".category-filter-button"
            );


        categoryButtons.forEach(function (button) {

            const buttonCategory =
                button.dataset.category || "";

            const isActive =
                buttonCategory.toLowerCase() ===
                categoryName.toLowerCase();


            button.classList.toggle(
                "active",
                isActive
            );

        });

    }


    /* ======================================
       RENDER WALLPAPER CARDS
    ======================================= */

    function renderWallpapers(wallpapers) {

        categoryWallpapers.innerHTML = "";


        if (wallpapers.length === 0) {

            if (emptyMessage) {

                emptyMessage.hidden = false;

            }

            return;

        }


        if (emptyMessage) {

            emptyMessage.hidden = true;

        }


        wallpapers.forEach(function (wallpaper) {

            const card =
                createWallpaperCard(wallpaper);

            categoryWallpapers.appendChild(card);

        });

    }


    function createWallpaperCard(wallpaper) {

        const card =
            document.createElement("article");

        card.className =
            "wallpaper-card";


        const wallpaperDate =
            wallpaper.date || "Unknown date";

        const wallpaperResolution =
            wallpaper.resolution || "HD";

        const wallpaperViews =
            Number(wallpaper.views) || 0;

        const wallpaperDownloads =
            Number(wallpaper.downloads) || 0;


        card.innerHTML = `

            <div class="wallpaper-image">

                <img
                    src="../${wallpaper.thumbnail}"
                    alt="${escapeHtml(wallpaper.title)} ${escapeHtml(wallpaper.game)} gaming wallpaper"
                    loading="lazy"
                    decoding="async"
                    width="640"
                    height="360"
                >

                <span class="new-badge">
                    NEW
                </span>

                <span class="resolution-badge">
                    ${escapeHtml(wallpaperResolution)}
                </span>

            </div>


            <div class="wallpaper-info">

                <div class="wallpaper-title-row">

                    <div>

                        <h3>
                            ${escapeHtml(wallpaper.title)}
                        </h3>

                        <p>
                            ${escapeHtml(wallpaper.game)}
                        </p>

                    </div>

                    <button
                        class="favorite-btn"
                        type="button"
                        data-wallpaper-id="${wallpaper.id}"
                        aria-label="Add ${escapeHtml(wallpaper.title)} to favorites"
                    >
                        🤍
                    </button>

                </div>


                <div class="wallpaper-stats">

                    <span>
                        👁 ${wallpaperViews}
                    </span>

                    <span>
                        ↓ ${wallpaperDownloads}
                    </span>

                    <span>
                        📅 ${escapeHtml(wallpaperDate)}
                    </span>

                </div>


                <div class="wallpaper-actions">

                    <a
                        href="wallpaper.html?id=${encodeURIComponent(wallpaper.id)}"
                        class="view-button"
                    >
                        View Wallpaper
                    </a>

                    <button
                        class="download-button"
                        type="button"
                    >
                        Download
                    </button>

                </div>

            </div>
        `;


        const downloadButton =
            card.querySelector(".download-button");

        if (downloadButton) {

            downloadButton.addEventListener(
                "click",
                function () {

                    downloadWallpaper(
                        "../" + wallpaper.image,
                        wallpaper.title
                    );

                }
            );

        }


        const favoriteButton =
            card.querySelector(".favorite-btn");

        if (favoriteButton) {

            updateFavoriteButton(
                favoriteButton,
                wallpaper.id
            );


            favoriteButton.addEventListener(
                "click",
                function () {

                    toggleFavorite(
                        wallpaper.id,
                        favoriteButton
                    );

                }
            );

        }


        return card;

    }


    /* ======================================
       FAVORITES
    ======================================= */

    function getFavorites() {

        try {

            const storedFavorites =
                JSON.parse(
                    localStorage.getItem(
                        "pixelquestFav"
                    )
                );

            return Array.isArray(storedFavorites)
                ? storedFavorites
                : [];

        } catch (error) {

            return [];

        }

    }


    function toggleFavorite(
        wallpaperId,
        button
    ) {

        let favorites =
            getFavorites();

        const normalizedId =
            Number(wallpaperId);

        const favoriteIndex =
            favorites.findIndex(
                function (favoriteId) {

                    return Number(favoriteId) ===
                        normalizedId;

                }
            );


        if (favoriteIndex >= 0) {

            favorites.splice(
                favoriteIndex,
                1
            );

        } else {

            favorites.push(
                normalizedId
            );

        }


        localStorage.setItem(
            "pixelquestFav",
            JSON.stringify(favorites)
        );


        updateFavoriteButton(
            button,
            normalizedId
        );

    }


    function updateFavoriteButton(
        button,
        wallpaperId
    ) {

        const favorites =
            getFavorites();

        const isFavorite =
            favorites.some(
                function (favoriteId) {

                    return Number(favoriteId) ===
                        Number(wallpaperId);

                }
            );


        button.textContent =
            isFavorite ? "💖" : "🤍";

        button.classList.toggle(
            "active",
            isFavorite
        );

    }


    /* ======================================
       UPDATE URL
    ======================================= */

    function updatePageAddress(categoryName) {

        const pageUrl =
            new URL(window.location.href);


        if (categoryName.toLowerCase() === "all") {

            pageUrl.searchParams.delete(
                "category"
            );

        } else {

            pageUrl.searchParams.set(
                "category",
                categoryName
            );

        }


        window.history.replaceState(
            {},
            "",
            pageUrl
        );

    }


    /* ======================================
       SAFE TEXT OUTPUT
    ======================================= */

    function escapeHtml(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }

});