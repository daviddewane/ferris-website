<script lang="ts">
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

	let showForm = $state(false);

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

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Anton&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&display=swap" rel="stylesheet" />
</svelte:head>

{#if !showForm}
	<!-- ── Letter page ── -->
	<main class="sheet">
		<header class="masthead">
			<div class="wordmark">Ferris<div class="bar"></div></div>
			<div class="meta">
				<span>June 2026</span>
				<span>1 W Monroe Street</span>
				<span>Chicago, IL</span>
			</div>
		</header>

		<p class="lead"><strong>The Ferris</strong> is a working club in the heart of Chicago where the most ambitious builders are leveraging AI to maximize their productivity.</p>

		<p class="pitch">Imagine if you could clone yourself and be working on two tasks at once. AI has opened a door to this future. 10x and even 100x productivity is possible. There has never been a moment where so few can build so much so fast. This is not hype &mdash; it&rsquo;s already happened.</p>

		<p>The Ferris is a workplace for ambitious, focused builders who want to take full advantage of these tools, learning together on the front lines as AI continues to unfold. Our path to helping you maximize your potential is built on three pillars.</p>

		<ul>
			<li><span class="dash">&mdash;</span><span><b>Ferris AI</b> is the in-house agent trained by our community and supercharging our workplace. Ferris is built to make you more intelligent, efficient, and connected to the other builders in our community.</span></li>
			<li><span class="dash">&mdash;</span><span><b>Wellness</b> isn&rsquo;t a buzzword, it is a way of life. High-performance workers are behaving more like pro athletes. Healthy food, exercise, and mental fitness are requisite for peak performance.</span></li>
			<li><span class="dash">&mdash;</span><span><b>Community</b> is here to propel you forward. Powerful peers on the edges of their field. Mentors with meaningful connections. Investors with an appetite for risk.</span></li>
		</ul>

		<p>We want you at Ferris if you are on fire to create something truly remarkable &mdash; that can impact society and unlock tremendous value. Our job is to create the conditions around you for breakthrough success. Your job is to take the shot.</p>

		<div class="signoff">
			<div class="team">The Ferris Team</div>
			<div class="sigs">
				<div class="sig">
					<div class="sig-img"><img src="/sigs/sig-anuraag-v2.png" alt="Anuraag" /></div>
					<div class="name">Anuraag</div>
				</div>
				<div class="sig">
					<div class="sig-img"><img src="/sigs/sig-david-v2.png" alt="David" /></div>
					<div class="name">David</div>
				</div>
				<div class="sig">
					<div class="sig-img"><img src="/sigs/sig-rox-v2.png" alt="Rox" /></div>
					<div class="name">Rox</div>
				</div>
				<div class="sig">
					<div class="sig-img"><img src="/sigs/sig-sarah-v2.png" alt="Sarah" /></div>
					<div class="name">Sarah</div>
				</div>
			</div>
			<button class="apply" onclick={() => showForm = true}>Apply Now</button>
		</div>
	</main>

{:else if formState === 'success'}
	<!-- ── Thank you ── -->
	<main class="sheet">
		<header class="masthead">
			<button class="wordmark wordmark-btn" onclick={() => { showForm = false; formState = 'idle'; }}>Ferris<div class="bar"></div></button>
		</header>
		<div class="thankyou">
			<h2>Thank you.</h2>
			<p>Your application is on its way. We read every one and will be in touch if there&rsquo;s a fit.</p>
			<button class="apply back-apply" onclick={() => { showForm = false; formState = 'idle'; }}>Back to the letter</button>
		</div>
	</main>

{:else}
	<!-- ── Application form ── -->
	<main class="sheet">
		<header class="masthead">
			<button class="wordmark wordmark-btn" onclick={() => showForm = false}>Ferris<div class="bar"></div></button>
		</header>

		<div class="form-intro">
			<h1>Apply for Membership</h1>
			<p class="form-sub">Takes about ten minutes. We read every one.</p>
		</div>

		<form onsubmit={submitForm} class="apply-form" novalidate>

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

			<hr class="rule" />

			<div class="field">
				<p class="field-label">Have you built anything in the last 6 months? <span class="req">*</span></p>
				<label class="radio"><input type="radio" bind:group={builtRecently} value="Yes" required /> Yes</label>
				<label class="radio"><input type="radio" bind:group={builtRecently} value="No" /> No</label>
			</div>

			{#if builtRecently === 'Yes'}
				<div class="field">
					<label for="f-built">If yes, please describe what you built</label>
					<textarea id="f-built" bind:value={builtDescription} rows="3" placeholder="Tell us what you shipped…"></textarea>
				</div>
			{/if}

			<div class="field">
				<p class="field-label">Would your work benefit greatly from an in-person work / development community? <span class="req">*</span></p>
				<label class="radio"><input type="radio" bind:group={communityBenefit} value="Yes" required /> Yes</label>
				<label class="radio"><input type="radio" bind:group={communityBenefit} value="Not Really" /> Not Really</label>
			</div>

			{#if communityBenefit === 'Yes'}
				<div class="field">
					<label for="f-community">What are you looking for from an in-person work community?</label>
					<textarea id="f-community" bind:value={communityLooking} rows="3" placeholder="What would make it valuable for you…"></textarea>
				</div>
			{/if}

			<div class="field">
				<p class="field-label">Who are you in AI? <span class="req">*</span></p>
				<label class="radio"><input type="radio" bind:group={aiRole} value="Researcher" required /> Researcher</label>
				<label class="radio"><input type="radio" bind:group={aiRole} value="Builder" /> Builder</label>
				<label class="radio"><input type="radio" bind:group={aiRole} value="Thinker" /> Thinker</label>
				<label class="radio"><input type="radio" bind:group={aiRole} value="Consumer" /> Consumer</label>
				<label class="radio">
					<input type="radio" bind:group={aiRole} value="Other" />
					Other:
					{#if aiRole === 'Other'}
						<input class="inline-other" type="text" bind:value={aiRoleOther} placeholder="describe yourself" />
					{/if}
				</label>
			</div>

			<div class="field">
				<label for="f-unique">What would you contribute to a room of 30 other elite builders that no one else in that room could? <span class="req">*</span></label>
				<textarea id="f-unique" bind:value={uniqueContribution} rows="3" required placeholder="Your unique edge…"></textarea>
			</div>

			{#if formState === 'error'}
				<p class="form-error">Something went wrong — please try again.</p>
			{/if}

			<div class="submit-row">
				<button class="apply submit-btn" type="submit" disabled={formState === 'submitting'}>
					{formState === 'submitting' ? 'Sending…' : 'Submit Application'}
				</button>
			</div>

		</form>
	</main>
{/if}

<style>
	:global(body) {
		background: #1f1f1f;
		color: #f4f1ea;
		font-family: "Source Serif 4", Georgia, "Times New Roman", serif;
	}

	.sheet {
		max-width: 660px;
		margin: 0 auto;
		padding: 96px 40px 120px;
	}

	/* ── Letterhead ── */
	.masthead {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-bottom: 54px;
	}
	.wordmark {
		font-family: "Anton", "Arial Narrow", sans-serif;
		font-weight: 400;
		font-size: 76px;
		line-height: 0.86;
		color: #f1a93f;
		letter-spacing: 0.03em;
		text-transform: uppercase;
	}
	.wordmark-btn {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		display: block;
		text-align: left;
	}
	.bar {
		width: 104px;
		height: 4px;
		background: #f1a93f;
		margin-top: 20px;
	}
	.meta {
		margin-top: 34px;
		color: #f1a93f;
		font-size: 13.5px;
		letter-spacing: 0.13em;
		text-transform: uppercase;
		line-height: 2;
	}
	.meta span { display: block; white-space: nowrap; }

	/* ── Body ── */
	p {
		margin: 0 0 22px;
		font-size: 19px;
	}
	.lead { font-size: 20px; }
	.pitch { font-size: 20px; margin: 30px 0 26px; }

	strong { font-weight: 600; color: #fff; }
	em { color: #f1a93f; font-style: italic; }

	ul {
		list-style: none;
		margin: 0 0 26px;
		padding: 0;
	}
	li {
		display: flex;
		gap: 14px;
		font-size: 19px;
		margin-bottom: 13px;
	}
	.dash { color: #f1a93f; flex: 0 0 auto; user-select: none; }
	li b { font-weight: 600; color: #fff; }

	/* ── Signoff ── */
	.signoff { margin-top: 58px; }
	.team {
		color: #9a958c;
		font-size: 15px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		margin-bottom: 30px;
	}
	.sigs {
		display: flex;
		align-items: flex-end;
		gap: 18px;
		flex-wrap: wrap;
	}
	.sig {
		flex: 1 1 0;
		min-width: 120px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.sig-img {
		height: 86px;
		display: flex;
		align-items: flex-end;
	}
	.sig-img img {
		max-height: 86px;
		max-width: 100%;
		width: auto;
		display: block;
		opacity: 0.94;
	}
	.name {
		margin-top: 14px;
		padding-top: 12px;
		border-top: 1px solid rgba(244,241,234,0.14);
		width: 100%;
		font-size: 16px;
		color: #f4f1ea;
		letter-spacing: 0.02em;
	}

	/* ── CTA button ── */
	.apply {
		display: inline-block;
		margin-top: 52px;
		background: #f1a93f;
		color: #1a1a1a;
		font-family: "Source Serif 4", Georgia, "Times New Roman", serif;
		font-weight: 700;
		font-size: 15px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		text-decoration: none;
		padding: 16px 34px;
		border-radius: 2px;
		white-space: nowrap;
		border: none;
		cursor: pointer;
		transition: background 0.18s ease, transform 0.18s ease;
	}
	.apply:hover { background: #f7bd5e; transform: translateY(-1px); }
	.apply:disabled { opacity: 0.6; cursor: default; transform: none; }

	/* ── Thank you ── */
	.thankyou { padding-top: 20px; }
	.thankyou h2 {
		font-family: "Source Serif 4", Georgia, serif;
		font-weight: 600;
		font-size: 26px;
		color: #fff;
		margin: 0 0 14px;
	}
	.back-apply { margin-top: 32px; }

	/* ── Form ── */
	.form-intro { margin-bottom: 46px; }
	.form-intro h1 {
		font-family: "Source Serif 4", Georgia, serif;
		font-weight: 600;
		font-size: 26px;
		color: #fff;
		margin: 0 0 10px;
	}
	.form-sub { font-size: 17px; color: #9a958c; margin: 0; }

	.apply-form {
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.field label,
	.field-label {
		font-size: 17px;
		color: #f4f1ea;
		margin: 0;
	}
	.req { color: #f1a93f; margin-left: 3px; }

	.field input[type="text"],
	.field input[type="email"],
	.field input[type="url"],
	.field textarea {
		background: rgba(244,241,234,0.06);
		border: 1px solid rgba(244,241,234,0.22);
		border-radius: 3px;
		color: #f4f1ea;
		font-family: "Source Serif 4", Georgia, serif;
		font-size: 16px;
		padding: 12px 14px;
		outline: none;
		transition: border-color 0.15s;
		resize: vertical;
	}
	.field input:focus,
	.field textarea:focus { border-color: #f1a93f; }
	.field input::placeholder,
	.field textarea::placeholder { color: #9a958c; }

	.radio {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 16px;
		color: #f4f1ea;
		cursor: pointer;
	}
	.radio input[type="radio"] {
		appearance: none;
		-webkit-appearance: none;
		width: 18px;
		height: 18px;
		border: 1.5px solid rgba(244,241,234,0.22);
		border-radius: 50%;
		flex: 0 0 18px;
		position: relative;
		cursor: pointer;
		transition: border-color 0.15s;
	}
	.radio input[type="radio"]:checked { border-color: #f1a93f; }
	.radio input[type="radio"]:checked::after {
		content: "";
		position: absolute;
		top: 50%; left: 50%;
		transform: translate(-50%, -50%);
		width: 8px; height: 8px;
		border-radius: 50%;
		background: #f1a93f;
	}

	.inline-other {
		background: transparent;
		border: none;
		border-bottom: 1px solid rgba(244,241,234,0.3);
		color: #f4f1ea;
		font-family: "Source Serif 4", Georgia, serif;
		font-size: 15px;
		padding: 2px 4px;
		outline: none;
		width: 160px;
	}

	.rule {
		border: 0;
		height: 1px;
		background: rgba(244,241,234,0.14);
		margin: 0;
	}

	.form-error { color: #e07070; font-size: 15px; margin: 0; }

	.submit-row { margin-top: 18px; }
	.submit-btn { margin-top: 0; }

	@media (max-width: 560px) {
		.sheet { padding: 64px 26px 90px; }
		.wordmark { font-size: 62px; }
		p, li, .lead, .pitch { font-size: 18px; }
		.sigs { gap: 12px 10px; }
		.sig { min-width: 46%; }
	}
</style>
