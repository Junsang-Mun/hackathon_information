<script>
	import { onMount } from 'svelte';
	let data = null;
	let error = null;

	onMount(async () => {
		try {
			const response = await fetch('/api/weather');
			if (!response.ok) {
				throw new Error('Failed to fetch');
			}
			data = await response.json();
		} catch (err) {
			error = err.message;
		}
	});
</script>

<h1>Weather</h1>

{#if error}
	<p>Error: {error}</p>
{:else if !data}
	<p>Loading...</p>
{:else}
	<div>
	<pre>{JSON.stringify(data, null, 2)}</pre>
	</div>
{/if}
