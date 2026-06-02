import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	const { Resend } = await import('resend');
	const resend = new Resend(process.env.RESEND_API_KEY);

	const fields = [
		['Name', data.name],
		['Email', data.email],
		['LinkedIn', data.linkedin || '—'],
		['Built anything in last 6 months?', data.builtRecently],
		['What they built', data.builtDescription || '—'],
		['Would benefit from in-person community?', data.communityBenefit],
		['What they're looking for from community', data.communityLooking || '—'],
		['Who are you in AI?', data.aiRole],
		['Unique contribution to 30 elite builders', data.uniqueContribution || '—'],
	];

	const html = fields
		.map(([label, value]) => `<p><strong>${label}:</strong><br>${value}</p>`)
		.join('\n');

	const { error } = await resend.emails.send({
		from: 'Ferris Applications <onboarding@resend.dev>',
		to: 'david@chicago-innovation.com',
		subject: `New Ferris Application — ${data.name}`,
		html,
	});

	if (error) {
		return json({ success: false }, { status: 500 });
	}

	return json({ success: true });
};
