<script lang="ts">
	import { hexUrl } from '$lib/util';
	export let sourceId: any;
	export let parent: any;
</script>

<div class="flex flex-row w-full gap-6 px-4 justify-center mt-6">
	<ul class="flex gap-6 flex-col">
		{#if parent}
			{#each Object.entries(parent) as [key, value]}
				<li class="text-4xl">{key.toUpperCase()}</li>
				<ul class="flex flex-row gap-6 flex-wrap">
					{#if value && Array.isArray(value)}
						{#each value as episode, i (i)}
							<li class="flex rounded-lg overflow-hidden">
								{#if episode?.link}
									<a
										data-portal="episode"
										class="flex justify-between flex-col text-3xl relative bg-black"
										href={`/episode/${hexUrl(episode?.link)}?source=${sourceId}`}
									>
										<span
											class="portal-key top-0 left-0 text-5xl text-white w-full bg-slate-500 text-center"
											>{i + 1}</span
										>
										<span class="px-4 py-2">
											{episode.title}
										</span>
									</a>
								{/if}
							</li>
						{/each}
					{/if}
				</ul>
			{/each}
		{/if}
	</ul>
</div>
