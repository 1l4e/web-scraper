<script lang="ts">
	//import { goto, preloadData, pushState } from '$app/navigation';
	// import { page } from '$app/stores';
	import EpisodeList from '$lib/components/episodeList.svelte';
	export let data: any;
	const parent = data.parent;
	const servers = data?.servers;
	let episodeUrl = '';
	if (servers && servers.length > 0) {
		episodeUrl = servers[0];
	}
	$: source = data?.sources?.find((source: any) => source.id === data.sourceId);
	$: image = parent?.[0]?.image;
	$: {
		if (!image?.startsWith('http')) {
			image = source?.url + image;
		}
	}
</script>

<div data-portal="page">
	<div class="flex flex-row w-full gap-6">
		{#if episodeUrl}
			<div class="flex justify-center">
				<ul class="flex flex-row gap-6">
					{#if parent && parent.length > 1}
						{#each parent[1]?.server as server, i (i)}
							<a
								href={data.serverUrl + '&server=' + i}
								class="relative cursor-pointer text-white bg-red-500 flex justify-center items-center rounded-md"
							>
								<span class=" top-0 left-0 px-4 py-4 bg-red-500">{i + 1}</span>
								{server.title}
							</a>
						{/each}
					{/if}
				</ul>
			</div>
		{/if}
		<EpisodeList sourceId={data?.sourceId} parent={parent?.[1] || []} revert={false} />
	</div>
	{#if parent}
		{#if episodeUrl}
			<div class="flex w-full gap-6">
				<div
					data-portal="player"
					id="player"
					class="bg-white w-full h-[100vh] aspect-video relative flex shrink-0"
				>
					<iframe
						title="video"
						sandbox="allow-same-origin allow-scripts"
						class="absolute top-0 left-0 w-full h-full"
						src={episodeUrl}
					></iframe>
				</div>
				<div class="flex flex-col gap-6"></div>
			</div>
		{/if}
		<div class="flex flex-row w-full gap-6 px-4">
			<div class="flex w-1/4">
				<img class="w-full h-auto" src={image} alt={parent?.[0]?.title} />
			</div>
			<div class="flex w-3/4 flex-col gap-6">
				<ul>
					{#each Object.entries(parent[0]) as [key, value]}
						<li class="text-xl">{key.toUpperCase()}: {value}</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}

	<!-- {#if $page.state.selected} -->
	<!-- 	<div class="flex fixed top-0 left-0 w-screen h-screen justify-center items-center bg-black/80"> -->
	<!-- 		<div class="flex flex-col bg-black"> -->
	<!-- 			<EpisodePage data={$page.state.selected} /> -->
	<!-- 		</div> -->
	<!-- 	</div> -->
	<!-- {/if} -->
</div>
