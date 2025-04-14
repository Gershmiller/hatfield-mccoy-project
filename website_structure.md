# Hatfield-McCoy Feud Research Website Structure

## Website Architecture

### Home Page
- Hero section with historical image and project introduction
- Brief overview of the Hatfield-McCoy feud
- Navigation to main content sections
- Featured content highlights
- Search functionality
- Timeline preview with dual tracks (original feud and 20th century legacy)

### Main Navigation Structure
1. **Research Portal**
   - Academic research hub
   - Scholarly articles and publications
   - Research methodology
   - Citation guidelines
   - Research integrity statement

2. **Historical Timeline**
   - Interactive dual timeline (1863-1891 and 1940s-1950s)
   - Filterable by family, event type, and location
   - Detailed event entries with primary source links
   - Contextual historical events (Civil War, industrialization, WWII)

3. **People Database**
   - Family trees for both Hatfields and McCoys
   - Individual biography pages for key figures
   - Relationship network visualization
   - Searchable by name, relation, and time period
   - Primary source documents related to individuals

4. **Locations**
   - Interactive maps of the Tug Fork region
   - Property boundaries and disputed territories
   - Battle sites and significant locations
   - Before/after visualizations of locations
   - Modern preservation sites and historical markers

5. **Primary Sources**
   - Newspaper archives (1880s-1890s)
   - Legal documents and court records
   - Personal letters and diaries
   - Census data and government records
   - 1944 Life magazine article and materials
   - Oral histories and interviews

6. **Visual Gallery**
   - Historical photographs organized by category
   - Family portraits and photographs
   - Location photographs
   - Newspaper clippings and headlines
   - Artifacts and heirlooms
   - Modern photographs of historical sites

7. **Analysis & Context**
   - Scholarly interpretations of causes and consequences
   - Economic analysis of post-Civil War Appalachia
   - Social and cultural context
   - Legal analysis of court proceedings
   - Media coverage analysis
   - Legacy and cultural impact

8. **Family Stories**
   - Oral histories with academic context
   - Personal accounts from descendants
   - Story of Shirley Hatfield and Frankie McCoy (1940s)
   - Verified family anecdotes and traditions
   - Potential historical fiction narratives

9. **Resources**
   - Bibliography and references
   - Downloadable PDF resources
   - Citation generator
   - Research guides
   - External links to archives and collections

## Page Templates

### Standard Content Page Template
- Header with navigation
- Breadcrumb navigation
- Main content area
- Sidebar with related content links
- Citation information
- Footer with site map and credits

### Biography Page Template
- Portrait/photograph (if available)
- Vital statistics (birth, death, family relations)
- Biography text with citations
- Timeline of key life events
- Primary source documents
- Related family members
- Maps showing relevant locations

### Event Page Template
- Date and location information
- Detailed description with citations
- Key people involved
- Primary source documents
- Newspaper coverage
- Scholarly analysis
- Related events
- Location information with map

### Location Page Template
- Historical and modern photographs
- Maps showing location in context
- Description and historical significance
- Events that occurred at location
- People associated with location
- Primary sources mentioning location
- Current status and accessibility

### Document Page Template
- Document image/scan
- Transcription
- Context and significance
- Related people and events
- Source information and repository
- Citation information

## Interactive Features

### Dual Timeline Implementation
- Horizontal scrollable timeline
- Two parallel tracks (original feud and 20th century legacy)
- Clickable events linking to detail pages
- Filter controls by category, family, and significance
- Zoom controls for time periods

### Interactive Maps
- Base map of Tug Fork region
- Toggleable layers:
  - Property boundaries
  - Battle sites
  - Family homes
  - Travel routes
  - Modern landmarks
- Time slider to show changes over time
- Clickable locations linking to detail pages

### Search Functionality
- Full-text search across all content
- Filters by content type (person, event, location, document)
- Date range filtering
- Advanced search options
- Search results with preview snippets

### Citation Generator
- Chicago Manual of Style format
- Select content to cite
- Generate formatted citations
- Copy to clipboard functionality
- Export bibliography options

## Data Structure

### People Data Schema
```
{
  "id": "unique_identifier",
  "name": {
    "first": "First name",
    "middle": "Middle name",
    "last": "Last name",
    "nickname": "Nickname"
  },
  "vitals": {
    "birth": {
      "date": "YYYY-MM-DD",
      "location": "location_id",
      "source": "source_id"
    },
    "death": {
      "date": "YYYY-MM-DD",
      "location": "location_id",
      "cause": "Cause of death",
      "source": "source_id"
    }
  },
  "family": {
    "clan": "Hatfield|McCoy",
    "parents": ["person_id", "person_id"],
    "siblings": ["person_id", "person_id"],
    "spouses": [{
      "person_id": "person_id",
      "marriage_date": "YYYY-MM-DD",
      "marriage_location": "location_id",
      "marriage_source": "source_id",
      "divorce_date": "YYYY-MM-DD",
      "divorce_source": "source_id"
    }],
    "children": ["person_id", "person_id"]
  },
  "events": ["event_id", "event_id"],
  "biography": "Markdown text with citations",
  "sources": ["source_id", "source_id"],
  "images": ["image_id", "image_id"]
}
```

### Events Data Schema
```
{
  "id": "unique_identifier",
  "title": "Event title",
  "date": {
    "start": "YYYY-MM-DD",
    "end": "YYYY-MM-DD",
    "precision": "exact|year|month|approximate"
  },
  "location": "location_id",
  "description": "Markdown text with citations",
  "people_involved": ["person_id", "person_id"],
  "significance": "high|medium|low",
  "category": "battle|legal|personal|economic|social|political",
  "period": "original_feud|20th_century_legacy",
  "sources": ["source_id", "source_id"],
  "images": ["image_id", "image_id"],
  "documents": ["document_id", "document_id"]
}
```

### Locations Data Schema
```
{
  "id": "unique_identifier",
  "name": "Location name",
  "type": "home|battle_site|courthouse|natural_feature|town",
  "coordinates": {
    "latitude": 0.0,
    "longitude": 0.0
  },
  "modern_address": "Current address if applicable",
  "description": "Markdown text with citations",
  "historical_owners": [{
    "person_id": "person_id",
    "start_date": "YYYY-MM-DD",
    "end_date": "YYYY-MM-DD",
    "source": "source_id"
  }],
  "events": ["event_id", "event_id"],
  "current_status": "preserved|modified|destroyed|unknown",
  "sources": ["source_id", "source_id"],
  "images": [{
    "image_id": "image_id",
    "date": "YYYY-MM-DD",
    "description": "Image description"
  }]
}
```

### Sources Data Schema
```
{
  "id": "unique_identifier",
  "title": "Source title",
  "type": "newspaper|legal_document|letter|diary|book|article|interview|census|photograph",
  "date": "YYYY-MM-DD",
  "creator": "Author/creator name",
  "repository": "Archive/library/collection name",
  "repository_id": "Call number or identifier",
  "url": "Digital access URL if available",
  "access_date": "YYYY-MM-DD",
  "citation_chicago": "Formatted Chicago style citation",
  "transcription": "Full text if available",
  "description": "Source description and context",
  "reliability": "primary|secondary|tertiary",
  "related_people": ["person_id", "person_id"],
  "related_events": ["event_id", "event_id"],
  "related_locations": ["location_id", "location_id"]
}
```

## Responsive Design Breakpoints

- Mobile: 320px - 480px
- Tablet: 481px - 768px
- Laptop: 769px - 1024px
- Desktop: 1025px - 1200px
- Large Desktop: 1201px and above

## Typography Implementation

- Headings: Playfair Display (weights: 400, 700, 900)
- Body Text: Source Serif Pro (weights: 400, 600)
- UI Elements: Lato (weights: 300, 400, 700)
- Document Excerpts: IBM Plex Mono (weights: 400)

## Color Palette

- Primary Background: #F8F5F0 (cream paper)
- Secondary Background: #E8E2D6 (aged paper)
- Primary Text: #2B2522 (dark brown)
- Secondary Text: #5D534A (medium brown)
- Accent 1: #8B2E16 (rust red - Hatfield association)
- Accent 2: #2B5540 (forest green - McCoy association)
- Accent 3: #7D6C55 (taupe - neutral/historical)
- UI Highlight: #C87D55 (copper)
- UI Background: #F2EDE4 (light cream)
- Timeline Background: #E5DFD3 (parchment)

## File Organization

```
hatfield-mccoy-project/
├── index.html
├── css/
│   ├── main.css
│   ├── typography.css
│   ├── responsive.css
│   ├── timeline.css
│   ├── maps.css
│   └── gallery.css
├── js/
│   ├── main.js
│   ├── timeline.js
│   ├── maps.js
│   ├── search.js
│   ├── citation.js
│   └── data-loader.js
├── images/
│   ├── people/
│   ├── locations/
│   ├── documents/
│   ├── ui/
│   └── gallery/
├── documents/
│   ├── newspapers/
│   ├── legal/
│   ├── letters/
│   ├── census/
│   └── interviews/
├── data/
│   ├── people.json
│   ├── events.json
│   ├── locations.json
│   ├── sources.json
│   └── relationships.json
├── pages/
│   ├── research-portal.html
│   ├── timeline.html
│   ├── people.html
│   ├── locations.html
│   ├── primary-sources.html
│   ├── gallery.html
│   ├── analysis.html
│   ├── family-stories.html
│   └── resources.html
└── templates/
    ├── person-template.html
    ├── event-template.html
    ├── location-template.html
    └── document-template.html
```

This structure provides a comprehensive framework for developing the Hatfield-McCoy feud research website, ensuring all requirements are addressed in an organized and efficient manner.
