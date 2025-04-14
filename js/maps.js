// Interactive map functionality for the Hatfield-McCoy Feud website

document.addEventListener('DOMContentLoaded', function() {
    // Check if map container exists on the page
    const mapContainer = document.getElementById('feud-map');
    if (!mapContainer) return;
    
    // Initialize the map centered on the Tug Fork River area (KY-WV border)
    const map = L.map('feud-map').setView([37.6156, -82.1652], 11);
    
    // Define map layers
    const terrainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    
    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });
    
    // Historical map layer (using a sepia-toned version of OpenStreetMap)
    const historicalLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        filter: 'sepia(100%) brightness(90%)'
    });
    
    // Add the terrain layer to the map by default
    terrainLayer.addTo(map);
    
    // Create custom icon classes for different location types
    function createCustomIcon(className) {
        return L.divIcon({
            className: className,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });
    }
    
    const hatfieldIcon = createCustomIcon('hatfield-marker');
    const mccoyIcon = createCustomIcon('mccoy-marker');
    const conflictIcon = createCustomIcon('conflict-marker');
    const modernIcon = createCustomIcon('modern-marker');
    
    // Define location data
    const locations = [
        {
            id: 'devil-anse-cabin',
            name: "Devil Anse Hatfield's Cabin",
            type: 'hatfield',
            coordinates: [37.6289, -82.1789],
            description: "Home of William Anderson 'Devil Anse' Hatfield and headquarters of the Hatfield family during the feud.",
            icon: hatfieldIcon
        },
        {
            id: 'hatfield-cemetery',
            name: "Hatfield Cemetery",
            type: 'hatfield',
            coordinates: [37.6331, -82.1702],
            description: "Final resting place of Devil Anse Hatfield, marked by a life-sized marble statue, and many other Hatfield family members.",
            icon: hatfieldIcon
        },
        {
            id: 'mate-creek',
            name: "Mate Creek",
            type: 'hatfield',
            coordinates: [37.6214, -82.1652],
            description: "Area of significant Hatfield family settlement, later known as Matewan.",
            icon: hatfieldIcon
        },
        {
            id: 'randolph-mccoy-cabin',
            name: "Randolph McCoy's Cabin",
            type: 'mccoy',
            coordinates: [37.5989, -82.1512],
            description: "Site of the New Year's Night Raid of 1888, where the Hatfields burned the McCoy home and killed two of Randolph's children.",
            icon: mccoyIcon
        },
        {
            id: 'mccoy-cemetery',
            name: "McCoy Cemetery",
            type: 'mccoy',
            coordinates: [37.5912, -82.1489],
            description: "Burial place of Randolph McCoy, his wife Sarah, and several of their children who died during the feud.",
            icon: mccoyIcon
        },
        {
            id: 'pikeville',
            name: "Pikeville, Kentucky",
            type: 'mccoy',
            coordinates: [37.4793, -82.5187],
            description: "County seat of Pike County where several trials related to the feud took place, including the trial of Cotton Top Mounts.",
            icon: mccoyIcon
        },
        {
            id: 'pawpaw-creek',
            name: "Pawpaw Creek",
            type: 'conflict',
            coordinates: [37.6056, -82.1623],
            description: "Site where three McCoy brothers (Tolbert, Pharmer, and Bud) were executed by the Hatfields in 1882.",
            icon: conflictIcon
        },
        {
            id: 'blackberry-creek',
            name: "Blackberry Creek",
            type: 'conflict',
            coordinates: [37.5823, -82.1734],
            description: "Area where the dispute over a pig—often cited as the initial spark of the feud—took place in 1878.",
            icon: conflictIcon
        },
        {
            id: 'election-grounds',
            name: "Election Grounds",
            type: 'conflict',
            coordinates: [37.6123, -82.1567],
            description: "Site where Johnse Hatfield met Roseanna McCoy in 1880 and where Ellison Hatfield was fatally stabbed in 1882.",
            icon: conflictIcon
        },
        {
            id: 'tug-river',
            name: "Tug Fork River",
            type: 'conflict',
            coordinates: [37.6156, -82.1652],
            description: "The river that forms the boundary between Kentucky and West Virginia, serving as both a physical and jurisdictional boundary between the families.",
            icon: conflictIcon
        },
        {
            id: 'hatfield-mccoy-trails',
            name: "Hatfield-McCoy Trails",
            type: 'modern',
            coordinates: [37.6734, -82.2789],
            description: "Modern trail system passing through many historic feud sites, established in 2000 for recreational use.",
            icon: modernIcon
        },
        {
            id: 'hatfield-mccoy-museum',
            name: "Hatfield-McCoy Museum",
            type: 'modern',
            coordinates: [37.6731, -82.2767],
            description: "Museum housing artifacts, photographs, and documents related to the famous feud.",
            icon: modernIcon
        },
        {
            id: 'hatfield-mccoy-house',
            name: "Hatfield-McCoy House Inn",
            type: 'modern',
            coordinates: [37.6742, -82.2801],
            description: "Historic building converted into a themed bed and breakfast catering to tourists interested in the feud.",
            icon: modernIcon
        }
    ];
    
    // Create marker groups for filtering
    const markerGroups = {
        hatfield: L.layerGroup(),
        mccoy: L.layerGroup(),
        conflict: L.layerGroup(),
        modern: L.layerGroup(),
        all: L.layerGroup()
    };
    
    // Add markers to the map
    locations.forEach(location => {
        const marker = L.marker(location.coordinates, { icon: location.icon });
        
        // Create custom popup content
        const popupContent = `
            <div class="popup-content">
                <div class="popup-header">
                    <h3>${location.name}</h3>
                </div>
                <div class="popup-body">
                    <p>${location.description}</p>
                </div>
                <div class="popup-footer">
                    <button class="view-details" data-location="${location.id}">View Details</button>
                </div>
            </div>
        `;
        
        marker.bindPopup(popupContent);
        
        // Add marker to appropriate groups
        markerGroups[location.type].addLayer(marker);
        markerGroups.all.addLayer(marker);
    });
    
    // Add all markers to the map initially
    markerGroups.all.addTo(map);
    
    // Set up location filter
    const locationFilter = document.getElementById('location-filter');
    if (locationFilter) {
        locationFilter.addEventListener('change', function() {
            const selectedType = this.value;
            
            // Remove all marker groups
            Object.values(markerGroups).forEach(group => {
                map.removeLayer(group);
            });
            
            // Add selected marker group
            if (selectedType === 'all') {
                markerGroups.all.addTo(map);
            } else {
                markerGroups[selectedType].addTo(map);
            }
        });
    }
    
    // Set up map style buttons
    const terrainButton = document.getElementById('terrain-view');
    const satelliteButton = document.getElementById('satellite-view');
    const historicalButton = document.getElementById('historical-view');
    
    if (terrainButton && satelliteButton && historicalButton) {
        terrainButton.addEventListener('click', function() {
            map.removeLayer(satelliteLayer);
            map.removeLayer(historicalLayer);
            map.addLayer(terrainLayer);
            
            terrainButton.classList.add('active');
            satelliteButton.classList.remove('active');
            historicalButton.classList.remove('active');
        });
        
        satelliteButton.addEventListener('click', function() {
            map.removeLayer(terrainLayer);
            map.removeLayer(historicalLayer);
            map.addLayer(satelliteLayer);
            
            terrainButton.classList.remove('active');
            satelliteButton.classList.add('active');
            historicalButton.classList.remove('active');
        });
        
        historicalButton.addEventListener('click', function() {
            map.removeLayer(terrainLayer);
            map.removeLayer(satelliteLayer);
            map.addLayer(historicalLayer);
            
            terrainButton.classList.remove('active');
            satelliteButton.classList.remove('active');
            historicalButton.classList.add('active');
        });
    }
    
    // Set up location details modal
    const modal = document.getElementById('location-modal');
    const modalContent = document.getElementById('modal-location-content');
    const closeModal = document.querySelector('.close-modal');
    
    // Close modal when clicking the X
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside the content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Handle view details button clicks (delegated to document)
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('view-details')) {
            const locationId = event.target.getAttribute('data-location');
            
            // Check if we have details for this location
            if (window.locationDetails && window.locationDetails[locationId]) {
                modalContent.innerHTML = window.locationDetails[locationId];
                modal.style.display = 'block';
                
                // Process any images in the modal content
                const modalImages = modalContent.querySelectorAll('img');
                modalImages.forEach(img => {
                    img.onerror = function() {
                        if (window.createPlaceholderImage) {
                            window.createPlaceholderImage(this);
                        }
                    };
                });
            } else {
                // Fallback if details aren't available
                modalContent.innerHTML = `
                    <div class="location-detail">
                        <h2>${locations.find(loc => loc.id === locationId)?.name || 'Location Details'}</h2>
                        <p>Detailed information about this location is being compiled. Please check back later for more information.</p>
                    </div>
                `;
                modal.style.display = 'block';
            }
        }
    });
    
    // Apply CSS filter to historical layer
    if (historicalLayer._container) {
        historicalLayer._container.style.filter = 'sepia(100%) brightness(90%)';
    }
});
