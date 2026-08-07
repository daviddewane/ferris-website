import { error } from '@sveltejs/kit';
import { getPostBySlug } from '$lib/server/posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const post = getPostBySlug(params.slug);
	if (!post) {
		throw error(404, 'Post not found');
	}
	return { post };
};
