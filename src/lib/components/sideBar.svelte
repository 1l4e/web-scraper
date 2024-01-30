<script lang="ts">
	import type { Source } from '@prisma/client';
	export let sources: Source[];
	import { page } from '$app/stores';
	let keys = $page.url.searchParams.get('keyword') || '';
	$: sourceId = $page.data.sourceId;
</script>

<div data-portal="sidebar" class="flex w-full">
	<div
		class="container rounded-t-lg mx-auto flex justify-center flex-col bg-transparent gap-5 p-5 z-10 items-center"
	>
		<form action="/search" class="flex mx-auto justify-center w-full lg:w-1/2 gap-4">
			<input type="hidden" name="source" bind:value={sourceId} />
			<input
				name="keyword"
				bind:value={keys}
				placeholder="Search"
				autocomplete="off"
				type="text"
				class="input input-bordered input-lg input-primary lg:w-1/2"
			/>
			<button type="submit" class="btn btn-primary btn-lg text-white">Search</button>
		</form>
		<ul class="flex relative gap-6 w-full mx-auto justify-center">
			{#each sources as item, i (i)}
				<li class="flex rounded-lg overflow-hidden duration-150 hover:scale-105">
					<a
						data-portal="source"
						href="/?source={item.id}"
						class="btn btn-secondary flex h-[150px] w-[150px] items-center justify-center rounded-sm bg-primary text-white relative overflow-hidden"
					>
						<span
							class="portal-key uppercase text-5xl bg-secondary text-center w-12 absolute top-0 left-0"
							>{i + 1}</span
						>
						<img src={item.image} alt={item.name} class="h-[30px] w-full object-cover" />
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
