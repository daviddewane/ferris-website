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

	let open: number | null = $state(null);

	function toggle(idx: number) {
		open = open === idx ? null : idx;
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'Escape') { open = null; }
	}

	// Form state
	let formState: 'idle' | 'submitting' | 'success' | 'error' = $state('idle');
	let name = $state('');
	let email = $state('');
	let linkedin = $state('');
	let builtRecently = $state('');
	let builtDescription = $state('');
	let communityBenefit = $state('');
	let communityLooking = $state('');
	let aiRole = $state('');
	let aiRoleOther = $state('');
	let uniqueContribution = $state('');

	async function submitForm(e: Event) {
		e.preventDefault();
		formState = 'submitting';
		try {
			const res = await fetch('/api/apply', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name,
					email,
					linkedin,
					builtRecently,
					builtDescription,
					communityBenefit,
					communityLooking,
					aiRole: aiRole === 'Other' ? `Other: ${aiRoleOther}` : aiRole,
					uniqueContribution,
				}),
			});
			const data = await res.json();
			formState = data.success ? 'success' : 'error';
		} catch {
			formState = 'error';
		}
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
				onclick={(e) => { if ((e.target as HTMLElement).closest('a,button,input,textarea,label,select')) return; toggle(i); }}
				onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(i); } }}
			>
				<div class="title" class:gold={signal.gold}>{signal.title}</div>
				<div class="body">
					{#each signal.body.split('\n\n') as para}
						<p>{para}</p>
					{/each}
					{#if signal.cta}
						{#if formState === 'success'}
							<p class="form-success">Application received — we'll be in touch.</p>
						{:else}
							<form onsubmit={submitForm} class="apply-form">
								<div class="field">
									<label for="f-name">Name <span class="req">*</span></label>
									<input id="f-name" type="text" bind:value={name} required autocomplete="name" />
								</div>

								<div class="field">
									<label for="f-email">Email <span class="req">*</span></label>
									<input id="f-email" type="email" bind:value={email} required autocomplete="email" />
								</div>

								<div class="field">
									<label for="f-linkedin">LinkedIn</label>
									<input id="f-linkedin" type="url" bind:value={linkedin} placeholder="https://linkedin.com/in/…" autocomplete="url" />
								</div>

								<div class="field">
									<p class="field-label">Have you built anything in the last 6 months? <span class="req">*</span></p>
									<label class="radio"><input type="radio" bind:group={builtRecently} value="Yes" required /> Yes</label>
									<label class="radio"><input type="radio" bind:group={builtRecently} value="No" /> No</label>
								</div>

								<div class="field">
									<label for="f-built">If yes, please describe what you built</label>
									<textarea id="f-built" bind:value={builtDescription} rows="3"></textarea>
								</div>

								<div class="field">
									<p class="field-label">Would your work benefit greatly from an in-person work/development community? <span class="req">*</span></p>
									<label class="radio"><input type="radio" bind:group={communityBenefit} value="Yes" required /> Yes</label>
									<label class="radio"><input type="radio" bind:group={communityBenefit} value="Not Really" /> Not Really</label>
								</div>

								<div class="field">
									<label for="f-community">What are you looking for from an in-person work community?</label>
									<textarea id="f-community" bind:value={communityLooking} rows="3"></textarea>
								</div>

								<div class="field">
									<p class="field-label">Who are you in AI? <span class="req">*</span></p>
									<label class="radio"><input type="radio" bind:group={aiRole} value="Researcher" required /> Researcher</label>
									<label class="radio"><input type="radio" bind:group={aiRole} value="Builder" /> Builder</label>
									<label class="radio"><input type="radio" bind:group={aiRole} value="Thinker" /> Thinker</label>
									<label class="radio"><input type="radio" bind:group={aiRole} value="Consumer" /> Consumer</label>
									<label class="radio"><input type="radio" bind:group={aiRole} value="Other" /> Other:
										{#if aiRole === 'Other'}
											<input class="inline-other" type="text" bind:value={aiRoleOther} placeholder="describe…" />
										{/if}
									</label>
								</div>

								<div class="field">
									<label for="f-unique">What would you contribute to a room of 30 other elite builders that no one else in that room could?</label>
									<textarea id="f-unique" bind:value={uniqueContribution} rows="3"></textarea>
								</div>

								{#if formState === 'error'}
									<p class="form-error">Something went wrong. Please try again.</p>
								{/if}

								<button class="cta-btn" type="submit" disabled={formState === 'submitting'}>
									{formState === 'submitting' ? 'Sending…' : 'Submit'}
								</button>

</form>
						{/if}
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
		max-height: 1200px;
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

	/* Form */
	.apply-form {
		margin-top: clamp(20px, 2.4vh, 32px);
		display: flex;
		flex-direction: column;
		gap: 20px;
		max-width: 520px;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.field label,
	.field-label {
		font-family: 'Archivo', system-ui, sans-serif;
		font-weight: 600;
		font-size: clamp(14px, 1vw, 16px);
		color: #fff;
		margin: 0;
		text-wrap: balance;
	}

	.req { color: #c9a24b; }

	.field input[type="text"],
	.field input[type="email"],
	.field input[type="url"],
	.field textarea {
		background: transparent;
		border: none;
		border-bottom: 1px solid rgba(255,255,255,0.3);
		color: #fff;
		font-family: 'Archivo', system-ui, sans-serif;
		font-size: clamp(14px, 1vw, 16px);
		padding: 8px 0;
		outline: none;
		transition: border-color 0.2s;
		resize: vertical;
	}

	.field input[type="text"]:focus,
	.field input[type="email"]:focus,
	.field input[type="url"]:focus,
	.field textarea:focus {
		border-bottom-color: #c9a24b;
	}

	.field input::placeholder,
	.field textarea::placeholder {
		color: rgba(255,255,255,0.3);
	}

	.radio {
		display: flex;
		align-items: center;
		gap: 8px;
		font-family: 'Archivo', system-ui, sans-serif;
		font-size: clamp(14px, 1vw, 16px);
		color: #fff;
		cursor: pointer;
	}

	.radio input[type="radio"] {
		accent-color: #c9a24b;
		width: 16px;
		height: 16px;
		cursor: pointer;
	}

	.inline-other {
		background: transparent;
		border: none;
		border-bottom: 1px solid rgba(255,255,255,0.3);
		color: #fff;
		font-family: 'Archivo', system-ui, sans-serif;
		font-size: clamp(13px, 0.9vw, 15px);
		padding: 2px 4px;
		outline: none;
		width: 160px;
	}

	.cta-btn {
		display: inline-block;
		white-space: nowrap;
		margin-top: clamp(4px, 1vh, 12px);
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
		cursor: pointer;
		transition: filter 0.2s, transform 0.2s, opacity 0.2s;
		align-self: flex-start;
	}
	.cta-btn:hover { filter: brightness(1.08); transform: translateY(-1px); }
	.cta-btn:active { transform: translateY(0); }
	.cta-btn:disabled { opacity: 0.6; cursor: default; transform: none; }

	.form-success {
		font-family: 'Archivo', system-ui, sans-serif;
		font-size: clamp(16px, 1.2vw, 20px);
		color: #c9a24b;
		margin-top: clamp(20px, 2.4vh, 32px);
	}

	.form-error {
		font-family: 'Archivo', system-ui, sans-serif;
		font-size: clamp(13px, 0.9vw, 15px);
		color: #e07070;
		margin: 0;
	}

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
		.apply-form { max-width: 100%; }
	}
</style>
