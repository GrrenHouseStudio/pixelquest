// ======================================
// PixelQuest Wallpaper Details Page
// ======================================

const detailsContainer =
    document.getElementById("wallpaper-details");

const relatedContainer =
    document.getElementById("related-wallpapers");

const pageParameters =
    new URLSearchParams(window.location.search);

const wallpaperId =
    Number(pageParameters.get("id"));

fetch("../wallpapers.json")
    .then(response => {

        if (!response.ok) {
            throw new Error("Could not load wallpapers.json");
        }

        return response.json();

    })
    .then(wallpapers => {

        const wallpaper =
            wallpapers.find(item => item.id === wallpaperId);

        if (!wallpaper) {

            showWallpaperNotFound();

            return;

        }

        displayWallpaperDetails(wallpaper);

        displayRelatedWallpapers(
            wallpapers,
            wallpaper
        );

        updatePageInformation(wallpaper);

    })
    .catch(error => {

        console.error(error);

        if (detailsContainer) {

            detailsContainer.innerHTML = `

                <div class="page-message">

                    <h1>Wallpaper could not be loaded</h1>

                    <p>
                        Please return to the homepage and try again.
                    </p>

                    <a href="../index.html" class="details-home-btn">
                        Return Home
                    </a>

                </div>

            `;

        }

    });


// ======================================
// Display wallpaper details
// ======================================

function displayWallpaperDetails(wallpaper) {

    if (!detailsContainer) return;

    detailsContainer.innerHTML = `

        <article class="wallpaper-detail-card">

            <div class="detail-image-wrapper">

                <img
                    src="../${wallpaper.image}"
                    alt="${wallpaper.title}"
                    class="detail-main-image">

                <span class="detail-resolution">
                    ${wallpaper.resolution}
                </span>

            </div>

            <div class="detail-content">

                <p class="detail-category">
                    ${wallpaper.category}
                </p>

                <h1>
                    ${wallpaper.title}
                </h1>

                <p class="detail-game">
                    From ${wallpaper.game}
                </p>

                <div class="detail-info-grid">

                    <div class="detail-info-box">

                        <span>Resolution</span>

                        <strong>
                            ${wallpaper.resolution}
                        </strong>

                    </div>

                    <div class="detail-info-box">

                        <span>Views</span>

                        <strong>
                            ${wallpaper.views}
                        </strong>

                    </div>

                    <div class="detail-info-box">

                        <span>Downloads</span>

                        <strong>
                            ${wallpaper.downloads}
                        </strong>

                    </div>

                    <div class="detail-info-box">

                        <span>Date Added</span>

                        <strong>
                            ${wallpaper.date}
                        </strong>

                    </div>

                </div>

                <div class="detail-actions">

                    <button
                        class="detail-download-btn"
                        data-image="../${wallpaper.image}"
                        data-title="${wallpaper.title}">

                        ⬇ Download Wallpaper

                    </button>

                    <a
                        href="../index.html#latest"
                        class="details-home-btn">

                        Browse More

                    </a>

                </div>

            </div>

        </article>

    `;

}


// ======================================
// Display related wallpapers
// ======================================

function displayRelatedWallpapers(
    wallpapers,
    currentWallpaper
) {

    if (!relatedContainer) return;

    const relatedWallpapers =
        wallpapers
            .filter(item =>
                item.id !== currentWallpaper.id &&
                (
                    item.game === currentWallpaper.game ||
                    item.category === currentWallpaper.category
                )
            )
            .slice(0, 4);

    relatedContainer.innerHTML = "";

    if (relatedWallpapers.length === 0) {

        relatedContainer.innerHTML = `

            <p class="no-related-wallpapers">
                No related wallpapers found.
            </p>

        `;

        return;

    }

    relatedWallpapers.forEach(item => {

        relatedContainer.innerHTML += `

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

                    </div>

                    <div class="card-buttons">

                        <a
                            href="wallpaper.html?id=${item.id}"
                            class="details-btn">

                            View Wallpaper

                        </a>

                    </div>

                </div>

            </article>

        `;

    });

}


// ======================================
// Wallpaper not found
// ======================================

function showWallpaperNotFound() {

    if (!detailsContainer) return;

    detailsContainer.innerHTML = `

        <div class="page-message">

            <h1>Wallpaper Not Found</h1>

            <p>
                The wallpaper may have been removed or the link is incorrect.
            </p>

            <a href="../index.html" class="details-home-btn">
                Return Home
            </a>

        </div>

    `;

}


// ======================================
// Update browser page information
// ======================================

function updatePageInformation(wallpaper) {

    document.title =
        `${wallpaper.title} | PixelQuest`;

    const description =
        document.querySelector(
            'meta[name="description"]'
        );

    if (description) {

        description.content =
            `Download ${wallpaper.title} from ${wallpaper.game} in ${wallpaper.resolution} resolution.`;

    }

}


// ======================================
// Download wallpaper
// ======================================

document.addEventListener(
    "click",
    function (event) {

        const downloadButton =
            event.target.closest(
                ".detail-download-btn"
            );

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