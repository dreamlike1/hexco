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

    leftSquare.style.backgroundColor = getRandomHexColor();
}

// Export function for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = setRandomColor;
} else {
    window.setRandomColor = setRandomColor;
}
