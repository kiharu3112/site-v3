import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const tweets = defineCollection({
	// Load MDX files in the `src/content/tweets/` directory.
	loader: glob({ base: './src/content/tweets', pattern: '**/*.mdx' }),
	schema: ({ image }) =>
		z.object({
			handle: z.string(),
			displayName: z.string(),
			avatar: z.optional(image()),
			pubDate: z.coerce.date(),
			images: z.array(image()).optional(),
		}),
});

export const collections = { tweets };
