document.addEventListener("DOMContentLoaded", function() {
    // List of image file names in your "images" folder
    const imageNames = [
        '1.png',
        '2.png',
        '3.png',
        '4.png',
        '5.png',
        '6.png',
        '7.jpg',
    ];

    // Get a random index to pick a random image
    const randomIndex = Math.floor(Math.random() * imageNames.length);

    // Set the source of the image element to the random image
    const randomImage = document.getElementById('random-image');
    randomImage.src = 'images/' + imageNames[randomIndex];
});
