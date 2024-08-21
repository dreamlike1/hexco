document.addEventListener('DOMContentLoaded', () => {
    console.log('Main script loaded.');

    // Load the randomColor.js script
    loadScript('js/randomColor.js')
        .then(() => {
            // Load the match.js script after randomColor.js
            return loadScript('js/match.js');
        })
        .then(() => {
            // Now both scripts are loaded, initialize game
            if (typeof setRandomColor === 'function') {
                setRandomColor(); // Set a random color for the left square
            } else {
                console.error('setRandomColor function is not available.');
            }
            if (typeof setupMatchButton === 'function') {
                setupMatchButton(); // Set up the match button
            } else {
                console.error('setupMatchButton function is not available.');
            }
            setupColorChange(); // Set up the color input change handler
        })
        .catch(error => {
            console.error('Error loading scripts:', error);
        });
});

function setupColorChange() {
    const colorInput = document.getElementById('color-input');
    const rightSquare = document.getElementById('right-square');

    if (!colorInput || !rightSquare) {
        console.error('Elements not found.');
        return;
    }

    colorInput.addEventListener('input', () => {
        let hexColor = colorInput.value.trim();

        if (hexColor.startsWith('#')) {
            hexColor = hexColor.slice(1);
        }

        if (/^[0-9A-Fa-f]{6}$/.test(hexColor)) {
            rightSquare.style.backgroundColor = `#${hexColor}`;
        } else {
            rightSquare.style.backgroundColor = '#3C3D37';
        }
    });
}

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
    });
}
