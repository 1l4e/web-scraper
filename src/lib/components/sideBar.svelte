<script lang="ts">
	import type { Source } from '@prisma/client';
	export let sources: Source[];
</script>

<div class="fixed bottom-0 w-full flex flex-row bg-slate-700 h-[70px] gap-5 p-5 z-10">
	{#each sources as item, i (i)}
		<a
			data-portal="source"
			href="/?source={item.id}"
			class="flex h-[50px] items-center justify-center rounded-sm bg-primary text-white relative"
		>
			<img src={item.image} alt={item.name} class="h-[30px] w-full object-cover" />
			<span class="portal-key fixed left-0 text-5xl bg-secondary text-center w-12">{i + 1}</span>
		</a>
	{/each}
</div>
