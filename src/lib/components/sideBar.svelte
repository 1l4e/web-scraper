<script lang="ts">
	import type { Source } from '@prisma/client';
	export let sources: Source[];
	import { page } from '$app/stores';
	$: sourceId = $page.data.sourceId;
</script>

<div class="fixed bottom-0 w-full flex flex-row bg-slate-700 h-[100px] gap-5 p-5 z-10 items-center">
	<ul class="flex relative gap-6">
		{#each sources as item, i (i)}
			<a
				data-portal="source"
				href="/?source={item.id}"
				class="flex h-[50px] items-center justify-center rounded-sm bg-primary text-white relative"
			>
				<span class="portal-key text-5xl bg-secondary text-center w-12">{i + 1}</span>
				<img src={item.image} alt={item.name} class="h-[30px] w-full object-cover" />
			</a>
		{/each}
		<a
			data-portal="source"
			href="/search?source={sourceId}"
			class="flex h-[50px] items-center justify-center rounded-sm bg-primary text-white relative"
		>
			<span class="portal-key text-5xl bg-secondary text-center w-12">s</span>
			Search
		</a>
	</ul>
</div>
