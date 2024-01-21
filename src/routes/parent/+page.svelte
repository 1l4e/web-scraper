<script lang="ts">
	import EpisodeList from '$lib/components/episodeList.svelte';

	export let data: any;
	const parent = data.parent;
</script>

<div class="flex flex-row w-full gap-6 px-4">
	<div class="flex">
		<img src={parent[0].image} alt={parent[0].title} />
	</div>
	<div class="flex flex-col gap-6">
		<ul>
			{#each Object.entries(parent[0]) as [key, value]}
				<li class="text-xl">{key.toUpperCase()}: {value}</li>
			{/each}
		</ul>
	</div>
</div>

<EpisodeList sourceId={data.sourceId} parent={parent[1]} />
