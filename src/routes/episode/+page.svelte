<script lang="ts">
	import EpisodeList from '$lib/components/episodeList.svelte';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	export let data: any;
	const episode = data.episode;
	let playerContent: string = '';
	async function handleClick(server: any) {
		const { post, nume } = server;
		if (!post || !nume) {
			toast.error('Server not found');
			return;
		}
		const source = data.sources.find((s: any) => s.id === data.sourceId);
		const url = source.scraper.data.post.selector[0];
		const postData = {
			action: 'doo_player_ajax',
			post,
			nume,
			type: 'tv'
		};

		const res = await axios.post('/api/proxy', { url, postData, referer: source.url });
		if (res.status !== 200) {
			toast.error('Something wrong');
			return;
		}
		const embedData = res.data;
		const { embed_url, iframe } = embedData;
		playerContent =
			'<iframe class="absolute top-0 left-0 w-full h-full" src="' + embed_url + '"></iframe>'; // Set the content to embed_url
	}
	onMount(() => {
		const server = episode[0].server[0];
		handleClick(server);
	});
</script>

<div class="flex w-full gap-6">
	<div id="player" class="bg-white w-full h-[80vh] aspect-video relative flex shrink-0">
		{@html playerContent}
	</div>
	<div class="flex flex-col gap-6"></div>
</div>

<div class="flex flex-row w-full gap-6">
	<div class="flex justify-center">
		<ul class="flex flex-row gap-6">
			{#each episode[0].server as server, i (i)}
				<li
					on:click={() => handleClick(server)}
					class="relative cursor-pointer text-white bg-black flex justify-center items-center rounded-md"
				>
					<span class=" top-0 left-0 px-4 py-4 bg-red-500">{i + 1}</span>
					{server.title}
				</li>
			{/each}
		</ul>
	</div>
	<EpisodeList sourceId={data.sourceId} parent={episode[1]} />
</div>
