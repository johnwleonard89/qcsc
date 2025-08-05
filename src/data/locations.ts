// Location data for service-location matrix pages

export interface County {
  name: string;
  state: string;
  stateAbbr: string;
  population: string;
  cities: string[];
  landmarks: string[];
  zipCodes: string[];
  description: string;
}

export interface City {
  name: string;
  state: string;
  stateAbbr: string;
  county: string;
  population: string;
  landmarks: string[];
  neighborhoods: string[];
  zipCodes: string[];
  description: string;
}

export interface Service {
  name: string;
  slug: string;
  description: string;
  benefits: string[];
  process: string[];
  applications: string[];
}

export const services: Record<string, Service> = {
  'garage-floor-epoxy': {
    name: 'Garage Floor Epoxy',
    slug: 'garage-floor-epoxy',
    description: 'Professional garage floor epoxy coating that transforms ordinary concrete into durable, attractive surfaces.',
    benefits: [
      'Chemical & Stain Resistance',
      'Easy Maintenance & Cleaning',
      'Enhanced Durability',
      'Professional Appearance',
      'Increased Property Value'
    ],
    process: [
      'Surface Preparation',
      'Primer Application',
      'Base Coat Installation',
      'Decorative Elements',
      'Topcoat Sealing'
    ],
    applications: ['Residential Garages', 'Workshop Floors', 'Collector Car Storage']
  },
  'metallic-epoxy-flooring': {
    name: 'Metallic Epoxy Flooring',
    slug: 'metallic-epoxy-flooring',
    description: 'Stunning decorative flooring with unique metallic effects and artistic patterns.',
    benefits: [
      'Unique Artistic Patterns',
      'Premium Aesthetic Appeal',
      'Seamless Installation',
      'Commercial Grade Durability',
      'UV Stable Finish'
    ],
    process: [
      'Surface Preparation',
      'Primer Application',
      'Metallic Base Coat',
      'Artistic Pattern Creation',
      'Protective Topcoat'
    ],
    applications: ['Showroom Floors', 'High-End Basements', 'Commercial Spaces']
  },
  'basement-floor-coating': {
    name: 'Basement Floor Coating',
    slug: 'basement-floor-coating',
    description: 'Moisture-resistant basement flooring that creates comfortable, functional living spaces.',
    benefits: [
      'Moisture Protection',
      'Mold & Mildew Resistance',
      'Enhanced Lighting',
      'Easy Maintenance',
      'Usable Living Space'
    ],
    process: [
      'Moisture Assessment',
      'Surface Preparation',
      'Moisture Barrier Application',
      'Base Coat Installation',
      'Finish Coating'
    ],
    applications: ['Recreation Rooms', 'Home Gyms', 'Storage Areas']
  },
  'commercial-concrete-coating': {
    name: 'Commercial Concrete Coating',
    slug: 'commercial-concrete-coating',
    description: 'Heavy-duty industrial coatings for warehouses, manufacturing, and commercial facilities.',
    benefits: [
      'Heavy-Duty Durability',
      'Chemical Resistance',
      'Safety Compliance',
      'Easy Maintenance',
      'Professional Appearance'
    ],
    process: [
      'Site Assessment',
      'Industrial Preparation',
      'Heavy-Duty Primer',
      'Commercial Base System',
      'Performance Topcoat'
    ],
    applications: ['Warehouses', 'Manufacturing Facilities', 'Retail Spaces']
  },
  'flake-systems': {
    name: 'Flake Systems',
    slug: 'flake-systems',
    description: 'Decorative concrete coating systems with colored flakes for texture and visual appeal.',
    benefits: [
      'Slip-Resistant Texture',
      'Hide Surface Imperfections',
      'Customizable Color Options',
      'Durable Protection',
      'Easy Maintenance'
    ],
    process: [
      'Surface Preparation',
      'Base Coat Application',
      'Flake Broadcasting',
      'Excess Flake Removal',
      'Protective Topcoat'
    ],
    applications: ['Garage Floors', 'Basement Floors', 'Commercial Spaces']
  },
  'natural-stone-reproductions': {
    name: 'Natural Stone Reproductions',
    slug: 'natural-stone-reproductions',
    description: 'Advanced coating systems that replicate the look and texture of natural stone surfaces.',
    benefits: [
      'Authentic Stone Appearance',
      'Cost-Effective Alternative',
      'Seamless Installation',
      'Weather Resistant',
      'Low Maintenance'
    ],
    process: [
      'Surface Preparation',
      'Base Texture Application',
      'Color Pattern Creation',
      'Texture Enhancement',
      'Protective Sealing'
    ],
    applications: ['Patios', 'Pool Decks', 'Interior Floors']
  },
  'textured-concrete-finishes': {
    name: 'Textured Concrete Finishes',
    slug: 'textured-concrete-finishes',
    description: 'Specialized textured coatings that add depth, character, and functionality to concrete surfaces.',
    benefits: [
      'Enhanced Slip Resistance',
      'Unique Visual Appeal',
      'Surface Protection',
      'Weather Durability',
      'Custom Texture Options'
    ],
    process: [
      'Surface Preparation',
      'Primer Application',
      'Texture Base Coat',
      'Pattern Development',
      'Protective Finish'
    ],
    applications: ['Walkways', 'Driveways', 'Commercial Floors']
  },
  'concrete-repair': {
    name: 'Concrete Repair',
    slug: 'concrete-repair',
    description: 'Professional concrete restoration and repair services to extend surface life and performance.',
    benefits: [
      'Structural Restoration',
      'Cost-Effective Solution',
      'Long-Term Protection',
      'Safety Improvement',
      'Property Value Preservation'
    ],
    process: [
      'Damage Assessment',
      'Surface Preparation',
      'Repair Material Application',
      'Surface Leveling',
      'Protective Coating'
    ],
    applications: ['Cracked Concrete', 'Spalled Surfaces', 'Structural Repairs']
  },
  'pressure-washing-protection': {
    name: 'Pressure Washing & Protection',
    slug: 'pressure-washing-protection',
    description: 'Professional cleaning and protective treatments to maintain and enhance concrete surfaces.',
    benefits: [
      'Deep Surface Cleaning',
      'Stain Removal',
      'Mold & Mildew Prevention',
      'Extended Surface Life',
      'Enhanced Appearance'
    ],
    process: [
      'Surface Assessment',
      'Pre-Treatment Application',
      'High-Pressure Cleaning',
      'Surface Preparation',
      'Protective Coating'
    ],
    applications: ['Driveways', 'Sidewalks', 'Commercial Properties']
  },
  'retail-flooring': {
    name: 'Retail Flooring',
    slug: 'retail-flooring',
    description: 'Commercial-grade flooring solutions designed for high-traffic retail environments.',
    benefits: [
      'High-Traffic Durability',
      'Professional Appearance',
      'Easy Maintenance',
      'Slip Resistance',
      'Brand Enhancement'
    ],
    process: [
      'Store Assessment',
      'Surface Preparation',
      'Commercial-Grade Primer',
      'Base System Application',
      'Performance Topcoat'
    ],
    applications: ['Retail Stores', 'Shopping Centers', 'Showrooms']
  },
  'warehouse-flooring': {
    name: 'Warehouse Flooring',
    slug: 'warehouse-flooring',
    description: 'Heavy-duty industrial flooring systems for warehouse and distribution facilities.',
    benefits: [
      'Forklift Traffic Resistance',
      'Chemical Resistance',
      'Dust-Free Surface',
      'Easy Cleaning',
      'Safety Compliance'
    ],
    process: [
      'Facility Assessment',
      'Industrial Preparation',
      'Heavy-Duty Base System',
      'Traffic Zone Coating',
      'Line Marking Application'
    ],
    applications: ['Warehouses', 'Distribution Centers', 'Storage Facilities']
  },
  'office-flooring': {
    name: 'Office Flooring',
    slug: 'office-flooring',
    description: 'Professional office flooring solutions that combine durability with aesthetic appeal.',
    benefits: [
      'Professional Appearance',
      'Low Maintenance',
      'Sound Dampening',
      'Chemical Resistance',
      'Long-Term Durability'
    ],
    process: [
      'Office Space Assessment',
      'Surface Preparation',
      'Sound-Dampening Primer',
      'Base Coat Application',
      'Finish Coat Installation'
    ],
    applications: ['Corporate Offices', 'Medical Facilities', 'Professional Buildings']
  },
  'manufacturing-flooring': {
    name: 'Manufacturing Flooring',
    slug: 'manufacturing-flooring',
    description: 'Industrial-strength flooring systems designed for manufacturing and production environments.',
    benefits: [
      'Chemical Resistance',
      'Heavy Machinery Support',
      'Anti-Static Properties',
      'Easy Decontamination',
      'Safety Compliance'
    ],
    process: [
      'Facility Analysis',
      'Industrial Surface Prep',
      'Chemical-Resistant Primer',
      'Heavy-Duty Base System',
      'Specialized Topcoat'
    ],
    applications: ['Manufacturing Plants', 'Production Facilities', 'Assembly Lines']
  },
  'food-beverage-flooring': {
    name: 'Food & Beverage Flooring',
    slug: 'food-beverage-flooring',
    description: 'FDA-compliant flooring systems for food processing and beverage production facilities.',
    benefits: [
      'FDA Compliance',
      'Antimicrobial Properties',
      'Chemical Resistance',
      'Easy Sanitization',
      'Thermal Shock Resistance'
    ],
    process: [
      'Regulatory Assessment',
      'Sanitization Preparation',
      'FDA-Compliant Primer',
      'Antimicrobial Base System',
      'Food-Safe Topcoat'
    ],
    applications: ['Food Processing', 'Commercial Kitchens', 'Beverage Production']
  },
  'automotive-flooring': {
    name: 'Automotive Flooring',
    slug: 'automotive-flooring',
    description: 'Specialized flooring solutions for automotive service facilities and showrooms.',
    benefits: [
      'Oil & Chemical Resistance',
      'Heavy Vehicle Support',
      'Easy Cleanup',
      'Professional Appearance',
      'Safety Compliance'
    ],
    process: [
      'Facility Assessment',
      'Oil Stain Treatment',
      'Chemical-Resistant Primer',
      'Heavy-Duty Base System',
      'Automotive-Grade Topcoat'
    ],
    applications: ['Auto Repair Shops', 'Car Dealerships', 'Service Centers']
  },
  'industrial-flooring': {
    name: 'Industrial Flooring',
    slug: 'industrial-flooring',
    description: 'Comprehensive industrial flooring solutions for demanding industrial environments.',
    benefits: [
      'Extreme Durability',
      'Chemical Resistance',
      'Heavy Load Capacity',
      'Safety Features',
      'Long Service Life'
    ],
    process: [
      'Industrial Assessment',
      'Mechanical Preparation',
      'Industrial-Grade Primer',
      'Heavy-Duty Base System',
      'Performance Topcoat'
    ],
    applications: ['Industrial Plants', 'Heavy Manufacturing', 'Chemical Facilities']
  },
  'residential': {
    name: 'Residential Services',
    slug: 'residential',
    description: 'Comprehensive residential concrete coating solutions for homes and personal spaces.',
    benefits: [
      'Enhanced Home Value',
      'Personalized Design',
      'Family-Safe Materials',
      'Long-Term Durability',
      'Easy Maintenance'
    ],
    process: [
      'Home Assessment',
      'Surface Preparation',
      'Residential-Grade Primer',
      'Custom Base System',
      'Protective Finish'
    ],
    applications: ['Garages', 'Basements', 'Patios']
  },
  'commercial': {
    name: 'Commercial Services',
    slug: 'commercial',
    description: 'Professional commercial concrete coating solutions for business environments.',
    benefits: [
      'Business Continuity',
      'Professional Image',
      'Safety Compliance',
      'Minimal Downtime',
      'Cost-Effective Solution'
    ],
    process: [
      'Business Assessment',
      'Scheduled Installation',
      'Commercial-Grade Systems',
      'Quality Assurance',
      'Final Inspection'
    ],
    applications: ['Offices', 'Retail', 'Restaurants']
  },
  'decorative-options': {
    name: 'Decorative Options',
    slug: 'decorative-options',
    description: 'Artistic and decorative concrete coating systems for enhanced aesthetic appeal.',
    benefits: [
      'Custom Design Options',
      'Artistic Appeal',
      'Unique Patterns',
      'Enhanced Property Value',
      'Professional Installation'
    ],
    process: [
      'Design Consultation',
      'Pattern Selection',
      'Artistic Application',
      'Detail Enhancement',
      'Protective Finishing'
    ],
    applications: ['Showrooms', 'Luxury Homes', 'Commercial Spaces']
  }
};

export const counties: Record<string, County> = {
  'hamilton-county-ohio': {
    name: 'Hamilton',
    state: 'Ohio',
    stateAbbr: 'OH',
    population: '817,473',
    cities: [
      'Cincinnati', 'Springdale', 'Forest Park', 'Sharonville', 'Blue Ash',
      'Montgomery', 'Norwood', 'Reading', 'Deer Park', 'Evendale',
      'Golf Manor', 'Wyoming', 'Silverton', 'Madeira', 'Indian Hill'
    ],
    landmarks: [
      'Downtown Cincinnati', 'University of Cincinnati', 'Cincinnati Zoo',
      'Fountain Square', 'Great American Ball Park', 'Paul Brown Stadium',
      'Cincinnati Museum Center', 'Eden Park', 'Mount Adams'
    ],
    zipCodes: [
      '45201', '45202', '45203', '45204', '45205', '45206', '45207',
      '45208', '45209', '45211', '45212', '45213', '45214', '45215',
      '45216', '45217', '45218', '45219', '45220', '45221', '45222',
      '45223', '45224', '45225', '45226', '45227', '45229', '45230',
      '45231', '45232', '45233', '45234', '45235', '45236', '45237',
      '45238', '45239', '45240', '45241', '45242', '45243', '45244',
      '45245', '45246', '45247', '45248', '45249', '45250', '45251',
      '45252', '45253', '45254', '45255', '45999'
    ],
    description: 'Hamilton County is Ohio\'s third-most populous county, home to Cincinnati and numerous thriving suburban communities. Queen City Surface Coatings provides comprehensive concrete coating services throughout all Hamilton County municipalities.'
  },
  'butler-county-ohio': {
    name: 'Butler',
    state: 'Ohio',
    stateAbbr: 'OH',
    population: '390,357',
    cities: [
      'Hamilton', 'Fairfield', 'Middletown', 'West Chester', 'Mason',
      'Springboro', 'Monroe', 'Trenton', 'Oxford', 'Ross',
      'New Miami', 'Carlisle', 'Lemon'
    ],
    landmarks: [
      'Miami University', 'Voice of America MetroParks', 'Kings Island',
      'Pyramid Hill Sculpture Park', 'Butler County Courthouse',
      'Fitton Center for Creative Arts', 'EnterTRAINment Junction'
    ],
    zipCodes: [
      '45005', '45011', '45013', '45014', '45030', '45040', '45042',
      '45044', '45050', '45056', '45062', '45065', '45067', '45069'
    ],
    description: 'Butler County is a rapidly growing area north of Cincinnati, featuring thriving communities and major attractions. Queen City Surface Coatings serves all Butler County residents and businesses with professional concrete coating solutions.'
  },
  'warren-county-ohio': {
    name: 'Warren',
    state: 'Ohio',
    stateAbbr: 'OH',
    population: '242,337',
    cities: [
      'Mason', 'Springboro', 'Franklin', 'Lebanon', 'Loveland',
      'Waynesville', 'Carlisle', 'Miamisburg', 'Centerville'
    ],
    landmarks: [
      'Kings Island', 'Little Miami River', 'Fort Ancient',
      'Warren County Historical Society', 'Caesar Creek State Park',
      'Lebanon Raceway', 'Glendower Historic Mansion'
    ],
    zipCodes: [
      '45036', '45039', '45040', '45065', '45066', '45068', '45140'
    ],
    description: 'Warren County offers a perfect blend of suburban growth and natural beauty. Queen City Surface Coatings provides expert concrete coating services throughout Warren County\'s communities and rural areas.'
  },
  'kenton-county-kentucky': {
    name: 'Kenton',
    state: 'Kentucky',
    stateAbbr: 'KY',
    population: '169,064',
    cities: [
      'Covington', 'Independence', 'Fort Wright', 'Erlanger',
      'Fort Mitchell', 'Villa Hills', 'Edgewood', 'Florence',
      'Crescent Springs', 'Lakeside Park', 'Park Hills'
    ],
    landmarks: [
      'Northern Kentucky University', 'Devou Park', 'Roebling Suspension Bridge',
      'Florence Freedom Baseball', 'MainStrasse Village', 'Turfway Park',
      'Cincinnati/Northern Kentucky International Airport'
    ],
    zipCodes: [
      '41011', '41015', '41016', '41017', '41018', '41019', '41022',
      '41051', '41071', '41075', '41076'
    ],
    description: 'Kenton County is Northern Kentucky\'s most populous county, featuring historic Covington and rapidly growing suburban communities. Queen City Surface Coatings serves all Kenton County areas with professional concrete coating expertise.'
  },
  'campbell-county-kentucky': {
    name: 'Campbell',
    state: 'Kentucky', 
    stateAbbr: 'KY',
    population: '93,076',
    cities: [
      'Newport', 'Fort Thomas', 'Bellevue', 'Dayton', 'Highland Heights',
      'Cold Spring', 'Wilder', 'Southgate', 'Silver Grove', 'Woodlawn'
    ],
    landmarks: [
      'Newport Aquarium', 'Newport on the Levee', 'Fort Thomas Military Reservation',
      'Purple People Bridge', 'Campbell County Courthouse', 'Licking River'
    ],
    zipCodes: [
      '41011', '41014', '41015', '41017', '41071', '41073', '41074', '41099'
    ],
    description: 'Campbell County combines historic river towns with modern suburban communities along the Ohio River. Queen City Surface Coatings provides comprehensive concrete coating services throughout Campbell County.'
  }
};

export const cities: Record<string, City> = {
  'cincinnati-ohio': {
    name: 'Cincinnati',
    state: 'Ohio',
    stateAbbr: 'OH',
    county: 'Hamilton',
    population: '309,317',
    landmarks: [
      'Downtown Cincinnati', 'Fountain Square', 'Great American Ball Park',
      'Paul Brown Stadium', 'Cincinnati Zoo', 'Cincinnati Museum Center',
      'Eden Park', 'Mount Adams', 'Over-the-Rhine', 'Findlay Market'
    ],
    neighborhoods: [
      'Hyde Park', 'Over-the-Rhine', 'Clifton', 'Mount Adams', 'Oakley',
      'Northside', 'Price Hill', 'Westwood', 'East Walnut Hills', 'Madisonville'
    ],
    zipCodes: [
      '45201', '45202', '45203', '45204', '45205', '45206', '45207',
      '45208', '45209', '45211', '45212', '45213', '45214', '45215',
      '45216', '45217', '45218', '45219', '45220', '45221', '45222',
      '45223', '45224', '45225', '45226', '45227', '45229', '45230',
      '45231', '45232', '45233', '45234', '45235', '45236', '45237',
      '45238', '45239', '45240', '45241', '45999'
    ],
    description: 'Cincinnati is Ohio\'s third-largest city and the economic hub of the tri-state area. Queen City Surface Coatings proudly serves all Cincinnati neighborhoods with professional concrete coating services, from historic Over-the-Rhine to suburban Hyde Park.'
  },
  'mason-ohio': {
    name: 'Mason',
    state: 'Ohio',
    stateAbbr: 'OH',
    county: 'Warren',
    population: '34,792',
    landmarks: [
      'Kings Island', 'Mason Community Center', 'Heritage Club Golf Course',
      'Snider Park', 'Mason Historical Society', 'The Beach Waterpark',
      'Deerfield Towne Center', 'Mason Municipal Center'
    ],
    neighborhoods: [
      'Deerfield Township', 'Kings Mills', 'South Lebanon', 'Hunter\'s Run',
      'Waterstone', 'Palmetto Pines', 'Western Row'
    ],
    zipCodes: ['45040', '45039'],
    description: 'Mason is a thriving Warren County community known for Kings Island and excellent schools. Queen City Surface Coatings provides premier concrete coating services throughout Mason and surrounding Deerfield Township areas.'
  },
  'west-chester-ohio': {
    name: 'West Chester',
    state: 'Ohio',
    stateAbbr: 'OH',
    county: 'Butler',
    population: '63,914',
    landmarks: [
      'West Chester Hospital', 'Voice of America MetroParks', 'Lakota Local Schools',
      'Union Centre Boulevard', 'Tylersville Road', 'Liberty Center',
      'Cincinnati Premium Outlets', 'Beckett Ridge Golf Club'
    ],
    neighborhoods: [
      'Union Centre', 'Beckett Ridge', 'Lakota Hills', 'Four Bridges',
      'Wetherington', 'Liberty Township', 'Tylersville'
    ],
    zipCodes: ['45069', '45011', '45040'],
    description: 'West Chester Township is one of Ohio\'s fastest-growing communities, featuring upscale residential and commercial development. Queen City Surface Coatings serves all West Chester areas with premium concrete coating solutions.'
  },
  'covington-kentucky': {
    name: 'Covington',
    state: 'Kentucky',
    stateAbbr: 'KY',
    county: 'Kenton',
    population: '40,181',
    landmarks: [
      'Roebling Suspension Bridge', 'MainStrasse Village', 'Devou Park',
      'Cathedral Basilica of the Assumption', 'Northern Kentucky Convention Center',
      'IRS Building', 'Historic Licking Riverside', 'Covington Landing'
    ],
    neighborhoods: [
      'MainStrasse', 'Westside', 'Eastside', 'Licking Riverside', 
      'Helentown', 'Monte Casino', 'Peaselburg', 'Austinburg'
    ],
    zipCodes: ['41011', '41012', '41014', '41015', '41016', '41017', '41018', '41019'],
    description: 'Covington is Northern Kentucky\'s largest city, featuring historic architecture and modern riverfront development. Queen City Surface Coatings provides expert concrete coating services throughout all Covington neighborhoods and commercial districts.'
  },
  'florence-kentucky': {
    name: 'Florence',
    state: 'Kentucky',
    stateAbbr: 'KY',
    county: 'Boone',
    population: '32,721',
    landmarks: [
      'Florence Mall', 'Turfway Park', 'Florence Nature Park',
      'Boone County Courthouse', 'CVG Airport', 'Florence Government Center',
      'Kroger Field at Papa John\'s Cardinal Stadium'
    ],
    neighborhoods: [
      'Turfway', 'Burlington Pike', 'Mall Road', 'Ewing Boulevard',
      'Mount Zion Road', 'Industrial Road', 'Connector Road'
    ],
    zipCodes: ['41022', '41042'],
    description: 'Florence is a major Boone County city and shopping destination in Northern Kentucky. Queen City Surface Coatings serves all Florence residential and commercial properties with professional concrete coating expertise.'
  }
};

// Helper functions
export function getCountySlug(county: County): string {
  return `${county.name.toLowerCase()}-county-${county.stateAbbr.toLowerCase()}`;
}

export function getCitySlug(city: City): string {
  return `${city.name.toLowerCase().replace(/\s+/g, '-')}-${city.stateAbbr.toLowerCase()}`;
}

export function getServiceUrl(serviceSlug: string, locationSlug: string): string {
  return `/services/${serviceSlug}/${locationSlug}/`;
}

export function getAllCountyServiceCombinations(): Array<{service: Service, county: County, slug: string}> {
  const combinations = [];
  
  Object.values(services).forEach(service => {
    Object.values(counties).forEach(county => {
      combinations.push({
        service,
        county,
        slug: `${service.slug}/${getCountySlug(county)}`
      });
    });
  });
  
  return combinations;
}

export function getAllCityServiceCombinations(): Array<{service: Service, city: City, slug: string}> {
  const combinations = [];
  
  Object.values(services).forEach(service => {
    Object.values(cities).forEach(city => {
      combinations.push({
        service,
        city,
        slug: `${service.slug}/${getCitySlug(city)}`
      });
    });
  });
  
  return combinations;
}