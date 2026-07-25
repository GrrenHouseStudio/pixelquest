// ======================================
// PixelQuest Utilities
// ======================================

function downloadWallpaper(image, title) {
    if (!image) {
        console.error("Download image path is missing.");
        return;
    }

    const link = document.createElement("a");

    link.href = image;
    link.download = String(title || "pixelquest-wallpaper")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

    document.body.appendChild(link);
    link.click();
    link.remove();
}


// ======================================
// Image Loading Animation
// ======================================

function activateImageLoadingAnimation() {
    const images = document.querySelectorAll(
        ".wallpaper-image img, .game-card img"
    );

    images.forEach(function (image) {
        if (image.complete) {
            image.classList.add("image-loaded");
            return;
        }

        image.addEventListener(
            "load",
            function () {
                image.classList.add("image-loaded");
            },
            { once: true }
        );
    });
}
