<script lang="ts">
	import type { Source } from '@prisma/client';
	export let sources: Source[];
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	$: sourceId = $page.data.sourceId;

	onMount(() => {
		const sidebar = document.querySelector('[data-portal="sidebar"]');
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY > 50) {
				sidebar?.classList.remove('hidden');
			} else {
				sidebar?.classList.add('hidden');
			}
		};
		window.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};
	});
	let logo = '';
	$: source = $page.url.searchParams.get('source');
	$: if (source) {
		logo = $page.data.sources.find((s: any) => s.id === source)?.image || '';
	}
</script>

<div data-portal="sidebar" class="fixed bottom-0 w-full">
	<div class="fixed bg-black p-4 top-0 left-0">
		<img src={logo} alt="chamthoi" class="w-auto h-10" />
	</div>
	<div
		class="container rounded-t-lg mx-auto flex justify-center flex-row bg-base-100 h-[100px] gap-5 p-5 z-10 items-center"
	>
		<ul class="flex relative gap-6">
			{#each sources as item, i (i)}
				<li class="flex rounded-lg overflow-hidden">
					<a
						data-portal="source"
						href="/?source={item.id}"
						class="flex h-[50px] items-center justify-center rounded-sm bg-primary text-white relative overflow-hidden"
					>
						<span class="portal-key uppercase text-5xl bg-secondary text-center w-12">{i + 1}</span>
						<img src={item.image} alt={item.name} class="h-[30px] w-full object-cover" />
					</a>
				</li>
			{/each}
			<a
				data-portal="source"
				href="/search?source={sourceId}"
				class="flex h-[50px] items-center justify-center rounded-sm bg-primary text-white relative pr-4"
			>
				<span class="portal-key text-5xl bg-secondary text-center w-12">s</span>
				Search
			</a>
		</ul>
	</div>
</div>
