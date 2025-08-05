// Centralized testimonials system
// Add new reviews here and they'll appear across all county pages

export const testimonials = [
  {
    id: 1,
    name: "Mike & Sarah Thompson",
    location: "Mason, OH",
    county: "Warren County",
    service: "Garage Floor Epoxy",
    rating: 5,
    text: "Queen City Surface Coatings transformed our garage into a showroom-quality space. John's attention to detail and professional approach exceeded our expectations. The floor looks amazing and has held up perfectly through Cincinnati's harsh winter conditions.",
    featured: true
  },
  {
    id: 2,
    name: "David Rodriguez",
    location: "Covington, KY", 
    county: "Kenton County",
    service: "Commercial Warehouse Coating",
    rating: 5,
    text: "Professional, punctual, and perfect results. As a fellow veteran, I appreciated John's military precision and commitment to excellence. Our warehouse floor looks incredible and performs even better.",
    featured: true
  },
  {
    id: 3,
    name: "Jennifer Chen",
    location: "West Chester, OH",
    county: "Butler County", 
    service: "Basement Floor Coating",
    rating: 5,
    text: "Our basement went from a dingy storage area to a beautiful family room thanks to Queen City Surface Coatings. The moisture-resistant coating has been perfect - no issues after two years. Highly recommend!",
    featured: true
  },
  {
    id: 4,
    name: "Robert Martinez",
    location: "Florence, KY",
    county: "Boone County",
    service: "Metallic Epoxy Flooring", 
    rating: 5,
    text: "The metallic epoxy floor in our showroom is absolutely stunning. Customers constantly compliment the unique patterns and professional appearance. John delivered exactly what we envisioned.",
    featured: false
  },
  {
    id: 5,
    name: "Lisa & Tom Wilson",
    location: "Hamilton, OH",
    county: "Butler County",
    service: "Garage Floor Epoxy",
    rating: 5,
    text: "Fast, professional service with outstanding results. The garage floor coating has made cleaning so much easier and the space looks fantastic. Worth every penny!",
    featured: false
  },
  {
    id: 6,
    name: "Cincinnati Manufacturing Co.",
    location: "Cincinnati, OH", 
    county: "Hamilton County",
    service: "Commercial Concrete Coating",
    rating: 5,
    text: "Queen City Surface Coatings completed our 15,000 sq ft facility with minimal downtime. The industrial coating system has dramatically improved safety and cleanliness in our production areas.",
    featured: true
  }
];

// Helper functions for filtering testimonials
export const getTestimonialsByCounty = (county) => {
  return testimonials.filter(testimonial => 
    testimonial.county.toLowerCase().includes(county.toLowerCase())
  );
};

export const getFeaturedTestimonials = () => {
  return testimonials.filter(testimonial => testimonial.featured);
};

export const getRandomTestimonials = (count = 3) => {
  const shuffled = [...testimonials].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};