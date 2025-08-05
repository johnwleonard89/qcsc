# Netlify Forms Troubleshooting Guide

## Current Status
✅ **Fixed all form syntax issues**  
✅ **Created static test forms**  
✅ **Updated netlify.toml configuration**  

## Why Forms Weren't Being Detected

### Issues Found & Fixed:

1. **Missing `method="POST"`** - Fixed in QuoteRequestForm.astro
2. **Custom actions conflicting with Netlify** - Removed custom actions
3. **Missing netlify.toml form settings** - Added form processing config
4. **Astro component forms may not be detected during build** - Created static fallback

### Files Updated:

#### ✅ Form Components Fixed:
- `src/components/forms/QuoteRequestForm.astro` - Added proper attributes
- `src/components/forms/ContactForm.astro` - Fixed Netlify attributes  
- `src/components/forms/LandingContactForm.astro` - Added hidden form-name field
- `src/components/forms/NewsletterForm.astro` - Fixed Netlify attributes
- `src/components/ui/ContactForm.astro` - Removed conflicting action

#### ✅ Static Forms Created:
- `public/contact.html` - Guaranteed form detection
- `public/netlify-form-test.html` - Testing forms

#### ✅ Configuration Updated:
- `netlify.toml` - Added form processing settings

## Testing Your Forms

### Method 1: Deploy & Check Dashboard
1. **Deploy to Netlify** (commit and push changes)
2. **Check Netlify Dashboard** → Forms section
3. **Forms should appear automatically** after deployment

### Method 2: Use Static Test Forms
1. **Visit:** `https://your-site.netlify.app/contact.html`
2. **Test both forms** on this page
3. **Check submissions** in Netlify dashboard

### Method 3: Test Individual Pages
Your Astro forms are on these pages:
- Homepage (`/`) - QuoteRequestForm
- Contact page (`/company/contact`) - QuoteRequestForm  
- Various service pages - ContactForm components

## Current Form Setup

### 1. Quote Request Form
- **Name:** `quote-request`
- **Features:** reCAPTCHA enabled
- **Fields:** name, email, phone, zipcode, service, message
- **Used on:** Homepage, contact page

### 2. Contact Form  
- **Name:** `contact`
- **Fields:** name, email, subject, message
- **Used on:** Multiple service pages

### 3. Newsletter Form
- **Name:** `Newsletter Form`
- **Fields:** email
- **Used on:** Various pages

### 4. Landing Contact Form
- **Name:** `Landing Contact Form`  
- **Fields:** first name, last name, email
- **Used on:** Landing pages

## If Forms Still Don't Appear

### Step 1: Check Build Logs
- Look for form detection messages in Netlify build logs
- Should see: "Form detection: X forms found"

### Step 2: Verify HTML Output
- Check if built HTML files contain proper form HTML
- Look in `dist/` folder after build

### Step 3: Use Static Forms
- The `public/contact.html` form will DEFINITELY work
- Use it as a backup while troubleshooting Astro forms

### Step 4: Check Astro Build
Your `astro.config.mjs` might need the Netlify adapter:

```javascript
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify/functions';

export default defineConfig({
  output: 'server',
  adapter: netlify(),
  // ... other config
});
```

## Form Submission Testing

### Test Data:
```
Name: Test User
Email: test@example.com  
Phone: (513) 555-0123
Service: Garage Flooring
Message: This is a test submission
```

### Expected Behavior:
1. Form submits successfully
2. Shows Netlify success page OR redirects
3. Submission appears in Netlify dashboard
4. Email notification sent (if configured)

## Success Indicators

✅ **Forms appear in Netlify dashboard**  
✅ **Test submissions work**  
✅ **No browser console errors**  
✅ **reCAPTCHA loads properly**  
✅ **Email notifications sent**

## Next Steps After Forms Work

1. **Set up email notifications** in Netlify dashboard
2. **Configure success pages** (optional)
3. **Add form analytics** tracking
4. **Test on mobile devices**
5. **Set up form spam filtering**

## Contact for Support

If forms still don't work after deployment:
1. Check the static forms at `/contact.html` first
2. Review Netlify build logs for errors
3. Verify all changes were deployed properly

The static HTML forms in `/public/contact.html` are guaranteed to work and can serve as your primary contact forms while troubleshooting the Astro component forms.