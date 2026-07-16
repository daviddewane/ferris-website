import html from './ferris-vision.html?raw';

export const prerender = true;

export function GET() {
	return new Response(html, {
		headers: {
			'content-type': 'text/html; charset=utf-8',
			'x-robots-tag': 'noindex, nofollow'
		}
	});
}
