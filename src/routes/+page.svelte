<script lang="ts">
	import { hexUrl } from '$lib/util';
	// import { goto, preloadData, pushState } from '$app/navigation';
	// import { page } from '$app/stores';
	// import ParentPage from './parent/+page.svelte';
	export let data: any;
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

<div class="flex w-full justify-center items-center flex-col gap-6">
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
								<li class={`fle gap-5 bg-cover`} style={`background-image: url('${child.image}');`}>
									<a
										class="flex w-[220px] h-[320px]"
										href={`/parent?id=${hexUrl(child.link)}&source=${data.sourceId}`}
									>
										<div class="flex w-[220px] justify-center items-end text-3xl relative">
											<span
												class="absolute top-0 left-0 text-5xl text-white bg-secondary text-center w-12"
												>{j + 1}</span
											>
											<div class="flex flex-col bg-black">
												<span class="w-full bg-slate-600/20 text-red-500 text-center">
													{child.title}
												</span>
												<span class="w-full bg-slate-600/20 text-md text-red-500 text-center">
													{child.description}
												</span>
											</div>
										</div>
									</a>
								</li>
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
