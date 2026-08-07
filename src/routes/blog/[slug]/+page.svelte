<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.post.title} — The Ferris</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Anton&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&display=swap" rel="stylesheet" />
</svelte:head>

<main class="sheet">
	<header class="masthead">
		<a class="wordmark" href="/">Ferris &amp; Co.<div class="bar"></div></a>
		<div class="meta">
			<a href="/blog">&larr; Blog</a>
		</div>
	</header>

	<article>
		<span class="post-date">{data.post.dateLabel}</span>
		<h1 class="post-title">{data.post.title}</h1>
		<div class="post-body">
			{@html data.post.html}
		</div>
	</article>
</main>

<style>
	:global(body) {
		background: #1f1f1f;
		color: #f4f1ea;
		font-family: 'Source Serif 4', Georgia, 'Times New Roman', serif;
	}

	.sheet {
		max-width: 660px;
		margin: 0 auto;
		padding: 96px 40px 120px;
	}

	.masthead {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-bottom: 54px;
	}
	.wordmark {
		font-family: 'Anton', 'Arial Narrow', sans-serif;
		font-weight: 400;
		font-size: 76px;
		line-height: 0.86;
		color: #f1a93f;
		letter-spacing: 0.03em;
		text-transform: uppercase;
		display: block;
	}
	.bar {
		width: 104px;
		height: 4px;
		background: #f1a93f;
		margin-top: 20px;
	}
	.meta {
		margin-top: 34px;
		font-size: 13.5px;
		letter-spacing: 0.13em;
		text-transform: uppercase;
	}
	.meta a {
		color: #f1a93f;
	}
	.meta a:hover {
		color: #f7bd5e;
	}

	.post-date {
		display: block;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
		font-size: 13px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #9a958c;
		margin-bottom: 14px;
	}
	.post-title {
		font-family: 'Anton', 'Arial Narrow', sans-serif;
		font-weight: 400;
		font-size: 42px;
		letter-spacing: 0.01em;
		text-transform: uppercase;
		color: #fff;
		line-height: 1.05;
		margin: 0 0 40px;
	}

	.post-body :global(p) {
		font-size: 19px;
		margin: 0 0 22px;
	}
	.post-body :global(h2) {
		font-family: 'Anton', 'Arial Narrow', sans-serif;
		font-weight: 400;
		font-size: 26px;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		color: #f1a93f;
		margin: 48px 0 20px;
	}
	.post-body :global(h3) {
		font-size: 21px;
		font-weight: 600;
		color: #fff;
		margin: 36px 0 16px;
	}
	.post-body :global(strong) {
		font-weight: 600;
		color: #fff;
	}
	.post-body :global(em) {
		color: #f1a93f;
		font-style: italic;
	}
	.post-body :global(a) {
		color: #f1a93f;
		text-decoration: underline;
	}
	.post-body :global(blockquote) {
		border-left: 2px solid #f1a93f;
		padding-left: 20px;
		margin: 0 0 22px;
		color: #d8d3c8;
		font-style: italic;
	}
	.post-body :global(ul),
	.post-body :global(ol) {
		margin: 0 0 22px;
		padding-left: 26px;
	}
	.post-body :global(li) {
		font-size: 19px;
		margin-bottom: 10px;
	}
	.post-body :global(hr) {
		border: 0;
		height: 1px;
		background: rgba(244, 241, 234, 0.14);
		margin: 40px 0;
	}
	.post-body :global(code) {
		background: rgba(244, 241, 234, 0.08);
		border-radius: 3px;
		padding: 2px 6px;
		font-size: 0.9em;
	}
	.post-body :global(img) {
		display: block;
		width: 100%;
		height: auto;
		border-radius: 4px;
		margin: 8px 0 32px;
	}

	@media (max-width: 560px) {
		.sheet {
			padding: 64px 26px 90px;
		}
		.wordmark {
			font-size: 62px;
		}
		.post-title {
			font-size: 32px;
		}
		.post-body :global(p),
		.post-body :global(li) {
			font-size: 18px;
		}
	}
</style>
