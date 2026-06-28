import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { microcmsTweetsLoader } from './loaders/microcms-tweets';

const tweets = defineCollection({
	loader: microcmsTweetsLoader(),
	schema: z.object({
		text: z.string(),
		pubDate: z.coerce.date(),
		handle: z.string(),
		displayName: z.string(),
		images: z.array(z.string().url()).optional(),
	}),
});

export const collections = { tweets };
