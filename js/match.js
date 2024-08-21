document.addEventListener('DOMContentLoaded', () => {
    const matchButton = document.getElementById('match-button');
    const colorInput = document.getElementById('color-input');
    const leftSquare = document.getElementById('left-square');
    const matchMessage = document.getElementById('match-message');
    let tries = 0;
    const maxTries = 5;

    // Function to convert RGB to HEX
    const rgbToHex = (rgb) => {
        const [r, g, b] = rgb.match(/\d+/g).map(Number);
        return "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
    };

    // Function to initialize the left square color
    function setRandomColor() {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, '0')}`;
        leftSquare.style.backgroundColor = randomColor;
        leftSquare.dataset.color = randomColor.slice(1); // Store the color value without #
    }

    // Initialize the left square color
    setRandomColor();

    // Function to provide feedback on the input
    function provideFeedback(inputColor, targetColor) {
        const feedback = [];

        for (let i = 0; i < 6; i++) {
            const inputChar = inputColor[i] || '0';
            const targetChar = targetColor[i] || '0';

            if (inputChar === targetChar) {
                feedback.push(`<span style="color: green;">${inputChar}</span>`);
            } else if (targetColor.includes(inputChar)) {
                feedback.push(`<span style="color: orange;">${inputChar}</span>`);
            } else {
                feedback.push(`<span style="color: red;">${inputChar}</span>`);
            }
        }

        return feedback.join('');
    }

    matchButton.addEventListener('click', () => {
        if (tries >= maxTries) {
            matchMessage.textContent = "You've reached the maximum number of tries. Resetting...";
            tries = 0;
            setRandomColor();
            colorInput.value = '';
            matchMessage.innerHTML = '';
            return;
        }

        // Get the HEX color from the left square
        const leftColorHex = leftSquare.dataset.color.toUpperCase();
        // Get the value from the input
        let inputHexColor = colorInput.value.trim().toUpperCase();

        // Validate input
        if (/^[0-9A-Fa-f]{6}$/.test(inputHexColor)) {
            if (inputHexColor === leftColorHex) {
                matchMessage.textContent = `${inputHexColor} is a match!`;
                matchMessage.style.color = '#ECDFCC'; // Success color
                tries = 0; // Reset tries on successful match
                setRandomColor(); // Set a new color
                colorInput.value = '';
            } else {
                tries++;
                matchMessage.innerHTML = `${inputHexColor} - ${tries}/${maxTries} tries left<br>${provideFeedback(inputHexColor, leftColorHex)}`;
            }
        } else {
            matchMessage.textContent = 'Invalid HEX code. Please enter a valid 6-digit HEX color code.';
        }
    });
});
