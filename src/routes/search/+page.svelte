<script lang="ts">
	import Card from '$lib/components/card.svelte';
	export let data: any;
	let keys = '';
	import { page } from '$app/stores';
	$: sourceId = $page.data.sourceId;
</script>

<div data-portal="page" class="flex w-full justify-center items-center flex-col gap-6">
	<div class="flex flex-col gap-5 w-full">
		<div class="flex w-full gap-5 bg-slate-600">
			<div class="w-full flex max-w-screen p-6 flex-col gap-4">
				<form class="flex mx-auto w-1/2 gap-4">
					<input type="hidden" name="source" bind:value={sourceId} />
					<input
						name="keyword"
						bind:value={keys}
						placeholder="Search"
						autocomplete="off"
						type="text"
						class="input input-bordered input-lg input-primary w-1/2"
					/>
					<button type="submit" class="btn btn-primary btn-lg text-white">Search</button>
				</form>
				{#if data.search && data.search.length > 0}
					{#each data.search as category, i (i)}
						<ul class="flex gap-4 flex-wrap w-full justify-center items-center">
							{#each category.selector as child, j (j)}
								<Card
									title={child.title}
									image={child.image}
									link={child.link}
									status={child.status}
									description={''}
									source={data.sourceId}
								/>
							{/each}
						</ul>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</div>
