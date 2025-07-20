import { defineCollection, z } from 'astro:content';

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    layout: z.string().optional(),
    featured_image: z.string().optional(),
    seo_title: z.string().optional(),
    seo_description: z.string().optional(),
    publish_date: z.date(),
    draft: z.boolean().default(false),
  }),
});

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    short_description: z.string(),
    featured_image: z.string(),
    icon: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
    price_range: z.string().optional(),
    duration: z.string().optional(),
    order: z.number().default(0),
    featured: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    featured_image: z.string().optional(),
    publish_date: z.date(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    seo_title: z.string().optional(),
    seo_description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  pages,
  services,
  blog,
};