<script lang="ts">
	import EpisodeList from '$lib/components/episodeList.svelte';
	import SideBar from '$lib/components/sideBar.svelte';
	import VideoComponent from '$lib/components/videoComponent.svelte';
	import VideoController from '$lib/components/videoController.svelte';

	export let data: any;
	$: episode = data?.episode;
	$: servers = data?.servers;
	$: episodeUrl = servers?.[0];
</script>

{#if servers && servers.length > 0}
	<div class="flex w-full gap-6">
		<div
			data-portal="player"
			id="player"
			class="bg-white w-full h-[100vh] aspect-video relative flex shrink-0"
		>
			{#if episodeUrl.type === 'embed'}
				<iframe
					data-portal="player"
					title="Video"
					sandbox="allow-same-origin allow-scripts"
					class="absolute top-0 left-0 w-full h-full"
					src={episodeUrl.src}
					allowfullscreen
				></iframe>
			{:else}
				<VideoComponent source={episodeUrl.src} />
				<!-- {:else if episodeUrl.type === 'html'} -->
				<!-- 	@html(episodeUrl.src) -->
			{/if}
		</div>
		<div class="flex flex-col gap-6"></div>
	</div>
{:else}
	<div class="flex w-full gap-6 justify-center items-center aspect-video">
		<h2 class="flex w-full h-full aspect-video justify-center items-center text-7xl">
			Không thể tải được Video
		</h2>
	</div>
{/if}
<div data-portal="page" class="flex flex-col w-full gap-6">
	<div class="flex justify-center">
		<ul class="flex flex-row gap-6">
			{#if episode && episode.length > 0}
				{#each servers as server, i (i)}
					<button
						on:click|preventDefault={() => {
							episodeUrl = server;
						}}
						class="relative btn-accent btn cursor-pointer text-white flex justify-center items-center rounded-md"
					>
						{server?.title || 'Server ' + (i + 1)}
					</button>
				{/each}
			{/if}
		</ul>
	</div>
	<EpisodeList
		sourceId={data.sourceId}
		parent={episode && Array.isArray(episode) && episode.length > 1 ? episode[1] : episode[0]}
		revert={data.reverse}
	/>
	<SideBar sources={data?.sources} />
</div>
<VideoController />
