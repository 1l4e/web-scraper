<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import videojs from 'video.js';
	import type Player from 'video.js/dist/types/player';
	import 'video.js/dist/video-js.min.css';
	export let source: string;
	export let type: string = 'm3u8';

	let player: Player;

	onMount(() => {
		player = videojs('movie', {
			autoplay: true
		});
	});
	onDestroy(() => {
		if (player) player.dispose();
	});
</script>

<video
	id="movie"
	class="video-js vjs-default-skin absolute top-0 left-0 w-full h-full"
	controls
	autoplay
	preload="auto"
>
	<track kind="captions" />
	<source src={source} type={type === 'm3u8' ? 'application/x-mpegURL' : 'video/mp4'} />
</video>
