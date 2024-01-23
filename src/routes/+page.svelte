<script lang="ts">
	import Card from '$lib/components/card.svelte';
	import { hexUrl } from '$lib/util';
	// import { goto, preloadData, pushState } from '$app/navigation';
	// import { page } from '$app/stores';
	// import ParentPage from './parent/+page.svelte';
	export let data: any;
	console.log(data);
	// async function handleClick(e: any) {
	// 	if (e.metaKey || innerWidth < 640) return;
	// 	e.preventDefault();
	// 	const { href } = e.currentTarget;
	// 	const result = await preloadData(href);
	// 	if (result.type === 'loaded' && result.status === 200) {
	// 		pushState(href, { selected: result.data });
	// 	} else {
	// 		goto(href);
	// 	}
	// }
</script>

<div data-portal="page" class="flex w-full justify-center items-center flex-col gap-6">
	<div class="flex flex-col gap-5 w-full">
		{#each data?.categories as category, i (i)}
			<div class="flex w-full gap-5 bg-slate-600">
				<div class="flex w-[220px] justify-center items-center text-3xl bg-slate-500 relative">
					{category.name}
				</div>
				<div class="w-full flex max-w-screen">
					{#if category.selector}
						<ul class="flex gap-4 flex-wrap">
							{#each category.selector as child, j (j)}
								<Card
									title={child.title}
									image={child.image}
									link={child.link}
									description={''}
									source={data.sourceId}
								/>
							{/each}
						</ul>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
<!-- {#if $page.state.selected} -->
<!-- 	<div class="flex absolute top-0 left-0 w-screen h-screen justify-center items-center bg-black/80"> -->
<!-- 		<div class="flex flex-col bg-black"> -->
<!-- 			<ParentPage data={$page.state.selected} /> -->
<!-- 		</div> -->
<!-- 	</div> -->
<!-- {/if} -->
