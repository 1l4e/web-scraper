<script lang="ts">
	import { goto, preloadData, pushState } from '$app/navigation';
	import Card from '$lib/components/card.svelte';
	import LoadingIcon from '$lib/components/icons/LoadingIcon.svelte';
	import SideBar from '$lib/components/sideBar.svelte';
	import { onMount } from 'svelte';
	export let data: any;
	let filter = data?.filter?.data?.toLowerCase();
	let categories = data?.category?.[0]?.selector || [];
	$: nextPage = data.nextPage;
	let isInfinityScrolling = false;
	const infinityScroll = async (href: string) => {
		if (isInfinityScrolling) {
			return;
		}
		try {
			isInfinityScrolling = true;
			const result = await preloadData(href);
			if (result.type === 'loaded' && result.status === 200) {
				categories = [...categories, ...result.data.category[0].selector];
				nextPage = result.data.nextPage;
				pushState(href, { nextPage: nextPage });
			} else {
				goto(href);
			}
		} finally {
			isInfinityScrolling = false;
		}
	};
	const handleScroll = () => {
		const isAtBottom =
			window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 20;
		if (isAtBottom) {
			if (!nextPage || nextPage === data.lastPage) {
				return;
			}
			infinityScroll(nextPage);
		}
	};
	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div data-portal="page" class="flex w-full justify-center items-center flex-col gap-6">
	<SideBar sources={data?.sources} />
	<div class="flex flex-col gap-5 w-full">
		<div class="flex w-full gap-5 bg-slate-800 flex-col">
			<div class="w-full flex max-w-screen py-4 mx-auto justify-center items-center">
				{#if data?.category[0]?.selector}
					<ul class="flex gap-4 flex-wrap w-full justify-center">
						{#each categories as child, j (j)}
							{#if !filter.includes(child.title.trim().toLowerCase())}
								<Card
									title={child?.title}
									image={child?.image}
									status={child?.status}
									link={child?.link}
									description={''}
									source={data?.sourceData?.id}
									sourceData={data?.sourceData}
								/>
							{/if}
						{/each}
					</ul>
				{/if}
			</div>
		</div>
		<div class="flex flex-col gap-4 w-full justify-center">
			<ul class="flex flex-row w-full justify-center gap-4">
				<li>
					<a
						data-portal="card"
						href={data.firstPage}
						class="flex btn btn-error text-white btn-lg relative w-40 h-24 hover:scale-105 duration-200 gap-5 bg-cover overflow-hidden bg-primary-content"
					>
						<span
							class="portal-key absolute top-0 left-0 text-3xl text-white text-center text-shadow"
							>&nbsp;
						</span>

						First Page</a
					>
				</li>
				<li>
					<a
						data-portal="card"
						href={data.prevPage}
						class="flex btn btn-error text-white btn-lg relative w-40 h-24 hover:scale-105 duration-200 gap-5 bg-cover overflow-hidden bg-primary-content"
					>
						<span
							class="portal-key absolute top-0 left-0 text-3xl text-white text-center text-shadow"
							>&nbsp;
						</span>
						Prev Page</a
					>
				</li>
				<li>
					<a
						data-portal="card"
						href={data.lastPage}
						class="flex btn btn-error text-white btn-lg relative w-40 h-24 hover:scale-105 duration-200 gap-5 bg-cover overflow-hidden bg-primary-content"
					>
						<span
							class="portal-key absolute top-0 left-0 text-3xl text-white text-center text-shadow"
							>&nbsp;
						</span>

						Last Page</a
					>
				</li>
			</ul>
			<a class="btn btn-error btn-lg text-white text-3xl inline-flex" href={nextPage}>
				{#if isInfinityScrolling}
					<LoadingIcon class="animate-spin" /> Loading Next Page
				{:else}
					Next Page
				{/if}
			</a>
		</div>
	</div>
</div>
