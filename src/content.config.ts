import {defineCollection, z} from 'astro:content'

const projectLinks = z.object({
  label: z.string(),
  href: z.string().url(),
})

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    type: z.string(),
    role: z.string(),
    stack: z.array(z.string()).default([]),
    dates: z.string().optional(),
    summary: z.string(),
    problem: z.string(),
    contribution: z.string(),
    outcome: z.string(),
    links: z.array(projectLinks).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(99),
  }),
})

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(true),
    tags: z.array(z.string()).default([]),
    readingTime: z.string(),
  }),
})

export const collections = {projects, blog}
