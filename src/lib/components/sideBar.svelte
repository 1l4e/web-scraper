<script lang="ts">
	import type { Source } from '@prisma/client';

	export let sources: Source[];
</script>

<div class="w-full flex flex-row bg-slate-700 h-[140px] gap-5 p-5 z-10">
	{#each sources as item, i (i)}
		<a
			href="/?source={item.id}"
			class="flex h-[100px] items-center justify-center rounded-sm bg-primary text-white relative"
		>
			<img src={item.image} alt={item.name} class="h-[40px] w-full object-cover" />
			<div class="fixed left-0 text-5xl bg-secondary text-center w-12">{i + 1}</div>
		</a>
	{/each}
</div>
