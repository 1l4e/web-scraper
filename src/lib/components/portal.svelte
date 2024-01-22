<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	const sourceId = $page.data.sourceId;
	$: search = false;
	$: keys = '';
	let timeoutId: any;
	function handleKeyPress(e: KeyboardEvent) {
		updateCardKey();
		updateSourceKey();
		const page = document.querySelector('[data-portal="page"]');
		timeoutId && clearTimeout(timeoutId);
		if (!page) return;
		const isNumber = /^[0-9]$/i.test(e.key);
		const isLetter = /^[a-z]$/i.test(e.key);
		if (!keys) {
			if (e.key === 's' && !search) {
				search = true;
				const searchInput = document.querySelector<HTMLInputElement>('input[name="search"]');
				if (searchInput) {
					searchInput.focus();
				}
				return;
			}
		}
		if (search) {
			if (e.key === 'Backspace') {
				keys.slice(0, -1);
			}
			if (e.key === 'Escape' && search) {
				search = false;
			}
			(isLetter || isNumber) && (keys += e.key);
			timeoutId = setTimeout(() => {
				if (!keys) return;
				search = false;
				// console.log(keys, sourceId);
				goto(`/search?keyword=${keys}&source=${sourceId}`);
				keys = '';
			}, 2000);
			return;
		}
		if (isNumber || isLetter) {
			if ((isNumber && /[a-z]/i.test(keys)) || (isLetter && /[0-9]/.test(keys))) {
				keys = '';
			}
			keys += e.key;
		}
		timeoutId = setTimeout(() => {
			const allCards = document.querySelectorAll(
				isNumber ? '[data-portal="card"]' : '[data-portal="source"]'
			);
			allCards.forEach((card) => {
				if (card.getAttribute('data-key') === keys) {
					const link = card.getAttribute('href');
					if (!link) return;
					goto(link);
				}
			});
			keys = '';
		}, 2000);
		return () => {
			clearTimeout(timeoutId);
		};
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
	onMount(() => {
		window.addEventListener('scroll', updateCardKey);
		updateCardKey();
		updateSourceKey();
		return () => {
			window.removeEventListener('scroll', updateCardKey);
		};
	});
</script>

{#if keys && !search}
	<div class="flex fixed top-5 left-5 min-w-32 h-40 bg-black justify-center items-center">
		{keys}
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
		type="text"
		class="input input-bordered input-lg input-primary w-full"
	/>
</div>
<svelte:window on:keydown={(e) => handleKeyPress(e)} />
