let leftColor = '';
let tries = 0;

function setupMatchButton() {
    const matchButton = document.getElementById('match-button');
    const colorInput = document.getElementById('color-input');
    const matchMessage = document.getElementById('match-message');
    const historyContainer = document.querySelector('.history');

    if (!matchButton || !colorInput || !matchMessage || !historyContainer) {
        console.error('Elements not found.');
        return;
    }

    matchButton.addEventListener('click', () => {
        const inputValue = colorInput.value.trim();
        const formattedInputValue = inputValue.startsWith('#') ? inputValue.slice(1) : inputValue;

        if (!/^[0-9A-Fa-f]{6}$/.test(formattedInputValue)) {
            matchMessage.textContent = 'Please enter a valid HEX code!';
            return;
        }

        const userColor = `#${formattedInputValue}`;
        const rightSquare = document.getElementById('right-square').style.backgroundColor;

        if (userColor.toUpperCase() === leftColor) {
            matchMessage.textContent = `${formattedInputValue} is a match!`;
            historyContainer.innerHTML += `<div style="color: green;">${formattedInputValue} is a match!</div>`;
            return;
        }

        tries++;
        const remainingTries = 5 - tries;

        if (tries >= 5) {
            matchMessage.textContent = `No more tries left. Resetting...`;
            historyContainer.innerHTML += `<div style="color: red;">${formattedInputValue} - No more tries left.</div>`;
            resetGame();
            return;
        }

        matchMessage.textContent = `${formattedInputValue} - ${remainingTries}/5 tries remaining.`;
        historyContainer.innerHTML += `<div style="color: red;">${formattedInputValue} - ${remainingTries}/5 tries remaining.</div>`;

        // Color feedback for the input
        colorInput.style.color = getColorFeedback(userColor, rightSquare);

        // Update history
        historyContainer.innerHTML += `<div>${formattedInputValue} - ${getColorFeedback(userColor, rightSquare)}</div>`;
    });

    function getColorFeedback(userColor, targetColor) {
        const user = hexToRgb(userColor);
        const target = hexToRgb(targetColor);
        const diff = Math.abs(user.r - target.r) + Math.abs(user.g - target.g) + Math.abs(user.b - target.b);

        if (diff < 50) {
            return 'green'; // Close match
        } else if (diff < 100) {
            return 'orange'; // Near match
        } else if (diff < 150) {
            return 'yellow'; // Way off
        } else {
            return 'red'; // Very different
        }
    }

    function hexToRgb(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
    }

    function resetGame() {
        tries = 0;
        colorInput.value = '';
        matchMessage.textContent = 'Match the color!';
        historyContainer.innerHTML = '';
        setRandomColor();
    }
}

function setRandomColor() {
    const leftSquare = document.getElementById('left-square');
    if (!leftSquare) return;

    leftColor = getRandomColor();
    leftSquare.style.backgroundColor = leftColor;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
