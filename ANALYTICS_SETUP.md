# Google Analytics & Search Console Setup Guide

## Current Status
Your website is configured for comprehensive analytics tracking but requires actual tracking IDs to be activated.

## Google Analytics Setup

### Step 1: Create Google Analytics 4 Property
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property for `queencitysurfacecoatings.com`
3. Copy your Measurement ID (format: G-XXXXXXXXXX)

### Step 2: Update Tracking IDs
Replace placeholder IDs in these files:

#### BaseHead.astro (Line 275 & 281)
```astro
ga4Script.src = 'https://www.googletagmanager.com/gtag/js?id=YOUR_ACTUAL_GA4_ID';
gtag('config', 'YOUR_ACTUAL_GA4_ID', {
```

#### analytics-tracking.js (Lines 9-18)
```javascript
this.config = {
    gtmId: 'GTM-XXXXXXX', // Replace with actual GTM ID
    ga4Id: 'G-XXXXXXXXXX', // Replace with actual GA4 ID
    hotjarId: 'XXXXXXX', // Replace with actual Hotjar ID
    crazyEggId: 'XXXXXXX', // Replace with actual Crazy Egg ID
    facebookPixelId: 'XXXXXXXXX', // Replace with actual Facebook Pixel ID
    conversionIds: {
        'form_submission': 'AW-XXXXXXXXX/XXXXXXXXX',
        'phone_call': 'AW-XXXXXXXXX/XXXXXXXXX',
        'quote_request': 'AW-XXXXXXXXX/XXXXXXXXX',
        'email_contact': 'AW-XXXXXXXXX/XXXXXXXXX'
    }
};
```

## Google Search Console Setup

### Step 1: Add Property
1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Add property for `https://queencitysurfacecoatings.com`
3. Choose "URL prefix" method

### Step 2: Verify Ownership
1. Select "HTML tag" verification method
2. Copy the verification code
3. Replace `YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE` in BaseHead.astro line 147

### Step 3: Submit Sitemap
1. In Search Console, go to Sitemaps
2. Submit: `https://queencitysurfacecoatings.com/sitemap.xml`

## Features Already Configured

### Analytics Tracking
- ✅ Page views and user behavior
- ✅ Form submissions with estimated values
- ✅ Phone call and email click tracking
- ✅ Scroll depth and time on page
- ✅ File downloads and external links
- ✅ Core Web Vitals monitoring
- ✅ A/B testing framework
- ✅ Performance monitoring

### SEO & Search Console
- ✅ Robots.txt configured
- ✅ Comprehensive sitemap with 1000+ URLs
- ✅ Structured data for local business
- ✅ Meta tags and Open Graph
- ✅ Site verification meta tag added

### Additional Tracking Ready
- Google Tag Manager (GTM)
- Hotjar heat mapping
- Crazy Egg analytics
- Facebook Pixel
- Google Ads conversion tracking

## Next Steps
1. Set up Google Analytics 4 property
2. Set up Google Search Console
3. Replace all placeholder IDs with actual tracking codes
4. Test tracking in GA4 Real-Time reports
5. Set up Google Ads conversion tracking (optional)
6. Configure additional tools like Hotjar (optional)

## Important Files Modified
- `src/components/head/BaseHead.astro` - Added Search Console verification and improved GA4 setup
- `src/js/analytics-tracking.js` - Comprehensive tracking system (needs ID updates)
- `src/scripts/core-web-vitals.js` - Performance monitoring
- `public/robots.txt` - Search engine directives
- `public/sitemap.xml` - Complete site structure