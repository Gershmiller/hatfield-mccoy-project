/* Search Functionality JavaScript for Hatfield-McCoy Feud Research Website */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Search
    initializeSearch();
    
    // Setup Search Results Page
    setupSearchResults();
});

/**
 * Initialize the search functionality
 */
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    
    if (!searchInput || !searchButton) return;
    
    // Create autocomplete container if it doesn't exist
    let autocompleteContainer = document.querySelector('.search-autocomplete');
    if (!autocompleteContainer) {
        autocompleteContainer = document.createElement('div');
        autocompleteContainer.className = 'search-autocomplete';
        searchInput.parentNode.appendChild(autocompleteContainer);
    }
    
    // Add event listeners
    searchInput.addEventListener('input', debounce(function() {
        const query = searchInput.value.trim();
        
        if (query.length >= 2) {
            performAutocomplete(query, autocompleteContainer);
        } else {
            autocompleteContainer.classList.remove('active');
        }
    }, 300));
    
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = searchInput.value.trim();
            
            if (query.length > 0) {
                performSearch(query);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            navigateAutocomplete('down');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            navigateAutocomplete('up');
        } else if (e.key === 'Escape') {
            autocompleteContainer.classList.remove('active');
        }
    });
    
    searchButton.addEventListener('click', function() {
        const query = searchInput.value.trim();
        
        if (query.length > 0) {
            performSearch(query);
        }
    });
    
    // Close autocomplete when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-input-wrapper')) {
            autocompleteContainer.classList.remove('active');
        }
    });
}

/**
 * Perform autocomplete search
 */
function performAutocomplete(query, container) {
    // In a real implementation, this would fetch data from a JSON file or API
    // For now, we'll use hardcoded data
    
    const autocompleteData = [
        {
            category: 'people',
            title: 'William Anderson "Devil Anse" Hatfield',
            description: 'Patriarch of the Hatfield family',
            url: 'pages/people.html#devil-anse-hatfield'
        },
        {
            category: 'people',
            title: 'Randolph "Ole Ran\'l" McCoy',
            description: 'Patriarch of the McCoy family',
            url: 'pages/people.html#randolph-mccoy'
        },
        {
            category: 'people',
            title: 'Roseanna McCoy',
            description: 'Daughter of Randolph McCoy who fell in love with Johnse Hatfield',
            url: 'pages/people.html#roseanna-mccoy'
        },
        {
            category: 'people',
            title: 'Johnse Hatfield',
            description: 'Son of Devil Anse Hatfield who had a relationship with Roseanna McCoy',
            url: 'pages/people.html#johnse-hatfield'
        },
        {
            category: 'people',
            title: 'Cap Hatfield',
            description: 'Second son of Devil Anse Hatfield and a key figure in the feud',
            url: 'pages/people.html#cap-hatfield'
        },
        {
            category: 'events',
            title: 'The Hog Trial (1878)',
            description: 'Dispute over ownership of a hog between Floyd Hatfield and Randolph McCoy',
            url: 'pages/timeline.html#hog-trial'
        },
        {
            category: 'events',
            title: 'Election Day Fight (1882)',
            description: 'Ellison Hatfield was stabbed by three McCoy brothers',
            url: 'pages/timeline.html#election-day-fight'
        },
        {
            category: 'events',
            title: 'New Year\'s Night Massacre (1888)',
            description: 'Hatfields attacked the McCoy home, killing two children',
            url: 'pages/timeline.html#new-years-massacre'
        },
        {
            category: 'locations',
            title: 'Tug Fork River',
            description: 'The river that formed the border between Kentucky and West Virginia',
            url: 'pages/locations.html#tug-fork-river'
        },
        {
            category: 'locations',
            title: 'Pawpaw Execution Site',
            description: 'Site where the three McCoy brothers were executed by the Hatfields',
            url: 'pages/locations.html#pawpaw-site'
        },
        {
            category: 'documents',
            title: 'Life Magazine Article (1944)',
            description: 'Article featuring Shirley Hatfield and Frankie McCoy working together',
            url: 'pages/primary-sources.html#life-magazine-1944'
        }
    ];
    
    // Filter results based on query
    const filteredResults = autocompleteData.filter(item => {
        return item.title.toLowerCase().includes(query.toLowerCase()) || 
               item.description.toLowerCase().includes(query.toLowerCase());
    }).slice(0, 5); // Limit to 5 results
    
    // Clear previous results
    container.innerHTML = '';
    
    if (filteredResults.length > 0) {
        // Create results
        filteredResults.forEach((result, index) => {
            const resultItem = document.createElement('div');
            resultItem.className = 'autocomplete-item';
            resultItem.dataset.url = result.url;
            resultItem.dataset.index = index;
            
            // Highlight matching text
            const titleWithHighlight = highlightMatch(result.title, query);
            const descriptionWithHighlight = highlightMatch(result.description, query);
            
            resultItem.innerHTML = `
                <div class="autocomplete-category">${result.category}</div>
                <div class="autocomplete-title">${titleWithHighlight}</div>
                <div class="autocomplete-description">${descriptionWithHighlight}</div>
            `;
            
            resultItem.addEventListener('click', function() {
                window.location.href = result.url;
            });
            
            container.appendChild(resultItem);
        });
        
        container.classList.add('active');
    } else {
        container.classList.remove('active');
    }
}

/**
 * Navigate through autocomplete results with keyboard
 */
function navigateAutocomplete(direction) {
    const container = document.querySelector('.search-autocomplete');
    if (!container || !container.classList.contains('active')) return;
    
    const items = container.querySelectorAll('.autocomplete-item');
    if (!items.length) return;
    
    const selectedItem = container.querySelector('.autocomplete-item.selected');
    let nextIndex = 0;
    
    if (selectedItem) {
        const currentIndex = parseInt(selectedItem.dataset.index);
        selectedItem.classList.remove('selected');
        
        if (direction === 'down') {
            nextIndex = (currentIndex + 1) % items.length;
        } else {
            nextIndex = (currentIndex - 1 + items.length) % items.length;
        }
    } else if (direction === 'up') {
        nextIndex = items.length - 1;
    }
    
    items[nextIndex].classList.add('selected');
    
    // Update search input with selected item's title
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        const selectedTitle = items[nextIndex].querySelector('.autocomplete-title').textContent;
        searchInput.value = selectedTitle;
    }
}

/**
 * Perform search and navigate to results page
 */
function performSearch(query) {
    // In a real implementation, this would store the query in localStorage or use a server-side session
    // For now, we'll just redirect to the search results page with the query as a parameter
    window.location.href = `pages/search-results.html?q=${encodeURIComponent(query)}`;
}

/**
 * Setup search results page functionality
 */
function setupSearchResults() {
    // Check if we're on the search results page
    const searchResultsList = document.querySelector('.search-results-list');
    if (!searchResultsList) return;
    
    // Get query from URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    
    if (!query) {
        // No query provided, show error message
        searchResultsList.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <h2 class="no-results-title">No search query provided</h2>
                <p class="no-results-message">Please enter a search term to find information about the Hatfield-McCoy feud.</p>
            </div>
        `;
        return;
    }
    
    // Update search query display
    const searchQueryElement = document.querySelector('.search-query');
    if (searchQueryElement) {
        searchQueryElement.textContent = query;
    }
    
    // Perform search
    const searchResults = performSearchQuery(query);
    
    // Update results count
    const searchResultsCount = document.querySelector('.search-results-count');
    if (searchResultsCount) {
        searchResultsCount.textContent = `${searchResults.length} results found`;
    }
    
    // Display results
    if (searchResults.length > 0) {
        searchResultsList.innerHTML = '';
        
        searchResults.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            
            // Highlight matching text in excerpt
            const excerptWithHighlight = highlightMatch(result.excerpt, query);
            
            resultItem.innerHTML = `
                <div class="search-result-header">
                    <h3 class="search-result-title">${result.title}</h3>
                    <span class="search-result-category ${result.category}">${result.category}</span>
                </div>
                <div class="search-result-meta">
                    ${result.date ? `<span class="search-result-date">${result.date}</span>` : ''}
                    ${result.author ? `<span class="search-result-author">By ${result.author}</span>` : ''}
                </div>
                <div class="search-result-excerpt">${excerptWithHighlight}</div>
                <div class="search-result-tags">
                    ${result.tags.map(tag => `<span class="search-result-tag">${tag}</span>`).join('')}
                </div>
                <div class="search-result-footer">
                    <span class="search-result-relevance">Relevance: ${result.relevance}%</span>
                    <a href="${result.url}" class="search-result-link">View Details</a>
                </div>
            `;
            
            searchResultsList.appendChild(resultItem);
        });
        
        // Setup pagination if needed
        setupPagination(searchResults.length);
    } else {
        // No results found
        searchResultsList.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <h2 class="no-results-title">No results found</h2>
                <p class="no-results-message">We couldn't find any matches for "${query}". Please try another search term or browse the categories below.</p>
                <p class="no-results-suggestions">Try searching for:</p>
                <div class="suggested-searches">
                    <span class="suggested-search">Devil Anse Hatfield</span>
                    <span class="suggested-search">Randolph McCoy</span>
                    <span class="suggested-search">Hog Trial</span>
                    <span class="suggested-search">New Year's Massacre</span>
                    <span class="suggested-search">Tug Fork</span>
                </div>
            </div>
        `;
        
        // Add click events to suggested searches
        const suggestedSearches = document.querySelectorAll('.suggested-search');
        suggestedSearches.forEach(suggestion => {
            suggestion.addEventListener('click', function() {
                performSearch(suggestion.textContent);
            });
        });
    }
    
    // Setup filter functionality
    setupSearchFilters();
}

/**
 * Perform search query against data
 */
function performSearchQuery(query) {
    // In a real implementation, this would fetch data from a JSON file or API
    // For now, we'll use hardcoded data
    
    const searchData = [
        {
            id: 'result-1',
            title: 'William Anderson "Devil Anse" Hatfield',
            category: 'person',
            date: '1839-1921',
            author: null,
            excerpt: 'William Anderson "Devil Anse" Hatfield was the patriarch of the Hatfield family and a central figure in the Hatfield-McCoy feud. Born in 1839 in Logan County, Virginia (now West Virginia), he was a Confederate soldier during the Civil War and later became a successful timber merchant.',
            tags: ['hatfield', 'patriarch', 'civil war', 'timber'],
            url: 'pages/people.html#devil-anse-hatfield',
            relevance: 95
        },
        {
            id: 'result-2',
            title: 'Randolph "Ole Ran\'l" McCoy',
            category: 'person',
            date: '1825-1914',
            author: null,
            excerpt: 'Randolph "Ole Ran\'l" McCoy was the patriarch of the McCoy family and Devil Anse Hatfield\'s counterpart in the feud. Born in 1825 in Pike County, Kentucky, he was a farmer and ferry operator who owned land along the Tug Fork of the Big Sandy River.',
            tags: ['mccoy', 'patriarch', 'farmer', 'kentucky'],
            url: 'pages/people.html#randolph-mccoy',
            relevance: 90
        },
        {
            id: 'result-3',
            title: 'The Hog Trial (1878)',
            category: 'event',
            date: '1878',
            author: null,
            excerpt: 'The dispute over ownership of a hog between Floyd Hatfield and Randolph McCoy is often cited as one of the first events that escalated tensions between the Hatfield and McCoy families. The trial was presided over by local justice of the peace Anderson "Preacher Anse" Hatfield.',
            tags: ['legal dispute', 'property', 'early feud'],
            url: 'pages/timeline.html#hog-trial',
            relevance: 85
        },
        {
            id: 'result-4',
            title: 'New Year\'s Night Massacre (1888)',
            category: 'event',
            date: 'January 1, 1888',
            author: null,
            excerpt: 'The New Year\'s Night Massacre was one of the most violent episodes of the Hatfield-McCoy feud. On January 1, 1888, a group of Hatfields surrounded the McCoy cabin and opened fire. They killed Alifair and Calvin McCoy, and severely beat their mother Sarah.',
            tags: ['violence', 'massacre', 'murder', 'hatfield attack'],
            url: 'pages/timeline.html#new-years-massacre',
            relevance: 80
        },
        {
            id: 'result-5',
            title: 'Tug Fork River',
            category: 'location',
            date: null,
            author: null,
            excerpt: 'The Tug Fork of the Big Sandy River formed the border between Kentucky and West Virginia, and separated the territories of the Hatfield and McCoy families. Many key events in the feud took place along or near this river, which served as both a physical and jurisdictional boundary.',
            tags: ['geography', 'border', 'river', 'territory'],
            url: 'pages/locations.html#tug-fork-river',
            relevance: 75
        },
        {
            id: 'result-6',
            title: 'Life Magazine Article (1944)',
            category: 'document',
            date: 'May 1944',
            author: 'Life Magazine',
            excerpt: 'In May 1944, Life magazine published an article featuring Shirley Hatfield and Frankie McCoy working together in a WWII uniform factory. The article, titled "Hatfields and McCoys now fight together in the Army, work together in mines and factories in their oldtime feuding territory," showed how the families had reconciled during World War II.',
            tags: ['media', 'world war ii', 'reconciliation', 'primary source'],
            url: 'pages/primary-sources.html#life-magazine-1944',
            relevance: 70
        }
    ];
    
    // Filter results based on query
    return searchData.filter(item => {
        const searchableText = `${item.title} ${item.excerpt} ${item.tags.join(' ')}`.toLowerCase();
        return searchableText.includes(query.toLowerCase());
    });
}

/**
 * Setup search filters functionality
 */
function setupSearchFilters() {
    const filterOptions = document.querySelectorAll('.search-filter-option');
    
    if (!filterOptions.length) return;
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Toggle active state
            option.classList.toggle('active');
            
            // Apply filters
            applySearchFilters();
        });
    });
}

/**
 * Apply filters to search results
 */
function applySearchFilters() {
    const activeFilters = {
        categories: [],
        dates: [],
        tags: []
    };
    
    // Collect active category filters
    document.querySelectorAll('.search-filter-option.category.active').forEach(filter => {
        activeFilters.categories.push(filter.dataset.category);
    });
    
    // Collect active date filters
    document.querySelectorAll('.search-filter-option.date.active').forEach(filter => {
        activeFilters.dates.push(filter.dataset.date);
    });
    
    // Collect active tag filters
    document.querySelectorAll('.search-filter-option.tag.active').forEach(filter => {
        activeFilters.tags.push(filter.dataset.tag);
    });
    
    // Apply filters to all results
    const results = document.querySelectorAll('.search-result-item');
    
    results.forEach(result => {
        let visible = true;
        
        // Filter by category
        if (activeFilters.categories.length > 0) {
            const category = result.querySelector('.search-result-category').textContent;
            if (!activeFilters.categories.includes(category)) {
                visible = false;
            }
        }
        
        // Filter by date (simplified for demo)
        if (visible && activeFilters.dates.length > 0) {
            const dateElement = result.querySelector('.search-result-date');
            if (dateElement) {
                const date = dateElement.textContent;
                let matchesDate = false;
                
                activeFilters.dates.forEach(dateFilter => {
                    if (dateFilter === 'pre-1880' && date.includes('187')) {
                        matchesDate = true;
                    } else if (dateFilter === '1880-1890' && (date.includes('188') || date.includes('189'))) {
                        matchesDate = true;
                    } else if (dateFilter === 'post-1900' && (date.includes('19') || date.includes('20'))) {
                        matchesDate = true;
                    }
                });
                
                if (!matchesDate) {
                    visible = false;
                }
            } else {
                visible = false; // No date available
            }
        }
        
        // Filter by tags
        if (visible && activeFilters.tags.length > 0) {
            const tagElements = result.querySelectorAll('.search-result-tag');
            const tags = Array.from(tagElements).map(tag => tag.textContent);
            
            const hasMatchingTag = activeFilters.tags.some(tag => tags.includes(tag));
            
            if (!hasMatchingTag) {
                visible = false;
            }
        }
        
        // Apply visibility
        result.style.display = visible ? 'block' : 'none';
    });
    
    // Update results count
    updateFilteredResultsCount();
}

/**
 * Update the filtered results count
 */
function updateFilteredResultsCount() {
    const visibleResults = document.querySelectorAll('.search-result-item[style="display: block"]').length;
    const searchResultsCount = document.querySelector('.search-results-count');
    
    if (searchResultsCount) {
        searchResultsCount.textContent = `${visibleResults} results found`;
    }
}

/**
 * Setup pagination for search results
 */
function setupPagination(totalResults) {
    const resultsPerPage = 10;
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    
    if (totalPages <= 1) return;
    
    const paginationContainer = document.querySelector('.search-pagination');
    if (!paginationContainer) return;
    
    paginationContainer.innerHTML = '';
    
    // Previous button
    const prevButton = document.createElement('button');
    prevButton.className = 'pagination-button disabled';
    prevButton.innerHTML = '&larr;';
    prevButton.setAttribute('aria-label', 'Previous page');
    paginationContainer.appendChild(prevButton);
    
    // Page buttons
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.className = i === 1 ? 'pagination-button active' : 'pagination-button';
        pageButton.textContent = i;
        pageButton.setAttribute('aria-label', `Page ${i}`);
        
        pageButton.addEventListener('click', function() {
            // In a real implementation, this would load the next page of results
            // For now, we'll just update the active state
            document.querySelectorAll('.pagination-button').forEach(btn => {
                btn.classList.remove('active');
            });
            pageButton.classList.add('active');
            
            // Enable/disable prev/next buttons
            prevButton.classList.toggle('disabled', i === 1);
            nextButton.classList.toggle('disabled', i === totalPages);
        });
        
        paginationContainer.appendChild(pageButton);
    }
    
    // Next button
    const nextButton = document.createElement('button');
    nextButton.className = 'pagination-button';
    nextButton.innerHTML = '&rarr;';
    nextButton.setAttribute('aria-label', 'Next page');
    paginationContainer.appendChild(nextButton);
}

/**
 * Highlight matching text in a string
 */
function highlightMatch(text, query) {
    if (!query) return text;
    
    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

/**
 * Escape special characters in a string for use in a regular expression
 */
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Debounce function to limit how often a function is called
 */
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}
