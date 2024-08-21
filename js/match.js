document.addEventListener('DOMContentLoaded', () => {
    let leftColor = ''; // Variable to store the left square color
    let tries = 0; // Number of tries
    const maxTries = 5; // Maximum number of tries

    // Function to set up the match button
    function setupMatchButton() {
        const matchButton = document.getElementById('match-button');
        const colorInput = document.getElementById('color-input');
        const matchMessage = document.getElementById('match-message');
        const historyContainer = document.createElement('div');
        historyContainer.className = 'history';
        document.querySelector('.container').insertBefore(historyContainer, colorInput.parentElement);

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
            const rightSquareColor = window.getComputedStyle(document.getElementById('right-square')).backgroundColor;
            const rightSquareHex = rgbToHex(rightSquareColor);

            if (userColor.toUpperCase() === leftColor) {
                matchMessage.textContent = `${formattedInputValue} is a match!`;
                historyContainer.innerHTML += `<div style="color: green;">${formattedInputValue} is a match!</div>`;
                return;
            }

            tries++;
            const remainingTries = maxTries - tries;

            if (tries >= maxTries) {
                matchMessage.textContent = `No more tries left. Resetting...`;
                historyContainer.innerHTML += `<div style="color: red;">${formattedInputValue} - No more tries left.</div>`;
                resetGame();
                return;
            }

            matchMessage.textContent = `${formattedInputValue} - ${remainingTries}/${maxTries} tries remaining.`;
            historyContainer.innerHTML += `<div style="color: red;">${formattedInputValue} - ${remainingTries}/${maxTries} tries remaining.</div>`;

            // Color feedback for the input
            colorInput.style.color = getColorFeedback(userColor, rightSquareHex);
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

        function rgbToHex(rgb) {
            const [r, g, b] = rgb.match(/\d+/g).map(Number);
            return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
        }

        function resetGame() {
            tries = 0;
            colorInput.value = '';
            matchMessage.textContent = 'Match the color!';
            historyContainer.innerHTML = '';
            setRandomColor();
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
    }

    setupMatchButton(); // Call the function to set up the button
});
