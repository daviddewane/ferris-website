<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import './styles.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>The Ferris — 1 W. Monroe Street, Chicago</title>
</svelte:head>

{@render children()}
