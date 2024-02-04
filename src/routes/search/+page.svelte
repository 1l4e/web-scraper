<script lang="ts">
	import Card from '$lib/components/card.svelte';
	export let data: any;
	import SideBar from '$lib/components/sideBar.svelte';
</script>

<div data-portal="page" class="flex w-full justify-center items-center flex-col gap-6">
	<div class="flex flex-col gap-5 w-full">
		<div class="flex flex-col w-full gap-5 bg-slate-600">
			<SideBar sources={data.sources} />
			<div class="w-full flex max-w-screen p-6 flex-col gap-4">
				<h1 class="flex text-4xl py-4">Kết quả tìm kiếm :</h1>
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
									sourceData={data.source}
								/>
							{/each}
						</ul>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</div>
