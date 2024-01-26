<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const sources = data.sources;
</script>

<div class="flex justify-between flex-row w-full gap-6 px-6">
	<h1 class="text-3xl">Source</h1>
	<a href="/dashboard/source/add" class="btn btn-secondary px-4 py-2">+Add Source</a>
</div>

<ul class="flex mt-4 gap-6 flex-wrap px-6">
	{#each sources as source, i (i)}
		<li class="card w-96 bg-base-100 shadow-xl drop-shadow-xl">
			<a href="/dashboard/source/{source.id}">
				<figure>
					<img src={source?.image} alt={source.name} />
				</figure>
				<div class="card-body">
					<h2 class="card-title uppercase font-bold">{source.name}</h2>
				</div>
			</a>
		</li>
	{/each}
</ul>
