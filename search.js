// ======================================
// PixelQuest Search Results Page
// ======================================

const searchResultsContainer =
    document.getElementById("search-results");

const searchResultsTitle =
    document.getElementById("search-results-title");

const searchResultCount =
    document.getElementById("search-result-count");

const searchPageForm =
    document.getElementById("search-page-form");

const searchPageInput =
    document.getElementById("search-page-input");

const pageParameters =
    new URLSearchParams(window.location.search);

const searchQuery =
    pageParameters.get("q")?.trim() || "";


// ======================================
// Load wallpapers
// ======================================

fetch("../wallpapers.json")
    .then(response => {

        if (!response.ok) {
            throw new Error("Could not load wallpapers.json");
        }

        return response.json();

    })
    .then(wallpapers => {

        if (searchPageInput) {
            searchPageInput.value = searchQuery;
        }

        displaySearchResults(
            wallpapers,
            searchQuery
        );

        updateSearchPageInformation(
            searchQuery
        );

    })
    .catch(error => {

        console.error(error);

        if (searchResultsContainer) {

            searchResultsContainer.innerHTML = `

                <div class="search-message">

                    <h2>
                        Wallpapers could not be loaded
                    </h2>

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

        if (searchResultCount) {
            searchResultCount.textContent = "";
        }

    });


// ======================================
// Display search results
// ======================================

function normalizeSearchText(text) {

    return String(text)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

}

function displaySearchResults(wallpapers, keyword) {

    if (!searchResultsContainer) return;

    searchResultsContainer.innerHTML = "";

    const normalizedKeyword =
        normalizeSearchText(keyword);

    const filteredWallpapers =
        wallpapers.filter(item => {

            const title =
                normalizeSearchText(item.title);

            const game =
                normalizeSearchText(item.game);

            const category =
                normalizeSearchText(item.category);

            return (
                title.includes(normalizedKeyword) ||
                game.includes(normalizedKeyword) ||
                category.includes(normalizedKeyword)
            );

        });

    if (!keyword) {

        if (searchResultsTitle) {
            searchResultsTitle.textContent =
                "Latest Wallpapers";
        }

    } else {

        if (searchResultsTitle) {

            searchResultsTitle.textContent =
                `Results for “${keyword}”`;

        }

    }

    if (searchResultCount) {

        searchResultCount.textContent =
            `${filteredWallpapers.length} wallpaper${
                filteredWallpapers.length === 1
                    ? ""
                    : "s"
            } found`;

    }

    if (filteredWallpapers.length === 0) {

        searchResultsContainer.innerHTML = `

            <div class="search-message">

                <div class="search-message-icon">
                    🔍
                </div>

                <h2>
                    No wallpapers found
                </h2>

                <p>
                    We could not find any wallpaper matching
                    “${keyword}”.
                </p>

                <a
                    href="../index.html#latest"
                    class="details-home-btn">

                    Browse All Wallpapers

                </a>

            </div>

        `;

        return;

    }

    filteredWallpapers.forEach(item => {

        searchResultsContainer.innerHTML +=
            createSearchWallpaperCard(item);

    });

}

// ======================================
// Create wallpaper card
// ======================================

function createSearchWallpaperCard(item) {

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
// Search form submission
// ======================================

if (searchPageForm) {

    searchPageForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const keyword =
                searchPageInput.value.trim();

            if (!keyword) {

                window.location.href =
                    "search.html";

                return;

            }

            window.location.href =
                `search.html?q=${encodeURIComponent(keyword)}`;

        }
    );

}
// ======================================
// Download wallpaper
// ======================================

document.addEventListener("click", function (event) {

    const downloadButton =
        event.target.closest(".download-btn");

    if (!downloadButton) return;

    downloadWallpaper(
        downloadButton.dataset.image,
        downloadButton.dataset.title
    );

});


// ======================================
// Update page information
// ======================================

function updateSearchPageInformation(keyword) {

    if (!keyword) {

        document.title =
            "Search Wallpapers | PixelQuest";

        return;

    }

    document.title =
        `${keyword} Wallpapers | PixelQuest`;

    const description =
        document.querySelector(
            'meta[name="description"]'
        );

    if (description) {

        description.content =
            `Search PixelQuest for ${keyword} gaming wallpapers.`;

    }

}