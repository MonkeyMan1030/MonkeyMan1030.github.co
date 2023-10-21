document.addEventListener("DOMContentLoaded", function() {
    // List of image file names in your "images" folder
    const imageNames = [
        'image1.jpg',
        'image2.jpg',
        'image3.jpg',
        // Add more image file names here
    ];

    // Get a random index to pick a random image
    const randomIndex = Math.floor(Math.random() * imageNames.length);

    // Set the source of the image element to the random image
    const randomImage = document.getElementById('random-image');
    randomImage.src = 'images/' + imageNames[randomIndex];
});
