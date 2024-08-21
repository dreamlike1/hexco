document.addEventListener('DOMContentLoaded', () => {
    console.log('Main script loaded.');
    
    setupColorChange();
});

function setupColorChange() {
    const colorInput = document.getElementById('color-input');
    const rightSquare = document.getElementById('right-square');

    if (!colorInput || !rightSquare) {
        console.error('Elements not found.');
        return;
    }

    colorInput.addEventListener('input', () => {
        // Get the value from the input and ensure it's trimmed
        let hexColor = colorInput.value.trim();

        // If the value starts with "#", remove it
        if (hexColor.startsWith('#')) {
            hexColor = hexColor.slice(1);
        }

        // Validate the HEX code format (6 hexadecimal digits)
        if (/^[0-9A-Fa-f]{6}$/.test(hexColor)) {
            rightSquare.style.backgroundColor = `#${hexColor}`;
        } else {
            rightSquare.style.backgroundColor = '#3C3D37'; // Default color if invalid HEX code
        }
    });
}
