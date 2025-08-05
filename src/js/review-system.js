/**
 * Advanced Review and Testimonial Management System
 * Features: Review collection, Google Reviews integration, testimonial management
 */

class ReviewSystem {
    constructor() {
        this.reviews = [];
        this.testimonials = [];
        this.googleReviews = [];
        this.averageRating = 0;
        this.totalReviews = 0;
        
        this.init();
    }
    
    async init() {
        await this.loadReviews();
        await this.loadGoogleReviews();
        this.createReviewWidgets();
        this.bindEvents();
        this.updateRatingDisplay();
    }
    
    async loadReviews() {
        // In a real implementation, this would fetch from your database
        // For now, we'll use sample data
        this.reviews = [
            {
                id: 1,
                name: "Mike Johnson",
                email: "mike@email.com",
                rating: 5,
                title: "Outstanding Garage Floor Transformation",
                review: "Queen City transformed my garage floor beyond my expectations. The metallic finish looks incredible and the team was professional throughout. Highly recommend!",
                date: "2024-03-15",
                project_type: "garage",
                verified: true,
                photos: ["/images/reviews/mike-before.jpg", "/images/reviews/mike-after.jpg"],
                response: "Thank you Mike! We're thrilled you love your new garage floor. The metallic finish really does create a stunning look!"
            },
            {
                id: 2,
                name: "Sarah Chen",
                email: "sarah@email.com",
                rating: 5,
                title: "Perfect Commercial Kitchen Flooring",
                review: "Needed NSF-compliant flooring for our restaurant. Queen City delivered exactly what we needed on time and within budget. The floor looks great and is so easy to clean.",
                date: "2024-03-10",
                project_type: "commercial",
                verified: true,
                photos: [],
                response: "Thanks Sarah! Food-safe flooring is our specialty. We're glad we could help your restaurant meet health department standards."
            },
            {
                id: 3,
                name: "David Martinez",
                email: "david@email.com",
                rating: 5,
                title: "Basement Floor Perfection",
                review: "My basement had moisture issues and old carpet. Queen City installed a beautiful epoxy floor that's moisture-resistant and looks amazing. Great value for the investment.",
                date: "2024-03-05",
                project_type: "basement",
                verified: true,
                photos: ["/images/reviews/david-final.jpg"],
                response: null
            }
        ];
        
        this.calculateAverageRating();
    }
    
    async loadGoogleReviews() {
        // In production, this would connect to Google My Business API
        this.googleReviews = [
            {
                author_name: "Jennifer Wilson",
                rating: 5,
                text: "Exceptional service from start to finish. The crew arrived on time, worked efficiently, and left everything spotless. Our garage floor looks like a showroom now!",
                time: 1710432000,
                profile_photo_url: "https://via.placeholder.com/50x50"
            },
            {
                author_name: "Robert Thompson",
                rating: 5,
                text: "Queen City Surface Coatings exceeded our expectations. Professional, reliable, and the quality of work is outstanding. Worth every penny!",
                time: 1710000000,
                profile_photo_url: "https://via.placeholder.com/50x50"
            }
        ];
    }
    
    calculateAverageRating() {
        if (this.reviews.length === 0) return;
        
        const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
        this.averageRating = (totalRating / this.reviews.length).toFixed(1);
        this.totalReviews = this.reviews.length + this.googleReviews.length;
    }
    
    createReviewWidgets() {
        this.createReviewSummaryWidget();
        this.createReviewDisplayWidget();
        this.createReviewFormWidget();
        this.createTestimonialSlider();
    }
    
    createReviewSummaryWidget() {
        const summaryHTML = `
            <div class="review-summary-widget">
                <div class="rating-overview">
                    <div class="average-rating">
                        <span class="rating-number">${this.averageRating}</span>
                        <div class="rating-stars">
                            ${this.generateStarRating(this.averageRating)}
                        </div>
                    </div>
                    <div class="rating-details">
                        <p class="review-count">${this.totalReviews} reviews</p>
                        <div class="rating-breakdown">
                            ${this.generateRatingBreakdown()}
                        </div>
                    </div>
                </div>
                <div class="review-actions">
                    <button class="btn-primary" onclick="reviewSystem.showReviewForm()">Write a Review</button>
                    <a href="https://www.google.com/search?q=queen+city+surface+coatings+reviews" target="_blank" class="btn-secondary">
                        View Google Reviews
                    </a>
                </div>
            </div>
        `;
        
        // Insert summary widget where needed
        const summaryContainers = document.querySelectorAll('[data-review-summary]');
        summaryContainers.forEach(container => {
            container.innerHTML = summaryHTML;
        });
    }
    
    createReviewDisplayWidget() {
        const reviewsHTML = `
            <div class="reviews-display-widget">
                <div class="reviews-header">
                    <h3>Customer Reviews</h3>
                    <div class="reviews-filter">
                        <select id="review-filter" onchange="reviewSystem.filterReviews(this.value)">
                            <option value="all">All Reviews</option>
                            <option value="garage">Garage Projects</option>
                            <option value="basement">Basement Projects</option>
                            <option value="commercial">Commercial Projects</option>
                            <option value="5">5 Star Only</option>
                        </select>
                    </div>
                </div>
                <div class="reviews-list" id="reviews-list">
                    ${this.generateReviewsList()}
                </div>
                <button class="load-more-reviews" onclick="reviewSystem.loadMoreReviews()">Load More Reviews</button>
            </div>
        `;
        
        const reviewContainers = document.querySelectorAll('[data-reviews-display]');
        reviewContainers.forEach(container => {
            container.innerHTML = reviewsHTML;
        });
    }
    
    createReviewFormWidget() {
        const formHTML = `
            <div class="review-form-widget" id="review-form-widget" style="display: none;">
                <div class="review-form-overlay">
                    <div class="review-form-container">
                        <div class="review-form-header">
                            <h3>Share Your Experience</h3>
                            <button class="close-form" onclick="reviewSystem.hideReviewForm()">×</button>
                        </div>
                        <form id="review-form" onsubmit="reviewSystem.submitReview(event)">
                            <div class="form-group">
                                <label>Overall Rating *</label>
                                <div class="rating-input" id="rating-input">
                                    <span class="star" data-rating="1">★</span>
                                    <span class="star" data-rating="2">★</span>
                                    <span class="star" data-rating="3">★</span>
                                    <span class="star" data-rating="4">★</span>
                                    <span class="star" data-rating="5">★</span>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="review-title">Review Title *</label>
                                <input type="text" id="review-title" required placeholder="Brief title for your review">
                            </div>
                            
                            <div class="form-group">
                                <label for="review-text">Your Review *</label>
                                <textarea id="review-text" required rows="4" placeholder="Tell us about your experience with Queen City Surface Coatings..."></textarea>
                            </div>
                            
                            <div class="form-group">
                                <label for="project-type">Project Type</label>
                                <select id="project-type">
                                    <option value="">Select project type</option>
                                    <option value="garage">Garage Floor</option>
                                    <option value="basement">Basement</option>
                                    <option value="commercial">Commercial</option>
                                    <option value="patio">Patio/Deck</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="customer-name">Your Name *</label>
                                <input type="text" id="customer-name" required placeholder="First and last name">
                            </div>
                            
                            <div class="form-group">
                                <label for="customer-email">Email Address *</label>
                                <input type="email" id="customer-email" required placeholder="We'll use this to verify your review">
                            </div>
                            
                            <div class="form-group">
                                <label for="review-photos">Photos (optional)</label>
                                <input type="file" id="review-photos" multiple accept="image/*">
                                <small>Upload before/after photos of your project</small>
                            </div>
                            
                            <div class="form-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="consent" required>
                                    I consent to Queen City Surface Coatings using this review for marketing purposes
                                </label>
                            </div>
                            
                            <div class="form-actions">
                                <button type="button" onclick="reviewSystem.hideReviewForm()" class="btn-secondary">Cancel</button>
                                <button type="submit" class="btn-primary">Submit Review</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', formHTML);
        this.bindRatingInput();
    }
    
    createTestimonialSlider() {
        const featuredTestimonials = this.reviews.filter(review => review.rating >= 4).slice(0, 3);
        
        const sliderHTML = `
            <div class="testimonial-slider-widget">
                <div class="testimonial-slider" id="testimonial-slider">
                    ${featuredTestimonials.map((review, index) => `
                        <div class="testimonial-slide ${index === 0 ? 'active' : ''}">
                            <div class="testimonial-content">
                                <div class="testimonial-rating">
                                    ${this.generateStarRating(review.rating)}
                                </div>
                                <blockquote>"${review.review}"</blockquote>
                                <div class="testimonial-author">
                                    <strong>${review.name}</strong>
                                    <span>${review.project_type} project</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="testimonial-nav">
                    <button class="prev-testimonial" onclick="reviewSystem.prevTestimonial()">‹</button>
                    <div class="testimonial-dots">
                        ${featuredTestimonials.map((_, index) => `
                            <button class="dot ${index === 0 ? 'active' : ''}" onclick="reviewSystem.goToTestimonial(${index})"></button>
                        `).join('')}
                    </div>
                    <button class="next-testimonial" onclick="reviewSystem.nextTestimonial()">›</button>
                </div>
            </div>
        `;
        
        const testimonialContainers = document.querySelectorAll('[data-testimonial-slider]');
        testimonialContainers.forEach(container => {
            container.innerHTML = sliderHTML;
        });
        
        this.startTestimonialAutoplay();
    }
    
    generateStarRating(rating, interactive = false) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let starsHTML = '';
        
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<span class="star filled">★</span>';
        }
        
        if (hasHalfStar) {
            starsHTML += '<span class="star half">★</span>';
        }
        
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<span class="star empty">★</span>';
        }
        
        return starsHTML;
    }
    
    generateRatingBreakdown() {
        const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        
        this.reviews.forEach(review => {
            breakdown[review.rating]++;
        });
        
        const total = this.reviews.length;
        
        return Object.keys(breakdown).reverse().map(rating => {
            const count = breakdown[rating];
            const percentage = total > 0 ? (count / total) * 100 : 0;
            
            return `
                <div class="rating-bar">
                    <span class="rating-label">${rating}★</span>
                    <div class="rating-progress">
                        <div class="rating-fill" style="width: ${percentage}%"></div>
                    </div>
                    <span class="rating-count">${count}</span>
                </div>
            `;
        }).join('');
    }
    
    generateReviewsList(filter = 'all') {
        let filteredReviews = this.reviews;
        
        if (filter !== 'all') {
            if (filter === '5') {
                filteredReviews = this.reviews.filter(review => review.rating === 5);
            } else {
                filteredReviews = this.reviews.filter(review => review.project_type === filter);
            }
        }
        
        return filteredReviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <div class="review-author">
                        <strong>${review.name}</strong>
                        ${review.verified ? '<span class="verified-badge">✓ Verified</span>' : ''}
                    </div>
                    <div class="review-rating">
                        ${this.generateStarRating(review.rating)}
                    </div>
                </div>
                <h4 class="review-title">${review.title}</h4>
                <p class="review-text">${review.review}</p>
                
                ${review.photos && review.photos.length > 0 ? `
                    <div class="review-photos">
                        ${review.photos.map(photo => `
                            <img src="${photo}" alt="Customer project photo" onclick="reviewSystem.openPhotoLightbox('${photo}')">
                        `).join('')}
                    </div>
                ` : ''}
                
                <div class="review-meta">
                    <span class="review-date">${this.formatDate(review.date)}</span>
                    <span class="review-project">${review.project_type} project</span>
                </div>
                
                ${review.response ? `
                    <div class="business-response">
                        <strong>Response from Queen City Surface Coatings:</strong>
                        <p>${review.response}</p>
                    </div>
                ` : ''}
                
                <div class="review-actions">
                    <button onclick="reviewSystem.likeReview(${review.id})" class="review-action-btn">
                        👍 Helpful
                    </button>
                    <button onclick="reviewSystem.shareReview(${review.id})" class="review-action-btn">
                        📤 Share
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    bindEvents() {
        // Rating input for review form
        this.bindRatingInput();
        
        // Auto-save review form
        const reviewForm = document.getElementById('review-form');
        if (reviewForm) {
            const inputs = reviewForm.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('input', () => this.autoSaveReviewForm());
            });
        }
    }
    
    bindRatingInput() {
        const stars = document.querySelectorAll('#rating-input .star');
        let selectedRating = 0;
        
        stars.forEach(star => {
            star.addEventListener('mouseover', () => {
                const rating = parseInt(star.dataset.rating);
                this.highlightStars(rating);
            });
            
            star.addEventListener('mouseout', () => {
                this.highlightStars(selectedRating);
            });
            
            star.addEventListener('click', () => {
                selectedRating = parseInt(star.dataset.rating);
                this.highlightStars(selectedRating);
                
                // Store rating for form submission
                star.closest('.rating-input').dataset.rating = selectedRating;
            });
        });
    }
    
    highlightStars(rating) {
        const stars = document.querySelectorAll('#rating-input .star');
        stars.forEach((star, index) => {
            star.classList.toggle('selected', index < rating);
        });
    }
    
    showReviewForm() {
        document.getElementById('review-form-widget').style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Track review form opening
        if (typeof gtag !== 'undefined') {
            gtag('event', 'review_form_opened', {
                'event_category': 'engagement'
            });
        }
    }
    
    hideReviewForm() {
        document.getElementById('review-form-widget').style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    async submitReview(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        
        const reviewData = {
            rating: parseInt(document.getElementById('rating-input').dataset.rating) || 0,
            title: formData.get('review-title') || document.getElementById('review-title').value,
            review: formData.get('review-text') || document.getElementById('review-text').value,
            project_type: formData.get('project-type') || document.getElementById('project-type').value,
            name: formData.get('customer-name') || document.getElementById('customer-name').value,
            email: formData.get('customer-email') || document.getElementById('customer-email').value,
            date: new Date().toISOString().split('T')[0],
            verified: false,
            photos: []
        };
        
        // Validate required fields
        if (!reviewData.rating || !reviewData.title || !reviewData.review || !reviewData.name || !reviewData.email) {
            alert('Please fill in all required fields and select a rating.');
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        try {
            // In production, this would send to your backend API
            await this.saveReview(reviewData);
            
            // Show success message
            this.showSuccessMessage();
            this.hideReviewForm();
            
            // Track review submission
            if (typeof gtag !== 'undefined') {
                gtag('event', 'review_submitted', {
                    'event_category': 'conversion',
                    'event_label': `${reviewData.rating}_star_review`
                });
            }
            
            // Clear form
            form.reset();
            this.highlightStars(0);
            
        } catch (error) {
            console.error('Review submission error:', error);
            alert('There was an error submitting your review. Please try again.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
    
    async saveReview(reviewData) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Add to local reviews (in production, this would be handled by backend)
        reviewData.id = Date.now();
        this.reviews.unshift(reviewData);
        
        // Update display
        this.calculateAverageRating();
        this.updateRatingDisplay();
        this.refreshReviewsList();
    }
    
    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-notification';
        message.innerHTML = `
            <div class="success-content">
                <span class="success-icon">✅</span>
                <div>
                    <strong>Thank you for your review!</strong>
                    <p>Your review has been submitted and will appear after verification.</p>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" class="close-notification">×</button>
            </div>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentElement) {
                message.remove();
            }
        }, 5000);
    }
    
    filterReviews(filter) {
        const reviewsList = document.getElementById('reviews-list');
        reviewsList.innerHTML = this.generateReviewsList(filter);
    }
    
    refreshReviewsList() {
        const reviewsList = document.getElementById('reviews-list');
        if (reviewsList) {
            reviewsList.innerHTML = this.generateReviewsList();
        }
    }
    
    updateRatingDisplay() {
        const summaryWidgets = document.querySelectorAll('.review-summary-widget');
        summaryWidgets.forEach(widget => {
            const ratingNumber = widget.querySelector('.rating-number');
            const reviewCount = widget.querySelector('.review-count');
            
            if (ratingNumber) ratingNumber.textContent = this.averageRating;
            if (reviewCount) reviewCount.textContent = `${this.totalReviews} reviews`;
        });
    }
    
    // Testimonial slider methods
    startTestimonialAutoplay() {
        this.testimonialInterval = setInterval(() => {
            this.nextTestimonial();
        }, 5000);
    }
    
    nextTestimonial() {
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.testimonial-dots .dot');
        const currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
        const nextIndex = (currentIndex + 1) % slides.length;
        
        slides[currentIndex].classList.remove('active');
        slides[nextIndex].classList.add('active');
        
        dots[currentIndex].classList.remove('active');
        dots[nextIndex].classList.add('active');
    }
    
    prevTestimonial() {
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.testimonial-dots .dot');
        const currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
        const prevIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
        
        slides[currentIndex].classList.remove('active');
        slides[prevIndex].classList.add('active');
        
        dots[currentIndex].classList.remove('active');
        dots[prevIndex].classList.add('active');
    }
    
    goToTestimonial(index) {
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.testimonial-dots .dot');
        
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    // Utility methods
    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    
    autoSaveReviewForm() {
        // Auto-save form data to localStorage
        const formData = {
            rating: document.getElementById('rating-input').dataset.rating,
            title: document.getElementById('review-title').value,
            review: document.getElementById('review-text').value,
            projectType: document.getElementById('project-type').value,
            name: document.getElementById('customer-name').value,
            email: document.getElementById('customer-email').value
        };
        
        localStorage.setItem('review-form-draft', JSON.stringify(formData));
    }
    
    loadReviewFormDraft() {
        const draft = localStorage.getItem('review-form-draft');
        if (draft) {
            const formData = JSON.parse(draft);
            
            if (formData.rating) {
                this.highlightStars(parseInt(formData.rating));
                document.getElementById('rating-input').dataset.rating = formData.rating;
            }
            if (formData.title) document.getElementById('review-title').value = formData.title;
            if (formData.review) document.getElementById('review-text').value = formData.review;
            if (formData.projectType) document.getElementById('project-type').value = formData.projectType;
            if (formData.name) document.getElementById('customer-name').value = formData.name;
            if (formData.email) document.getElementById('customer-email').value = formData.email;
        }
    }
    
    // Schema.org structured data for reviews
    generateReviewSchema() {
        const reviews = this.reviews.slice(0, 5); // Include top 5 reviews
        
        const schema = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Queen City Surface Coatings",
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": this.averageRating,
                "reviewCount": this.totalReviews,
                "bestRating": "5",
                "worstRating": "1"
            },
            "review": reviews.map(review => ({
                "@type": "Review",
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": review.rating,
                    "bestRating": "5"
                },
                "author": {
                    "@type": "Person",
                    "name": review.name
                },
                "reviewBody": review.review,
                "datePublished": review.date
            }))
        };
        
        return JSON.stringify(schema);
    }
    
    // Public API methods for external integration
    addReview(reviewData) {
        this.reviews.unshift(reviewData);
        this.calculateAverageRating();
        this.updateRatingDisplay();
        this.refreshReviewsList();
    }
    
    getAverageRating() {
        return this.averageRating;
    }
    
    getTotalReviews() {
        return this.totalReviews;
    }
    
    // Integration methods
    async syncWithGoogleReviews() {
        // In production, this would sync with Google My Business API
        console.log('Syncing with Google Reviews...');
    }
    
    requestReviewFromCustomer(customerEmail, projectDetails) {
        // Send review request email
        const reviewLink = `${window.location.origin}/review?customer=${encodeURIComponent(customerEmail)}`;
        
        // In production, this would trigger email send
        console.log(`Review request sent to ${customerEmail}: ${reviewLink}`);
        
        return reviewLink;
    }
}

// Add CSS styles for review system
const reviewStyles = `
    .review-summary-widget {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        margin: 2rem 0;
    }
    
    .rating-overview {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 2rem;
        margin-bottom: 2rem;
    }
    
    .average-rating {
        text-align: center;
    }
    
    .rating-number {
        font-size: 3rem;
        font-weight: 700;
        color: #2c5530;
        display: block;
        line-height: 1;
    }
    
    .rating-stars {
        margin-top: 0.5rem;
    }
    
    .star {
        color: #ffc107;
        font-size: 1.5rem;
    }
    
    .star.filled {
        color: #ffc107;
    }
    
    .star.empty {
        color: #e9ecef;
    }
    
    .star.half {
        background: linear-gradient(90deg, #ffc107 50%, #e9ecef 50%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    
    .rating-breakdown {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .rating-bar {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 1rem;
        font-size: 0.9rem;
    }
    
    .rating-progress {
        height: 8px;
        background: #e9ecef;
        border-radius: 4px;
        overflow: hidden;
    }
    
    .rating-fill {
        height: 100%;
        background: #ffc107;
        transition: width 0.3s ease;
    }
    
    .review-actions {
        display: flex;
        gap: 1rem;
    }
    
    .reviews-display-widget {
        margin: 2rem 0;
    }
    
    .reviews-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }
    
    .reviews-filter select {
        padding: 0.5rem;
        border: 1px solid #dee2e6;
        border-radius: 4px;
    }
    
    .review-item {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        margin-bottom: 1.5rem;
    }
    
    .review-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;
    }
    
    .verified-badge {
        background: #28a745;
        color: white;
        padding: 0.2rem 0.5rem;
        border-radius: 12px;
        font-size: 0.7rem;
        margin-left: 0.5rem;
    }
    
    .review-title {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #2c5530;
    }
    
    .review-text {
        line-height: 1.6;
        margin-bottom: 1rem;
    }
    
    .review-photos {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    
    .review-photos img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 4px;
        cursor: pointer;
        transition: transform 0.2s;
    }
    
    .review-photos img:hover {
        transform: scale(1.05);
    }
    
    .review-meta {
        display: flex;
        gap: 1rem;
        font-size: 0.85rem;
        color: #6c757d;
        margin-bottom: 1rem;
    }
    
    .business-response {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 6px;
        border-left: 3px solid #2c5530;
        margin-bottom: 1rem;
    }
    
    .review-actions {
        display: flex;
        gap: 1rem;
    }
    
    .review-action-btn {
        background: none;
        border: 1px solid #dee2e6;
        padding: 0.4rem 0.8rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.85rem;
        transition: all 0.2s;
    }
    
    .review-action-btn:hover {
        background: #f8f9fa;
    }
    
    .review-form-widget {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .review-form-container {
        background: white;
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
        border-radius: 12px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    
    .review-form-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 1px solid #e9ecef;
    }
    
    .close-form {
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: #6c757d;
        line-height: 1;
    }
    
    .review-form-container form {
        padding: 1.5rem;
    }
    
    .form-group {
        margin-bottom: 1.5rem;
    }
    
    .form-group label {
        display: block;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #333;
    }
    
    .form-group input,
    .form-group textarea,
    .form-group select {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #dee2e6;
        border-radius: 4px;
        font-size: 1rem;
    }
    
    .form-group input:focus,
    .form-group textarea:focus,
    .form-group select:focus {
        outline: none;
        border-color: #2c5530;
    }
    
    .rating-input {
        display: flex;
        gap: 0.25rem;
        margin-top: 0.5rem;
    }
    
    .rating-input .star {
        font-size: 2rem;
        color: #e9ecef;
        cursor: pointer;
        transition: color 0.2s;
    }
    
    .rating-input .star.selected {
        color: #ffc107;
    }
    
    .checkbox-label {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        font-weight: normal !important;
    }
    
    .checkbox-label input {
        margin-top: 0.2rem;
        width: auto;
    }
    
    .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 2rem;
    }
    
    .btn-primary {
        background: #2c5530;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 600;
        transition: background 0.2s;
    }
    
    .btn-primary:hover {
        background: #1a3d1f;
    }
    
    .btn-secondary {
        background: #6c757d;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 600;
        transition: background 0.2s;
    }
    
    .btn-secondary:hover {
        background: #545b62;
    }
    
    .testimonial-slider-widget {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        margin: 2rem 0;
    }
    
    .testimonial-slide {
        display: none;
        text-align: center;
        padding: 2rem;
    }
    
    .testimonial-slide.active {
        display: block;
    }
    
    .testimonial-content blockquote {
        font-size: 1.25rem;
        font-style: italic;
        margin: 1rem 0;
        color: #333;
        line-height: 1.6;
    }
    
    .testimonial-author strong {
        color: #2c5530;
        font-size: 1.1rem;
    }
    
    .testimonial-nav {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        margin-top: 1.5rem;
    }
    
    .prev-testimonial,
    .next-testimonial {
        background: #2c5530;
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .testimonial-dots {
        display: flex;
        gap: 0.5rem;
    }
    
    .testimonial-dots .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #e9ecef;
        border: none;
        cursor: pointer;
        transition: background 0.2s;
    }
    
    .testimonial-dots .dot.active {
        background: #2c5530;
    }
    
    .success-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        z-index: 10001;
        animation: slideInRight 0.3s ease;
    }
    
    .success-content {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 1.5rem;
    }
    
    .success-icon {
        font-size: 1.5rem;
    }
    
    .close-notification {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #6c757d;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @media (max-width: 768px) {
        .rating-overview {
            grid-template-columns: 1fr;
            gap: 1rem;
            text-align: center;
        }
        
        .reviews-header {
            flex-direction: column;
            gap: 1rem;
        }
        
        .review-actions {
            flex-direction: column;
        }
        
        .form-actions {
            flex-direction: column-reverse;
        }
    }
`;

// Add styles to page
const styleSheet = document.createElement('style');
styleSheet.textContent = reviewStyles;
document.head.appendChild(styleSheet);

// Initialize review system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.reviewSystem = new ReviewSystem();
});

// Export for external use
window.ReviewSystem = ReviewSystem;