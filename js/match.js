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
        
        let userColor = colorInput.value.trim();
        if (userColor.startsWith('#')) {
            userColor = userColor.slice(1);
        }
        
        if (!/^[0-9A-Fa-f]{6}$/.test(userColor)) {
            alert('Please enter a valid HEX color code.');
            return;
        }

        userColor = userColor.toUpperCase();
        // Update history
        historyList.push(userColor);
        updateHistoryDisplay();

        // Check if the user's color matches the left square's color
        if (userColor === leftColor.toUpperCase()) {
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
    const inputColorArray = inputColor.match(/.{1,2}/g);
    const targetColorArray = targetColor.match(/.{1,2}/g);

    let colorDistance = 0;
    let colorFeedback = '';

    inputColorArray.forEach((value, index) => {
        const inputValue = parseInt(value, 16);
        const targetValue = parseInt(targetColorArray[index], 16);
        const diff = Math.abs(inputValue - targetValue);
        colorDistance += diff;
        const color = diff === 0 ? 'green' : (diff < 32 ? 'yellow' : 'orange');
        colorFeedback += `<span style="color: ${color};">${value}</span>`;
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

    // Color feedback is not in RGB but a simple HEX feedback is set.
    const feedbackColor = colorDistance < 32 ? '#00FF00' : (colorDistance < 64 ? '#FFFF00' : '#FF9900');
    colorInput.style.backgroundColor = feedbackColor;
}

// Update the display of the history of tries
function updateHistoryDisplay() {
    const historyElement = document.createElement('div');
    historyElement.classList.add('history');
    historyElement.innerHTML = `<strong>Tries:</strong> ${historyList.map(color => `#${color}`).join(', ')}`;
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
