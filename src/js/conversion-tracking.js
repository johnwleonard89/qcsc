// Google Ads & Facebook Conversion Tracking
// Queen City Surface Coatings - Lead Generation Tracking

class ConversionTracker {
    constructor() {
        this.config = {
            // Google Ads - Replace with actual conversion IDs when available
            googleAds: {
                conversionId: 'AW-XXXXXXXXX', // Replace with your Google Ads Conversion ID
                formSubmissionLabel: 'XXXXXXXXX', // Quote form conversion label
                phoneClickLabel: 'XXXXXXXXX', // Phone click conversion label
                emailClickLabel: 'XXXXXXXXX' // Email click conversion label
            },
            // Facebook Pixel - Already configured
            facebookPixelId: '1246444003920751',
            // Google Analytics - Already configured  
            ga4Id: 'G-WW266NE4HC'
        };
        
        this.init();
    }
    
    init() {
        this.setupFormTracking();
        this.setupPhoneTracking();
        this.setupEmailTracking();
        this.setupScrollTracking();
    }
    
    // Track form submissions as conversions
    setupFormTracking() {
        document.addEventListener('submit', (e) => {
            const form = e.target;
            
            // Check if it's a quote request form
            if (form.name === 'quote-request' || form.classList.contains('quote-form')) {
                this.trackFormConversion('quote_request', form);
            }
            
            // Check if it's a contact form
            if (form.name === 'contact' || form.classList.contains('contact-form')) {
                this.trackFormConversion('contact_form', form);
            }
        });
    }
    
    // Track phone number clicks
    setupPhoneTracking() {
        document.addEventListener('click', (e) => {
            if (e.target.href && e.target.href.includes('tel:')) {
                const phoneNumber = e.target.href.replace('tel:', '');
                this.trackPhoneClick(phoneNumber);
            }
        });
    }
    
    // Track email clicks
    setupEmailTracking() {
        document.addEventListener('click', (e) => {
            if (e.target.href && e.target.href.includes('mailto:')) {
                const email = e.target.href.replace('mailto:', '');
                this.trackEmailClick(email);
            }
        });
    }
    
    // Track scroll depth for engagement
    setupScrollTracking() {
        let scrollThresholds = [25, 50, 75, 100];
        let trackedThresholds = [];
        
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
            );
            
            scrollThresholds.forEach(threshold => {
                if (scrollPercent >= threshold && !trackedThresholds.includes(threshold)) {
                    trackedThresholds.push(threshold);
                    this.trackScrollDepth(threshold);
                }
            });
        });
    }
    
    // Main conversion tracking function
    trackFormConversion(formType, form) {
        const formData = new FormData(form);
        const conversionData = {
            event_category: 'lead_generation',
            event_label: formType,
            value: this.getConversionValue(formType),
            currency: 'USD'
        };
        
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                send_to: `${this.config.ga4Id}`,
                ...conversionData
            });
            
            gtag('event', 'generate_lead', {
                currency: 'USD',
                value: conversionData.value,
                lead_type: formType
            });
        }
        
        // Google Ads Conversion (when conversion ID is available)
        if (this.config.googleAds.conversionId !== 'AW-XXXXXXXXX') {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    send_to: `${this.config.googleAds.conversionId}/${this.config.googleAds.formSubmissionLabel}`,
                    value: conversionData.value,
                    currency: 'USD'
                });
            }
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', {
                content_name: formType,
                content_category: 'surface_coating_services',
                value: conversionData.value,
                currency: 'USD'
            });
        }
        
        console.log('Conversion tracked:', formType, conversionData);
    }
    
    // Track phone clicks
    trackPhoneClick(phoneNumber) {
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'phone_call_click', {
                event_category: 'engagement',
                event_label: phoneNumber,
                value: 25 // Assign value to phone clicks
            });
        }
        
        // Google Ads (when available)
        if (this.config.googleAds.conversionId !== 'AW-XXXXXXXXX') {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    send_to: `${this.config.googleAds.conversionId}/${this.config.googleAds.phoneClickLabel}`,
                    value: 25,
                    currency: 'USD'
                });
            }
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', 'InitiateCheckout', {
                content_name: 'phone_call',
                content_category: 'contact_method',
                value: 25,
                currency: 'USD'
            });
        }
    }
    
    // Track email clicks  
    trackEmailClick(email) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'email_click', {
                event_category: 'engagement',
                event_label: email,
                value: 15
            });
        }
        
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Contact', {
                content_name: 'email_contact'
            });
        }
    }
    
    // Track scroll depth
    trackScrollDepth(percentage) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll', {
                event_category: 'engagement',
                event_label: `${percentage}%`,
                value: percentage
            });
        }
    }
    
    // Get estimated conversion value based on form type
    getConversionValue(formType) {
        const values = {
            'quote_request': 150, // Higher value for quote requests
            'contact_form': 75,   // Medium value for general contact
            'newsletter': 25      // Lower value for newsletter signups
        };
        
        return values[formType] || 50;
    }
    
    // Track custom events
    trackCustomEvent(eventName, parameters = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }
        
        if (typeof fbq !== 'undefined') {
            fbq('track', 'CustomEvent', {
                event_name: eventName,
                ...parameters
            });
        }
    }
}

// Initialize conversion tracking when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.conversionTracker = new ConversionTracker();
    console.log('Conversion tracking initialized');
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ConversionTracker;
}