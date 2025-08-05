# Queen City Surface Coatings Website Admin Guide

This comprehensive guide will help you manage and maintain your Queen City Surface Coatings website as an administrator.

## Table of Contents
- [Quick Start](#quick-start)
- [Content Management](#content-management)
- [Blog Management](#blog-management)
- [Services Management](#services-management)
- [Service Areas Management](#service-areas-management)
- [Navigation & Footer](#navigation--footer)
- [Forms & Lead Generation](#forms--lead-generation)
- [Images & Assets](#images--assets)
- [SEO & Performance](#seo--performance)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Quick Start

### Essential Commands
```bash
npm run dev      # Start development server (http://localhost:4321)
npm run build    # Build for production
npm run preview  # Preview production build locally
```

### File Structure Overview
```
src/
├── content/          # Blog posts, services content
├── config/           # Site settings, navigation, footer
├── pages/           # Website pages
├── components/      # Reusable components
└── styles/          # CSS and theme files

public/
└── assets/          # Images, fonts, static files
```

## Content Management

### Site Settings (`src/config/settings.js`)

Update your basic site information:

```javascript
export const settings = {
  title: "Queen City Surface Coatings | Professional Floor Coatings Cincinnati",
  description: "Your site description here...",
  url: "https://queencitysurfacecoatings.com",
  name: "Queen City Surface Coatings",
  enableThemeSwitcher: false,
  showPlug: false
}
```

**When to edit:** Change business name, main description, or website URL.

## Blog Management

### Adding a New Blog Post

1. **Create the file:** `src/content/blog/your-post-title.md`

2. **Add frontmatter:** (metadata at the top)
```markdown
---
title: "Complete Guide to Epoxy Flooring in Cincinnati"
description: "Everything you need to know about epoxy flooring installation, costs, and benefits in Cincinnati."
author: "John Leonard"
featured_image: "/assets/images/blog/epoxy-flooring-cincinnati/featured.jpg"
publish_date: 2024-01-15
tags: ["epoxy flooring", "cincinnati", "garage floors"]
category: "Services"
seo_title: "Epoxy Flooring Cincinnati - Professional Installation Guide"
seo_description: "Professional epoxy flooring in Cincinnati. Get expert tips, cost estimates, and installation insights from Queen City Surface Coatings."
draft: false
---

Your blog content goes here...
```

3. **Write content in Markdown:**
```markdown
## Introduction

Your epoxy flooring content here...

### Benefits of Epoxy Flooring
- Durability
- Easy maintenance
- Chemical resistance

![Epoxy flooring example](/assets/images/blog/example.jpg)
```

4. **Publish:** Set `draft: false` and rebuild the site

### Managing Blog Images
- Create folder: `public/assets/images/blog/your-post-title/`
- Add images: `featured.jpg`, `image1.jpg`, etc.
- Reference in post: `/assets/images/blog/your-post-title/image1.jpg`

### Blog Post Schema
| Field | Required | Description |
|-------|----------|-------------|
| title | Yes | Post title (appears in browser tab) |
| description | Yes | Brief summary (appears in previews) |
| author | Yes | Author name |
| publish_date | Yes | Publication date (YYYY-MM-DD) |
| featured_image | No | Main post image |
| tags | No | Array of tags for categorization |
| category | No | Post category |
| seo_title | No | Custom SEO title (if different from title) |
| seo_description | No | Custom meta description |
| draft | No | Set to `true` to hide post |

## Services Management

### Adding a New Service

1. **Create content file:** `src/content/services/service-name.md`

```markdown
---
title: "Metallic Epoxy Flooring"
description: "Transform your space with stunning metallic epoxy flooring that combines durability with artistic beauty."
short_description: "Premium metallic epoxy with artistic patterns"
featured_image: "/assets/images/services/metallic-epoxy/featured.webp"
icon: "/assets/images/service-icons/premium.svg"
gallery: [
  "/assets/images/services/metallic-epoxy/gallery1.webp",
  "/assets/images/services/metallic-epoxy/gallery2.webp"
]
features: [
  "Unique metallic patterns",
  "High durability",
  "Easy maintenance",
  "Chemical resistant"
]
price_range: "$$$"
duration: "2-3 days"
order: 3
featured: true
---

Detailed service description goes here...
```

2. **Create service page:** `src/pages/services/service-name.astro`

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getEntry } from 'astro:content';

const service = await getEntry('services', 'service-name');
const { Content } = await service.render();
---

<BaseLayout 
  title={service.data.title} 
  description={service.data.description}
  image={service.data.featured_image}
>
  <main>
    <section class="service-hero">
      <div class="container">
        <h1>{service.data.title}</h1>
        <p>{service.data.description}</p>
      </div>
    </section>

    <section class="service-content">
      <div class="container">
        <Content />
      </div>
    </section>
  </main>
</BaseLayout>
```

3. **Add to navigation** (if needed): Update `src/config/nav.js`

### Service Schema
| Field | Required | Description |
|-------|----------|-------------|
| title | Yes | Service name |
| description | Yes | Detailed description |
| short_description | Yes | Brief summary |
| featured_image | Yes | Main service image |
| icon | No | SVG icon for service cards |
| gallery | No | Array of image paths |
| features | No | Array of key features |
| price_range | No | Price indicator ($, $$, $$$) |
| duration | No | Typical project duration |
| order | No | Display order (lower = first) |
| featured | No | Highlight on homepage |

## Service Areas Management

### Adding a New Service Area

Your site uses a template system for service area pages. Here's how to add a new city:

1. **Create the page:** `src/pages/service-areas/ohio/new-city-concrete-coating.astro`

```astro
---
import CityPageTemplate from '../../../components/city/CityPageTemplate.astro';

const city = {
  name: "New City",
  state: "Ohio",
  stateAbbr: "OH",
  zipCodes: ["45123", "45124"],
  county: "Hamilton County",
  population: "50,000",
  serviceArea: "Greater Cincinnati Area",
  
  // SEO
  title: "Concrete Coating Services in New City, OH | Queen City Surface Coatings",
  description: "Professional concrete coating and epoxy flooring services in New City, Ohio. Free estimates, quality work, local experts.",
  
  // Content
  heroTitle: "Professional Concrete Coating in New City, OH",
  heroDescription: "Transform your concrete surfaces with premium coatings from Queen City Surface Coatings, proudly serving New City and surrounding areas.",
  
  // Local landmarks and areas served
  landmarks: [
    "New City Downtown",
    "New City Shopping Center",
    "New City Industrial District"
  ],
  
  // Testimonials (optional)
  testimonials: [
    {
      name: "John Smith",
      location: "New City, OH",
      text: "Outstanding work on our garage floor. Highly recommended!",
      service: "Garage Floor Epoxy"
    }
  ],
  
  // FAQs specific to this area
  localFAQs: [
    {
      question: "Do you serve all of New City?",
      answer: "Yes, we provide concrete coating services throughout New City and the surrounding areas in Hamilton County."
    }
  ]
};
---

<CityPageTemplate city={city} />
```

2. **Add images:** Create folder `public/assets/images/service-areas/new-city/`
3. **Link from main page:** Update service areas index if needed

### City Page Required Fields
| Field | Required | Description |
|-------|----------|-------------|
| name | Yes | City name |
| state | Yes | Full state name |
| stateAbbr | Yes | State abbreviation |
| zipCodes | Yes | Array of ZIP codes served |
| county | Yes | County name |
| title | Yes | SEO page title |
| description | Yes | Meta description |
| heroTitle | Yes | Main page heading |
| heroDescription | Yes | Hero section description |

## Navigation & Footer

### Updating Navigation (`src/config/nav.js`)

```javascript
export const nav = [
  {
    title: 'Home',
    slug: '/',
  },
  {
    title: 'About',
    slug: '/about',
  },
  {
    title: 'Services', 
    slug: '/services',
  },
  // Add new menu items here
  {
    title: 'New Page',
    slug: '/new-page',
  }
];
```

### Updating Footer (`src/config/footer.js`)

```javascript
export const footerSocials = [
  {
    name: 'Facebook',
    url: 'https://facebook.com/yourpage',
    icon: "mdi:facebook",
  },
  // Add more social links
];

export const footerLists = [
  {
    title: 'Services',
    items: [
      { title: 'Epoxy Flooring', slug: '/services/epoxy-flooring' },
      // Add/remove service links
    ],
  },
];
```

## Forms & Lead Generation

Your website has several forms for capturing leads:

### Quote Request Form
- **Location:** Throughout service and location pages
- **Fields:** Name, email, phone, service type, location, project details
- **Handling:** Netlify Forms (submissions appear in Netlify dashboard)

### Contact Form
- **Location:** Contact page
- **Fields:** Name, email, referral source, message
- **Action:** Redirects to thank you page

### Managing Form Submissions

1. **View submissions:** Log into your Netlify dashboard
2. **Go to:** Site > Forms section
3. **Download:** Export as CSV for CRM import
4. **Integrate:** Connect to email marketing or CRM tools

### Customizing Forms

Forms are located in `src/components/forms/`. To modify:

1. **Edit fields:** Add/remove input fields
2. **Update validation:** Modify required attributes
3. **Change styling:** Update CSS classes
4. **Test:** Always test forms after changes

## Images & Assets

### Image Organization

```
public/assets/images/
├── about/              # About page images
├── blog/              # Blog post images
├── business/          # Logos and branding
├── gallery/           # Portfolio images
├── home/              # Homepage images
├── services/          # Service-specific images
├── service-icons/     # SVG icons
└── team/              # Staff photos
```

### Adding New Images

1. **Upload to appropriate folder** based on usage
2. **Use WebP format** when possible for better performance
3. **Optimize images** before uploading (compress file size)
4. **Name descriptively:** `epoxy-flooring-cincinnati-garage.webp`

### Image Best Practices

- **WebP for photos:** Better compression than JPEG
- **SVG for icons:** Scalable and small file size
- **Alt text:** Always include descriptive alt text
- **Responsive:** Images automatically resize on mobile

### Using Images in Content

```markdown
![Alt text description](/assets/images/services/epoxy-flooring/example.webp)
```

In Astro components:
```astro
<img src="/assets/images/services/epoxy-flooring/example.webp" alt="Epoxy flooring in Cincinnati garage" />
```

## SEO & Performance

### Page-Level SEO

Each page can have custom SEO settings:

```astro
---
// In any .astro page
const seo = {
  title: "Custom Page Title",
  description: "Custom meta description for this page",
  image: "/assets/images/page-image.webp",
  canonical: "https://queencitysurfacecoatings.com/page-url"
};
---

<BaseLayout 
  title={seo.title}
  description={seo.description}
  image={seo.image}
>
```

### SEO Checklist
- ✅ Unique title and description for each page
- ✅ Optimized images with alt text
- ✅ Fast loading times
- ✅ Mobile-friendly design
- ✅ Local business schema markup
- ✅ Sitemap automatically generated

### Performance Features
- **Automatic image optimization:** WebP conversion
- **Lazy loading:** Images load as needed
- **CSS/JS minification:** Smaller file sizes
- **CDN delivery:** Fast global loading via Netlify

## Deployment

Your website automatically deploys via Netlify when you push changes to your Git repository.

### Deployment Process

1. **Make changes** to your local files
2. **Test locally:** Run `npm run dev` to preview
3. **Commit changes:** 
   ```bash
   git add .
   git commit -m "Add new blog post about epoxy flooring"
   git push
   ```
4. **Automatic deployment:** Netlify builds and deploys automatically

### Build Commands
- **Development:** `npm run dev` (http://localhost:4321)
- **Build:** `npm run build` (creates `dist/` folder)
- **Preview:** `npm run preview` (preview production build)

### Deployment Settings
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** Specified in `.nvmrc`

## Troubleshooting

### Common Issues

#### Site Won't Build
1. **Check syntax:** Look for typos in frontmatter
2. **Verify paths:** Ensure image paths are correct
3. **Check console:** Run `npm run build` locally for errors

#### Images Not Loading
1. **Check file path:** Must start with `/assets/images/`
2. **Verify file exists:** Look in `public/assets/images/`
3. **Check file extension:** `.webp`, `.jpg`, `.png`

#### Form Not Submitting
1. **Netlify forms:** Ensure `data-netlify="true"` attribute
2. **Required fields:** Check all required fields are filled
3. **Test locally:** Forms only work on deployed site, not localhost

#### SEO Issues
1. **Missing meta tags:** Check `BaseLayout` component usage
2. **Duplicate content:** Ensure unique titles/descriptions
3. **Image alt text:** Always include descriptive alt text

### Getting Help

If you encounter issues:

1. **Check browser console:** Look for JavaScript errors
2. **Netlify deploy logs:** Check build errors in Netlify dashboard
3. **Test locally:** Run `npm run dev` to debug

### Development Workflow

For major changes:

1. **Create branch:** `git checkout -b new-feature`
2. **Make changes** and test locally
3. **Commit changes:** `git commit -m "Description"`
4. **Push branch:** `git push origin new-feature`
5. **Deploy to staging:** Use Netlify branch deploys
6. **Merge to main:** After testing

## Quick Reference

### File Locations
- **Blog posts:** `src/content/blog/`
- **Services:** `src/content/services/`
- **Site settings:** `src/config/settings.js`
- **Navigation:** `src/config/nav.js`
- **Footer:** `src/config/footer.js`
- **Images:** `public/assets/images/`
- **Styles:** `src/styles/`

### Common Tasks
- **Add blog post:** Create `.md` file in `src/content/blog/`
- **Add service:** Create `.md` file in `src/content/services/` and page in `src/pages/services/`
- **Update navigation:** Edit `src/config/nav.js`
- **Change colors:** Edit `src/styles/theme.css`
- **Add images:** Upload to `public/assets/images/`

### Emergency Contacts
- **Hosting:** Netlify dashboard
- **Domain:** Your domain registrar
- **Forms:** Netlify forms dashboard
- **Analytics:** Google Analytics (if configured)

This guide covers all the essential admin tasks for your Queen City Surface Coatings website. Keep this document handy for reference, and don't hesitate to reach out if you need clarification on any procedures.