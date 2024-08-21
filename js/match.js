// match.js
function setupMatchButton() {
    const matchButton = document.getElementById('match-button');
    const colorInput = document.getElementById('color-input');
    const leftSquare = document.getElementById('left-square');
    const matchMessage = document.getElementById('match-message');

    if (!matchButton || !colorInput || !leftSquare || !matchMessage) {
        console.error('Elements not found.');
        return;
    }

    matchButton.addEventListener('click', () => {
        let inputColor = colorInput.value.trim();

        if (inputColor.startsWith('#')) {
            inputColor = inputColor.slice(1);
        }

        let leftSquareColor = leftSquare.style.backgroundColor;

        // Extract hex color from RGB (if necessary)
        if (leftSquareColor.startsWith('rgb')) {
            const rgbValues = leftSquareColor.match(/\d+/g);
            leftSquareColor = rgbToHex(parseInt(rgbValues[0]), parseInt(rgbValues[1]), parseInt(rgbValues[2]));
        } else {
            leftSquareColor = leftSquareColor.replace('#', '');
        }

        if (/^[0-9A-Fa-f]{6}$/.test(inputColor) && inputColor.toLowerCase() === leftSquareColor.toLowerCase()) {
            matchMessage.textContent = "It's a match!";
            matchMessage.style.color = '#00FF00'; // Green color for match
        } else {
            matchMessage.textContent = "Try again!";
            matchMessage.style.color = '#FF0000'; // Red color for no match
        }
    });
}

// Function to convert RGB to HEX
function rgbToHex(r, g, b) {
    return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
}

// Export function for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = setupMatchButton;
} else {
    window.setupMatchButton = setupMatchButton;
}
