<script lang="ts">
	import {
		DashboardOutlined,
		FundOutlined,
		HddFilled,
		HomeFilled,
		UnorderedListOutlined
	} from 'svelte-ant-design-icons';

	const menu = [
		{ id: 1, name: 'Home', slug: '/', icon: HomeFilled },
		{
			id: 2,
			name: 'Source',
			slug: '/dashboard/source',
			icon: HddFilled
		},
		{
			id: 6,
			name: 'Scraper',
			slug: '/dashboard/scraper',
			icon: FundOutlined
		},
		{ id: 3, name: 'Dashboard', slug: '/dashboard', icon: DashboardOutlined },
		{ id: 4, name: 'Collection', slug: '/dashboard/collection', icon: UnorderedListOutlined }
	];
</script>

<div
	class=" w-[100px] lg:w-[320px] px-6 py-8 flex shrink-0 bg-base-200 rounded-lg absolute left-0 top-[100px]"
>
	<ul class="w-56 rounded-box">
		{#each menu as item}
			<li class="flex flex-row gap-4 px-4 py-2 hover:bg-primary hover:text-white rounded-md">
				<svelte:component this={item.icon} class="" size={20} />
				<a class="hidden lg:flex" href={item.slug}>{item.name}</a>
			</li>
		{/each}
	</ul>
</div>
