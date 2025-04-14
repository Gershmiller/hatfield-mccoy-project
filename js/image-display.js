// Reliable image display solution for the Hatfield-McCoy Feud website
// This script ensures images display properly even when actual image files aren't available

document.addEventListener('DOMContentLoaded', function() {
    // Create a collection of historical-themed colors for placeholder generation
    const historicalColors = [
        { bg: '#E8D9C0', fg: '#6B4423' }, // Sepia
        { bg: '#D9C7B8', fg: '#5D4037' }, // Vintage paper
        { bg: '#C8B6A9', fg: '#4E342E' }, // Aged photograph
        { bg: '#B8A99A', fg: '#3E2723' }, // Old leather
        { bg: '#A7998B', fg: '#33291F' }  // Antique wood
    ];
    
    // Function to generate a consistent color based on image alt text or src
    function getConsistentColor(text) {
        // Create a simple hash from the text
        const hash = text.split('').reduce((acc, char) => {
            return char.charCodeAt(0) + ((acc << 5) - acc);
        }, 0);
        
        // Use the hash to select a color from our palette
        return historicalColors[Math.abs(hash) % historicalColors.length];
    }
    
    // Function to create a canvas-based placeholder image
    function createPlaceholderImage(img) {
        // Get dimensions from the image element or use defaults
        const width = img.width || img.getAttribute('width') || 300;
        const height = img.height || img.getAttribute('height') || 200;
        
        // Get alt text or filename from src as fallback
        const altText = img.alt || (img.src ? img.src.split('/').pop().split('.')[0].replace(/[-_]/g, ' ') : 'Historical Image');
        
        // Create canvas element
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        // Get color scheme based on alt text
        const colorScheme = getConsistentColor(altText);
        
        // Fill background
        ctx.fillStyle = colorScheme.bg;
        ctx.fillRect(0, 0, width, height);
        
        // Add a border
        ctx.strokeStyle = colorScheme.fg;
        ctx.lineWidth = 4;
        ctx.strokeRect(4, 4, width - 8, height - 8);
        
        // Add a decorative corner element (like old photographs)
        ctx.fillStyle = colorScheme.fg;
        const cornerSize = Math.min(width, height) * 0.1;
        
        // Top-left corner
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(cornerSize, 0);
        ctx.lineTo(0, cornerSize);
        ctx.fill();
        
        // Top-right corner
        ctx.beginPath();
        ctx.moveTo(width, 0);
        ctx.lineTo(width - cornerSize, 0);
        ctx.lineTo(width, cornerSize);
        ctx.fill();
        
        // Bottom-left corner
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(cornerSize, height);
        ctx.lineTo(0, height - cornerSize);
        ctx.fill();
        
        // Bottom-right corner
        ctx.beginPath();
        ctx.moveTo(width, height);
        ctx.lineTo(width - cornerSize, height);
        ctx.lineTo(width, height - cornerSize);
        ctx.fill();
        
        // Add text
        ctx.fillStyle = colorScheme.fg;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Adjust font size based on canvas dimensions
        const fontSize = Math.max(12, Math.min(20, Math.floor(width / 15)));
        ctx.font = `${fontSize}px 'Georgia', serif`;
        
        // Wrap text to fit within the canvas
        const words = altText.split(' ');
        const lines = [];
        let currentLine = words[0];
        
        for (let i = 1; i < words.length; i++) {
            const testLine = currentLine + ' ' + words[i];
            const metrics = ctx.measureText(testLine);
            
            if (metrics.width > width - 40) {
                lines.push(currentLine);
                currentLine = words[i];
            } else {
                currentLine = testLine;
            }
        }
        lines.push(currentLine);
        
        // Draw each line of text
        const lineHeight = fontSize * 1.2;
        const totalTextHeight = lines.length * lineHeight;
        let startY = (height / 2) - (totalTextHeight / 2) + (lineHeight / 2);
        
        lines.forEach(line => {
            ctx.fillText(line, width / 2, startY);
            startY += lineHeight;
        });
        
        // Add a vintage camera icon at the bottom
        const iconSize = Math.min(width, height) * 0.15;
        const iconX = width / 2;
        const iconY = height - iconSize - 10;
        
        // Camera body
        ctx.fillStyle = colorScheme.fg;
        ctx.fillRect(iconX - iconSize/2, iconY - iconSize/3, iconSize, iconSize * 0.7);
        
        // Camera lens
        ctx.beginPath();
        ctx.arc(iconX, iconY, iconSize * 0.25, 0, Math.PI * 2);
        ctx.fill();
        
        // Camera viewfinder
        ctx.fillRect(iconX + iconSize * 0.3, iconY - iconSize * 0.5, iconSize * 0.2, iconSize * 0.3);
        
        // Set the image source to the canvas data URL
        img.src = canvas.toDataURL('image/png');
        
        // Add classes for styling
        img.classList.add('placeholder-image');
    }
    
    // Process all images on the page
    function processImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Skip images that already have the placeholder class
            if (img.classList.contains('placeholder-image')) {
                return;
            }
            
            // Check if image is broken or has no src
            const isBroken = !img.complete || img.naturalWidth === 0 || !img.src || img.src === '';
            
            if (isBroken) {
                createPlaceholderImage(img);
            } else {
                // Add error handler for images that may fail to load later
                img.onerror = function() {
                    if (!this.classList.contains('placeholder-image')) {
                        createPlaceholderImage(this);
                    }
                };
            }
        });
    }
    
    // Initial processing
    processImages();
    
    // Process again after a delay to catch any dynamically loaded images
    setTimeout(processImages, 1000);
    
    // Create a MutationObserver to watch for dynamically added images
    const observer = new MutationObserver(mutations => {
        let shouldProcess = false;
        
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    // Check if the added node is an image or contains images
                    if (node.nodeName === 'IMG' || (node.querySelectorAll && node.querySelectorAll('img').length > 0)) {
                        shouldProcess = true;
                    }
                });
            }
        });
        
        if (shouldProcess) {
            processImages();
        }
    });
    
    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Make the createPlaceholderImage function available globally
    window.createPlaceholderImage = createPlaceholderImage;
});
