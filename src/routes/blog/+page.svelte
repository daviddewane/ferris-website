<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Blog — The Ferris</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Anton&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&display=swap" rel="stylesheet" />
</svelte:head>

<main class="sheet">
	<header class="masthead">
		<a class="wordmark" href="/">Ferris &amp; Co.<div class="bar"></div></a>
		<div class="meta">
			<span>Blog</span>
		</div>
	</header>

	{#if data.posts.length === 0}
		<p class="empty">Nothing here yet — check back soon.</p>
	{:else}
		<ul class="posts">
			{#each data.posts as post (post.slug)}
				<li class="post">
					<a class="post-link" href="/blog/{post.slug}">
						<span class="post-date">{post.dateLabel}</span>
						<h2 class="post-title">{post.title}</h2>
						{#if post.excerpt}
							<p class="post-excerpt">{post.excerpt}</p>
						{/if}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
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
		color: #f1a93f;
		font-size: 13.5px;
		letter-spacing: 0.13em;
		text-transform: uppercase;
	}

	.empty {
		font-size: 19px;
		color: #9a958c;
	}

	.posts {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.post {
		border-top: 1px solid rgba(244, 241, 234, 0.14);
		padding: 32px 0;
	}
	.post:last-child {
		border-bottom: 1px solid rgba(244, 241, 234, 0.14);
	}
	.post-link {
		display: block;
	}
	.post-date {
		display: block;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
		font-size: 13px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #9a958c;
		margin-bottom: 10px;
	}
	.post-title {
		font-family: 'Anton', 'Arial Narrow', sans-serif;
		font-weight: 400;
		font-size: 26px;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		color: #fff;
		margin: 0 0 12px;
		transition: color 0.15s ease;
	}
	.post-link:hover .post-title {
		color: #f1a93f;
	}
	.post-excerpt {
		font-size: 18px;
		color: #d8d3c8;
		margin: 0;
	}

	@media (max-width: 560px) {
		.sheet {
			padding: 64px 26px 90px;
		}
		.wordmark {
			font-size: 62px;
		}
		.post-title {
			font-size: 22px;
		}
		.post-excerpt {
			font-size: 17px;
		}
	}
</style>
