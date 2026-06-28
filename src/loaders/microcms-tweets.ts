import type { Loader } from 'astro/loaders';
import { z } from 'astro/zod';
import { fetchTweets } from '../lib/microcms';
import { PROFILE } from '../consts';

export function microcmsTweetsLoader(): Loader {
	return {
		name: 'microcms-tweets',
		load: async ({ store, parseData, logger }) => {
			logger.info('Fetching tweets from microCMS...');

			const tweets = await fetchTweets();
			store.clear();

			for (const tweet of tweets) {
				const id = tweet.id;
				const data = await parseData({
					id,
					data: {
						text: tweet.text ?? '',
						pubDate: tweet.publishedAt,
						handle: PROFILE.handle,
						displayName: PROFILE.displayName,
						images: tweet.images?.map((image) => image.url),
					},
				});

				store.set({ id, data });
			}

			logger.info(`Loaded ${tweets.length} tweet(s) from microCMS.`);
		},
		schema: z.object({
			text: z.string(),
			pubDate: z.coerce.date(),
			handle: z.string(),
			displayName: z.string(),
			images: z.array(z.string().url()).optional(),
		}),
	};
}
