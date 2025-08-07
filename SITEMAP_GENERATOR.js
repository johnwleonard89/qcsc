// Automated Sitemap Generator for Queen City Surface Coatings
// This script generates a comprehensive sitemap including all location-specific content

import { ohioCities } from './src/data/cities/ohio.js';
import { kentuckyCities } from './src/data/cities/kentucky.js';
import { indianaCities } from './src/data/cities/indiana.js';
import { getCollection } from 'astro:content';
import fs from 'fs';

const BASE_URL = 'https://queencitysurfacecoatings.com';
const TODAY = new Date().toISOString().split('T')[0];

class SitemapGenerator {
  constructor() {
    this.urls = [];
    this.allCities = { ...ohioCities, ...kentuckyCities, ...indianaCities };
  }

  // Add URL with priority and change frequency
  addUrl(loc, lastmod = TODAY, changefreq = 'weekly', priority = 0.5) {
    this.urls.push({
      loc: `${BASE_URL}${loc}`,
      lastmod,
      changefreq,
      priority
    });
  }

  // Generate core pages
  generateCorePages() {
    console.log('🏠 Generating core pages...');
    
    // Homepage - highest priority
    this.addUrl('/', TODAY, 'daily', 1.0);
    
    // Main navigation pages
    this.addUrl('/company/about/', TODAY, 'weekly', 0.9);
    this.addUrl('/company/contact/', TODAY, 'daily', 0.9);
    this.addUrl('/company/legal/', TODAY, 'monthly', 0.5);
    this.addUrl('/services/', TODAY, 'weekly', 0.9);
    this.addUrl('/portfolio/', TODAY, 'weekly', 0.8);
    this.addUrl('/service-areas/', TODAY, 'weekly', 0.9);
    
    // Blog main page
    this.addUrl('/blog/', TODAY, 'daily', 0.8);
    this.addUrl('/blog/tags/', TODAY, 'weekly', 0.6);
  }

  // Generate blog content
  async generateBlogContent() {
    console.log('📝 Generating blog content...');
    
    try {
      const blogPosts = await getCollection('blog');
      
      blogPosts.forEach(post => {
        const priority = this.getBlogPostPriority(post);
        this.addUrl(
          `/blog/${post.slug}/`,
          post.data.publish_date.toISOString().split('T')[0],
          'weekly',
          priority
        );
      });
      
      // Blog tag pages
      const allTags = this.extractUniqueTags(blogPosts);
      allTags.forEach(tag => {
        this.addUrl(`/blog/tags/${tag}/`, TODAY, 'weekly', 0.5);
      });
      
    } catch (error) {
      console.log('⚠️  Blog content not available, using manual entries');
      
      // Manual blog entries for key content
      const keyBlogPosts = [
        'ultimate-guide-garage-floor-coatings-cincinnati',
        'basement-floor-coating-solutions-cincinnati-homes',
        'commercial-concrete-coating-cincinnati-businesses',
        'metallic-epoxy-flooring-cincinnati',
        'polyaspartic-vs-epoxy-cincinnati-weather'
      ];
      
      keyBlogPosts.forEach(slug => {
        this.addUrl(`/blog/${slug}/`, TODAY, 'weekly', 0.8);
      });
    }
  }

  // Generate service pages
  generateServicePages() {
    console.log('🔧 Generating service pages...');
    
    const primaryServices = [
      { slug: 'garage-floor-epoxy', priority: 0.9 },
      { slug: 'basement-floor-coating', priority: 0.9 },
      { slug: 'commercial-concrete-coating', priority: 0.9 },
      { slug: 'metallic-epoxy-flooring', priority: 0.8 },
      { slug: 'industrial-flooring', priority: 0.8 },
      { slug: 'decorative-options', priority: 0.8 },
      { slug: 'flake-systems', priority: 0.7 },
      { slug: 'concrete-repair', priority: 0.8 },
      { slug: 'concrete-polishing', priority: 0.7 },
      { slug: 'coating-systems', priority: 0.7 }
    ];
    
    primaryServices.forEach(service => {
      this.addUrl(`/services/${service.slug}/`, TODAY, 'weekly', service.priority);
    });
    
    // Specialty services
    const specialtyServices = [
      'natural-stone-reproductions',
      'textured-concrete-finishes', 
      'custom-color-metallic-systems',
      'pressure-washing-protection',
      'joint-removal-repair',
      'cove-install'
    ];
    
    specialtyServices.forEach(service => {
      this.addUrl(`/services/${service}/`, TODAY, 'weekly', 0.6);
    });
    
    // Industry-specific services
    const industryServices = [
      'food-beverage-flooring',
      'warehouse-flooring',
      'manufacturing-flooring',
      'office-flooring',
      'retail-flooring',
      'automotive-flooring'
    ];
    
    industryServices.forEach(service => {
      this.addUrl(`/services/${service}/`, TODAY, 'weekly', 0.6);
    });
  }

  // Generate geographic content
  generateGeographicContent() {
    console.log('📍 Generating geographic content...');
    
    // State hub pages
    this.addUrl('/service-areas/ohio/', TODAY, 'weekly', 0.8);
    this.addUrl('/service-areas/kentucky/', TODAY, 'weekly', 0.8);
    this.addUrl('/service-areas/indiana/', TODAY, 'weekly', 0.8);
    
    // County hub pages
    const counties = this.extractCounties();
    counties.forEach(county => {
      this.addUrl(`/service-areas/${county.slug}/`, TODAY, 'weekly', county.priority);
    });
    
    // City pages
    Object.entries(this.allCities).forEach(([cityKey, cityData]) => {
      const priority = this.getCityPriority(cityData);
      const citySlug = this.generateCitySlug(cityData.city);
      
      this.addUrl(`/service-areas/${citySlug}/`, TODAY, 'weekly', priority);
    });
  }

  // Generate service/location combinations
  generateServiceLocationCombinations() {
    console.log('🎯 Generating service/location combinations...');
    
    const highValueServices = ['garage-floor-epoxy', 'basement-floor-coating', 'commercial-concrete-coating'];
    const majorCities = this.getMajorCities();
    
    // Major city + service combinations
    majorCities.forEach(city => {
      highValueServices.forEach(service => {
        const citySlug = this.generateCitySlug(city);
        this.addUrl(`/services/${service}/${citySlug}/`, TODAY, 'weekly', 0.7);
      });
    });
    
    // County + service combinations  
    const majorCounties = this.getMajorCounties();
    majorCounties.forEach(county => {
      highValueServices.forEach(service => {
        this.addUrl(`/services/${service}/${county.slug}/`, TODAY, 'weekly', 0.7);
      });
    });
  }

  // Generate resource and support pages
  generateResourcePages() {
    console.log('📚 Generating resource pages...');
    
    const resourcePages = [
      { slug: 'resources', priority: 0.5 },
      { slug: 'resources/faq', priority: 0.6 },
      { slug: 'resources/maintenance-guide', priority: 0.5 },
      { slug: 'resources/cost-calculator', priority: 0.6 },
      { slug: 'free-estimate', priority: 0.8 },
      { slug: 'military-discount', priority: 0.6 },
      { slug: 'warranty', priority: 0.6 }
    ];
    
    resourcePages.forEach(page => {
      this.addUrl(`/${page.slug}/`, TODAY, 'monthly', page.priority);
    });
  }

  // Helper methods
  getCityPriority(cityData) {
    const population = cityData.population || 0;
    const demographics = cityData.demographics;
    
    if (population > 100000 || demographics === 'major_city') return 0.8;
    if (population > 50000 || demographics === 'luxury') return 0.7;
    if (population > 20000) return 0.6;
    return 0.5;
  }

  getBlogPostPriority(post) {
    const tags = post.data.tags || [];
    const title = post.data.title.toLowerCase();
    
    if (title.includes('ultimate guide') || title.includes('complete guide')) return 0.9;
    if (tags.includes('cincinnati') || title.includes('cincinnati')) return 0.8;
    if (tags.includes('garage floor') || tags.includes('commercial')) return 0.8;
    return 0.7;
  }

  generateCitySlug(cityData) {
    const { name, state } = cityData;
    return `${name.toLowerCase().replace(/\s+/g, '-')}-${state.toLowerCase()}`;
  }

  extractCounties() {
    const counties = new Map();
    
    Object.values(this.allCities).forEach(cityData => {
      const { county, state, stateAbbr } = cityData.city;
      const countyKey = `${county.toLowerCase()}-${state.toLowerCase()}`;
      
      if (!counties.has(countyKey)) {
        counties.set(countyKey, {
          slug: `${county.toLowerCase().replace(/\s+/g, '-')}-county-${stateAbbr.toLowerCase()}`,
          priority: state === 'Ohio' ? 0.8 : (state === 'Kentucky' ? 0.8 : 0.7)
        });
      }
    });
    
    return Array.from(counties.values());
  }

  getMajorCities() {
    return Object.values(this.allCities)
      .filter(city => city.demographics === 'major_city' || (city.population || 0) > 50000)
      .map(city => city.city)
      .slice(0, 15); // Top 15 cities
  }

  getMajorCounties() {
    return [
      { slug: 'hamilton-county-ohio' },
      { slug: 'butler-county-ohio' },
      { slug: 'kenton-county-kentucky' },
      { slug: 'campbell-county-kentucky' },
      { slug: 'boone-county-kentucky' }
    ];
  }

  extractUniqueTags(blogPosts) {
    const tagSet = new Set();
    blogPosts.forEach(post => {
      if (post.data.tags) {
        post.data.tags.forEach(tag => tagSet.add(tag.toLowerCase().replace(/\s+/g, '-')));
      }
    });
    return Array.from(tagSet);
  }

  // Generate XML sitemap
  generateXML() {
    console.log('📄 Generating XML sitemap...');
    
    // Sort URLs by priority (highest first)
    this.urls.sort((a, b) => b.priority - a.priority);
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    this.urls.forEach(url => {
      xml += '    <url>\n';
      xml += `        <loc>${url.loc}</loc>\n`;
      xml += `        <lastmod>${url.lastmod}</lastmod>\n`;
      xml += `        <changefreq>${url.changefreq}</changefreq>\n`;
      xml += `        <priority>${url.priority.toFixed(1)}</priority>\n`;
      xml += '    </url>\n';
    });
    
    xml += '</urlset>';
    
    return xml;
  }

  // Generate and save sitemap
  async generate() {
    console.log('🚀 Starting sitemap generation...');
    
    this.generateCorePages();
    await this.generateBlogContent();
    this.generateServicePages();
    this.generateGeographicContent();
    this.generateServiceLocationCombinations();
    this.generateResourcePages();
    
    const xml = this.generateXML();
    
    // Save sitemap
    fs.writeFileSync('./public/sitemap.xml', xml);
    
    console.log(`✅ Sitemap generated successfully!`);
    console.log(`📊 Total URLs: ${this.urls.length}`);
    console.log(`📁 Saved to: ./public/sitemap.xml`);
    
    // Generate summary report
    this.generateReport();
    
    return xml;
  }

  generateReport() {
    const report = {
      totalUrls: this.urls.length,
      byPriority: {},
      byChangeFreq: {},
      bySection: {
        core: this.urls.filter(u => u.priority === 1.0 || u.loc.includes('/company/')).length,
        services: this.urls.filter(u => u.loc.includes('/services/')).length,
        locations: this.urls.filter(u => u.loc.includes('/service-areas/')).length,
        blog: this.urls.filter(u => u.loc.includes('/blog/')).length,
        resources: this.urls.filter(u => u.loc.includes('/resources/') || u.loc.includes('/free-estimate')).length
      }
    };
    
    // Count by priority
    this.urls.forEach(url => {
      const priority = url.priority.toFixed(1);
      report.byPriority[priority] = (report.byPriority[priority] || 0) + 1;
    });
    
    // Count by change frequency
    this.urls.forEach(url => {
      report.byChangeFreq[url.changefreq] = (report.byChangeFreq[url.changefreq] || 0) + 1;
    });
    
    console.log('\n📈 SITEMAP REPORT:');
    console.log('='.repeat(50));
    console.log(`Total URLs: ${report.totalUrls}`);
    console.log('\nBy Section:');
    Object.entries(report.bySection).forEach(([section, count]) => {
      console.log(`  ${section.charAt(0).toUpperCase() + section.slice(1)}: ${count} URLs`);
    });
    
    console.log('\nBy Priority:');
    Object.entries(report.byPriority)
      .sort(([a], [b]) => parseFloat(b) - parseFloat(a))
      .forEach(([priority, count]) => {
        console.log(`  Priority ${priority}: ${count} URLs`);
      });
    
    console.log('\nBy Update Frequency:');
    Object.entries(report.byChangeFreq).forEach(([freq, count]) => {
      console.log(`  ${freq}: ${count} URLs`);
    });
    
    // Save report to file
    fs.writeFileSync('./public/sitemap-report.json', JSON.stringify(report, null, 2));
    console.log('\n📄 Report saved to: ./public/sitemap-report.json');
  }
}

// Export for use in build process
export { SitemapGenerator };

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const generator = new SitemapGenerator();
  generator.generate().catch(console.error);
}

export default SitemapGenerator;