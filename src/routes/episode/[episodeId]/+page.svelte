<script lang="ts">
	import EpisodeList from '$lib/components/episodeList.svelte';

	export let data: any;
	const episode = data.episode;
	$: servers = data.servers;
	$: episodeUrl = servers?.[0];
</script>

{#if episodeUrl}
	<div class="flex w-full gap-6">
		<div id="player" class="bg-white w-full h-[80vh] aspect-video relative flex shrink-0">
			{episodeUrl}
			<!-- {@html playerContent} -->
			<iframe
				title="Video"
				sandbox="allow-same-origin allow-scripts"
				class="absolute top-0 left-0 w-full h-full"
				src={episodeUrl}
			></iframe>
		</div>
		<div class="flex flex-col gap-6"></div>
	</div>
{:else}
	<div class="flex w-full gap-6">
		<h2 class="flex w-full h-full aspect-video">CANT LOAD VIDEO</h2>
	</div>
{/if}
<div class="flex flex-row w-full gap-6">
	<div class="flex justify-center">
		<ul class="flex flex-row gap-6">
			{#if episode && episode.length > 0}
				{#each episode[0]?.server as server, i (i)}
					<a
						href={data.serverUrl + '&server' + i}
						class="relative cursor-pointer text-white bg-black flex justify-center items-center rounded-md"
					>
						<span class=" top-0 left-0 px-4 py-4 bg-red-500">{i + 1}</span>
						{server.title}
					</a>
				{/each}
			{/if}
		</ul>
	</div>
	<EpisodeList sourceId={data.sourceId} parent={episode[1]} />
</div>
