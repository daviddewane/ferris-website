<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import './styles.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>The Ferris — 100 S. State Street, Chicago</title>
</svelte:head>

{@render children()}
