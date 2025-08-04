export const nav = [
	{
		title: 'Home',
		slug: '/',
	},
	{
		title: 'About Us',
		slug: '/company/about',
	},
	{
		title: 'Services',
		slug: '/services',
		dropdown: [
			{
				title: 'Residential',
				slug: '/services/residential/',
				submenu: [
					{
						title: 'Garage Floors',
						slug: '/services/garage-floor-epoxy/',
					},
					{
						title: 'Basement',
						slug: '/services/basement-floor-coating/',
					},
					{
						title: 'Kitchen',
						slug: '/services/kitchen-floor-coatings/',
					},
				],
			},
			{
				title: 'Commercial',
				slug: '/services/commercial/',
				submenu: [
					{
						title: 'Retail',
						slug: '/services/retail-flooring/',
					},
					{
						title: 'Warehouses',
						slug: '/services/warehouse-flooring/',
					},
					{
						title: 'Office',
						slug: '/services/office-flooring/',
					},
				],
			},
			{
				title: 'Industrial',
				slug: '/services/industrial-flooring/',
				submenu: [
					{
						title: 'Manufacturing Facilities',
						slug: '/services/manufacturing-flooring/',
					},
					{
						title: 'Food & Beverage',
						slug: '/services/food-beverage-flooring/',
					},
					{
						title: 'Automotive',
						slug: '/services/automotive-flooring/',
					},
				],
			},
			{
				title: 'Decorative Options',
				slug: '/services/decorative-options/',
				submenu: [
					{
						title: 'Flake',
						slug: '/services/flake-systems/',
					},
					{
						title: 'Metallic',
						slug: '/services/metallic-epoxy-flooring/',
					},
					{
						title: 'Natural Stone',
						slug: '/services/natural-stone-reproductions/',
					},
					{
						title: 'Textured Concrete',
						slug: '/services/textured-concrete-finishes/',
					},
				],
			},
			{
				title: 'Maintenance & Repair',
				slug: '/services/concrete-repair/',
			},
			{
				title: 'Pressure Washing & Protection',
				slug: '/services/pressure-washing-protection/',
			},
		],
	},
	{
		title: 'Blog',
		slug: '/blog',
	},
	{
		title: 'Contact Us',
		slug: '/company/contact',
	},
	{
		title: 'Service Areas',
		slug: '/service-areas',
	},
];
