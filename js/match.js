let leftColor = ''; // Holds the color of the left square
let tries = 0; // Counter for the number of tries
const maxTries = 5; // Maximum number of tries
const messageElement = document.getElementById('match-message'); // Message element
const historyList = []; // Array to store history of tries

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
        
        const userColor = colorInput.value.trim();
        if (!/^[0-9A-Fa-f]{6}$/.test(userColor)) {
            alert('Please enter a valid HEX color code.');
            return;
        }

        // Update history
        historyList.push(userColor);
        updateHistoryDisplay();

        // Check if the user's color matches the left square's color
        if (userColor.toUpperCase() === leftColor.toUpperCase()) {
            messageElement.textContent = `${userColor} is a match!`;
            resetGame(); // Reset the game after a match
        } else {
            tries++;
            if (tries >= maxTries) {
                messageElement.textContent = `No more tries left! The correct color was ${leftColor}.`;
                resetGame(); // Reset the game after max tries
            } else {
                messageElement.textContent = `${userColor} - ${maxTries - tries} tries left`;
                provideColorFeedback(userColor, leftColor);
            }
        }
    });
}

// Provide color feedback based on proximity to the correct color
function provideColorFeedback(inputColor, targetColor) {
    const inputColorArray = inputColor.match(/.{1,2}/g).map(hex => parseInt(hex, 16));
    const targetColorArray = targetColor.match(/.{1,2}/g).map(hex => parseInt(hex, 16));

    let colorDistance = 0;
    let colorFeedback = '';

    inputColorArray.forEach((value, index) => {
        const diff = Math.abs(value - targetColorArray[index]);
        colorDistance += diff;
        const color = diff === 0 ? 'green' : (diff < 32 ? 'yellow' : 'orange');
        colorFeedback += `<span style="color: ${color};">${inputColor[index * 2]}${inputColor[index * 2 + 1]}</span>`;
    });

    messageElement.innerHTML += `<br>${colorFeedback}`;
    setInputColorFeedback(colorDistance);
}

// Set the color of the input field based on distance from the target color
function setInputColorFeedback(colorDistance) {
    const colorInput = document.getElementById('color-input');
    if (!colorInput) {
        console.error('Color input not found.');
        return;
    }

    const colorIntensity = Math.min((colorDistance / 3) * 5, 255); // Scale the distance to color intensity
    const feedbackColor = `rgb(${colorIntensity}, ${255 - colorIntensity}, 0)`; // Yellow to green gradient

    colorInput.style.backgroundColor = feedbackColor;
}

// Update the display of the history of tries
function updateHistoryDisplay() {
    const historyElement = document.createElement('div');
    historyElement.classList.add('history');
    historyElement.innerHTML = `<strong>Tries:</strong> ${historyList.join(', ')}`;
    if (messageElement.nextSibling) {
        messageElement.parentNode.insertBefore(historyElement, messageElement.nextSibling);
    } else {
        messageElement.parentNode.appendChild(historyElement);
    }
}

// Reset the game
function resetGame() {
    tries = 0;
    historyList.length = 0; // Clear the history
    if (messageElement.nextSibling) {
        messageElement.nextSibling.remove(); // Remove history display
    }
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
