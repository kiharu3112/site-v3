const MICROCMS_SERVICE_ID = import.meta.env.MICROCMS_SERVICE_ID;
const MICROCMS_API_KEY = import.meta.env.MICROCMS_API_KEY;

export interface MicroCmsMedia {
	url: string;
	height: number;
	width: number;
}

export interface MicroCmsTweet {
	id: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	revisedAt: string;
	text?: string;
	images?: MicroCmsMedia[];
}

interface MicroCmsListResponse {
	contents: MicroCmsTweet[];
	totalCount: number;
	offset: number;
	limit: number;
}

export async function fetchTweets(): Promise<MicroCmsTweet[]> {
	if (!MICROCMS_SERVICE_ID || !MICROCMS_API_KEY) {
		throw new Error(
			'MICROCMS_SERVICE_ID and MICROCMS_API_KEY must be set to fetch tweets.',
		);
	}

	const url = new URL(`https://${MICROCMS_SERVICE_ID}.microcms.io/api/v1/tweet`);
	url.searchParams.set('orders', '-publishedAt');
	url.searchParams.set('limit', '100');

	const response = await fetch(url, {
		headers: {
			'X-MICROCMS-API-KEY': MICROCMS_API_KEY,
		},
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch tweets from microCMS: ${response.status} ${response.statusText}`);
	}

	const data = (await response.json()) as MicroCmsListResponse;
	return data.contents;
}
