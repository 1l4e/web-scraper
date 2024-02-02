<script lang="ts">
	import { page } from '$app/stores';
	import { stringToHex } from '$lib/util';
	$: categoryData = $page.data.categoryData || [];
	$: source = $page.data.sources?.find((source: any) => source.id === $page.data.sourceId);
	let hide = true;
</script>

{#if hide}
	<div class="flex flex-row gap-5 w-full bg-slate-800">
		<div class="flex h-auto gap-5 bg-slate-800 flex-col">
			<div class="flex mx-auto">
				<div class="flex h-auto text-2xl bg-red-500 px-4 rounded-b-md py-2 text-white relative">
					Loại phim
				</div>
			</div>
			<div class="w-full flex flex-row gap-4 flex-wrap py-4 justify-center items-center">
				{#each categoryData as category, i (i)}
					{#if category.link !== '/' && !category.link.includes('javascript') && category.link !== '#'}
						{#if category.selector.length === 0}
							<div data-portal="card" class="flex">
								<a
									href={`/category?id=${stringToHex(category.link)}&source=${source.id}`}
									class="flex btn btn-error text-white btn-lg relative w-40 h-24 hover:scale-105 duration-200 gap-5 bg-cover overflow-hidden bg-primary-content"
								>
									<span
										class="portal-key absolute top-0 left-0 text-3xl text-white text-center text-shadow"
										>&nbsp;
									</span>
									{category.title}
								</a>
							</div>
						{/if}
					{/if}
				{/each}
			</div>
		</div>
		{#each categoryData as category, i (i)}
			{#if category.link !== '/' && !category.link.includes('javascript')}
				{#if category.selector.length > 0}
					<div class="flex h-auto gap-5 bg-slate-800 flex-col">
						<div class="flex mx-auto">
							<div
								class="flex h-auto text-2xl bg-red-500 px-4 rounded-b-md py-2 text-white relative"
							>
								{category.title}
							</div>
						</div>
						<div class="w-full flex max-w-screen py-4 mx-auto justify-center items-center">
							{#if category.selector}
								<ul class="flex gap-4 flex-wrap w-full justify-center">
									{#each category.selector as child, j (j)}
										<a
											data-portal="card"
											href={`/category?id=${stringToHex(child.link)}&source=${source.id}`}
											class="flex btn btn-error text-white btn-lg relative w-40 h-24 hover:scale-105 duration-200 gap-5 bg-cover overflow-hidden bg-primary-content"
										>
											{child?.title}
											<span
												class="portal-key absolute top-0 left-0 text-3xl text-white text-center text-shadow"
												>&nbsp;
											</span>
										</a>
									{/each}
								</ul>
							{/if}
						</div>
					</div>
				{/if}
			{/if}
		{/each}
	</div>
{/if}
