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
	let mediaType =
		type === 'm3u8'
			? 'application/x-mpegURL'
			: type === 'blob'
				? 'application/octet-stream'
				: 'video/mp4';
</script>

<video
	data-portal="player"
	id="movie"
	class="video-js vjs-default-skin absolute top-0 left-0 w-full h-full"
	controls
	autoplay
	preload="auto"
	crossorigin="use-credentials"
>
	<track kind="captions" />
	<source src={source} type={mediaType} />
</video>
