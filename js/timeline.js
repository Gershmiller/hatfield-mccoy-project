/* Timeline Visualization JavaScript for Hatfield-McCoy Feud Research Website */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Timeline
    initializeTimeline();
    
    // Timeline Filter Functionality
    setupTimelineFilters();
    
    // Timeline Navigation Controls
    setupTimelineNavigation();
});

/**
 * Initialize the dual timeline visualization
 */
function initializeTimeline() {
    const timelineContainer = document.querySelector('.timeline-container');
    
    if (!timelineContainer) return;
    
    // Add timeline tracks if they don't exist yet
    if (!document.querySelector('.timeline-tracks')) {
        createTimelineTracks(timelineContainer);
    }
    
    // Add timeline events to each track
    populateTimelineEvents();
    
    // Add timeline legend
    if (!document.querySelector('.timeline-legend')) {
        createTimelineLegend(timelineContainer);
    }
}

/**
 * Create timeline tracks for original feud and 20th century legacy
 */
function createTimelineTracks(container) {
    const tracksContainer = document.createElement('div');
    tracksContainer.className = 'timeline-tracks';
    
    // Original Feud Track (1863-1891)
    const originalFeudTrack = document.createElement('div');
    originalFeudTrack.className = 'timeline-track hatfield';
    originalFeudTrack.innerHTML = `
        <div class="timeline-track-header">
            <h3 class="timeline-track-title">Original Feud</h3>
            <span class="timeline-track-period">1863-1891</span>
        </div>
        <div class="timeline-line"></div>
        <div class="timeline-events" id="original-feud-events"></div>
    `;
    
    // 20th Century Legacy Track (1940s-1950s)
    const legacyTrack = document.createElement('div');
    legacyTrack.className = 'timeline-track mccoy';
    legacyTrack.innerHTML = `
        <div class="timeline-track-header">
            <h3 class="timeline-track-title">20th Century Legacy</h3>
            <span class="timeline-track-period">1940s-1950s</span>
        </div>
        <div class="timeline-line"></div>
        <div class="timeline-events" id="legacy-events"></div>
    `;
    
    tracksContainer.appendChild(originalFeudTrack);
    tracksContainer.appendChild(legacyTrack);
    container.appendChild(tracksContainer);
}

/**
 * Populate timeline events from data
 */
function populateTimelineEvents() {
    // In a real implementation, this would fetch data from a JSON file or API
    // For now, we'll use hardcoded data
    
    const originalFeudEvents = [
        {
            id: 'event-1',
            date: 'January 7, 1865',
            title: 'Death of Asa Harmon McCoy',
            description: 'Asa Harmon McCoy, who fought for the Union Army, was killed by Confederate guerrillas after returning home from the war.',
            family: 'mccoy',
            tags: ['violence', 'civil-war']
        },
        {
            id: 'event-2',
            date: '1878',
            title: 'The Hog Trial',
            description: 'Dispute over ownership of a hog between Floyd Hatfield and Randolph McCoy escalated tensions between the families.',
            family: 'neutral',
            tags: ['legal', 'property-dispute']
        },
        {
            id: 'event-3',
            date: 'August 5, 1882',
            title: 'Election Day Fight',
            description: 'Ellison Hatfield was stabbed 26 times and shot by three McCoy brothers (Tolbert, Pharmer, and Bud) after an argument at an election day gathering.',
            family: 'hatfield',
            tags: ['violence', 'politics']
        },
        {
            id: 'event-4',
            date: 'August 9, 1882',
            title: 'Murder of Ellison Hatfield',
            description: 'Ellison Hatfield died from his wounds, leading Devil Anse Hatfield to vow revenge.',
            family: 'hatfield',
            tags: ['death', 'violence']
        },
        {
            id: 'event-5',
            date: 'August 9, 1882',
            title: 'Execution of McCoy Brothers',
            description: 'The three McCoy brothers responsible for Ellison\'s death were tied to pawpaw bushes and executed by Hatfields in retaliation.',
            family: 'mccoy',
            tags: ['violence', 'revenge']
        },
        {
            id: 'event-6',
            date: 'January 1, 1888',
            title: 'New Year\'s Night Massacre',
            description: 'Hatfields attacked the McCoy home, killing Alifair and Calvin McCoy and severely beating their mother Sarah.',
            family: 'mccoy',
            tags: ['violence', 'massacre']
        },
        {
            id: 'event-7',
            date: 'January 19, 1888',
            title: 'Battle of Grapevine Creek',
            description: 'A posse led by Frank Phillips captured several Hatfields, killing Jim Vance in the process.',
            family: 'hatfield',
            tags: ['violence', 'law-enforcement']
        },
        {
            id: 'event-8',
            date: 'May 1888 - 1889',
            title: 'Legal Battles',
            description: 'The case of Mahon v. Justice reached the U.S. Supreme Court, which ruled that Kentucky could legally extradite Hatfields from West Virginia.',
            family: 'neutral',
            tags: ['legal', 'supreme-court']
        },
        {
            id: 'event-9',
            date: '1889-1890',
            title: 'Trials and Convictions',
            description: 'Several Hatfields were tried and convicted for their roles in the feud, with some sentenced to life imprisonment and one to death.',
            family: 'hatfield',
            tags: ['legal', 'trials']
        }
    ];
    
    const legacyEvents = [
        {
            id: 'legacy-1',
            date: 'May 1944',
            title: 'Life Magazine Article',
            description: 'Life magazine published an article featuring Shirley Hatfield and Frankie McCoy working together in a WWII uniform factory.',
            family: 'neutral',
            tags: ['media', 'world-war-ii', 'reconciliation']
        },
        {
            id: 'legacy-2',
            date: '1946',
            title: 'First Hatfield-McCoy Reunion',
            description: 'The first official reunion between Hatfield and McCoy descendants was held, symbolizing the end of hostilities.',
            family: 'neutral',
            tags: ['reconciliation', 'cultural']
        },
        {
            id: 'legacy-3',
            date: '1950',
            title: 'Warner Bros. Cartoon',
            description: 'Warner Bros. released "Hillbilly Hare," a Bugs Bunny cartoon referencing the feud between the families.',
            family: 'neutral',
            tags: ['media', 'popular-culture']
        },
        {
            id: 'legacy-4',
            date: '1952',
            title: 'Abbott and Costello Film',
            description: 'Abbott and Costello released a feature film that referenced the famous Hatfield-McCoy feud.',
            family: 'neutral',
            tags: ['media', 'film']
        },
        {
            id: 'legacy-5',
            date: '1955',
            title: 'Tourism Development',
            description: 'Local tourism boards began promoting Hatfield-McCoy feud sites as historical attractions.',
            family: 'neutral',
            tags: ['tourism', 'economic']
        }
    ];
    
    // Render original feud events
    const originalFeudContainer = document.getElementById('original-feud-events');
    if (originalFeudContainer) {
        originalFeudEvents.forEach(event => {
            originalFeudContainer.appendChild(createEventCard(event));
        });
    }
    
    // Render legacy events
    const legacyContainer = document.getElementById('legacy-events');
    if (legacyContainer) {
        legacyEvents.forEach(event => {
            legacyContainer.appendChild(createEventCard(event));
        });
    }
}

/**
 * Create an event card for the timeline
 */
function createEventCard(event) {
    const eventCard = document.createElement('div');
    eventCard.className = `timeline-event ${event.family}`;
    eventCard.dataset.id = event.id;
    eventCard.dataset.family = event.family;
    eventCard.dataset.tags = event.tags.join(',');
    
    eventCard.innerHTML = `
        <p class="timeline-date">${event.date}</p>
        <h4 class="timeline-event-title">${event.title}</h4>
        <p class="timeline-description">${event.description}</p>
        <div class="timeline-event-footer">
            <div class="timeline-event-tags">
                ${event.tags.map(tag => `<span class="timeline-event-tag ${event.family}">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    // Add click event to show more details
    eventCard.addEventListener('click', () => {
        showEventDetails(event);
    });
    
    return eventCard;
}

/**
 * Show detailed information about a timeline event
 */
function showEventDetails(event) {
    // In a real implementation, this would open a modal or navigate to a detailed page
    console.log('Event details:', event);
    
    // For now, we'll just alert with the event title
    alert(`Event: ${event.title}\nDate: ${event.date}\n\n${event.description}`);
}

/**
 * Create timeline legend
 */
function createTimelineLegend(container) {
    const legend = document.createElement('div');
    legend.className = 'timeline-legend';
    
    legend.innerHTML = `
        <div class="legend-item">
            <div class="legend-color hatfield"></div>
            <span class="legend-label">Hatfield Family</span>
        </div>
        <div class="legend-item">
            <div class="legend-color mccoy"></div>
            <span class="legend-label">McCoy Family</span>
        </div>
        <div class="legend-item">
            <div class="legend-color neutral"></div>
            <span class="legend-label">Neutral/Shared Events</span>
        </div>
    `;
    
    container.appendChild(legend);
}

/**
 * Setup timeline filters
 */
function setupTimelineFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    
    if (!filterOptions.length) return;
    
    filterOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Toggle active state
            option.classList.toggle('active');
            
            // Apply filters
            applyTimelineFilters();
        });
    });
}

/**
 * Apply filters to timeline events
 */
function applyTimelineFilters() {
    const activeFilters = {
        families: [],
        tags: [],
        significance: []
    };
    
    // Collect active family filters
    document.querySelectorAll('.filter-option.family.active').forEach(filter => {
        activeFilters.families.push(filter.dataset.family);
    });
    
    // Collect active tag filters
    document.querySelectorAll('.filter-option.tag.active').forEach(filter => {
        activeFilters.tags.push(filter.dataset.tag);
    });
    
    // Collect active significance filters
    document.querySelectorAll('.filter-option.significance.active').forEach(filter => {
        activeFilters.significance.push(filter.dataset.significance);
    });
    
    // Apply filters to all events
    const events = document.querySelectorAll('.timeline-event');
    
    events.forEach(event => {
        let visible = true;
        
        // Filter by family
        if (activeFilters.families.length > 0) {
            if (!activeFilters.families.includes(event.dataset.family)) {
                visible = false;
            }
        }
        
        // Filter by tags
        if (visible && activeFilters.tags.length > 0) {
            const eventTags = event.dataset.tags.split(',');
            const hasMatchingTag = activeFilters.tags.some(tag => eventTags.includes(tag));
            
            if (!hasMatchingTag) {
                visible = false;
            }
        }
        
        // Apply visibility
        event.style.display = visible ? 'block' : 'none';
    });
}

/**
 * Setup timeline navigation controls
 */
function setupTimelineNavigation() {
    const timelineTracks = document.querySelectorAll('.timeline-track');
    
    timelineTracks.forEach(track => {
        const events = track.querySelector('.timeline-events');
        
        if (!events) return;
        
        // Check if events overflow and need navigation
        if (events.scrollWidth > events.clientWidth) {
            // Create navigation buttons if they don't exist
            if (!track.querySelector('.timeline-scroll-btn')) {
                const scrollLeftBtn = document.createElement('button');
                scrollLeftBtn.className = 'timeline-scroll-btn scroll-left';
                scrollLeftBtn.innerHTML = '&larr;';
                scrollLeftBtn.setAttribute('aria-label', 'Scroll timeline left');
                
                const scrollRightBtn = document.createElement('button');
                scrollRightBtn.className = 'timeline-scroll-btn scroll-right';
                scrollRightBtn.innerHTML = '&rarr;';
                scrollRightBtn.setAttribute('aria-label', 'Scroll timeline right');
                
                track.appendChild(scrollLeftBtn);
                track.appendChild(scrollRightBtn);
                
                // Add click events
                scrollLeftBtn.addEventListener('click', () => {
                    events.scrollBy({ left: -300, behavior: 'smooth' });
                });
                
                scrollRightBtn.addEventListener('click', () => {
                    events.scrollBy({ left: 300, behavior: 'smooth' });
                });
            }
        }
    });
}
