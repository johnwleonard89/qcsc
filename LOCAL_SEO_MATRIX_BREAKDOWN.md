# Local SEO Matrix Structure Breakdown

## Overview
This document breaks down the new local SEO matrix system into manageable sections, explaining each page type and how they interconnect with internal backlinking.

---

## Page Type 1: County Service Pages
**URL Pattern:** `/services/{service-slug}/{county-name}-county-{state}/`
**Example:** `/services/garage-floor-epoxy/hamilton-county-oh/`

### Purpose
- Target broad county-level searches
- H1: "{Service Name} {County Name} County, {State}"
- Serve as hub pages for all cities within that county

### Content Structure
1. **Service Overview** - What the service is + county-specific benefits
2. **County Coverage Grid** - Links to all city-service combinations within county
3. **Process Steps** - How we deliver the service
4. **Applications** - Where the service is used
5. **Related Services** - Links to other services in same county
6. **Related Counties** - Links to same service in nearby counties

### Internal Linking Strategy
- **Links OUT to:** All city-service pages within the county (25-30 links per page)
- **Links TO:** Related service-county combinations, main service pages
- **Backlinks FROM:** City pages, main service pages, related county pages

---

## Page Type 2: City Service Pages  
**URL Pattern:** `/services/{service-slug}/{city-name}-{state}/`
**Example:** `/services/garage-floor-epoxy/cincinnati-oh/`

### Purpose
- Target hyper-local city + service searches
- H1: "{Service Name} {City Name}, {State}"
- Most specific landing pages for local intent

### Content Structure
1. **Local Introduction** - City-specific service description
2. **Service Benefits** - Why this service works in this city
3. **Local Projects** - Completed work in the city
4. **Process Steps** - Service delivery process
5. **Why Choose Us** - Local reputation and proximity
6. **Testimonials** - Reviews from city residents
7. **Contact Form** - Lead capture

### Internal Linking Strategy
- **Links OUT to:** Related services in same city, nearby cities
- **Links TO:** County page, main service page
- **Backlinks FROM:** County service page, blog posts, main service pages

---

## Page Type 3: Main Service Pages (Already Exist)
**URL Pattern:** `/services/{service-slug}/`
**Example:** `/services/garage-floor-epoxy/`

### Purpose
- Target general service searches
- Serve as hub for all location-specific service pages
- Provide comprehensive service information

### Enhanced Internal Linking
- **Links OUT to:** All county-service and major city-service pages
- **Related Services Section** - Cross-link between services
- **Service Areas Section** - Link to major county/city combinations

---

## Page Type 4: Location Hub Pages (Enhance Existing)
**URL Pattern:** `/service-areas/{state}/{location}/`
**Example:** `/service-areas/ohio/hamilton-county/`

### Purpose
- Target location-based searches
- Serve as directory for all services in that location

### Enhanced Internal Linking
- **Links OUT to:** All service-location combinations for that area
- **Services Grid** - Link to each service offered in the area
- **Nearby Areas** - Link to adjacent counties/cities

---

## Manageable Implementation Sections

### Section 1: County-Service Matrix (75 pages)
**Task:** Generate all county + service combination pages
- 5 services × 15 counties = 75 pages
- Each page links to 8-15 city pages within that county
- Primary internal linking hub for county-level SEO

**Template:** `CountyServiceTemplate.astro` (✅ Created)
**Data Source:** `/src/data/locations.ts` (✅ Created)

### Section 2: City-Service Matrix (250+ pages) 
**Task:** Generate all city + service combination pages
- 5 services × 50+ cities = 250+ pages
- Most granular level for local SEO
- High-conversion landing pages

**Template:** `CityServiceTemplate.astro` (⏳ Pending)
**Data Source:** `/src/data/locations.ts` (✅ Created)

### Section 3: Enhanced Main Service Pages
**Task:** Add county/city service linking sections to existing service pages
- Update 5 main service pages
- Add "Service Areas" sections with county/city grids
- Enhance Related Services sections

**Files to Update:**
- `/src/pages/services/garage-floor-epoxy.astro`
- `/src/pages/services/metallic-epoxy-flooring.astro` 
- `/src/pages/services/basement-floor-coating.astro`
- `/src/pages/services/polyaspartic-coating.astro`
- `/src/pages/services/commercial-concrete-coating.astro`

### Section 4: Enhanced Location Hub Pages
**Task:** Update existing location pages with service grids
- Add comprehensive service offerings sections
- Link to new service-location combinations
- Enhance Related Areas sections

### Section 5: Cross-Linking Integration
**Task:** Add backlinks throughout existing site
- Blog posts link to relevant service-location pages
- Homepage links to major service-location combinations
- Footer includes major location-service links

---

## Internal Linking Flow Diagram

```
Homepage
    ↓
Main Service Pages (/services/garage-floor-epoxy/)
    ↓
County Service Pages (/services/garage-floor-epoxy/hamilton-county-oh/)
    ↓
City Service Pages (/services/garage-floor-epoxy/cincinnati-oh/)
```

### Cross-Linking Pattern
```
County Page → Links to all Cities in County (15-30 links)
City Page → Links back to County + nearby Cities (5-8 links)
Service Page → Links to major Counties/Cities (10-15 links)
Location Page → Links to all Services in Area (5 links)
```

---

## SEO Benefits of This Structure

### 1. **Keyword Targeting**
- County pages target: "garage floor epoxy hamilton county ohio"
- City pages target: "garage floor epoxy cincinnati ohio"
- Captures both broad and hyper-local search intent

### 2. **Internal Link Equity Distribution**
- Main service pages pass authority to county pages
- County pages distribute authority to city pages
- City pages reinforce county and service page authority

### 3. **Content Depth & Relevance**
- Each page provides specific local information
- Addresses local landmarks, climate, building types
- Creates topical authority for each location

### 4. **User Experience**
- Clear navigation from general to specific
- Location-relevant content and testimonials
- Local contact information and service details

---

## Next Steps Implementation Order

1. **Complete CityServiceTemplate.astro** (Section 2)
2. **Generate all County-Service pages** (Section 1) 
3. **Generate all City-Service pages** (Section 2)
4. **Update Main Service pages** (Section 3)
5. **Enhance Location Hub pages** (Section 4)
6. **Implement Cross-Linking** (Section 5)
7. **Update Sitemap** with all new pages
8. **Test Internal Link Structure** for proper flow

---

## Internal Linking Density Targets

### County Service Pages
- **Outbound Links:** 20-35 (cities + related services/counties)
- **Inbound Links:** 15-25 (from cities + main service + related)

### City Service Pages  
- **Outbound Links:** 8-12 (related services + nearby cities + county)
- **Inbound Links:** 3-5 (from county + main service + blog)

### Main Service Pages
- **Outbound Links:** 25-40 (major counties/cities + related services)
- **Inbound Links:** 100+ (from all location combinations)

This creates a robust internal linking network that distributes authority effectively while providing clear navigation paths for users and search engines.