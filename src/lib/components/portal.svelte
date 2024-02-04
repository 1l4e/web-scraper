<script lang="ts">
	import { onMount } from 'svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	$: search = false;
	$: keys = '';
	let timeoutId: any;
	function handleFullScreen(e: KeyboardEvent) {
		if (!keys && e.key === 'f') {
			if (document.fullscreenElement) {
				// If already in fullscreen, exit fullscreen
				if (document.exitFullscreen) {
					document.exitFullscreen();
					/* @ts-ignore */
				} else if (document.mozCancelFullScreen) {
					// Firefox
					/* @ts-ignore */
					document.mozCancelFullScreen();
					/* @ts-ignore */
				} else if (document.webkitExitFullscreen) {
					// Chrome, Safari and Opera
					/* @ts-ignore */
					document.webkitExitFullscreen();
					/* @ts-ignore */
				} else if (document.msExitFullscreen) {
					// IE/Edge
					/* @ts-ignore */
					document.msExitFullscreen();
				}
			} else {
				// If not in fullscreen, request fullscreen
				if (document.documentElement.requestFullscreen) {
					document.documentElement.requestFullscreen();
					/* @ts-ignore */
				} else if (document.documentElement.mozRequestFullScreen) {
					// Firefox
					/* @ts-ignore */
					document.documentElement.mozRequestFullScreen();
					/* @ts-ignore */
				} else if (document.documentElement.webkitRequestFullscreen) {
					// Chrome, Safari and Opera
					/* @ts-ignore */
					document.documentElement.webkitRequestFullscreen();
					/* @ts-ignore */
				} else if (document.documentElement.msRequestFullscreen) {
					// IE/Edge
					/* @ts-ignore */
					document.documentElement.msRequestFullscreen();
				}
			}
			return;
		}
	}

	function handleVideoPlayer(e: KeyboardEvent) {
		// const video = document.querySelector('');
		// const video = document.querySelector('[data-portal="player"]');
		// if (!video) return;
		// if (e.key === 'p') {
		// 	if (video.paused) {
		// 		video.play();
		// 	} else {
		// 		video.pause();
		// 	}
		// }
	}
	function handleKeyPress(e: KeyboardEvent) {
		const page = document.querySelector('[data-portal="page"]');
		timeoutId && clearTimeout(timeoutId);
		if (!page) return;
		const isNumber = /^[0-9]$/i.test(e.key);
		const isLetter = /^[a-z]$/i.test(e.key);
		if (e.key === 'Escape') {
			keys = '';
			return;
		}
		if (isNumber || isLetter) {
			if ((isNumber && /[a-z]/i.test(keys)) || (isLetter && /[0-9]/.test(keys))) {
				keys = '';
			}
			keys += e.key;
		}
		handleVideoPlayer(e);
		handleFullScreen(e);
		timeoutId = setTimeout(() => {
			const allCards = document.querySelectorAll(
				isNumber ? '[data-portal="card"]' : '[data-portal="source"]'
			);
			for (const card of allCards) {
				if (card.getAttribute('data-key') === keys) {
					const link = card.getAttribute('href');
					if (link) {
						keys = '';
						goto(link);
					} else {
						const type = card.getAttribute('data-type');
						if (type) {
							keys = '';
							(card as HTMLElement).click();
						}
					}
					return; // Break out of the loop
				}
			}
			const allEpisodes = document.querySelectorAll('[data-portal="episode"]');
			for (const episode of allEpisodes) {
				if (episode.getAttribute('data-key') === keys) {
					const link = episode.getAttribute('href');
					if (link) {
						goto(link);
						keys = '';
					}
					return; // Break out of the loop
				}
			}
			keys = '';
		}, 1000);
		return () => {
			cleanup();
		};
	}
	function updateEpisodeKey() {
		let id = 1;
		const allEpisodes = document.querySelectorAll('[data-portal="episode"]');
		allEpisodes.forEach((episode: any) => {
			const index = String(id++);
			episode.setAttribute('data-key', index);
			const portalKeyElement = episode.querySelector('.portal-key');
			if (portalKeyElement) {
				portalKeyElement.textContent = index;
			}
		});
	}

	function updateCardKey() {
		let id = 1;
		const allCards = document.querySelectorAll('[data-portal="card"]');
		allCards.forEach((card: any) => {
			const rect = card.getBoundingClientRect();
			let sp = card.querySelector('.portal-key') || '';
			if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
				const index = String(id++);
				card.setAttribute('data-key', index);
				sp.textContent = index;
			} else {
				card.removeAttribute('data-key');
				sp.textContent = '';
			}
		});
	}
	function updateSourceKey() {
		let sourceId = 'a';
		const allSource = document.querySelectorAll('[data-portal="source"]');
		allSource.forEach((source: any, index) => {
			const newIndex = sourceId.charCodeAt(0) + index;
			source.setAttribute('data-key', String.fromCharCode(newIndex));
			const portalKeyElement = source.querySelector('.portal-key');

			if (portalKeyElement) {
				portalKeyElement.textContent = String.fromCharCode(newIndex);
			}
		});
	}
	function cleanup() {
		clearTimeout(timeoutId);
		updateCardKey();
		updateSourceKey();
		updateEpisodeKey();
	}
	afterNavigate(() => {
		cleanup();
	});
	onMount(() => {
		window.addEventListener('scroll', updateCardKey);
		return () => {
			window.removeEventListener('scroll', updateCardKey);
		};
	});
</script>

{#if keys && !search}
	<div
		class="flex fixed top-5 left-5 min-w-32 h-40 bg-red-500 justify-center items-center text-7xl py-2 z-[51] rounded-lg text-shadow"
		transition:fade
	>
		{keys.toUpperCase()}
	</div>
{/if}
<div
	class="{search ? 'flex' : 'hidden'} flex-col fixed top-0 left-0 w-screen h-screen bg-black/50 p-4"
>
	<div class="h-40"></div>
	<input
		name="search"
		bind:value={keys}
		placeholder="Search"
		autocomplete="off"
		type="text"
		class="input input-bordered input-lg input-primary w-full"
	/>
</div>
<svelte:window on:keydown={(e) => handleKeyPress(e)} />
