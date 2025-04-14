// Main JavaScript for Hatfield-McCoy Feud Research Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Dropdown functionality for filter selects
    const filterSelects = document.querySelectorAll('.filter-select');
    
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            const filterType = this.id.split('-')[1];
            const filterValue = this.value;
            
            // Apply filtering based on the selected value
            applyFilters();
        });
    });
    
    // Search functionality
    const searchInputs = document.querySelectorAll('.search-input');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Apply search filtering
            applyFilters();
        });
    });
    
    // Timeline period toggle
    const periodBtns = document.querySelectorAll('.period-btn');
    const timelinePeriods = document.querySelectorAll('.timeline-period');
    
    if (periodBtns.length > 0 && timelinePeriods.length > 0) {
        periodBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const period = this.getAttribute('data-period');
                
                // Remove active class from all buttons
                periodBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show/hide timeline periods based on selection
                if (period === 'both') {
                    timelinePeriods.forEach(p => p.classList.add('active'));
                } else {
                    timelinePeriods.forEach(p => {
                        if (p.id === period + '-timeline') {
                            p.classList.add('active');
                        } else {
                            p.classList.remove('active');
                        }
                    });
                }
            });
        });
    }
    
    // Timeline event details
    const detailsBtns = document.querySelectorAll('.btn-details');
    const eventModal = document.getElementById('event-details-modal');
    
    if (detailsBtns.length > 0 && eventModal) {
        detailsBtns.forEach((btn, index) => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the parent timeline event
                const timelineEvent = this.closest('.timeline-event');
                
                if (timelineEvent) {
                    // Get event details
                    const title = timelineEvent.querySelector('h3').textContent;
                    const date = timelineEvent.querySelector('.timeline-date').textContent;
                    const description = timelineEvent.querySelector('p').textContent;
                    const family = timelineEvent.getAttribute('data-family');
                    const type = timelineEvent.getAttribute('data-type');
                    
                    // Populate modal with event details
                    document.getElementById('modal-title').textContent = title;
                    document.getElementById('modal-date').textContent = date;
                    document.getElementById('modal-description').innerHTML = `<p>${description}</p>`;
                    document.getElementById('modal-family').textContent = formatDataAttribute(family);
                    document.getElementById('modal-type').textContent = formatDataAttribute(type);
                    
                    // Set location based on event type
                    let location = '';
                    if (type === 'conflict') {
                        location = 'Tug Fork Valley';
                    } else if (type === 'legal') {
                        location = 'Pikeville, Kentucky';
                    } else if (type === 'personal') {
                        location = 'Logan County, West Virginia';
                    } else if (type === 'cultural') {
                        location = 'Various Locations';
                    }
                    document.getElementById('modal-location').textContent = location;
                    
                    // Set sources based on event period
                    const period = timelineEvent.closest('.timeline-period').id;
                    let sources = '';
                    if (period === 'original-feud-timeline') {
                        sources = `
                            <li>Waller, Altina L. "Feud: Hatfields, McCoys, and Social Change in Appalachia, 1860-1900." University of North Carolina Press, 1988.</li>
                            <li>Rice, Otis K. "The Hatfields and the McCoys." University Press of Kentucky, 1982.</li>
                            <li>Jones, Virgil Carrington. "The Hatfields and the McCoys." University of North Carolina Press, 1948.</li>
                        `;
                    } else {
                        sources = `
                            <li>"Hatfields and McCoys now fight together in the Army, work together in mines and factories in their oldtime feuding territory." Life Magazine, May 1944.</li>
                            <li>Pearce, John Ed. "Days of Darkness: The Feuds of Eastern Kentucky." University Press of Kentucky, 1994.</li>
                            <li>Hatfield-McCoy Historical Society Archives, 1940-1955.</li>
                        `;
                    }
                    document.getElementById('modal-sources').innerHTML = sources;
                    
                    // Show modal
                    eventModal.style.display = 'block';
                    
                    // Set current event index for navigation
                    eventModal.setAttribute('data-current-index', index);
                }
            });
        });
        
        // Close modal
        const closeModal = document.querySelector('.close-modal');
        const closeModalBtn = document.getElementById('close-modal');
        
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                eventModal.style.display = 'none';
            });
        }
        
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', function() {
                eventModal.style.display = 'none';
            });
        }
        
        // Modal navigation
        const prevEventBtn = document.getElementById('prev-event');
        const nextEventBtn = document.getElementById('next-event');
        
        if (prevEventBtn && nextEventBtn) {
            prevEventBtn.addEventListener('click', function() {
                navigateEvents('prev');
            });
            
            nextEventBtn.addEventListener('click', function() {
                navigateEvents('next');
            });
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === eventModal) {
                eventModal.style.display = 'none';
            }
        });
    }
    
    // Family tree tabs
    const treeTabs = document.querySelectorAll('.tree-tab');
    const familyTrees = document.querySelectorAll('.family-tree');
    
    if (treeTabs.length > 0 && familyTrees.length > 0) {
        treeTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tree = this.getAttribute('data-tree');
                
                // Remove active class from all tabs
                treeTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show/hide family trees based on selection
                familyTrees.forEach(t => {
                    if (t.id === tree + '-tree') {
                        t.classList.add('active');
                    } else {
                        t.classList.remove('active');
                    }
                });
            });
        });
    }
    
    // Map markers
    const mapMarkers = document.querySelectorAll('.map-marker');
    const locationTitle = document.getElementById('location-title');
    const locationContent = document.getElementById('location-content');
    
    if (mapMarkers.length > 0 && locationTitle && locationContent) {
        mapMarkers.forEach(marker => {
            marker.addEventListener('click', function() {
                const location = this.getAttribute('data-location');
                
                // Set location information based on marker
                let title = '';
                let content = '';
                
                switch (location) {
                    case 'hatfield-cabin':
                        title = 'Devil Anse Hatfield Cabin';
                        content = `
                            <p>The home of William Anderson "Devil Anse" Hatfield and his family, located on Mate Creek in present-day Mingo County (formerly Logan County), West Virginia.</p>
                            <p>This was the center of Hatfield territory during the feud and the site of many important family gatherings and strategic meetings.</p>
                            <p><strong>Historical Significance:</strong> The cabin served as the Hatfield family headquarters throughout the feud. While the original structure no longer stands, the site is marked and remains an important historical location.</p>
                        `;
                        break;
                    case 'mccoy-cabin':
                        title = 'Randolph McCoy Cabin';
                        content = `
                            <p>The home of Randolph McCoy and his family, located on Blackberry Fork of Pond Creek in Pike County, Kentucky.</p>
                            <p>This was the site of the infamous New Year's Night Massacre of 1888, when the Hatfields attacked the McCoy home, killing Alifair and Calvin McCoy and severely beating Sarah McCoy.</p>
                            <p><strong>Historical Significance:</strong> The attack on the McCoy cabin represented one of the most violent episodes of the feud and led to increased legal efforts to capture and prosecute the Hatfields.</p>
                        `;
                        break;
                    case 'pawpaw-incident':
                        title = 'Pawpaw Trees Execution Site';
                        content = `
                            <p>The location where the three McCoy brothers (Tolbert, Pharmer, and Bud) were tied to pawpaw trees and executed by the Hatfields on August 9, 1882.</p>
                            <p>This execution occurred after the McCoy brothers had fatally wounded Ellison Hatfield during an Election Day dispute.</p>
                            <p><strong>Historical Significance:</strong> This event marked a significant escalation in the violence of the feud and set in motion a series of retaliations that would continue for years.</p>
                        `;
                        break;
                    case 'pikeville-courthouse':
                        title = 'Pikeville Courthouse';
                        content = `
                            <p>The site of the trials of several Hatfield family members and supporters in 1889-1890, including the trial of Ellison Mounts who was sentenced to death.</p>
                            <p>The courthouse was the center of legal proceedings that brought the most violent phase of the feud to a close.</p>
                            <p><strong>Historical Significance:</strong> The trials at the Pikeville Courthouse represented the legal system's eventual assertion of authority over the feud, marking the transition from frontier justice to state control.</p>
                        `;
                        break;
                    case 'blackberry-creek':
                        title = 'Blackberry Creek';
                        content = `
                            <p>Site of several Hatfield family homes and the location where Jim Vance was killed by "Bad" Frank Phillips in January 1888.</p>
                            <p>This area was deep in Hatfield territory and was the scene of several important events during the feud.</p>
                            <p><strong>Historical Significance:</strong> The killing of Jim Vance, Devil Anse Hatfield's uncle and a key enforcer for the family, was a significant blow to the Hatfield side and part of the escalating violence following the New Year's Night Massacre.</p>
                        `;
                        break;
                    default:
                        title = 'Select a location on the map';
                        content = '<p>Click on any marker to view detailed information about that location and its significance in the Hatfield-McCoy feud.</p>';
                }
                
                locationTitle.textContent = title;
                locationContent.innerHTML = content;
            });
        });
    }
    
    // Map layer toggles
    const layerCheckboxes = document.querySelectorAll('.layer-checkbox');
    
    if (layerCheckboxes.length > 0) {
        layerCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const layer = this.id.split('-')[1];
                const checked = this.checked;
                
                // Show/hide markers based on layer selection
                if (layer === 'hatfield') {
                    toggleMarkers('hatfield-marker', checked);
                } else if (layer === 'mccoy') {
                    toggleMarkers('mccoy-marker', checked);
                } else if (layer === 'battles') {
                    toggleMarkers('battle-marker', checked);
                } else if (layer === 'homes') {
                    toggleMarkers(['hatfield-marker', 'mccoy-marker'], checked);
                } else if (layer === 'landmarks') {
                    toggleMarkers('landmark-marker', checked);
                } else if (layer === 'modern') {
                    // No modern markers in this version
                }
            });
        });
    }
    
    // Time slider
    const timeSlider = document.getElementById('time-slider');
    const timeValue = document.getElementById('time-value');
    
    if (timeSlider && timeValue) {
        timeSlider.addEventListener('input', function() {
            const year = this.value;
            timeValue.textContent = year;
            
            // Show/hide markers based on time period
            if (year < 1880) {
                // Early period
                showMarkersInPeriod('early');
            } else if (year >= 1880 && year < 1890) {
                // Middle period (most intense)
                showMarkersInPeriod('middle');
            } else if (year >= 1890 && year < 1940) {
                // Late period
                showMarkersInPeriod('late');
            } else {
                // Modern period
                showMarkersInPeriod('modern');
            }
        });
    }
    
    // Source filters
    const sourceFilters = document.querySelectorAll('.source-filters .filter-select');
    const sourceCards = document.querySelectorAll('.source-card');
    
    if (sourceFilters.length > 0 && sourceCards.length > 0) {
        sourceFilters.forEach(filter => {
            filter.addEventListener('change', function() {
                applySourceFilters();
            });
        });
        
        // Source search
        const sourceSearch = document.getElementById('search-sources');
        
        if (sourceSearch) {
            sourceSearch.addEventListener('input', function() {
                applySourceFilters();
            });
        }
    }
    
    // People filters
    const peopleFilters = document.querySelectorAll('.people-filters .filter-select');
    const personCards = document.querySelectorAll('.person-card');
    
    if (peopleFilters.length > 0 && personCards.length > 0) {
        peopleFilters.forEach(filter => {
            filter.addEventListener('change', function() {
                applyPeopleFilters();
            });
        });
        
        // People search
        const peopleSearch = document.getElementById('search-people');
        
        if (peopleSearch) {
            peopleSearch.addEventListener('input', function() {
                applyPeopleFilters();
            });
        }
    }
    
    // Citation generator
    const citationForm = document.querySelector('.citation-form');
    const citationText = document.querySelector('.citation-text');
    const styleOptions = document.querySelectorAll('input[name="citation-style"]');
    
    if (citationForm && citationText) {
        citationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const sourceType = document.getElementById('source-type').value;
            const title = document.getElementById('source-title').value;
            const author = document.getElementById('source-author').value;
            const date = document.getElementById('source-date').value;
            const publisher = document.getElementById('source-publisher').value;
            const url = document.getElementById('source-url').value;
            
            // Get selected citation style
            let style = 'chicago';
            styleOptions.forEach(option => {
                if (option.checked) {
                    style = option.value;
                }
            });
            
            // Generate citation
            const citation = generateCitation(sourceType, title, author, date, publisher, url, style);
            
            // Display citation
            citationText.textContent = citation;
            
            // Show citation result
            document.querySelector('.citation-result').style.display = 'block';
        });
    }
    
    // Copy citation button
    const copyBtn = document.getElementById('copy-citation');
    
    if (copyBtn && citationText) {
        copyBtn.addEventListener('click', function() {
            // Create a temporary textarea element
            const textarea = document.createElement('textarea');
            textarea.value = citationText.textContent;
            document.body.appendChild(textarea);
            
            // Select and copy the text
            textarea.select();
            document.execCommand('copy');
            
            // Remove the textarea
            document.body.removeChild(textarea);
            
            // Update button text temporarily
            const originalText = this.textContent;
            this.textContent = 'Copied!';
            
            // Reset button text after a delay
            setTimeout(() => {
                this.textContent = originalText;
            }, 2000);
        });
    }
    
    // Initialize any interactive elements
    initializeInteractiveElements();
});

// Helper Functions

// Format data attribute for display
function formatDataAttribute(attr) {
    if (!attr) return '';
    
    // Handle special cases
    if (attr === 'both') return 'Hatfield and McCoy';
    
    // Split by underscore or hyphen if present
    const words = attr.split(/[_-]/);
    
    // Capitalize each word
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Apply filters to timeline events
function applyFilters() {
    const familyFilter = document.getElementById('filter-family');
    const typeFilter = document.getElementById('filter-type');
    const significanceFilter = document.getElementById('filter-significance');
    const timelineEvents = document.querySelectorAll('.timeline-event');
    
    if (!familyFilter || !typeFilter || !significanceFilter || timelineEvents.length === 0) return;
    
    const familyValue = familyFilter.value;
    const typeValue = typeFilter.value;
    const significanceValue = significanceFilter.value;
    
    timelineEvents.forEach(event => {
        const family = event.getAttribute('data-family');
        const type = event.getAttribute('data-type');
        const significance = event.getAttribute('data-significance');
        
        let showEvent = true;
        
        // Apply family filter
        if (familyValue !== 'all' && family !== familyValue) {
            showEvent = false;
        }
        
        // Apply type filter
        if (typeValue !== 'all' && type !== typeValue) {
            showEvent = false;
        }
        
        // Apply significance filter
        if (significanceValue !== 'all' && significance !== significanceValue) {
            showEvent = false;
        }
        
        // Show/hide event
        if (showEvent) {
            event.style.display = 'block';
        } else {
            event.style.display = 'none';
        }
    });
}

// Navigate between events in the modal
function navigateEvents(direction) {
    const eventModal = document.getElementById('event-details-modal');
    const detailsBtns = document.querySelectorAll('.btn-details');
    
    if (!eventModal || detailsBtns.length === 0) return;
    
    const currentIndex = parseInt(eventModal.getAttribute('data-current-index'));
    let newIndex;
    
    if (direction === 'prev') {
        newIndex = (currentIndex - 1 + detailsBtns.length) % detailsBtns.length;
    } else {
        newIndex = (currentIndex + 1) % detailsBtns.length;
    }
    
    // Trigger click on the new event button
    detailsBtns[newIndex].click();
}

// Toggle map markers
function toggleMarkers(markerClass, show) {
    const markers = Array.isArray(markerClass) 
        ? document.querySelectorAll(markerClass.map(c => `.${c}`).join(', '))
        : document.querySelectorAll(`.${markerClass}`);
    
    markers.forEach(marker => {
        if (show) {
            marker.closest('.map-marker').style.display = 'block';
        } else {
            marker.closest('.map-marker').style.display = 'none';
        }
    });
}

// Show markers based on time period
function showMarkersInPeriod(period) {
    // Reset all markers
    document.querySelectorAll('.map-marker').forEach(marker => {
        marker.style.display = 'block';
    });
    
    // Apply period-specific visibility
    if (period === 'early') {
        // Only show early period markers
        document.querySelector('[data-location="hatfield-cabin"]').style.display = 'block';
        document.querySelector('[data-location="mccoy-cabin"]').style.display = 'block';
        document.querySelector('[data-location="pawpaw-incident"]').style.display = 'none';
        document.querySelector('[data-location="pikeville-courthouse"]').style.display = 'none';
        document.querySelector('[data-location="blackberry-creek"]').style.display = 'none';
    } else if (period === 'middle') {
        // Show all original feud markers
        document.querySelectorAll('.map-marker').forEach(marker => {
            marker.style.display = 'block';
        });
    } else if (period === 'late') {
        // Show only certain markers
        document.querySelector('[data-location="hatfield-cabin"]').style.display = 'block';
        document.querySelector('[data-location="mccoy-cabin"]').style.display = 'block';
        document.querySelector('[data-location="pawpaw-incident"]').style.display = 'none';
        document.querySelector('[data-location="pikeville-courthouse"]').style.display = 'block';
        document.querySelector('[data-location="blackberry-creek"]').style.display = 'none';
    } else if (period === 'modern') {
        // Show only modern markers (none in this version)
        document.querySelector('[data-location="hatfield-cabin"]').style.display = 'none';
        document.querySelector('[data-location="mccoy-cabin"]').style.display = 'none';
        document.querySelector('[data-location="pawpaw-incident"]').style.display = 'none';
        document.querySelector('[data-location="pikeville-courthouse"]').style.display = 'block';
        document.querySelector('[data-location="blackberry-creek"]').style.display = 'none';
    }
}

// Apply filters to source cards
function applySourceFilters() {
    const typeFilter = document.getElementById('filter-type');
    const periodFilter = document.getElementById('filter-period');
    const familyFilter = document.getElementById('filter-family');
    const searchInput = document.getElementById('search-sources');
    const sourceCards = document.querySelectorAll('.source-card');
    
    if (!typeFilter || !periodFilter || !familyFilter || !searchInput || sourceCards.length === 0) return;
    
    const typeValue = typeFilter.value;
    const periodValue = periodFilter.value;
    const familyValue = familyFilter.value;
    const searchValue = searchInput.value.toLowerCase();
    
    sourceCards.forEach(card => {
        const type = card.getAttribute('data-type');
        const period = card.getAttribute('data-period');
        const family = card.getAttribute('data-family');
        const title = card.querySelector('.source-title').textContent.toLowerCase();
        const description = card.querySelector('.source-description').textContent.toLowerCase();
        
        let showCard = true;
        
        // Apply type filter
        if (typeValue !== 'all' && type !== typeValue) {
            showCard = false;
        }
        
        // Apply period filter
        if (periodValue !== 'all' && period !== periodValue) {
            showCard = false;
        }
        
        // Apply family filter
        if (familyValue !== 'all' && family !== familyValue) {
            showCard = false;
        }
        
        // Apply search filter
        if (searchValue && !title.includes(searchValue) && !description.includes(searchValue)) {
            showCard = false;
        }
        
        // Show/hide card
        if (showCard) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Apply filters to person cards
function applyPeopleFilters() {
    const familyFilter = document.getElementById('filter-family');
    const generationFilter = document.getElementById('filter-generation');
    const significanceFilter = document.getElementById('filter-significance');
    const searchInput = document.getElementById('search-people');
    const personCards = document.querySelectorAll('.person-card');
    
    if (!familyFilter || !generationFilter || !significanceFilter || !searchInput || personCards.length === 0) return;
    
    const familyValue = familyFilter.value;
    const generationValue = generationFilter.value;
    const significanceValue = significanceFilter.value;
    const searchValue = searchInput.value.toLowerCase();
    
    personCards.forEach(card => {
        const family = card.getAttribute('data-family');
        const generation = card.getAttribute('data-generation');
        const significance = card.getAttribute('data-significance');
        const name = card.querySelector('.person-name').textContent.toLowerCase();
        const description = card.querySelector('.person-description').textContent.toLowerCase();
        
        let showCard = true;
        
        // Apply family filter
        if (familyValue !== 'all' && family !== familyValue) {
            showCard = false;
        }
        
        // Apply generation filter
        if (generationValue !== 'all' && generation !== generationValue) {
            showCard = false;
        }
        
        // Apply significance filter
        if (significanceValue !== 'all' && significance !== significanceValue) {
            showCard = false;
        }
        
        // Apply search filter
        if (searchValue && !name.includes(searchValue) && !description.includes(searchValue)) {
            showCard = false;
        }
        
        // Show/hide card
        if (showCard) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Generate citation based on source information and style
function generateCitation(sourceType, title, author, date, publisher, url, style) {
    let citation = '';
    
    if (style === 'chicago') {
        // Chicago style
        if (sourceType === 'book') {
            citation = `${author}. <i>${title}</i>. ${publisher}, ${date}.`;
        } else if (sourceType === 'article') {
            citation = `${author}. "${title}." ${publisher}, ${date}.`;
        } else if (sourceType === 'website') {
            citation = `${author}. "${title}." ${publisher}, ${date}. ${url}.`;
        } else if (sourceType === 'document') {
            citation = `${title}. ${date}. ${publisher}.`;
        } else if (sourceType === 'image') {
            citation = `${author}. <i>${title}</i>. ${date}. ${publisher}.`;
        }
    } else if (style === 'mla') {
        // MLA style
        if (sourceType === 'book') {
            citation = `${author}. <i>${title}</i>. ${publisher}, ${date}.`;
        } else if (sourceType === 'article') {
            citation = `${author}. "${title}." ${publisher}, ${date}.`;
        } else if (sourceType === 'website') {
            citation = `${author}. "${title}." ${publisher}, ${date}, ${url}.`;
        } else if (sourceType === 'document') {
            citation = `"${title}." ${date}. ${publisher}.`;
        } else if (sourceType === 'image') {
            citation = `${author}. <i>${title}</i>. ${date}. ${publisher}.`;
        }
    } else if (style === 'apa') {
        // APA style
        if (sourceType === 'book') {
            citation = `${author}. (${date}). <i>${title}</i>. ${publisher}.`;
        } else if (sourceType === 'article') {
            citation = `${author}. (${date}). ${title}. ${publisher}.`;
        } else if (sourceType === 'website') {
            citation = `${author}. (${date}). ${title}. ${publisher}. ${url}`;
        } else if (sourceType === 'document') {
            citation = `${title}. (${date}). ${publisher}.`;
        } else if (sourceType === 'image') {
            citation = `${author}. (${date}). <i>${title}</i>. ${publisher}.`;
        }
    }
    
    return citation;
}

// Initialize any interactive elements that need setup
function initializeInteractiveElements() {
    // Add map functionality if Leaflet is available
    if (typeof L !== 'undefined') {
        // Initialize map
        const map = L.map('map-container').setView([37.6156, -82.1714], 12);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Add markers
        const hatfieldCabin = L.marker([37.6256, -82.1614]).addTo(map)
            .bindPopup('Devil Anse Hatfield Cabin');
        
        const mccoyCabin = L.marker([37.6056, -82.1814]).addTo(map)
            .bindPopup('Randolph McCoy Cabin');
        
        const pawpawSite = L.marker([37.6156, -82.1714]).addTo(map)
            .bindPopup('Pawpaw Trees Execution Site');
        
        const pikeville = L.marker([37.4792, -82.5188]).addTo(map)
            .bindPopup('Pikeville Courthouse');
        
        const blackberryCreek = L.marker([37.6356, -82.1514]).addTo(map)
            .bindPopup('Blackberry Creek');
    }
    
    // Set up any other interactive elements
    setupViewDetailsLinks();
    setupDropdownFunctionality();
}

// Setup functionality for "View Details" links
function setupViewDetailsLinks() {
    // Timeline details links
    const timelineDetailsLinks = document.querySelectorAll('.timeline-details a');
    
    timelineDetailsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the parent timeline event
            const timelineEvent = this.closest('.timeline-event');
            
            if (timelineEvent) {
                // Scroll to the event details section
                const eventDetailsSection = document.getElementById('event-details-modal');
                
                if (eventDetailsSection) {
                    eventDetailsSection.style.display = 'block';
                    
                    // Populate modal with event details
                    const title = timelineEvent.querySelector('h3').textContent;
                    const date = timelineEvent.querySelector('.timeline-date').textContent;
                    const description = timelineEvent.querySelector('p').textContent;
                    
                    document.getElementById('modal-title').textContent = title;
                    document.getElementById('modal-date').textContent = date;
                    document.getElementById('modal-description').innerHTML = `<p>${description}</p>`;
                }
            }
        });
    });
    
    // People biography links
    const biographyLinks = document.querySelectorAll('.person-card a');
    
    biographyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the parent person card
            const personCard = this.closest('.person-card');
            
            if (personCard) {
                // Get person details
                const name = personCard.querySelector('.person-name').textContent;
                const dates = personCard.querySelector('.person-dates').textContent;
                const description = personCard.querySelector('.person-description').textContent;
                
                // Create modal content
                const modalContent = `
                    <div class="modal-content">
                        <span class="close-modal">&times;</span>
                        <div class="modal-header">
                            <h2>${name}</h2>
                            <p>${dates}</p>
                        </div>
                        <div class="modal-body">
                            <p>${description}</p>
                            <p>This is an expanded biography that would include more detailed information about this person's life, their role in the feud, and their historical significance.</p>
                            <p>For a complete biography with all available historical information, please refer to the full research materials in the Bibliography section.</p>
                        </div>
                        <div class="modal-footer">
                            <button id="close-bio-modal" class="btn btn-primary">Close</button>
                        </div>
                    </div>
                `;
                
                // Create modal element
                const bioModal = document.createElement('div');
                bioModal.className = 'event-modal';
                bioModal.id = 'bio-details-modal';
                bioModal.innerHTML = modalContent;
                bioModal.style.display = 'block';
                
                // Add modal to page
                document.body.appendChild(bioModal);
                
                // Add close functionality
                const closeModal = bioModal.querySelector('.close-modal');
                const closeBtn = bioModal.querySelector('#close-bio-modal');
                
                closeModal.addEventListener('click', function() {
                    bioModal.remove();
                });
                
                closeBtn.addEventListener('click', function() {
                    bioModal.remove();
                });
                
                // Close when clicking outside
                bioModal.addEventListener('click', function(e) {
                    if (e.target === bioModal) {
                        bioModal.remove();
                    }
                });
            }
        });
    });
    
    // Location details links
    const locationLinks = document.querySelectorAll('.location-card a');
    
    locationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the parent location card
            const locationCard = this.closest('.location-card');
            
            if (locationCard) {
                // Get location details
                const name = locationCard.querySelector('.location-name').textContent;
                const address = locationCard.querySelector('.location-address').textContent;
                const description = locationCard.querySelector('.location-description').textContent;
                
                // Create modal content
                const modalContent = `
                    <div class="modal-content">
                        <span class="close-modal">&times;</span>
                        <div class="modal-header">
                            <h2>${name}</h2>
                            <p>${address}</p>
                        </div>
                        <div class="modal-body">
                            <p>${description}</p>
                            <p>This expanded location information would include more detailed historical context, geographical significance, and the role this location played in the Hatfield-McCoy feud.</p>
                            <p>For complete information about this location, including historical maps and photographs, please refer to the full research materials in the Bibliography section.</p>
                        </div>
                        <div class="modal-footer">
                            <button id="close-location-modal" class="btn btn-primary">Close</button>
                        </div>
                    </div>
                `;
                
                // Create modal element
                const locationModal = document.createElement('div');
                locationModal.className = 'event-modal';
                locationModal.id = 'location-details-modal';
                locationModal.innerHTML = modalContent;
                locationModal.style.display = 'block';
                
                // Add modal to page
                document.body.appendChild(locationModal);
                
                // Add close functionality
                const closeModal = locationModal.querySelector('.close-modal');
                const closeBtn = locationModal.querySelector('#close-location-modal');
                
                closeModal.addEventListener('click', function() {
                    locationModal.remove();
                });
                
                closeBtn.addEventListener('click', function() {
                    locationModal.remove();
                });
                
                // Close when clicking outside
                locationModal.addEventListener('click', function(e) {
                    if (e.target === locationModal) {
                        locationModal.remove();
                    }
                });
            }
        });
    });
    
    // Primary source links
    const sourceLinks = document.querySelectorAll('.source-card a');
    
    sourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the parent source card
            const sourceCard = this.closest('.source-card');
            
            if (sourceCard) {
                // Get source details
                const title = sourceCard.querySelector('.source-title').textContent;
                const metadata = sourceCard.querySelector('.source-metadata').textContent;
                const description = sourceCard.querySelector('.source-description').textContent;
                
                // Create modal content
                const modalContent = `
                    <div class="modal-content">
                        <span class="close-modal">&times;</span>
                        <div class="modal-header">
                            <h2>${title}</h2>
                            <p>${metadata}</p>
                        </div>
                        <div class="modal-body">
                            <p>${description}</p>
                            <p>This would display the full primary source content, including complete text transcriptions, high-resolution images, or audio recordings depending on the source type.</p>
                            <p>For complete access to all primary sources, including downloadable versions and additional context, please refer to the full research materials in the Bibliography section.</p>
                        </div>
                        <div class="modal-footer">
                            <button id="close-source-modal" class="btn btn-primary">Close</button>
                        </div>
                    </div>
                `;
                
                // Create modal element
                const sourceModal = document.createElement('div');
                sourceModal.className = 'event-modal';
                sourceModal.id = 'source-details-modal';
                sourceModal.innerHTML = modalContent;
                sourceModal.style.display = 'block';
                
                // Add modal to page
                document.body.appendChild(sourceModal);
                
                // Add close functionality
                const closeModal = sourceModal.querySelector('.close-modal');
                const closeBtn = sourceModal.querySelector('#close-source-modal');
                
                closeModal.addEventListener('click', function() {
                    sourceModal.remove();
                });
                
                closeBtn.addEventListener('click', function() {
                    sourceModal.remove();
                });
                
                // Close when clicking outside
                sourceModal.addEventListener('click', function(e) {
                    if (e.target === sourceModal) {
                        sourceModal.remove();
                    }
                });
            }
        });
    });
}

// Setup dropdown functionality
function setupDropdownFunctionality() {
    // Timeline filters
    const timelineFilters = document.querySelectorAll('.timeline-filters select');
    
    timelineFilters.forEach(filter => {
        filter.addEventListener('change', function() {
            applyFilters();
        });
    });
    
    // People filters
    const peopleFilters = document.querySelectorAll('.people-filters select');
    
    peopleFilters.forEach(filter => {
        filter.addEventListener('change', function() {
            applyPeopleFilters();
        });
    });
    
    // Source filters
    const sourceFilters = document.querySelectorAll('.source-filters select');
    
    sourceFilters.forEach(filter => {
        filter.addEventListener('change', function() {
            applySourceFilters();
        });
    });
}
