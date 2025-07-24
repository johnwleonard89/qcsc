// Data for standardized page templates
// This centralizes all content so you can update once and it applies everywhere

export const servicePages = {
  metallicEpoxy: {
    seo: {
      title: 'Metallic Epoxy Flooring | Custom Decorative Concrete Coating Cincinnati',
      description: 'Stunning metallic epoxy floors with unique artistic patterns. Transform spaces with custom decorative concrete coating for showrooms, basements & luxury homes in Cincinnati.',
      keywords: 'metallic epoxy flooring, metallic concrete coating, decorative epoxy floors, artistic floor patterns, luxury flooring Cincinnati, showroom floors'
    },
    hero: {
      title: 'Metallic Epoxy Flooring',
      subtitle: 'Transform Your Space with Artistic Concrete Coatings',
      description: 'Create stunning, one-of-a-kind floors with our custom metallic epoxy installations. Perfect for showrooms, basements, and luxury spaces.',
      showBreadcrumbs: true,
      breadcrumbs: [
        {label: 'Home', href: '/'},
        {label: 'Services', href: '/services'},
        {label: 'Metallic Epoxy Flooring', href: '/services/metallic-epoxy-flooring'}
      ]
    },
    content: {
      sections: [
        {
          type: 'text',
          title: 'Artistic Concrete Transformation',
          content: '<p>Metallic epoxy flooring creates unique, artistic patterns that transform ordinary concrete into stunning visual displays. Each installation is custom-designed to reflect your style and space requirements.</p><p>Our metallic epoxy systems combine durability with beauty, offering a premium flooring solution that stands out while providing long-lasting performance.</p>'
        },
        {
          type: 'features',
          title: 'Why Choose Metallic Epoxy?',
          items: [
            '✨ Unique artistic patterns - no two floors are alike',
            '💎 Premium aesthetic appeal for luxury spaces',
            '🛡️ Durable, long-lasting protection',
            '🧹 Easy to clean and maintain',
            '🎨 Custom color combinations available',
            '🏢 Perfect for showrooms and entertainment areas'
          ]
        },
        {
          type: 'cta',
          title: 'Ready to Transform Your Space?',
          content: 'Get a free consultation and see how metallic epoxy can elevate your floors.',
          ctaText: 'Get Free Design Consultation',
          ctaHref: '/company/contact',
          ctaSecondary: {text: 'Call (513) 296-5525', href: 'tel:+15132965525'}
        },
        {
          type: 'contact'
        }
      ]
    }
  },

  garageFloorEpoxy: {
    seo: {
      title: 'Garage Floor Epoxy Coating | Professional Installation Cincinnati',
      description: 'Transform your garage with professional epoxy floor coating. Durable, chemical-resistant, and beautiful. Serving Cincinnati tri-state area.',
      keywords: 'garage floor epoxy, garage coating Cincinnati, epoxy garage floors, garage floor installation'
    },
    hero: {
      title: 'Garage Floor Epoxy Coating',
      subtitle: 'Professional-Grade Protection & Beauty',
      description: 'Transform your garage into a showroom-quality space with our durable epoxy floor coatings.',
      showBreadcrumbs: true,
      breadcrumbs: [
        {label: 'Home', href: '/'},
        {label: 'Services', href: '/services'},
        {label: 'Garage Floor Epoxy', href: '/services/garage-floor-epoxy'}
      ]
    },
    content: {
      sections: [
        {
          type: 'text',
          title: 'Garage Floor Excellence',
          content: '<p>Our garage floor epoxy coatings provide superior protection against chemicals, stains, and daily wear while creating a beautiful, professional appearance.</p><p>Perfect for protecting your investment and creating a space you\'ll be proud to show off.</p>'
        },
        {
          type: 'features',
          title: 'Garage Floor Benefits',
          items: [
            '🛡️ Chemical and stain resistant',
            '💪 Extremely durable and long-lasting',
            '✨ Easy to clean and maintain',
            '🚗 Perfect for vehicle storage',
            '🎨 Multiple color and finish options',
            '💧 Moisture and oil resistant'
          ]
        },
        {
          type: 'cta',
          title: 'Transform Your Garage Today',
          content: 'Get a free estimate for your garage floor epoxy project.',
          ctaText: 'Get Free Garage Floor Estimate',
          ctaHref: '/company/contact',
          ctaSecondary: {text: 'Call (513) 296-5525', href: 'tel:+15132965525'}
        },
        {
          type: 'contact'
        }
      ]
    }
  },

  basementFloorCoating: {
    seo: {
      title: 'Basement Floor Coating | Waterproof Epoxy Floors Cincinnati',
      description: 'Professional basement floor coating with moisture protection. Transform your basement into usable space with durable epoxy coatings.',
      keywords: 'basement floor coating, basement epoxy, waterproof basement floors, basement renovation Cincinnati'
    },
    hero: {
      title: 'Basement Floor Coating',
      subtitle: 'Turn Your Basement Into Livable Space',
      description: 'Moisture-resistant coatings that transform basements into beautiful, functional areas.',
      showBreadcrumbs: true,
      breadcrumbs: [
        {label: 'Home', href: '/'},
        {label: 'Services', href: '/services'},
        {label: 'Basement Floor Coating', href: '/services/basement-floor-coating'}
      ]
    },
    content: {
      sections: [
        {
          type: 'text',
          title: 'Basement Transformation',
          content: '<p>Our basement floor coatings are specifically designed to handle moisture challenges while creating a beautiful, durable surface perfect for recreation rooms, home offices, or storage areas.</p>'
        },
        {
          type: 'features',
          title: 'Basement Floor Advantages',
          items: [
            '💧 Moisture and humidity resistant',
            '🏠 Creates usable living space',
            '🧹 Easy to clean and maintain',
            '🛡️ Protects against mold and mildew',
            '🎨 Beautiful finish options',
            '💪 Long-lasting durability'
          ]
        },
        {
          type: 'cta',
          title: 'Reclaim Your Basement Space',
          content: 'Get a free consultation for your basement floor coating project.',
          ctaText: 'Get Free Basement Floor Quote',
          ctaHref: '/company/contact',
          ctaSecondary: {text: 'Call (513) 296-5525', href: 'tel:+15132965525'}
        },
        {
          type: 'contact'
        }
      ]
    }
  },

  polyasparticCoating: {
    seo: {
      title: 'Polyaspartic Coating | Fast-Cure Concrete Protection Cincinnati',
      description: 'Professional polyaspartic coating with rapid cure times. UV-resistant, durable floor protection for commercial and residential applications.',
      keywords: 'polyaspartic coating, fast cure concrete coating, UV resistant flooring, polyaspartic floors Cincinnati'
    },
    hero: {
      title: 'Polyaspartic Coating',
      subtitle: 'Fast-Cure, UV-Resistant Protection',
      description: 'Advanced polyaspartic coatings that cure quickly while providing superior durability and UV protection.',
      showBreadcrumbs: true,
      breadcrumbs: [
        {label: 'Home', href: '/'},
        {label: 'Services', href: '/services'},
        {label: 'Polyaspartic Coating', href: '/services/polyaspartic-coating'}
      ]
    },
    content: {
      sections: [
        {
          type: 'text',
          title: 'Advanced Polyaspartic Technology',
          content: '<p>Polyaspartic coatings offer the perfect balance of fast application and long-lasting protection. Ideal for projects requiring quick turnaround times without compromising quality.</p><p>Our polyaspartic systems cure rapidly while maintaining superior adhesion, chemical resistance, and UV stability.</p>'
        },
        {
          type: 'features',
          title: 'Polyaspartic Advantages',
          items: [
            '⚡ Rapid cure time - same day completion',
            '☀️ UV resistant - no yellowing or fading',
            '🌡️ Wide temperature application range',
            '💪 Superior durability and flexibility',
            '🧪 Excellent chemical resistance',
            '🏢 Perfect for commercial quick turnarounds'
          ]
        },
        {
          type: 'cta',
          title: 'Need Fast Installation?',
          content: 'Get polyaspartic coating installed and ready to use the same day.',
          ctaText: 'Get Fast-Cure Quote',
          ctaHref: '/company/contact',
          ctaSecondary: {text: 'Call (513) 296-5525', href: 'tel:+15132965525'}
        },
        {
          type: 'contact'
        }
      ]
    }
  },

  commercialConcreteCoating: {
    seo: {
      title: 'Commercial Concrete Coating | Industrial Floor Solutions Cincinnati',
      description: 'Professional commercial concrete coating for warehouses, manufacturing, retail, and healthcare facilities. Durable, safe, and compliant flooring solutions.',
      keywords: 'commercial concrete coating, industrial flooring, warehouse floors, manufacturing floor coating, commercial epoxy Cincinnati'
    },
    hero: {
      title: 'Commercial Concrete Coating',
      subtitle: 'Industrial-Strength Floor Solutions',
      description: 'Durable, safe, and compliant flooring solutions for warehouses, manufacturing, retail, and healthcare facilities.',
      showBreadcrumbs: true,
      breadcrumbs: [
        {label: 'Home', href: '/'},
        {label: 'Services', href: '/services'},
        {label: 'Commercial Concrete Coating', href: '/services/commercial-concrete-coating'}
      ]
    },
    content: {
      sections: [
        {
          type: 'text',
          title: 'Industrial-Grade Performance',
          content: '<p>Our commercial concrete coatings are engineered to withstand the demanding conditions of industrial and commercial environments while maintaining safety standards and aesthetic appeal.</p><p>From warehouses to healthcare facilities, we provide coating solutions that enhance productivity, safety, and cleanliness.</p>'
        },
        {
          type: 'features',
          title: 'Commercial Benefits',
          items: [
            '🏭 Heavy-duty traffic resistance',
            '🧪 Chemical and oil resistance',
            '🧹 Easy cleaning and maintenance',
            '⚡ Anti-slip safety options',
            '📏 Seamless, hygienic surfaces',
            '🔧 Minimal downtime installation'
          ]
        },
        {
          type: 'cta',
          title: 'Ready for Commercial Installation?',
          content: 'Get a comprehensive quote for your commercial flooring project.',
          ctaText: 'Get Commercial Quote',
          ctaHref: '/company/contact',
          ctaSecondary: {text: 'Call Commercial Line (513) 732-3276', href: 'tel:+15137323276'}
        },
        {
          type: 'contact'
        }
      ]
    }
  }
};

export const companyPages = {
  contact: {
    seo: {
      title: 'Contact Queen City Surface Coatings Cincinnati | Free Estimate (513) 296-5525',
      description: 'Contact Queen City Surface Coatings for professional concrete coating services in Cincinnati. Call (513) 296-5525 for immediate service or request a free estimate online.',
      keywords: 'contact Queen City Surface Coatings, Cincinnati concrete coating quote, free estimate, (513) 296-5525, concrete coating contractor Ohio'
    },
    hero: {
      title: 'Contact Us',
      subtitle: 'Ready to Transform Your Floors?',
      description: 'Get your free estimate today and discover why Cincinnati chooses Queen City Surface Coatings.',
      showBreadcrumbs: true,
      breadcrumbs: [
        {label: 'Home', href: '/'},
        {label: 'Contact', href: '/company/contact'}
      ]
    },
    content: {
      sections: [
        {
          type: 'text',
          title: 'Get Your Free Estimate',
          content: '<p>Ready to transform your concrete floors? Our veteran-owned team is standing by to provide you with a comprehensive, no-obligation estimate.</p><p>We serve the entire Cincinnati tri-state area with professional concrete coating solutions.</p>'
        },
        {
          type: 'contact'
        },
        {
          type: 'features',
          title: 'Why Call Us Today?',
          items: [
            '📞 Immediate response and scheduling',
            '📋 Detailed, comprehensive estimates',
            '🇺🇸 Veteran-owned and operated',
            '🛡️ Licensed, bonded, and insured',
            '⭐ 100% satisfaction guarantee',
            '🚀 Fast, professional installation'
          ]
        },
        {
          type: 'cta',
          title: 'Emergency Service Available',
          content: 'Need immediate concrete coating service? We offer emergency consultations for urgent projects.',
          ctaText: 'Call Now (513) 296-5525',
          ctaHref: 'tel:+15132965525',
          ctaSecondary: {text: 'Email Us', href: 'mailto:john@queencitysurfacecoatings.com'}
        }
      ]
    }
  },

  about: {
    seo: {
      title: 'About Queen City Surface Coatings | Veteran-Owned Concrete Specialists',
      description: 'Learn about our veteran-owned concrete coating company serving Cincinnati. Professional, reliable, and committed to quality craftsmanship.',
      keywords: 'about Queen City Surface Coatings, veteran-owned contractor, Cincinnati concrete coating company'
    },
    hero: {
      title: 'About Queen City Surface Coatings',
      subtitle: 'Veteran-Owned Excellence in Concrete Coatings',
      description: 'Serving the Cincinnati tri-state area with professional concrete coating solutions since our founding.',
      showBreadcrumbs: true,
      breadcrumbs: [
        {label: 'Home', href: '/'},
        {label: 'About', href: '/company/about'}
      ]
    },
    content: {
      sections: [
        {
          type: 'text',
          title: 'Our Story',
          content: '<p>Queen City Surface Coatings is a veteran-owned business dedicated to providing exceptional concrete coating services throughout the Cincinnati tri-state area. We bring military precision and attention to detail to every project.</p><p>Our commitment to quality craftsmanship and customer satisfaction has made us the trusted choice for residential and commercial concrete coating projects.</p>'
        },
        {
          type: 'features',
          title: 'Why Choose Us?',
          items: [
            '🇺🇸 Veteran-owned and operated',
            '🏆 Licensed, bonded, and insured',
            '💯 100% satisfaction guarantee',
            '📱 Free estimates and consultations',
            '🛡️ Premium materials and equipment',
            '⭐ Exceptional customer service'
          ]
        },
        {
          type: 'cta',
          title: 'Ready to Work With Us?',
          content: 'Experience the difference that veteran-owned quality makes.',
          ctaText: 'Get Free Consultation',
          ctaHref: '/company/contact',
          ctaSecondary: {text: 'Call (513) 296-5525', href: 'tel:+15132965525'}
        },
        {
          type: 'contact'
        }
      ]
    }
  }
};

export const resourcePages = {
  warranty: {
    seo: {
      title: 'Concrete Coating Warranty | Queen City Surface Coatings',
      description: 'Learn about our comprehensive warranty coverage for concrete coating services. We stand behind our work with industry-leading guarantees.',
      keywords: 'concrete coating warranty, epoxy floor guarantee, coating warranty Cincinnati'
    },
    hero: {
      title: 'Our Warranty Promise',
      subtitle: 'Guaranteed Quality You Can Trust',
      description: 'We stand behind our work with comprehensive warranty protection for all concrete coating services.',
      showBreadcrumbs: true,
      breadcrumbs: [
        {label: 'Home', href: '/'},
        {label: 'Resources', href: '/resources'},
        {label: 'Warranty', href: '/resources/warranty'}
      ]
    },
    content: {
      sections: [
        {
          type: 'text',
          title: 'Comprehensive Coverage',
          content: '<p>Our warranty covers materials and workmanship, ensuring your investment is protected. We use only premium materials and proven installation methods to deliver lasting results.</p>'
        },
        {
          type: 'features',
          title: 'Warranty Includes',
          items: [
            '🛡️ Material defect protection',
            '🔧 Workmanship guarantee',
            '📞 Responsive service support',
            '💯 Satisfaction assurance',
            '📋 Clear terms and conditions',
            '⚡ Quick resolution process'
          ]
        },
        {
          type: 'cta',
          title: 'Questions About Our Warranty?',
          content: 'Contact us for detailed warranty information and coverage details.',
          ctaText: 'Contact for Warranty Details',
          ctaHref: '/company/contact',
          ctaSecondary: {text: 'Call (513) 296-5525', href: 'tel:+15132965525'}
        }
      ]
    }
  },

  colorGallery: {
    seo: {
      title: 'Concrete Coating Color Gallery | Queen City Surface Coatings',
      description: 'Browse our extensive color gallery for concrete coatings. See metallic epoxy patterns, solid colors, and custom finishes for your project.',
      keywords: 'concrete coating colors, epoxy color gallery, metallic epoxy patterns, coating color options, custom finishes Cincinnati'
    },
    hero: {
      title: 'Color Gallery',
      subtitle: 'Explore Our Stunning Finishes',
      description: 'Browse our extensive collection of concrete coating colors and finishes to find the perfect look for your space.',
      showBreadcrumbs: true,
      breadcrumbs: [
        {label: 'Home', href: '/'},
        {label: 'Resources', href: '/resources'},
        {label: 'Color Gallery', href: '/resources/color-gallery'}
      ]
    },
    content: {
      sections: [
        {
          type: 'text',
          title: 'Find Your Perfect Color',
          content: '<p>Our concrete coatings are available in hundreds of color combinations and finishes. From subtle earth tones to bold metallic effects, we have options to match any style.</p><p>Schedule a consultation to see physical samples and discuss custom color matching for your project.</p>'
        },
        {
          type: 'features',
          title: 'Color Options Available',
          items: [
            '🎨 Solid color epoxy systems',
            '✨ Metallic epoxy with artistic patterns',
            '🌈 Custom color matching available',
            '🪨 Decorative chip and flake systems',
            '💎 Pearl and mica finishes',
            '🎯 Logo and design integration'
          ]
        },
        {
          type: 'cta',
          title: 'See Colors in Person',
          content: 'Request physical samples to see exactly how your chosen colors will look in your space.',
          ctaText: 'Request Color Samples',
          ctaHref: '/company/contact',
          ctaSecondary: {text: 'Call (513) 296-5525', href: 'tel:+15132965525'}
        }
      ]
    }
  }
};