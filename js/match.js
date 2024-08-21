let leftColor = ''; // Holds the color of the left square
let tries = 0; // Counter for the number of tries
const maxTries = 5; // Maximum number of tries
const messageElement = document.getElementById('match-message'); // Message element

function setupMatchButton() {
    const matchButton = document.getElementById('match-button');
    if (!matchButton) {
        console.error('Match button not found.');
        return;
    }
    
    matchButton.addEventListener('click', () => {
        const colorInput = document.getElementById('color-input');
        if (!colorInput) {
            console.error('Color input not found.');
            return;
        }
        
        let userColor = colorInput.value.trim();
        if (userColor.startsWith('#')) {
            userColor = userColor.slice(1);
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
    });
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

// Reset the game
function resetGame() {
    tries = 0;
    // Load a new random color for the left square
    setRandomColor();
}

function setRandomColor() {
    const colors = '0123456789ABCDEF';
    leftColor = '#' + Array.from({ length: 6 }, () => colors[Math.floor(Math.random() * 16)]).join('');
    document.getElementById('left-square').style.backgroundColor = leftColor;
}

document.addEventListener('DOMContentLoaded', () => {
    setupMatchButton();
    setRandomColor(); // Initialize the left square color
});
