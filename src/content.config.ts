import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const people = defineCollection({
	loader: glob({
		pattern: '*.md',
		base: './src/collections/people',
	}),
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			portrait: image().optional(),
		}),
});

const workshops = defineCollection({
	loader: glob({
		pattern: '*.md',
		base: './src/collections/workshops',
	}),
	schema: z.object({
		title: z.string(),
		host: z.union([z.string(), z.array(z.string())]),
		sessions: z.array(z.union([z.string(), z.boolean()])),
	}),
});

const shows = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/collections/shows' }),
	schema: z.object({
		title: z.string(),
		day: z.enum(['friday', 'saturday']),
		runningOrder: z.number(),
	}),
});

export const collections = { people, shows, workshops };
