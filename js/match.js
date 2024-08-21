let leftColor = ''; // Holds the color of the left square
let tries = 0; // Counter for the number of tries
const maxTries = 5; // Maximum number of tries
const messageElement = document.getElementById('match-message'); // Message element
let easyMode = false; // Track if the game is in easy mode

const easyColors = [
    '#000000', // Black
    '#FFFFFF', // White
    '#FF0000', // Red
    '#00FF00', // Green
    '#0000FF', // Blue
    '#FFFF00', // Yellow
    '#FF00FF', // Magenta
    '#00FFFF', // Cyan
    '#C0C0C0', // Silver
    '#808080', // Gray
    '#800000', // Maroon
    '#808000', // Olive
    '#008000', // Dark Green
    '#800080', // Purple
    '#008080', // Teal
    '#FF6347', // Tomato
    '#FF1493', // Deep Pink
    '#FFD700', // Gold
    '#ADFF2F', // Green Yellow
    '#FF4500'  // Orange Red
];

function setupMatchButton() {
    const matchButton = document.getElementById('match-button');
    if (!matchButton) {
        console.error('Match button not found.');
        return;
    }

    // Event listener for match button
    matchButton.addEventListener('click', handleMatch);

    // Event listener for Enter key press in color input
    const colorInput = document.getElementById('color-input');
    if (colorInput) {
        colorInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent form submission if inside a form
                handleMatch(); // Trigger the match logic
            }
        });
    } else {
        console.error('Color input not found.');
    }
}

function handleMatch() {
    const colorInput = document.getElementById('color-input');
    if (!colorInput) {
        console.error('Color input not found.');
        return;
    }
    
    let userColor = colorInput.value.trim();
    if (userColor.startsWith('#')) {
        userColor = userColor.slice(1);
    }

    // Check for special commands
    if (userColor.toLowerCase() === 'easy') {
        setEasyMode(true);
        colorInput.value = ''; // Clear input after command
        return;
    } else if (userColor.toLowerCase() === 'back') {
        setEasyMode(false);
        colorInput.value = ''; // Clear input after command
        return;
    }

    if (!/^[0-9A-Fa-f]{6}$/.test(userColor)) {
        alert('Please enter a valid HEX color code.');
        return;
    }

    userColor = userColor.toUpperCase();

    // Check if the user's color matches the left square's color
    if (userColor === leftColor.substring(1).toUpperCase()) {
        messageElement.innerHTML = `<span style="color: green;">#${userColor}</span> is a match!`;
        resetGame(); // Reset the game after a match
    } else {
        tries++;
        if (tries >= maxTries) {
            messageElement.textContent = `No more tries left! The correct color was ${leftColor}.`;
            resetGame(); // Reset the game after max tries
        } else {
            messageElement.innerHTML = `#${userColor} - ${maxTries - tries} tries left`;
            provideColorFeedback(userColor, leftColor.substring(1)); // Remove '#' for comparison
        }
    }
}

// Provide color feedback based on proximity to the correct color
function provideColorFeedback(inputColor, targetColor) {
    const inputColorArray = inputColor.match(/.{1,2}/g);
    const targetColorArray = targetColor.match(/.{1,2}/g);

    let colorFeedback = '';

    inputColorArray.forEach((value, index) => {
        const inputValue = parseInt(value, 16);
        const targetValue = parseInt(targetColorArray[index], 16);
        const diff = Math.abs(inputValue - targetValue);

        let color;
        if (diff === 0) {
            color = 'green';
        } else if (diff <= 15) { // Slightly higher or lower
            color = 'orange';
        } else if (diff <= 30) { // Moderately higher or lower
            color = 'yellow';
        } else { // Far off
            color = 'red';
        }

        colorFeedback += `<span style="color: ${color};">${value}</span>`;
    });

    messageElement.innerHTML += `<br>[${colorFeedback}]`;
}

// Set the color of the left square based on the mode
function setRandomColor() {
    let color;
    if (easyMode) {
        // Use predefined easy colors
        color = easyColors[Math.floor(Math.random() * easyColors.length)];
    } else {
        // Standard color generation
        const colors = '0123456789ABCDEF';
        color = '#' + Array.from({ length: 6 }, () => colors[Math.floor(Math.random() * 16)]).join('');
    }
    leftColor = color;
    document.getElementById('left-square').style.backgroundColor = leftColor;
}

// Toggle easy mode
function setEasyMode(isEasy) {
    easyMode = isEasy;
    setRandomColor(); // Set a new random color when toggling modes
}

// Reset the game
function resetGame() {
    tries = 0;
    // Load a new random color for the left square
    setRandomColor();
}

document.addEventListener('DOMContentLoaded', () => {
    setupMatchButton();
    setRandomColor(); // Initialize the left square color
});
