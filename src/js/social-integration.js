/**
 * Advanced Social Media Integration System
 * Features: Social sharing, Instagram feed, Facebook integration, LinkedIn showcase
 */

class SocialMediaIntegration {
    constructor() {
        this.config = {
            instagram: {
                accessToken: 'YOUR_INSTAGRAM_ACCESS_TOKEN', // Replace with actual token
                userId: 'YOUR_INSTAGRAM_USER_ID', // Replace with actual user ID
                hashtags: ['#EpoxyFlooring', '#GarageFloor', '#BasementRenovation', '#CincinnatiHomes']
            },
            facebook: {
                appId: 'YOUR_FACEBOOK_APP_ID', // Replace with actual app ID
                pageId: 'YOUR_FACEBOOK_PAGE_ID' // Replace with actual page ID
            },
            linkedin: {
                companyId: 'YOUR_LINKEDIN_COMPANY_ID' // Replace with actual company ID
            },
            twitter: {
                handle: '@QueenCityCoatings'
            }
        };
        
        this.instagramFeed = [];
        this.socialStats = {};
        
        this.init();
    }
    
    init() {
        this.createSocialWidgets();
        this.loadInstagramFeed();
        this.loadFacebookSDK();
        this.setupSocialSharing();
        this.createSocialProofWidgets();
        this.bindEvents();
    }
    
    loadFacebookSDK() {
        // Load Facebook SDK
        window.fbAsyncInit = function() {
            FB.init({
                appId: this.config.facebook.appId,
                cookie: true,
                xfbml: true,
                version: 'v18.0'
            });
        }.bind(this);
        
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
    
    async loadInstagramFeed() {
        // In production, this would use Instagram Basic Display API
        // For now, we'll use sample data
        this.instagramFeed = [
            {
                id: '1',
                media_type: 'IMAGE',
                media_url: '/images/social/instagram-1.jpg',
                caption: 'Amazing garage floor transformation in West Chester! ✨ Check out this beautiful metallic finish that completely changed the look of this space. #EpoxyFlooring #GarageFloor #CincinnatiHomes',
                timestamp: '2024-03-20T10:00:00Z',
                permalink: 'https://www.instagram.com/p/example1/',
                like_count: 45,
                comments_count: 8
            },
            {
                id: '2',
                media_type: 'IMAGE',
                media_url: '/images/social/instagram-2.jpg',
                caption: 'Before and after of a commercial kitchen floor renovation. NSF-compliant and ready for health department inspection! 🍽️ #CommercialFlooring #RestaurantRenovation #FoodSafe',
                timestamp: '2024-03-18T14:30:00Z',
                permalink: 'https://www.instagram.com/p/example2/',
                like_count: 62,
                comments_count: 12
            },
            {
                id: '3',
                media_type: 'IMAGE',
                media_url: '/images/social/instagram-3.jpg',
                caption: 'Team photo from our latest warehouse project! 💪 45,000 sq ft of heavy-duty industrial flooring completed on time. #TeamWork #IndustrialFlooring #WarehouseRenovation',
                timestamp: '2024-03-15T09:15:00Z',
                permalink: 'https://www.instagram.com/p/example3/',
                like_count: 38,
                comments_count: 6
            },
            {
                id: '4',
                media_type: 'CAROUSEL_ALBUM',
                media_url: '/images/social/instagram-4.jpg',
                caption: 'Step-by-step process of our premium basement floor installation. From prep to perfection! 🏠 Swipe to see the transformation. #BasementRenovation #ProcessVideo #QualityWork',
                timestamp: '2024-03-12T16:45:00Z',
                permalink: 'https://www.instagram.com/p/example4/',
                like_count: 89,
                comments_count: 15
            }
        ];
        
        this.updateInstagramWidget();
    }
    
    createSocialWidgets() {
        this.createInstagramFeedWidget();
        this.createSocialSharingButtons();
        this.createSocialProofBanner();
        this.createFollowButtonsWidget();
    }
    
    createInstagramFeedWidget() {
        const instagramHTML = `
            <div class="instagram-feed-widget">
                <div class="instagram-header">
                    <div class="instagram-title">
                        <img src="/images/icons/instagram.svg" alt="Instagram" class="social-icon">
                        <h3>Follow Our Work</h3>
                        <a href="https://www.instagram.com/queencitysurfacecoatings/" target="_blank" class="follow-btn">
                            Follow @queencitysurfacecoatings
                        </a>
                    </div>
                </div>
                <div class="instagram-grid" id="instagram-grid">
                    <!-- Instagram posts will be loaded here -->
                </div>
                <div class="instagram-footer">
                    <a href="https://www.instagram.com/queencitysurfacecoatings/" target="_blank" class="view-all-btn">
                        View All Posts
                    </a>
                </div>
            </div>
        `;
        
        const instagramContainers = document.querySelectorAll('[data-instagram-feed]');
        instagramContainers.forEach(container => {
            container.innerHTML = instagramHTML;
        });
    }
    
    createSocialSharingButtons() {
        const sharingHTML = `
            <div class="social-sharing-widget">
                <div class="sharing-title">Share This Page</div>
                <div class="sharing-buttons">
                    <button class="share-btn facebook-share" data-platform="facebook">
                        <img src="/images/icons/facebook.svg" alt="Facebook">
                        <span>Facebook</span>
                    </button>
                    <button class="share-btn twitter-share" data-platform="twitter">
                        <img src="/images/icons/twitter.svg" alt="Twitter">
                        <span>Twitter</span>
                    </button>
                    <button class="share-btn linkedin-share" data-platform="linkedin">
                        <img src="/images/icons/linkedin.svg" alt="LinkedIn">
                        <span>LinkedIn</span>
                    </button>
                    <button class="share-btn email-share" data-platform="email">
                        <img src="/images/icons/email.svg" alt="Email">
                        <span>Email</span>
                    </button>
                    <button class="share-btn copy-link" data-platform="copy">
                        <img src="/images/icons/link.svg" alt="Copy Link">
                        <span>Copy Link</span>
                    </button>
                </div>
            </div>
        `;
        
        const sharingContainers = document.querySelectorAll('[data-social-sharing]');
        sharingContainers.forEach(container => {
            container.innerHTML = sharingHTML;
        });
    }
    
    createSocialProofBanner() {
        const proofHTML = `
            <div class="social-proof-banner">
                <div class="proof-content">
                    <div class="proof-stats">
                        <div class="stat-item">
                            <span class="stat-number" data-count="500">0</span>
                            <span class="stat-label">Happy Customers</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number" data-count="1200">0</span>
                            <span class="stat-label">Instagram Followers</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number" data-count="4.9">0</span>
                            <span class="stat-label">Star Rating</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number" data-count="150">0</span>
                            <span class="stat-label">5-Star Reviews</span>
                        </div>
                    </div>
                    <div class="social-links">
                        <a href="https://www.facebook.com/queencitysurfacecoatings" target="_blank" class="social-link facebook">
                            <img src="/images/icons/facebook.svg" alt="Facebook">
                        </a>
                        <a href="https://www.instagram.com/queencitysurfacecoatings" target="_blank" class="social-link instagram">
                            <img src="/images/icons/instagram.svg" alt="Instagram">
                        </a>
                        <a href="https://www.linkedin.com/company/queen-city-surface-coatings" target="_blank" class="social-link linkedin">
                            <img src="/images/icons/linkedin.svg" alt="LinkedIn">
                        </a>
                        <a href="https://twitter.com/queencitycoatings" target="_blank" class="social-link twitter">
                            <img src="/images/icons/twitter.svg" alt="Twitter">
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        const proofContainers = document.querySelectorAll('[data-social-proof]');
        proofContainers.forEach(container => {
            container.innerHTML = proofHTML;
        });
        
        this.animateCounters();
    }
    
    createFollowButtonsWidget() {
        const followHTML = `
            <div class="follow-buttons-widget">
                <h4>Connect With Us</h4>
                <div class="follow-buttons">
                    <a href="https://www.facebook.com/queencitysurfacecoatings" target="_blank" class="follow-button facebook">
                        <img src="/images/icons/facebook.svg" alt="Facebook">
                        <div class="follow-text">
                            <strong>Like our Page</strong>
                            <span>Stay updated with our latest projects</span>
                        </div>
                    </a>
                    <a href="https://www.instagram.com/queencitysurfacecoatings" target="_blank" class="follow-button instagram">
                        <img src="/images/icons/instagram.svg" alt="Instagram">
                        <div class="follow-text">
                            <strong>Follow on Instagram</strong>
                            <span>See behind-the-scenes content</span>
                        </div>
                    </a>
                    <a href="https://www.linkedin.com/company/queen-city-surface-coatings" target="_blank" class="follow-button linkedin">
                        <img src="/images/icons/linkedin.svg" alt="LinkedIn">
                        <div class="follow-text">
                            <strong>Connect on LinkedIn</strong>
                            <span>Professional updates and industry news</span>
                        </div>
                    </a>
                </div>
            </div>
        `;
        
        const followContainers = document.querySelectorAll('[data-follow-buttons]');
        followContainers.forEach(container => {
            container.innerHTML = followHTML;
        });
    }
    
    updateInstagramWidget() {
        const grid = document.getElementById('instagram-grid');
        if (!grid) return;
        
        const postsHTML = this.instagramFeed.map(post => `
            <div class="instagram-post" data-post-id="${post.id}">
                <div class="post-image-container">
                    <img src="${post.media_url}" alt="Instagram post" class="post-image" loading="lazy">
                    <div class="post-overlay">
                        <div class="post-stats">
                            <span class="likes">❤️ ${post.like_count}</span>
                            <span class="comments">💬 ${post.comments_count}</span>
                        </div>
                        <a href="${post.permalink}" target="_blank" class="view-post">View on Instagram</a>
                    </div>
                </div>
                <div class="post-caption">
                    ${this.truncateText(post.caption, 100)}
                </div>
            </div>
        `).join('');
        
        grid.innerHTML = postsHTML;
    }
    
    setupSocialSharing() {
        const shareButtons = document.querySelectorAll('.share-btn');
        shareButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const platform = e.currentTarget.dataset.platform;
                this.shareContent(platform);
            });
        });
    }
    
    shareContent(platform) {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        const description = encodeURIComponent(this.getPageDescription());
        const image = encodeURIComponent(this.getPageImage());
        
        let shareUrl;
        
        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}&via=queencitycoatings`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${description}`;
                break;
            case 'email':
                shareUrl = `mailto:?subject=${title}&body=${description}%0A%0A${url}`;
                break;
            case 'copy':
                this.copyToClipboard(window.location.href);
                return;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
            
            // Track sharing
            if (typeof gtag !== 'undefined') {
                gtag('event', 'share', {
                    method: platform,
                    content_type: 'page',
                    item_id: window.location.pathname
                });
            }
        }
    }
    
    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showToast('Link copied to clipboard!');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showToast('Link copied to clipboard!');
        });
    }
    
    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'social-toast';
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    animateCounter(element) {
        const target = parseFloat(element.dataset.count);
        const duration = 2000;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = target * easeOut;
            
            if (target < 10) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
    
    bindEvents() {
        // Instagram post clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.instagram-post')) {
                const post = e.target.closest('.instagram-post');
                const postId = post.dataset.postId;
                this.trackInstagramClick(postId);
            }
        });
        
        // Social link clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.social-link, .follow-button')) {
                const platform = this.getPlatformFromElement(e.target.closest('.social-link, .follow-button'));
                this.trackSocialClick(platform);
            }
        });
        
        // Scroll-triggered social widgets
        this.setupScrollTriggers();
    }
    
    setupScrollTriggers() {
        // Show floating social share after scrolling 50%
        let hasShownFloatingShare = false;
        
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            
            if (scrollPercent > 50 && !hasShownFloatingShare) {
                this.showFloatingSocialShare();
                hasShownFloatingShare = true;
            }
        });
    }
    
    showFloatingSocialShare() {
        if (document.querySelector('.floating-social-share')) return; // Already exists
        
        const floatingShare = document.createElement('div');
        floatingShare.className = 'floating-social-share';
        floatingShare.innerHTML = `
            <div class="floating-share-content">
                <span class="share-text">Share this page</span>
                <div class="floating-share-buttons">
                    <button class="floating-share-btn facebook" data-platform="facebook">
                        <img src="/images/icons/facebook.svg" alt="Facebook">
                    </button>
                    <button class="floating-share-btn twitter" data-platform="twitter">
                        <img src="/images/icons/twitter.svg" alt="Twitter">
                    </button>
                    <button class="floating-share-btn linkedin" data-platform="linkedin">
                        <img src="/images/icons/linkedin.svg" alt="LinkedIn">
                    </button>
                </div>
                <button class="close-floating-share">×</button>
            </div>
        `;
        
        document.body.appendChild(floatingShare);
        
        // Animate in
        setTimeout(() => {
            floatingShare.classList.add('visible');
        }, 100);
        
        // Bind events
        floatingShare.querySelectorAll('.floating-share-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const platform = e.currentTarget.dataset.platform;
                this.shareContent(platform);
            });
        });
        
        floatingShare.querySelector('.close-floating-share').addEventListener('click', () => {
            floatingShare.remove();
        });
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (floatingShare.parentElement) {
                floatingShare.remove();
            }
        }, 10000);
    }
    
    // Analytics and tracking
    trackInstagramClick(postId) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'instagram_post_click', {
                post_id: postId,
                social_platform: 'instagram'
            });
        }
    }
    
    trackSocialClick(platform) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'social_follow_click', {
                social_platform: platform,
                event_category: 'Social Media'
            });
        }
    }
    
    // User-generated content features
    createHashtagCampaign() {
        const campaignHTML = `
            <div class="hashtag-campaign">
                <div class="campaign-content">
                    <h3>Share Your Project</h3>
                    <p>Got Queen City flooring? Show it off and tag us!</p>
                    <div class="campaign-hashtags">
                        ${this.config.instagram.hashtags.map(tag => 
                            `<span class="hashtag">${tag}</span>`
                        ).join('')}
                    </div>
                    <a href="https://www.instagram.com/queencitysurfacecoatings/" target="_blank" class="campaign-cta">
                        Tag @queencitysurfacecoatings
                    </a>
                </div>
                <div class="campaign-gallery" id="user-generated-content">
                    <!-- User-generated content would be loaded here -->
                </div>
            </div>
        `;
        
        const campaignContainers = document.querySelectorAll('[data-hashtag-campaign]');
        campaignContainers.forEach(container => {
            container.innerHTML = campaignHTML;
        });
    }
    
    // Social proof integration
    async loadSocialProof() {
        // This would typically fetch real-time social metrics
        const socialMetrics = {
            facebook_followers: 850,
            instagram_followers: 1200,
            linkedin_followers: 320,
            total_engagement: 15600,
            recent_mentions: 45
        };
        
        this.updateSocialProofNumbers(socialMetrics);
    }
    
    updateSocialProofNumbers(metrics) {
        const elements = {
            '.facebook-followers': metrics.facebook_followers,
            '.instagram-followers': metrics.instagram_followers,
            '.linkedin-followers': metrics.linkedin_followers,
            '.total-engagement': metrics.total_engagement
        };
        
        Object.entries(elements).forEach(([selector, value]) => {
            const element = document.querySelector(selector);
            if (element) {
                element.textContent = value.toLocaleString();
            }
        });
    }
    
    // Utility methods
    getPageDescription() {
        const metaDescription = document.querySelector('meta[name="description"]');
        return metaDescription ? metaDescription.content : document.title;
    }
    
    getPageImage() {
        const ogImage = document.querySelector('meta[property="og:image"]');
        if (ogImage) return ogImage.content;
        
        const firstImage = document.querySelector('img[src]');
        if (firstImage) return firstImage.src;
        
        return window.location.origin + '/images/logo.png';
    }
    
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
    
    getPlatformFromElement(element) {
        const classes = element.className;
        if (classes.includes('facebook')) return 'facebook';
        if (classes.includes('instagram')) return 'instagram';
        if (classes.includes('linkedin')) return 'linkedin';
        if (classes.includes('twitter')) return 'twitter';
        return 'unknown';
    }
    
    // Public API methods
    refreshInstagramFeed() {
        this.loadInstagramFeed();
    }
    
    addCustomPost(postData) {
        this.instagramFeed.unshift(postData);
        this.updateInstagramWidget();
    }
    
    updateSocialStats(stats) {
        this.socialStats = { ...this.socialStats, ...stats };
        this.updateSocialProofNumbers(this.socialStats);
    }
    
    // Schema.org social organization markup
    generateSocialSchema() {
        return {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Queen City Surface Coatings",
            "url": "https://queencitysurfacecoatings.com",
            "sameAs": [
                "https://www.facebook.com/queencitysurfacecoatings",
                "https://www.instagram.com/queencitysurfacecoatings",
                "https://www.linkedin.com/company/queen-city-surface-coatings",
                "https://twitter.com/queencitycoatings"
            ],
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-513-555-0123",
                "contactType": "customer service",
                "availableLanguage": "English"
            }
        };
    }
}

// Add CSS styles for social integration
const socialStyles = `
    .instagram-feed-widget {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        margin: 2rem 0;
    }
    
    .instagram-header {
        background: linear-gradient(45deg, #fd5949, #d6249f, #285AEB);
        padding: 1.5rem;
        color: white;
        text-align: center;
    }
    
    .instagram-title {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
    }
    
    .social-icon {
        width: 32px;
        height: 32px;
        filter: brightness(0) invert(1);
    }
    
    .follow-btn {
        background: rgba(255,255,255,0.2);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 25px;
        text-decoration: none;
        font-weight: 600;
        transition: background 0.3s;
    }
    
    .follow-btn:hover {
        background: rgba(255,255,255,0.3);
    }
    
    .instagram-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 0;
    }
    
    .instagram-post {
        position: relative;
        aspect-ratio: 1;
        overflow: hidden;
        cursor: pointer;
        transition: transform 0.3s ease;
    }
    
    .instagram-post:hover {
        transform: scale(1.05);
        z-index: 2;
    }
    
    .post-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .post-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s;
        color: white;
        text-align: center;
        padding: 1rem;
    }
    
    .instagram-post:hover .post-overlay {
        opacity: 1;
    }
    
    .post-stats {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        font-size: 0.9rem;
    }
    
    .view-post {
        background: rgba(255,255,255,0.2);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        text-decoration: none;
        font-weight: 600;
    }
    
    .post-caption {
        display: none;
    }
    
    .instagram-footer {
        padding: 1rem;
        text-align: center;
        background: #f8f9fa;
    }
    
    .view-all-btn {
        color: #2c5530;
        text-decoration: none;
        font-weight: 600;
    }
    
    .social-sharing-widget {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        margin: 2rem 0;
    }
    
    .sharing-title {
        font-weight: 600;
        margin-bottom: 1rem;
        color: #333;
    }
    
    .sharing-buttons {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }
    
    .share-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 6px;
        padding: 0.5rem 1rem;
        cursor: pointer;
        transition: all 0.3s;
        text-decoration: none;
        color: #333;
        font-size: 0.9rem;
    }
    
    .share-btn:hover {
        background: #e9ecef;
        transform: translateY(-2px);
    }
    
    .share-btn img {
        width: 20px;
        height: 20px;
    }
    
    .facebook-share:hover {
        background: #1877f2;
        color: white;
        border-color: #1877f2;
    }
    
    .twitter-share:hover {
        background: #1da1f2;
        color: white;
        border-color: #1da1f2;
    }
    
    .linkedin-share:hover {
        background: #0077b5;
        color: white;
        border-color: #0077b5;
    }
    
    .social-proof-banner {
        background: linear-gradient(135deg, #2c5530 0%, #1a3d1f 100%);
        color: white;
        padding: 2rem;
        border-radius: 12px;
        margin: 2rem 0;
    }
    
    .proof-content {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 2rem;
        align-items: center;
    }
    
    .proof-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 2rem;
    }
    
    .stat-item {
        text-align: center;
    }
    
    .stat-number {
        display: block;
        font-size: 2rem;
        font-weight: 700;
        color: #ffd700;
        margin-bottom: 0.25rem;
    }
    
    .stat-label {
        font-size: 0.85rem;
        opacity: 0.9;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    .social-links {
        display: flex;
        gap: 1rem;
    }
    
    .social-link {
        width: 50px;
        height: 50px;
        background: rgba(255,255,255,0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
        text-decoration: none;
    }
    
    .social-link:hover {
        background: rgba(255,255,255,0.2);
        transform: translateY(-2px);
    }
    
    .social-link img {
        width: 24px;
        height: 24px;
        filter: brightness(0) invert(1);
    }
    
    .follow-buttons-widget {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        margin: 2rem 0;
    }
    
    .follow-buttons-widget h4 {
        margin-bottom: 1.5rem;
        color: #2c5530;
        text-align: center;
    }
    
    .follow-buttons {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .follow-button {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        text-decoration: none;
        color: #333;
        transition: all 0.3s;
    }
    
    .follow-button:hover {
        background: #f8f9fa;
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }
    
    .follow-button img {
        width: 40px;
        height: 40px;
    }
    
    .follow-text strong {
        display: block;
        margin-bottom: 0.25rem;
    }
    
    .follow-text span {
        font-size: 0.85rem;
        color: #666;
    }
    
    .floating-social-share {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 1000;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    }
    
    .floating-social-share.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .floating-share-content {
        padding: 1.5rem;
        position: relative;
    }
    
    .share-text {
        display: block;
        font-weight: 600;
        margin-bottom: 1rem;
        color: #333;
        text-align: center;
    }
    
    .floating-share-buttons {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
    }
    
    .floating-share-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s;
    }
    
    .floating-share-btn:hover {
        transform: scale(1.1);
    }
    
    .floating-share-btn.facebook {
        background: #1877f2;
    }
    
    .floating-share-btn.twitter {
        background: #1da1f2;
    }
    
    .floating-share-btn.linkedin {
        background: #0077b5;
    }
    
    .floating-share-btn img {
        width: 20px;
        height: 20px;
        filter: brightness(0) invert(1);
    }
    
    .close-floating-share {
        position: absolute;
        top: 5px;
        right: 5px;
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: #999;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .close-floating-share:hover {
        background: #f0f0f0;
    }
    
    .social-toast {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: #333;
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        font-weight: 500;
        z-index: 10001;
        opacity: 0;
        transition: all 0.3s ease;
    }
    
    .social-toast.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
    
    .hashtag-campaign {
        background: linear-gradient(135deg, #fd5949, #d6249f);
        color: white;
        padding: 3rem 2rem;
        border-radius: 12px;
        margin: 2rem 0;
        text-align: center;
    }
    
    .campaign-hashtags {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin: 1rem 0;
        flex-wrap: wrap;
    }
    
    .hashtag {
        background: rgba(255,255,255,0.2);
        padding: 0.5rem 1rem;
        border-radius: 25px;
        font-weight: 600;
    }
    
    .campaign-cta {
        display: inline-block;
        background: white;
        color: #d6249f;
        padding: 1rem 2rem;
        border-radius: 25px;
        text-decoration: none;
        font-weight: 600;
        margin-top: 1rem;
        transition: transform 0.3s;
    }
    
    .campaign-cta:hover {
        transform: translateY(-2px);
    }
    
    @media (max-width: 768px) {
        .proof-content {
            grid-template-columns: 1fr;
            text-align: center;
        }
        
        .proof-stats {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .instagram-grid {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .sharing-buttons {
            justify-content: center;
        }
        
        .floating-social-share {
            bottom: 10px;
            right: 10px;
            left: 10px;
            width: auto;
        }
    }
`;

// Add styles to page
const styleSheet = document.createElement('style');
styleSheet.textContent = socialStyles;
document.head.appendChild(styleSheet);

// Initialize social integration when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.socialIntegration = new SocialMediaIntegration();
});

// Export for external use
window.SocialMediaIntegration = SocialMediaIntegration;