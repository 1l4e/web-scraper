<script lang="ts">
	import { hexUrl } from '$lib/util';
	export let sourceId: any;
	export let parent: any;
</script>

<div class="flex flex-row w-full gap-6 px-4 justify-center">
	<ul>
		{#if parent}
			{#each Object.entries(parent) as [key, value]}
				<li>{key.toUpperCase()}</li>
				<ul class="flex flex-row gap-6 flex-wrap">
					{#if value && Array.isArray(value)}
						{#each value as episode, i (i)}
							<li class="flex">
								{#if episode?.link}
									<a
										class="flex w-20 justify-between flex-col text-3xl relative bg-black"
										href={`/episode/${hexUrl(episode?.link)}?source=${sourceId}`}
									>
										<span
											class="aboslute top-0 left-0 text-5xl text-white bg-secondary text-center w-12"
											>{i + 1}</span
										>
										{episode.title}
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
