function setRandomColor() {
    const leftSquare = document.getElementById('left-square');
    if (!leftSquare) {
        console.error('Left square not found.');
        return;
    }

    function getRandomHexColor() {
        const randomColor = Math.floor(Math.random() * 0xFFFFFF).toString(16);
        return `#${randomColor.padStart(6, '0')}`;
    }

    const randomColor = getRandomHexColor().toUpperCase();
    leftSquare.style.backgroundColor = randomColor;
    return randomColor; // Return the color to be used in match.js
}

// Export function for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = setRandomColor;
} else {
    window.setRandomColor = setRandomColor;
}
