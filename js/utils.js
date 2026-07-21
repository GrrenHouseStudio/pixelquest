// ======================================
// PixelQuest Utilities
// ======================================

function downloadWallpaper(image, title) {

    const link = document.createElement("a");

    link.href = image;

    link.download = title
        .toLowerCase()
        .replaceAll(" ", "-");

    document.body.appendChild(link);

    link.click();

    link.remove();
    
// ======================================
// Image loading animation
// ======================================

function activateImageLoadingAnimation() {

    const images =
        document.querySelectorAll(
            ".wallpaper-image img, .game-card img"
        );

    images.forEach(image => {

        if (image.complete) {

            image.classList.add("image-loaded");

        } else {

            image.addEventListener(
                "load",
                function () {

                    image.classList.add("image-loaded");

                },
                { once: true }
            );

        }

    });

}

}
