// This script generates placeholder images for the website
// It creates colored rectangles with text labels to simulate actual images
// In a production environment, these would be replaced with real photographs

document.addEventListener('DOMContentLoaded', function() {
    // Function to create canvas-based placeholder images
    function createPlaceholderImage(element) {
        // Get the image element
        const img = element;
        
        // If the image has already loaded successfully, don't replace it
        if (img.complete && img.naturalHeight !== 0) {
            return;
        }
        
        // Get the alt text to display in the placeholder
        const altText = img.alt || 'Image';
        
        // Create a canvas element
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set dimensions based on the parent container or default sizes
        const width = img.width || 300;
        const height = img.height || 200;
        
        canvas.width = width;
        canvas.height = height;
        
        // Generate a consistent color based on the alt text
        const hash = altText.split('').reduce((acc, char) => {
            return char.charCodeAt(0) + ((acc << 5) - acc);
        }, 0);
        
        const hue = Math.abs(hash % 360);
        
        // Fill with a sepia-toned background to match historical theme
        ctx.fillStyle = `hsl(${hue}, 30%, 70%)`;
        ctx.fillRect(0, 0, width, height);
        
        // Add a border
        ctx.strokeStyle = `hsl(${hue}, 30%, 50%)`;
        ctx.lineWidth = 4;
        ctx.strokeRect(2, 2, width - 4, height - 4);
        
        // Add text
        ctx.fillStyle = '#333';
        ctx.font = '16px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Wrap text if needed
        const words = altText.split(' ');
        const lines = [];
        let currentLine = words[0];
        
        for (let i = 1; i < words.length; i++) {
            const testLine = currentLine + ' ' + words[i];
            const metrics = ctx.measureText(testLine);
            
            if (metrics.width > width - 20) {
                lines.push(currentLine);
                currentLine = words[i];
            } else {
                currentLine = testLine;
            }
        }
        lines.push(currentLine);
        
        // Draw each line of text
        const lineHeight = 20;
        const startY = (height / 2) - ((lines.length - 1) * lineHeight / 2);
        
        lines.forEach((line, index) => {
            ctx.fillText(line, width / 2, startY + (index * lineHeight));
        });
        
        // Add a camera icon to indicate it's an image
        ctx.beginPath();
        const iconSize = Math.min(width, height) * 0.15;
        const iconX = width / 2;
        const iconY = height - iconSize;
        
        // Camera body
        ctx.fillStyle = '#333';
        ctx.fillRect(iconX - iconSize/2, iconY - iconSize/2, iconSize, iconSize * 0.7);
        
        // Camera lens
        ctx.beginPath();
        ctx.arc(iconX, iconY - iconSize * 0.15, iconSize * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = '#555';
        ctx.fill();
        
        // Camera flash
        ctx.fillStyle = '#333';
        ctx.fillRect(iconX + iconSize * 0.3, iconY - iconSize * 0.6, iconSize * 0.2, iconSize * 0.2);
        
        // Replace the image src with the canvas data URL
        img.src = canvas.toDataURL('image/png');
    }
    
    // Apply to all images on the page
    document.querySelectorAll('img').forEach(img => {
        // Try to load the image normally first
        img.onerror = function() {
            createPlaceholderImage(this);
        };
        
        // If the image is already in error state or has no src
        if (!img.complete || img.naturalHeight === 0 || !img.src || img.src === '') {
            createPlaceholderImage(img);
        }
    });
});
