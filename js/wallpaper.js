"use strict";

/* =========================================
   PIXELQUEST WALLPAPER DETAILS PAGE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    loadWallpaperPage
);


async function loadWallpaperPage() {
    const detailsContainer =
        document.getElementById("wallpaper-details");

    const relatedContainer =
        document.getElementById("related-wallpapers");

    if (!detailsContainer) {
        return;
    }

    try {
        const response =
            await fetch("../wallpapers.json");

        if (!response.ok) {
            throw new Error(
                `Could not load wallpapers.json: ${response.status}`
            );
        }

        const wallpapers =
            await response.json();

        if (!Array.isArray(wallpapers)) {
            throw new Error(
                "wallpapers.json must contain an array."
            );
        }

        const wallpaperId =
            getWallpaperId();

        const wallpaper =
            wallpapers.find(function (item) {
                return (
                    String(item.id) ===
                    String(wallpaperId)
                );
            });

        if (!wallpaper) {
            showWallpaperNotFound(
                detailsContainer
            );

            return;
        }

        updatePageMetadata(wallpaper);

        renderWallpaperDetails(
            wallpaper,
            detailsContainer
        );

        renderRelatedWallpapers(
            wallpaper,
            wallpapers,
            relatedContainer
        );

    } catch (error) {
        console.error(
            "Wallpaper page error:",
            error
        );

        detailsContainer.innerHTML = `
            <div class="category-empty-message">

                <h1>
                    Could Not Load Wallpaper
                </h1>

                <p>
                    The wallpaper information could not be loaded.
                    Please refresh the page and try again.
                </p>

                <a
                    href="../#latest"
                    class="about-button"
                >
                    Browse Wallpapers
                </a>

            </div>
        `;
    }
}


/* =========================================
   GET WALLPAPER ID
========================================= */

function getWallpaperId() {
    const urlParameters =
        new URLSearchParams(
            window.location.search
        );

    return urlParameters.get("id");
}


/* =========================================
   RENDER WALLPAPER DETAILS
========================================= */

function renderWallpaperDetails(
    wallpaper,
    container
) {
    const title =
        escapeWallpaperHtml(
            wallpaper.title ||
            "Gaming Wallpaper"
        );

    const game =
        escapeWallpaperHtml(
            wallpaper.game ||
            "Unknown Game"
        );

    const category =
        escapeWallpaperHtml(
            wallpaper.category ||
            "Gaming"
        );

    const resolution =
        escapeWallpaperHtml(
            wallpaper.resolution ||
            "HD"
        );

    const date =
        escapeWallpaperHtml(
            wallpaper.date ||
            "Not available"
        );

    const views =
        Number(
            wallpaper.views || 0
        ).toLocaleString();

    const downloads =
        Number(
            wallpaper.downloads || 0
        ).toLocaleString();

    const description =
        escapeWallpaperHtml(
            wallpaper.description ||
            createFallbackDescription(
                wallpaper
            )
        );

    const aspectRatio =
        escapeWallpaperHtml(
            wallpaper.aspectRatio ||
            getAspectRatioFromResolution(
                wallpaper.resolution
            )
        );

    const fileFormat =
        escapeWallpaperHtml(
            wallpaper.format ||
            getFileExtension(
                wallpaper.image
            )
        );

    const bestFor =
        escapeWallpaperHtml(
            wallpaper.bestFor ||
            "Desktop and laptop screens"
        );

    const previewPath =
        getPageAssetPath(
            wallpaper.thumbnail
        );

    const originalPath =
        getPageAssetPath(
            wallpaper.image
        );

    const downloadFilename =
        createDownloadFilename(
            wallpaper
        );

    container.innerHTML = `

        <article class="wallpaper-detail-card">

            <nav
                class="breadcrumbs"
                aria-label="Breadcrumb"
            >

                <a href="../">
                    Home
                </a>

                <span>›</span>

                <a
                    href="game.html?game=${encodeURIComponent(
                        wallpaper.game || ""
                    )}"
                >
                    ${game}
                </a>

                <span>›</span>

                <strong>
                    ${title}
                </strong>

            </nav>

            <div class="wallpaper-preview">

                <img
                    src="${previewPath}"
                    alt="${title} gaming wallpaper preview"
                    class="wallpaper-main-image"
                    id="wallpaper-preview-image"
                    width="1280"
                    height="720"
                    decoding="async"
                    fetchpriority="high"
                    draggable="false"
                >

                <span class="wallpaper-resolution-badge">
                    ${resolution}
                </span>

            </div>

            <div class="wallpaper-detail-content">

                <span class="section-label">
                    ${category}
                </span>

                <h1>
                    ${title}
                </h1>

                <p class="wallpaper-game-name">
                    From ${game}
                </p>

                <section
                    class="wallpaper-description-section"
                    aria-labelledby="wallpaper-description-title"
                >

                    <h2 id="wallpaper-description-title">
                        About This Wallpaper
                    </h2>

                    <p>
                        ${description}
                    </p>

                </section>

                <div class="wallpaper-information-grid">

                    <div class="wallpaper-information-card">

                        <span>
                            Resolution
                        </span>

                        <strong>
                            ${resolution}
                        </strong>

                    </div>

                    <div class="wallpaper-information-card">

                        <span>
                            Views
                        </span>

                        <strong>
                            ${views}
                        </strong>

                    </div>

                    <div class="wallpaper-information-card">

                        <span>
                            Downloads
                        </span>

                        <strong id="wallpaper-download-count">
                            ${downloads}
                        </strong>

                    </div>

                    <div class="wallpaper-information-card">

                        <span>
                            Date Added
                        </span>

                        <strong>
                            ${date}
                        </strong>

                    </div>

                </div>

                <div class="wallpaper-extra-information">

                    <div>

                        <span>
                            Aspect Ratio
                        </span>

                        <strong>
                            ${aspectRatio}
                        </strong>

                    </div>

                    <div>

                        <span>
                            File Format
                        </span>

                        <strong>
                            ${fileFormat}
                        </strong>

                    </div>

                    <div>

                        <span>
                            Best For
                        </span>

                        <strong>
                            ${bestFor}
                        </strong>

                    </div>

                </div>

                <div class="wallpaper-action-buttons">

                    <a
                        href="${originalPath}"
                        download="${downloadFilename}"
                        class="download-button"
                        id="full-resolution-download"
                    >
                        ⬇ Download Full-Resolution Wallpaper
                    </a>

                    <a
                        href="game.html?game=${encodeURIComponent(
                            wallpaper.game || ""
                        )}"
                        class="secondary-button"
                    >
                        Browse More
                    </a>

                </div>

                <p class="download-quality-note">
                    The image displayed above is an optimized preview.
                    The Download button provides the original
                    ${resolution} wallpaper.
                </p>

            </div>

        </article>
    `;

    setupDownloadTracking(
        wallpaper
    );
}


/* =========================================
   DOWNLOAD TRACKING
========================================= */

function setupDownloadTracking(
    wallpaper
) {
    const downloadButton =
        document.getElementById(
            "full-resolution-download"
        );

    if (!downloadButton) {
        return;
    }

    downloadButton.addEventListener(
        "click",
        function () {
            trackDownloadWithGoogleAnalytics(
                wallpaper
            );
        }
    );
}


function trackDownloadWithGoogleAnalytics(
    wallpaper
) {
    if (
        typeof window.gtag !==
        "function"
    ) {
        return;
    }

    window.gtag(
        "event",
        "wallpaper_download",
        {
            wallpaper_id:
                String(
                    wallpaper.id || ""
                ),

            wallpaper_title:
                wallpaper.title || "",

            game:
                wallpaper.game || "",

            category:
                wallpaper.category || "",

            resolution:
                wallpaper.resolution || ""
        }
    );
}


/* =========================================
   RELATED WALLPAPERS
========================================= */

function renderRelatedWallpapers(
    currentWallpaper,
    allWallpapers,
    container
) {
    if (!container) {
        return;
    }

    const relatedWallpapers =
        allWallpapers
            .filter(function (wallpaper) {
                const isDifferentWallpaper =
                    String(wallpaper.id) !==
                    String(
                        currentWallpaper.id
                    );

                const sameGame =
                    wallpaper.game ===
                    currentWallpaper.game;

                const sameCategory =
                    wallpaper.category ===
                    currentWallpaper.category;

                return (
                    isDifferentWallpaper &&
                    (
                        sameGame ||
                        sameCategory
                    )
                );
            })
            .slice(0, 4);

    if (
        relatedWallpapers.length === 0
    ) {
        container.innerHTML = `
            <p class="category-empty-message">
                No related wallpapers are available yet.
            </p>
        `;

        return;
    }

    container.innerHTML =
        relatedWallpapers
            .map(
                createRelatedWallpaperCard
            )
            .join("");
}


function createRelatedWallpaperCard(
    wallpaper
) {
    const title =
        escapeWallpaperHtml(
            wallpaper.title ||
            "Gaming Wallpaper"
        );

    const game =
        escapeWallpaperHtml(
            wallpaper.game ||
            "Gaming"
        );

    const resolution =
        escapeWallpaperHtml(
            wallpaper.resolution ||
            "HD"
        );

    const thumbnailPath =
        getPageAssetPath(
            wallpaper.thumbnail
        );

    return `

        <article class="wallpaper-card">

            <a
                href="wallpaper.html?id=${encodeURIComponent(
                    wallpaper.id
                )}"
                class="wallpaper-card-image"
            >

                <img
                    src="${thumbnailPath}"
                    alt="${title}"
                    loading="lazy"
                    decoding="async"
                    width="640"
                    height="360"
                >

                <span class="resolution-badge">
                    ${resolution}
                </span>

            </a>

            <div class="wallpaper-card-content">

                <span class="wallpaper-game">
                    ${game}
                </span>

                <h3>

                    <a
                        href="wallpaper.html?id=${encodeURIComponent(
                            wallpaper.id
                        )}"
                    >
                        ${title}
                    </a>

                </h3>

                <a
                    href="wallpaper.html?id=${encodeURIComponent(
                        wallpaper.id
                    )}"
                    class="card-view-button"
                >
                    View Wallpaper
                </a>

            </div>

        </article>
    `;
}


/* =========================================
   UPDATE PAGE SEO
========================================= */

function updatePageMetadata(
    wallpaper
) {
    const title =
        wallpaper.title ||
        "Gaming Wallpaper";

    const game =
        wallpaper.game ||
        "Gaming";

    const resolution =
        wallpaper.resolution ||
        "HD";

    document.title =
        `${title} ${resolution} Wallpaper | PixelQuest`;

    const description =
        wallpaper.description
            ? String(
                wallpaper.description
            )
                .replace(/\s+/g, " ")
                .trim()
                .slice(0, 155)
            : (
                `Download ${title}, a free ${resolution} ` +
                `${game} wallpaper for desktop, laptop and mobile.`
            );

    let metaDescription =
        document.querySelector(
            'meta[name="description"]'
        );

    if (!metaDescription) {
        metaDescription =
            document.createElement(
                "meta"
            );

        metaDescription.setAttribute(
            "name",
            "description"
        );

        document.head.appendChild(
            metaDescription
        );
    }

    metaDescription.setAttribute(
        "content",
        description
    );

    updateCanonicalUrl(
        wallpaper.id
    );
}


/* =========================================
   ASSET PATHS
========================================= */

function getPageAssetPath(path) {
    if (!path) {
        return "";
    }

    const cleanPath =
        String(path).trim();

    if (
        cleanPath.startsWith(
            "http://"
        ) ||
        cleanPath.startsWith(
            "https://"
        ) ||
        cleanPath.startsWith("../") ||
        cleanPath.startsWith("/")
    ) {
        return cleanPath;
    }

    return `../${cleanPath}`;
}


/* =========================================
   DOWNLOAD FILENAME
========================================= */

function createDownloadFilename(
    wallpaper
) {
    const title =
        String(
            wallpaper.title ||
            "pixelquest-wallpaper"
        )
            .toLowerCase()
            .trim()
            .replace(
                /[^a-z0-9]+/g,
                "-"
            )
            .replace(
                /^-+|-+$/g,
                ""
            );

    const originalPath =
        String(
            wallpaper.image || ""
        );

    const extensionMatch =
        originalPath.match(
            /\.([a-zA-Z0-9]+)(?:[?#].*)?$/
        );

    const extension =
        extensionMatch
            ? extensionMatch[1]
                .toLowerCase()
            : "png";

    return `${title}.${extension}`;
}


/* =========================================
   FALLBACK DESCRIPTION
========================================= */

function createFallbackDescription(
    wallpaper
) {
    const title =
        wallpaper.title ||
        "This gaming wallpaper";

    const game =
        wallpaper.game ||
        "the featured game";

    const category =
        wallpaper.category ||
        "gaming";

    const resolution =
        wallpaper.resolution ||
        "high-resolution";

    return (
        `${title} is a ${String(category).toLowerCase()} ` +
        `wallpaper from ${game}. It is available in ${resolution} ` +
        `quality and is suitable for desktop and laptop screens. ` +
        `Download the original image for the best clarity and explore ` +
        `the related section for more wallpapers from the same game ` +
        `or category.`
    );
}


/* =========================================
   ASPECT RATIO
========================================= */

function getAspectRatioFromResolution(
    resolution
) {
    const value =
        String(
            resolution || ""
        )
            .replace(/\s/g, "")
            .replace("×", "x");

    const match =
        value.match(
            /^(\d+)x(\d+)$/i
        );

    if (!match) {
        return "16:9";
    }

    const width =
        Number(match[1]);

    const height =
        Number(match[2]);

    if (
        !width ||
        !height
    ) {
        return "16:9";
    }

    const divisor =
        getGreatestCommonDivisor(
            width,
            height
        );

    return (
        `${width / divisor}:` +
        `${height / divisor}`
    );
}


function getGreatestCommonDivisor(
    firstNumber,
    secondNumber
) {
    let first =
        Math.abs(firstNumber);

    let second =
        Math.abs(secondNumber);

    while (second) {
        const remainder =
            first % second;

        first =
            second;

        second =
            remainder;
    }

    return first || 1;
}


/* =========================================
   FILE FORMAT
========================================= */

function getFileExtension(path) {
    const match =
        String(
            path || ""
        ).match(
            /\.([a-zA-Z0-9]+)(?:[?#].*)?$/
        );

    return match
        ? match[1].toUpperCase()
        : "IMAGE";
}


/* =========================================
   CANONICAL URL
========================================= */

function updateCanonicalUrl(
    wallpaperId
) {
    const canonicalUrl =
        `https://pixelquestwallpapers.com/pages/wallpaper.html?id=${encodeURIComponent(
            wallpaperId
        )}`;

    let canonicalLink =
        document.querySelector(
            'link[rel="canonical"]'
        );

    if (!canonicalLink) {
        canonicalLink =
            document.createElement(
                "link"
            );

        canonicalLink.setAttribute(
            "rel",
            "canonical"
        );

        document.head.appendChild(
            canonicalLink
        );
    }

    canonicalLink.setAttribute(
        "href",
        canonicalUrl
    );
}


/* =========================================
   WALLPAPER NOT FOUND
========================================= */

function showWallpaperNotFound(
    container
) {
    container.innerHTML = `

        <div class="category-empty-message">

            <h1>
                Wallpaper Not Found
            </h1>

            <p>
                The wallpaper may have been removed,
                or the page address may be incorrect.
            </p>

            <a
                href="../#latest"
                class="about-button"
            >
                Browse All Wallpapers
            </a>

        </div>
    `;
}


/* =========================================
   SAFE HTML OUTPUT
========================================= */

function escapeWallpaperHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll(
            "'",
            "&#039;"
        );
}
