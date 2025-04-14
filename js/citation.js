/* Citation Generator JavaScript for Hatfield-McCoy Feud Research Website */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Citation Generator
    initializeCitationGenerator();
});

/**
 * Initialize the citation generator functionality
 */
function initializeCitationGenerator() {
    const citationForm = document.getElementById('citation-form');
    
    if (!citationForm) return;
    
    // Add event listener for form submission
    citationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        generateCitation();
    });
    
    // Add event listeners for citation style selection
    const styleRadios = document.querySelectorAll('input[name="citation-style"]');
    styleRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Update form fields based on selected style
            updateFormFields(radio.value);
        });
    });
    
    // Add event listener for source type selection
    const sourceTypeSelect = document.getElementById('source-type');
    if (sourceTypeSelect) {
        sourceTypeSelect.addEventListener('change', function() {
            // Show/hide relevant fields based on source type
            updateFieldsForSourceType(sourceTypeSelect.value);
        });
        
        // Initialize fields based on default source type
        updateFieldsForSourceType(sourceTypeSelect.value);
    }
    
    // Add event listeners for copy and download buttons
    setupCitationActions();
}

/**
 * Update form fields based on selected citation style
 */
function updateFormFields(style) {
    // In a real implementation, this would adjust field labels and requirements
    // based on the selected citation style (Chicago, MLA, APA)
    
    const fieldLabels = {
        'chicago': {
            'author': 'Author',
            'title': 'Title',
            'publisher': 'Publisher',
            'date': 'Publication Date',
            'url': 'URL'
        },
        'mla': {
            'author': 'Author',
            'title': 'Title',
            'publisher': 'Publisher',
            'date': 'Publication Date',
            'url': 'Location'
        },
        'apa': {
            'author': 'Author',
            'title': 'Title',
            'publisher': 'Publisher/Journal',
            'date': 'Publication Year',
            'url': 'DOI/URL'
        }
    };
    
    // Update field labels
    Object.keys(fieldLabels[style]).forEach(field => {
        const label = document.querySelector(`label[for="source-${field}"]`);
        if (label) {
            label.textContent = fieldLabels[style][field];
        }
    });
}

/**
 * Show/hide relevant fields based on source type
 */
function updateFieldsForSourceType(sourceType) {
    // Get all form groups
    const formGroups = document.querySelectorAll('.form-group');
    
    // Show/hide fields based on source type
    formGroups.forEach(group => {
        const input = group.querySelector('input, select');
        if (!input) return;
        
        const fieldName = input.id.replace('source-', '');
        
        // Default visibility
        let visible = true;
        
        // Adjust visibility based on source type
        switch (sourceType) {
            case 'book':
                visible = ['type', 'title', 'author', 'date', 'publisher'].includes(fieldName);
                break;
            case 'article':
                visible = ['type', 'title', 'author', 'date', 'publisher', 'url'].includes(fieldName);
                break;
            case 'website':
                visible = ['type', 'title', 'author', 'date', 'publisher', 'url'].includes(fieldName);
                break;
            case 'newspaper':
                visible = ['type', 'title', 'date', 'publisher', 'url'].includes(fieldName);
                break;
            case 'document':
                visible = ['type', 'title', 'date', 'publisher', 'url'].includes(fieldName);
                break;
            case 'image':
                visible = ['type', 'title', 'author', 'date', 'publisher', 'url'].includes(fieldName);
                break;
        }
        
        // Apply visibility
        group.style.display = visible ? 'block' : 'none';
    });
}

/**
 * Generate citation based on form input
 */
function generateCitation() {
    // Get form values
    const style = document.querySelector('input[name="citation-style"]:checked').value;
    const sourceType = document.getElementById('source-type').value;
    const title = document.getElementById('source-title').value;
    const author = document.getElementById('source-author')?.value || '';
    const date = document.getElementById('source-date').value;
    const publisher = document.getElementById('source-publisher').value;
    const url = document.getElementById('source-url')?.value || '';
    
    // Generate citation based on style and source type
    let citation = '';
    
    switch (style) {
        case 'chicago':
            citation = generateChicagoCitation(sourceType, title, author, date, publisher, url);
            break;
        case 'mla':
            citation = generateMLACitation(sourceType, title, author, date, publisher, url);
            break;
        case 'apa':
            citation = generateAPACitation(sourceType, title, author, date, publisher, url);
            break;
    }
    
    // Display citation
    const citationResult = document.getElementById('citation-result');
    if (citationResult) {
        citationResult.innerHTML = citation;
        
        // Show result container
        const resultContainer = document.querySelector('.citation-result-container');
        if (resultContainer) {
            resultContainer.classList.add('active');
        }
    }
}

/**
 * Generate Chicago style citation
 */
function generateChicagoCitation(sourceType, title, author, date, publisher, url) {
    let citation = '';
    
    switch (sourceType) {
        case 'book':
            citation = `${author}. <i>${title}</i>. ${publisher}, ${date}.`;
            break;
        case 'article':
            citation = `${author}. "${title}." <i>${publisher}</i>, ${date}.`;
            if (url) citation += ` ${url}.`;
            break;
        case 'website':
            citation = `${author}. "${title}." ${publisher}, ${date}.`;
            if (url) citation += ` ${url}.`;
            break;
        case 'newspaper':
            citation = `"${title}." <i>${publisher}</i>, ${date}.`;
            if (url) citation += ` ${url}.`;
            break;
        case 'document':
            citation = `${title}. ${date}. ${publisher}.`;
            if (url) citation += ` ${url}.`;
            break;
        case 'image':
            citation = `${author}. <i>${title}</i>. ${date}. ${publisher}.`;
            if (url) citation += ` ${url}.`;
            break;
    }
    
    return citation;
}

/**
 * Generate MLA style citation
 */
function generateMLACitation(sourceType, title, author, date, publisher, url) {
    let citation = '';
    
    switch (sourceType) {
        case 'book':
            citation = `${author}. <i>${title}</i>. ${publisher}, ${date}.`;
            break;
        case 'article':
            citation = `${author}. "${title}." <i>${publisher}</i>, ${date}.`;
            if (url) citation += ` ${url}.`;
            break;
        case 'website':
            citation = `${author}. "${title}." <i>${publisher}</i>, ${date}.`;
            if (url) citation += ` ${url}.`;
            break;
        case 'newspaper':
            citation = `"${title}." <i>${publisher}</i>, ${date}.`;
            if (url) citation += ` ${url}.`;
            break;
        case 'document':
            citation = `<i>${title}</i>. ${publisher}, ${date}.`;
            if (url) citation += ` ${url}.`;
            break;
        case 'image':
            citation = `${author}. <i>${title}</i>. ${date}. ${publisher}.`;
            if (url) citation += ` ${url}.`;
            break;
    }
    
    return citation;
}

/**
 * Generate APA style citation
 */
function generateAPACitation(sourceType, title, author, date, publisher, url) {
    let citation = '';
    
    switch (sourceType) {
        case 'book':
            citation = `${author}. (${date}). <i>${title}</i>. ${publisher}.`;
            break;
        case 'article':
            citation = `${author}. (${date}). ${title}. <i>${publisher}</i>.`;
            if (url) citation += ` ${url}`;
            break;
        case 'website':
            citation = `${author}. (${date}). ${title}. <i>${publisher}</i>.`;
            if (url) citation += ` ${url}`;
            break;
        case 'newspaper':
            citation = `(${date}). ${title}. <i>${publisher}</i>.`;
            if (url) citation += ` ${url}`;
            break;
        case 'document':
            citation = `(${date}). <i>${title}</i>. ${publisher}.`;
            if (url) citation += ` ${url}`;
            break;
        case 'image':
            citation = `${author}. (${date}). <i>${title}</i> [Image]. ${publisher}.`;
            if (url) citation += ` ${url}`;
            break;
    }
    
    return citation;
}

/**
 * Setup citation copy and download actions
 */
function setupCitationActions() {
    const copyButton = document.getElementById('copy-citation');
    const downloadButton = document.getElementById('download-citation');
    
    if (copyButton) {
        copyButton.addEventListener('click', function() {
            const citationResult = document.getElementById('citation-result');
            if (!citationResult) return;
            
            // Create a temporary textarea to copy the text
            const textarea = document.createElement('textarea');
            textarea.value = citationResult.textContent;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            
            // Show copied confirmation
            const originalText = copyButton.textContent;
            copyButton.textContent = 'Copied!';
            setTimeout(() => {
                copyButton.textContent = originalText;
            }, 2000);
        });
    }
    
    if (downloadButton) {
        downloadButton.addEventListener('click', function() {
            const citationResult = document.getElementById('citation-result');
            if (!citationResult) return;
            
            // Create a blob with the citation text
            const blob = new Blob([citationResult.textContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            
            // Create a download link and click it
            const a = document.createElement('a');
            a.href = url;
            a.download = 'hatfield-mccoy-citation.txt';
            document.body.appendChild(a);
            a.click();
            
            // Clean up
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }
}
