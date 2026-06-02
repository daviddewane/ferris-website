<script lang="ts">
	const SIGNALS = [
		{
			title: 'The Ferris',
			gold: true,
			body: `The Ferris is a members club in Chicago for people building companies at the frontiers of technology. AI is in its earliest innings and the most interesting work is being done by people who think like mad scientists. We built a place for you to do it.`
		},
		{
			title: 'What we believe',
			body: `We believe AI is too important to learn alone. The people getting good at it are the ones surrounded by other builders.\n\nWe believe the space can be a collaborator. The environment can help you optimize your personal performance, build community bonds, and leverage AI agents to help you become more intelligent.\n\nAnd we believe the future of AI doesn't belong to whoever buys the most compute. It belongs to whoever learns to use it well, together.`
		},
		{
			title: 'Who is this for',
			body: `You come to The Ferris because you're building something with AI and you want to be near other people doing the same.\n\nYou come here because you sense AI is going to reshape your work and you'd rather get ahead of it than fall behind.\n\nYou don't need to be a researcher. You don't need a finished company. You need to be curious, generous with what you know, and a little bit obsessed with what AI is about to make possible.`
		},
		{
			title: 'What you get',
			body: `The Ferris is, first, a beautiful place to work — designed by some of the best workplace and hospitality architects we've ever met, in the heart of downtown Chicago.\n\nIt's also something more. The building runs its own AI infrastructure on-site. Every member receives access to a personal assistant we call Ferris — an AI that learns the rhythms of your days, the activities of our community, and optimizes the use of our building.`
		},
		{
			title: 'What we ask',
			body: `Membership at The Ferris is reciprocal. You don't just use what we've built, you make it better.\n\nEvery member contributes back. Sharing what worked. Correcting Ferris when it gets things wrong. The building gets smarter because you're in it, and the next member who walks in inherits the wisdom of everyone who came before.`
		},
		{
			title: 'The honest part',
			body: `A building that responds to how you work needs to know how you work. The Ferris is instrumented — cameras at sightlines, sensors that read the rhythms of the floor, signals from how the space is used. Members opt in to this with a clear, written waiver. Private zones stay private. Data is aggregated, not personalized for surveillance.\n\nIn return, you get a stake. The AI layer that gets smarter because you helped train it — and members are the first to benefit from it. If that tradeoff isn't for you, there are plenty of other places to work. The Ferris is for people who want to be part of the experiment.`
		},
		{
			title: 'Apply',
			cta: true,
			body: `The Ferris has limited capacity and accepts new members as spots become available. We optimize for people with talent, ambition, a willingness to be supportive of peers, and a high level of awareness regarding emerging trends.`
		}
	];

	const CTA_HREF =
		'https://docs.google.com/forms/d/e/1FAIpQLScxNdNvgCRyxL_oNG2zxTR9NFFJT9FYp28g4NtTg8_X6Y6Ymw/viewform?usp=sharing&ouid=105812463017049232697';

	let open: number | null = $state(null);

	function toggle(idx: number) {
		open = open === idx ? null : idx;
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'Escape') { open = null; }
	}
</script>

<svelte:window onkeydown={handleKey} />

<div class="chrome top"></div>

<main>
	<div class="list">
		{#each SIGNALS as signal, i}
			<div
				class="signal"
				class:open={open === i}
				class:dimmed={open !== null && open !== i}
				role="button"
				tabindex="0"
				onclick={(e) => { if ((e.target as HTMLElement).closest('a')) return; toggle(i); }}
				onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(i); } }}
			>
				<div class="title" class:gold={signal.gold}>{signal.title}</div>
				<div class="body">
					{#each signal.body.split('\n\n') as para}
						<p>{para}</p>
					{/each}
					{#if signal.cta}
						<a class="cta-btn" href={CTA_HREF} target="_blank" rel="noopener">Apply to join</a>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</main>

<div class="chrome bottom">
	<p class="copyright">1 W Monroe, Chicago IL<br />© 2026 The Ferris</p>
</div>

<style>
	:global(html, body) {
		overflow-x: hidden;
	}

	.chrome {
		position: fixed;
		left: 0;
		right: 0;
		height: clamp(72px, 9vh, 104px);
		padding: 0 clamp(28px, 4vw, 64px);
		display: flex;
		align-items: center;
		z-index: 10;
		background: #000;
	}
	.chrome.top { top: 0; }
	.chrome.bottom { bottom: 0; }

	main {
		padding-top: clamp(72px, 9vh, 104px);
		padding-bottom: clamp(72px, 9vh, 104px);
	}

	.list {
		padding: clamp(20px, 3.5vh, 48px) clamp(28px, 4vw, 64px);
	}

	.signal {
		cursor: pointer;
		width: 100%;
	}

	.title {
		font-family: 'Archivo', system-ui, sans-serif;
		font-weight: 800;
		font-size: clamp(28px, 4.4vw, 58px);
		letter-spacing: -0.035em;
		line-height: 1.02;
		text-wrap: balance;
		color: #fff;
		transition: opacity 0.35s ease;
	}
	.title:hover { opacity: 0.62; }
	.title.gold { color: #c9a24b; }

	.signal.dimmed .title { opacity: 0.4; }
	.signal.dimmed .title:hover { opacity: 0.7; }

	.body {
		max-height: 0;
		opacity: 0;
		overflow: hidden;
		margin: 0;
		transition:
			max-height 0.55s cubic-bezier(0.4, 0, 0.2, 1),
			opacity 0.4s,
			margin 0.4s;
	}

	.signal.open .body {
		opacity: 1;
		max-height: 80vh;
		margin: clamp(10px, 1.6vh, 22px) 0 clamp(20px, 3vh, 40px);
	}

	.body p {
		font-family: 'Archivo', system-ui, sans-serif;
		font-weight: 400;
		font-size: 24px;
		line-height: 1.4;
		letter-spacing: -0.01em;
		max-width: 46ch;
		text-wrap: pretty;
		margin: 0;
		color: #fff;
	}
	.body p + p { margin-top: 0.85em; }

	.cta-btn {
		display: inline-block;
		white-space: nowrap;
		margin-top: clamp(20px, 2.4vh, 32px);
		padding: 14px 30px;
		background: #c9a24b;
		color: #000;
		font-family: 'Archivo', system-ui, sans-serif;
		font-weight: 700;
		font-size: clamp(15px, 1.05vw, 18px);
		letter-spacing: -0.01em;
		border-radius: 4px;
		text-decoration: none;
		border: none;
		transition: filter 0.2s, transform 0.2s;
	}
	.cta-btn:hover { filter: brightness(1.08); transform: translateY(-1px); }
	.cta-btn:active { transform: translateY(0); }

	.copyright {
		font-family: 'Archivo', system-ui, sans-serif;
		font-weight: 700;
		font-size: clamp(15px, 1.25vw, 20px);
		letter-spacing: -0.01em;
		line-height: 1.4;
		opacity: 0.96;
		white-space: nowrap;
		margin: 0;
		color: #fff;
	}

	@media (max-width: 640px) {
		.title { font-size: clamp(26px, 8vw, 40px); }
		.body p { font-size: clamp(18px, 5vw, 24px); max-width: 34ch; }
	}
</style>
