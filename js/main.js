// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Main script loaded.');
    
    // Initialize all functionalities
    setupColorChange();
});

// Function to handle color change for the right square
function setupColorChange() {
    const colorInput = document.getElementById('color-input');
    const rightSquare = document.getElementById('right-square');

    colorInput.addEventListener('input', () => {
        const hexColor = colorInput.value.trim();
        
        // Validate the HEX code format
        if (/^#[0-9A-Fa-f]{6}$/.test(hexColor)) {
            rightSquare.style.backgroundColor = hexColor;
        } else {
            rightSquare.style.backgroundColor = '#3C3D37'; // Default color if invalid HEX code
        }
    });
}
