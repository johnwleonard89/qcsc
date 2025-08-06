/**
 * Advanced Analytics and Tracking Integration
 * Features: Google Analytics 4, Tag Manager, conversion tracking, heat mapping
 */

class AnalyticsTracker {
    constructor() {
        this.config = {
            gtmId: 'GTM-XXXXXXX', // Replace with actual GTM ID
            ga4Id: 'G-WW266NE4HC', // Your GA4 Measurement ID
            hotjarId: 'XXXXXXX', // Replace with actual Hotjar ID
            crazyEggId: 'XXXXXXX', // Replace with actual Crazy Egg ID
            facebookPixelId: '1246444003920751', // Your Meta Pixel ID
            conversionIds: {
                'form_submission': 'AW-XXXXXXXXX/XXXXXXXXX',
                'phone_call': 'AW-XXXXXXXXX/XXXXXXXXX',
                'quote_request': 'AW-XXXXXXXXX/XXXXXXXXX',
                'email_contact': 'AW-XXXXXXXXX/XXXXXXXXX'
            }
        };
        
        this.events = [];
        this.userProperties = {};
        this.sessionData = {};
        
        this.init();
    }
    
    init() {
        this.loadGoogleTagManager();
        this.loadGoogleAnalytics4();
        this.loadHeatMappingTools();
        this.loadFacebookPixel();
        this.initializeTracking();
        this.setupEventListeners();
        this.trackPageView();
        this.startSessionTracking();
    }
    
    loadGoogleTagManager() {
        // Google Tag Manager
        (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer', this.config.gtmId);
        
        // Initialize dataLayer
        window.dataLayer = window.dataLayer || [];
        
        // Add GTM noscript fallback to body
        const noscript = document.createElement('noscript');
        noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${this.config.gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
        document.body.insertBefore(noscript, document.body.firstChild);
    }
    
    loadGoogleAnalytics4() {
        // GA4 Global Site Tag
        const ga4Script = document.createElement('script');
        ga4Script.async = true;
        ga4Script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.ga4Id}`;
        document.head.appendChild(ga4Script);
        
        // Initialize gtag
        window.gtag = window.gtag || function(){
            (window.gtag.q = window.gtag.q || []).push(arguments);
        };
        
        gtag('js', new Date());
        gtag('config', this.config.ga4Id, {
            page_title: document.title,
            page_location: window.location.href,
            custom_map: {
                'custom_dimension_1': 'user_type',
                'custom_dimension_2': 'project_type',
                'custom_dimension_3': 'service_area'
            }
        });
        
        // Enhanced ecommerce for service quotes
        gtag('config', this.config.ga4Id, {
            'allow_enhanced_conversions': true,
            'send_page_view': false // We'll send manually with additional data
        });
    }
    
    loadHeatMappingTools() {
        // Hotjar
        if (this.config.hotjarId !== 'XXXXXXX') {
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid: this.config.hotjarId, hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=', this.config.hotjarId);
        }
        
        // Crazy Egg (alternative heat mapping)
        if (this.config.crazyEggId !== 'XXXXXXX') {
            const ceScript = document.createElement('script');
            ceScript.type = 'text/javascript';
            ceScript.async = true;
            ceScript.src = `//script.crazyegg.com/pages/scripts/${this.config.crazyEggId}.js`;
            document.head.appendChild(ceScript);
        }
    }
    
    loadFacebookPixel() {
        if (this.config.facebookPixelId === 'XXXXXXXXX') return;
        
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        
        fbq('init', this.config.facebookPixelId);
        fbq('track', 'PageView');
    }
    
    initializeTracking() {
        // Set user properties
        this.identifyUser();
        this.setUserProperties();
        this.trackUserType();
    }
    
    setupEventListeners() {
        // Form submissions
        document.addEventListener('submit', (e) => {
            this.trackFormSubmission(e);
        });
        
        // Button clicks
        document.addEventListener('click', (e) => {
            this.trackButtonClicks(e);
        });
        
        // Phone number clicks
        document.addEventListener('click', (e) => {
            if (e.target.href && e.target.href.startsWith('tel:')) {
                this.trackPhoneCall(e.target.href);
            }
        });
        
        // Email clicks
        document.addEventListener('click', (e) => {
            if (e.target.href && e.target.href.startsWith('mailto:')) {
                this.trackEmailClick(e.target.href);
            }
        });
        
        // Scroll depth tracking
        this.setupScrollTracking();
        
        // Time on page tracking
        this.setupTimeTracking();
        
        // File downloads
        document.addEventListener('click', (e) => {
            if (e.target.href && this.isDownloadLink(e.target.href)) {
                this.trackFileDownload(e.target.href);
            }
        });
        
        // External links
        document.addEventListener('click', (e) => {
            if (e.target.href && this.isExternalLink(e.target.href)) {
                this.trackExternalLink(e.target.href);
            }
        });
        
        // Video interactions
        this.setupVideoTracking();
        
        // Error tracking
        window.addEventListener('error', (e) => {
            this.trackError(e);
        });
        
        // Page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.trackPageExit();
            } else {
                this.trackPageReturn();
            }
        });
    }
    
    trackPageView() {
        const pageData = {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname,
            referrer: document.referrer,
            user_agent: navigator.userAgent,
            screen_resolution: `${screen.width}x${screen.height}`,
            viewport_size: `${window.innerWidth}x${window.innerHeight}`,
            timestamp: new Date().toISOString()
        };
        
        // GA4 page view
        gtag('event', 'page_view', pageData);
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', 'PageView');
        }
        
        // Custom tracking
        this.pushEvent('page_view', pageData);
        
        // Track page type
        this.trackPageType();
    }
    
    trackPageType() {
        const path = window.location.pathname.toLowerCase();
        let pageType = 'general';
        
        if (path.includes('/services/')) pageType = 'service';
        else if (path.includes('/portfolio/')) pageType = 'portfolio';
        else if (path.includes('/contact')) pageType = 'contact';
        else if (path.includes('/quote') || path.includes('/estimate')) pageType = 'quote';
        else if (path === '/' || path === '/index.html') pageType = 'homepage';
        else if (path.includes('/about')) pageType = 'about';
        
        gtag('event', 'page_type_view', {
            page_type: pageType,
            page_category: this.getPageCategory()
        });
    }
    
    getPageCategory() {
        const path = window.location.pathname.toLowerCase();
        
        if (path.includes('garage')) return 'garage_flooring';
        if (path.includes('basement')) return 'basement_flooring';
        if (path.includes('commercial')) return 'commercial_flooring';
        if (path.includes('metallic')) return 'decorative_flooring';
        
        return 'general';
    }
    
    trackFormSubmission(event) {
        const form = event.target;
        const formId = form.id || form.className || 'unknown_form';
        const formData = new FormData(form);
        
        // Determine form type
        let formType = 'contact';
        if (formId.includes('quote') || form.action.includes('quote')) {
            formType = 'quote_request';
        } else if (formId.includes('review')) {
            formType = 'review_submission';
        } else if (formId.includes('newsletter')) {
            formType = 'newsletter_signup';
        }
        
        // Extract form data for analysis
        const formFields = {};
        for (let [key, value] of formData.entries()) {
            if (!key.includes('password') && !key.includes('credit')) {
                formFields[key] = typeof value === 'string' ? value.substring(0, 100) : value;
            }
        }
        
        // Calculate estimated value for quote forms
        let estimatedValue = 0;
        if (formType === 'quote_request') {
            estimatedValue = this.calculateQuoteValue(formFields);
        }
        
        const eventData = {
            form_id: formId,
            form_type: formType,
            estimated_value: estimatedValue,
            currency: 'USD',
            form_fields: Object.keys(formFields).length,
            page_path: window.location.pathname
        };
        
        // GA4 tracking
        gtag('event', 'form_submit', eventData);
        
        // Conversion tracking
        if (this.config.conversionIds[formType]) {
            gtag('event', 'conversion', {
                'send_to': this.config.conversionIds[formType],
                'value': estimatedValue,
                'currency': 'USD',
                'transaction_id': this.generateTransactionId()
            });
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', {
                content_name: formType,
                content_category: 'Form Submission',
                value: estimatedValue,
                currency: 'USD'
            });
        }
        
        // Enhanced ecommerce for service requests
        if (formType === 'quote_request') {
            gtag('event', 'begin_checkout', {
                currency: 'USD',
                value: estimatedValue,
                items: [{
                    item_id: 'quote_request',
                    item_name: 'Epoxy Flooring Quote',
                    item_category: this.getPageCategory(),
                    quantity: 1,
                    price: estimatedValue
                }]
            });
        }
        
        this.pushEvent('form_submission', eventData);
    }
    
    trackButtonClicks(event) {
        const button = event.target.closest('button, .btn, [role="button"]');
        if (!button) return;
        
        const buttonText = button.textContent?.trim().substring(0, 50) || 'unknown';
        const buttonId = button.id || button.className || 'unknown';
        const buttonType = this.getButtonType(button, buttonText);
        
        gtag('event', 'click', {
            event_category: 'Button',
            event_label: buttonText,
            button_id: buttonId,
            button_type: buttonType,
            page_path: window.location.pathname
        });
        
        // Track CTA buttons separately
        if (buttonType === 'cta') {
            gtag('event', 'cta_click', {
                cta_text: buttonText,
                cta_location: this.getElementLocation(button),
                page_type: this.getPageCategory()
            });
        }
        
        this.pushEvent('button_click', {
            button_text: buttonText,
            button_id: buttonId,
            button_type: buttonType
        });
    }
    
    getButtonType(button, text) {
        const textLower = text.toLowerCase();
        
        if (textLower.includes('quote') || textLower.includes('estimate')) return 'cta';
        if (textLower.includes('call') || textLower.includes('phone')) return 'contact';
        if (textLower.includes('contact') || textLower.includes('email')) return 'contact';
        if (textLower.includes('schedule') || textLower.includes('book')) return 'scheduling';
        if (textLower.includes('portfolio') || textLower.includes('gallery')) return 'portfolio';
        if (textLower.includes('service')) return 'service';
        
        return 'general';
    }
    
    trackPhoneCall(phoneHref) {
        const phoneNumber = phoneHref.replace('tel:', '');
        
        gtag('event', 'phone_call', {
            event_category: 'Contact',
            event_label: phoneNumber,
            phone_number: phoneNumber,
            page_path: window.location.pathname
        });
        
        // Conversion tracking
        if (this.config.conversionIds.phone_call) {
            gtag('event', 'conversion', {
                'send_to': this.config.conversionIds.phone_call,
                'value': 500, // Estimated value of a phone call lead
                'currency': 'USD'
            });
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Contact', {
                content_name: 'Phone Call',
                content_category: 'Contact'
            });
        }
        
        this.pushEvent('phone_call', { phone_number: phoneNumber });
    }
    
    trackEmailClick(emailHref) {
        const email = emailHref.replace('mailto:', '').split('?')[0];
        
        gtag('event', 'email_click', {
            event_category: 'Contact',
            event_label: email,
            email_address: email,
            page_path: window.location.pathname
        });
        
        // Conversion tracking
        if (this.config.conversionIds.email_contact) {
            gtag('event', 'conversion', {
                'send_to': this.config.conversionIds.email_contact,
                'value': 300, // Estimated value of an email lead
                'currency': 'USD'
            });
        }
        
        this.pushEvent('email_click', { email_address: email });
    }
    
    setupScrollTracking() {
        let maxScroll = 0;
        const scrollMilestones = [25, 50, 75, 90, 100];
        const trackedMilestones = new Set();
        
        const trackScroll = () => {
            const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                
                scrollMilestones.forEach(milestone => {
                    if (scrollPercent >= milestone && !trackedMilestones.has(milestone)) {
                        trackedMilestones.add(milestone);
                        
                        gtag('event', 'scroll', {
                            event_category: 'Engagement',
                            event_label: `${milestone}%`,
                            scroll_depth: milestone,
                            page_path: window.location.pathname
                        });
                        
                        this.pushEvent('scroll_depth', { 
                            depth: milestone,
                            max_depth: maxScroll 
                        });
                    }
                });
            }
        };
        
        window.addEventListener('scroll', this.throttle(trackScroll, 500));
    }
    
    setupTimeTracking() {
        const startTime = Date.now();
        const timeIntervals = [30, 60, 120, 300]; // seconds
        const trackedIntervals = new Set();
        
        const trackTimeOnPage = () => {
            const timeSpent = Math.floor((Date.now() - startTime) / 1000);
            
            timeIntervals.forEach(interval => {
                if (timeSpent >= interval && !trackedIntervals.has(interval)) {
                    trackedIntervals.add(interval);
                    
                    gtag('event', 'timing_complete', {
                        name: 'time_on_page',
                        value: interval,
                        event_category: 'Engagement',
                        event_label: `${interval}s`,
                        page_path: window.location.pathname
                    });
                }
            });
        };
        
        setInterval(trackTimeOnPage, 10000); // Check every 10 seconds
        
        // Track when user leaves
        window.addEventListener('beforeunload', () => {
            const totalTime = Math.floor((Date.now() - startTime) / 1000);
            gtag('event', 'page_exit', {
                time_on_page: totalTime,
                page_path: window.location.pathname
            });
        });
    }
    
    setupVideoTracking() {
        // Track video interactions on the page
        const videos = document.querySelectorAll('video, iframe[src*="youtube"], iframe[src*="vimeo"]');
        
        videos.forEach((video, index) => {
            const videoId = video.id || video.src || `video_${index}`;
            
            if (video.tagName === 'VIDEO') {
                video.addEventListener('play', () => {
                    gtag('event', 'video_start', {
                        video_title: videoId,
                        video_provider: 'native',
                        page_path: window.location.pathname
                    });
                });
                
                video.addEventListener('ended', () => {
                    gtag('event', 'video_complete', {
                        video_title: videoId,
                        video_provider: 'native',
                        page_path: window.location.pathname
                    });
                });
                
                // Track 25%, 50%, 75% progress
                video.addEventListener('timeupdate', () => {
                    const percent = Math.floor((video.currentTime / video.duration) * 100);
                    if (percent === 25 || percent === 50 || percent === 75) {
                        gtag('event', 'video_progress', {
                            video_title: videoId,
                            video_percent: percent,
                            page_path: window.location.pathname
                        });
                    }
                });
            }
        });
    }
    
    trackFileDownload(href) {
        const fileName = href.split('/').pop().split('?')[0];
        const fileExtension = fileName.split('.').pop().toLowerCase();
        
        gtag('event', 'file_download', {
            event_category: 'Download',
            event_label: fileName,
            file_name: fileName,
            file_extension: fileExtension,
            page_path: window.location.pathname
        });
        
        this.pushEvent('file_download', {
            file_name: fileName,
            file_extension: fileExtension,
            file_url: href
        });
    }
    
    trackExternalLink(href) {
        const domain = new URL(href).hostname;
        
        gtag('event', 'click', {
            event_category: 'External Link',
            event_label: domain,
            link_domain: domain,
            link_url: href,
            page_path: window.location.pathname
        });
        
        this.pushEvent('external_link_click', {
            domain: domain,
            url: href
        });
    }
    
    trackError(error) {
        gtag('event', 'exception', {
            description: error.message,
            fatal: false,
            error_location: error.filename,
            error_line: error.lineno,
            error_column: error.colno,
            page_path: window.location.pathname
        });
        
        this.pushEvent('javascript_error', {
            message: error.message,
            filename: error.filename,
            line: error.lineno,
            column: error.colno
        });
    }
    
    // User identification and properties
    identifyUser() {
        // Generate or retrieve user ID
        let userId = localStorage.getItem('analytics_user_id');
        if (!userId) {
            userId = this.generateUserId();
            localStorage.setItem('analytics_user_id', userId);
        }
        
        gtag('config', this.config.ga4Id, {
            'user_id': userId
        });
        
        return userId;
    }
    
    setUserProperties() {
        const properties = {
            device_type: this.getDeviceType(),
            browser: this.getBrowser(),
            traffic_source: this.getTrafficSource(),
            first_visit: !localStorage.getItem('analytics_returning_user'),
            service_area: this.getServiceArea(),
            user_type: this.determineUserType()
        };
        
        gtag('event', 'user_properties', properties);
        
        // Mark as returning user
        localStorage.setItem('analytics_returning_user', 'true');
        
        this.userProperties = properties;
    }
    
    trackUserType() {
        const userType = this.determineUserType();
        
        gtag('event', 'user_classification', {
            user_type: userType,
            pages_visited: this.getSessionPageCount(),
            session_duration: this.getSessionDuration()
        });
    }
    
    // Utility methods
    calculateQuoteValue(formFields) {
        // Estimate quote value based on form data
        let baseValue = 2000; // Base estimate
        
        if (formFields.squareFootage) {
            const sqft = parseInt(formFields.squareFootage) || 500;
            baseValue = sqft * 8; // $8 per sq ft average
        }
        
        if (formFields.projectType === 'commercial') {
            baseValue *= 1.5;
        } else if (formFields.projectType === 'metallic') {
            baseValue *= 2;
        }
        
        return Math.round(baseValue);
    }
    
    generateTransactionId() {
        return 'QC_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    getDeviceType() {
        const width = window.innerWidth;
        if (width < 768) return 'mobile';
        if (width < 1024) return 'tablet';
        return 'desktop';
    }
    
    getBrowser() {
        const userAgent = navigator.userAgent;
        if (userAgent.includes('Chrome')) return 'Chrome';
        if (userAgent.includes('Firefox')) return 'Firefox';
        if (userAgent.includes('Safari')) return 'Safari';
        if (userAgent.includes('Edge')) return 'Edge';
        return 'Other';
    }
    
    getTrafficSource() {
        const referrer = document.referrer;
        const urlParams = new URLSearchParams(window.location.search);
        
        if (urlParams.get('utm_source')) {
            return urlParams.get('utm_source');
        }
        
        if (!referrer) return 'direct';
        
        const domain = new URL(referrer).hostname;
        if (domain.includes('google')) return 'google';
        if (domain.includes('facebook')) return 'facebook';
        if (domain.includes('bing')) return 'bing';
        if (domain.includes('yahoo')) return 'yahoo';
        
        return 'referral';
    }
    
    getServiceArea() {
        // Determine service area based on various factors
        const urlPath = window.location.pathname;
        
        if (urlPath.includes('cincinnati')) return 'cincinnati';
        if (urlPath.includes('mason')) return 'mason';
        if (urlPath.includes('loveland')) return 'loveland';
        if (urlPath.includes('westchester')) return 'west_chester';
        if (urlPath.includes('kentucky')) return 'northern_kentucky';
        
        return 'general';
    }
    
    determineUserType() {
        const pages = JSON.parse(localStorage.getItem('visited_pages') || '[]');
        const sessionCount = parseInt(localStorage.getItem('session_count') || '0') + 1;
        
        localStorage.setItem('session_count', sessionCount.toString());
        
        if (sessionCount === 1) return 'new_visitor';
        if (sessionCount <= 3) return 'returning_visitor';
        if (pages.some(page => page.includes('contact') || page.includes('quote'))) return 'interested_lead';
        if (pages.length >= 5) return 'engaged_visitor';
        
        return 'casual_visitor';
    }
    
    getElementLocation(element) {
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (rect.top + scrollTop < window.innerHeight) return 'above_fold';
        if (rect.top + scrollTop < window.innerHeight * 2) return 'second_screen';
        return 'below_fold';
    }
    
    isDownloadLink(href) {
        const downloadExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.zip', '.rar'];
        return downloadExtensions.some(ext => href.toLowerCase().includes(ext));
    }
    
    isExternalLink(href) {
        return href.includes('://') && !href.includes(window.location.hostname);
    }
    
    getSessionPageCount() {
        const pages = JSON.parse(localStorage.getItem('session_pages') || '[]');
        return pages.length;
    }
    
    getSessionDuration() {
        const sessionStart = localStorage.getItem('session_start');
        if (!sessionStart) return 0;
        return Math.floor((Date.now() - parseInt(sessionStart)) / 1000);
    }
    
    startSessionTracking() {
        if (!localStorage.getItem('session_start')) {
            localStorage.setItem('session_start', Date.now().toString());
        }
        
        // Track pages visited in this session
        const sessionPages = JSON.parse(localStorage.getItem('session_pages') || '[]');
        const currentPage = window.location.pathname;
        
        if (!sessionPages.includes(currentPage)) {
            sessionPages.push(currentPage);
            localStorage.setItem('session_pages', JSON.stringify(sessionPages));
        }
        
        // Clear session data after 30 minutes of inactivity
        setTimeout(() => {
            localStorage.removeItem('session_start');
            localStorage.removeItem('session_pages');
        }, 30 * 60 * 1000);
    }
    
    trackPageExit() {
        const exitTime = Date.now();
        const sessionStart = parseInt(localStorage.getItem('session_start') || exitTime.toString());
        const timeOnPage = Math.floor((exitTime - sessionStart) / 1000);
        
        gtag('event', 'page_exit', {
            time_on_page: timeOnPage,
            exit_page: window.location.pathname
        });
    }
    
    trackPageReturn() {
        gtag('event', 'page_return', {
            return_page: window.location.pathname
        });
    }
    
    pushEvent(eventName, eventData) {
        this.events.push({
            name: eventName,
            data: eventData,
            timestamp: new Date().toISOString(),
            page: window.location.pathname,
            user_id: localStorage.getItem('analytics_user_id')
        });
        
        // Push to dataLayer for GTM
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: eventName,
            ...eventData
        });
    }
    
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Public API methods
    trackCustomEvent(eventName, eventData) {
        gtag('event', eventName, eventData);
        this.pushEvent(eventName, eventData);
    }
    
    trackConversion(conversionType, value = 0) {
        if (this.config.conversionIds[conversionType]) {
            gtag('event', 'conversion', {
                'send_to': this.config.conversionIds[conversionType],
                'value': value,
                'currency': 'USD',
                'transaction_id': this.generateTransactionId()
            });
        }
    }
    
    setUserProperty(property, value) {
        this.userProperties[property] = value;
        gtag('set', { [property]: value });
    }
    
    getAnalyticsData() {
        return {
            events: this.events,
            userProperties: this.userProperties,
            sessionData: this.sessionData
        };
    }
    
    // A/B Testing integration
    initializeABTesting() {
        // Google Optimize integration
        if (window.gtag) {
            gtag('config', 'OPT-XXXXXXX'); // Replace with actual Optimize ID
        }
        
        // Custom A/B testing logic
        this.runABTests();
    }
    
    runABTests() {
        const tests = [
            {
                name: 'hero_cta_test',
                variants: ['control', 'variant_a', 'variant_b'],
                traffic: 0.5 // 50% of users
            },
            {
                name: 'pricing_display_test',
                variants: ['control', 'variant_a'],
                traffic: 0.3 // 30% of users
            }
        ];
        
        tests.forEach(test => {
            if (Math.random() < test.traffic) {
                const variant = test.variants[Math.floor(Math.random() * test.variants.length)];
                this.assignABTestVariant(test.name, variant);
            }
        });
    }
    
    assignABTestVariant(testName, variant) {
        localStorage.setItem(`ab_test_${testName}`, variant);
        
        gtag('event', 'ab_test_assigned', {
            test_name: testName,
            variant: variant
        });
        
        // Apply variant styling or functionality
        document.body.classList.add(`ab-${testName}-${variant}`);
    }
    
    getABTestVariant(testName) {
        return localStorage.getItem(`ab_test_${testName}`);
    }
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }
    
    init() {
        this.measureCoreWebVitals();
        this.measurePageLoad();
        this.measureResourceTiming();
        this.setupPerformanceObserver();
    }
    
    measureCoreWebVitals() {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            
            gtag('event', 'core_web_vitals', {
                metric_name: 'LCP',
                metric_value: Math.round(lastEntry.startTime),
                metric_rating: this.getLCPRating(lastEntry.startTime)
            });
        }).observe({entryTypes: ['largest-contentful-paint']});
        
        // First Input Delay (FID)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                gtag('event', 'core_web_vitals', {
                    metric_name: 'FID',
                    metric_value: Math.round(entry.processingStart - entry.startTime),
                    metric_rating: this.getFIDRating(entry.processingStart - entry.startTime)
                });
            });
        }).observe({entryTypes: ['first-input']});
        
        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
            
            gtag('event', 'core_web_vitals', {
                metric_name: 'CLS',
                metric_value: Math.round(clsValue * 1000) / 1000,
                metric_rating: this.getCLSRating(clsValue)
            });
        }).observe({entryTypes: ['layout-shift']});
    }
    
    measurePageLoad() {
        window.addEventListener('load', () => {
            const timing = performance.timing;
            
            const metrics = {
                dns_lookup: timing.domainLookupEnd - timing.domainLookupStart,
                tcp_connect: timing.connectEnd - timing.connectStart,
                request_response: timing.responseEnd - timing.requestStart,
                dom_processing: timing.domComplete - timing.domLoading,
                total_load_time: timing.loadEventEnd - timing.navigationStart
            };
            
            Object.entries(metrics).forEach(([name, value]) => {
                gtag('event', 'timing_complete', {
                    name: name,
                    value: Math.round(value)
                });
            });
        });
    }
    
    measureResourceTiming() {
        window.addEventListener('load', () => {
            const resources = performance.getEntriesByType('resource');
            
            resources.forEach(resource => {
                if (resource.duration > 1000) { // Track slow resources (>1s)
                    gtag('event', 'slow_resource', {
                        resource_name: resource.name.split('/').pop(),
                        resource_type: resource.initiatorType,
                        duration: Math.round(resource.duration)
                    });
                }
            });
        });
    }
    
    setupPerformanceObserver() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'navigation') {
                        gtag('event', 'navigation_timing', {
                            navigation_type: entry.type,
                            redirect_time: entry.redirectEnd - entry.redirectStart,
                            dns_time: entry.domainLookupEnd - entry.domainLookupStart,
                            connect_time: entry.connectEnd - entry.connectStart,
                            request_time: entry.responseEnd - entry.requestStart,
                            dom_interactive: entry.domInteractive - entry.navigationStart,
                            dom_complete: entry.domComplete - entry.navigationStart
                        });
                    }
                });
            });
            
            observer.observe({entryTypes: ['navigation']});
        }
    }
    
    getLCPRating(value) {
        if (value <= 2500) return 'good';
        if (value <= 4000) return 'needs_improvement';
        return 'poor';
    }
    
    getFIDRating(value) {
        if (value <= 100) return 'good';
        if (value <= 300) return 'needs_improvement';
        return 'poor';
    }
    
    getCLSRating(value) {
        if (value <= 0.1) return 'good';
        if (value <= 0.25) return 'needs_improvement';
        return 'poor';
    }
}

// Initialize tracking when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.analyticsTracker = new AnalyticsTracker();
    window.performanceMonitor = new PerformanceMonitor();
    
    // Initialize A/B testing
    window.analyticsTracker.initializeABTesting();
});

// Export for external use
window.AnalyticsTracker = AnalyticsTracker;
window.PerformanceMonitor = PerformanceMonitor;