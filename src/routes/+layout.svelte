<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import SideBar from '$lib/components/sideBar.svelte';
	import { Toaster } from 'svelte-sonner';
	import '../app.css';
	import { navigating } from '$app/stores';
	import NProgress from 'nprogress';

	import 'nprogress/nprogress.css';

	NProgress.configure({
		minimum: 0.16
	});
	const menu = [
		{ id: 1, name: 'Home', slug: '/' },
		{
			id: 2,
			name: 'Source',
			slug: '/dashboard/source'
		},
		{
			id: 6,
			name: 'Scraper',
			slug: '/dashboard/scraper'
		},
		{ id: 3, name: 'Dashboard', slug: '/dashboard' },
		{ id: 4, name: 'Collection', slug: '/dashboard/collection' }
	];

	export let data: any;
	let sources = data.sources;
	$: {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	}
</script>

<div class="flex w-full max-w-screen min-h-screen flex-col gap-6 relative">
	<div class="w-full flex flex-col">
		{#if data?.userId}
			<Header {menu} {data} />
		{/if}
		<div class="flex mx-auto w-full flex-col gap-6">
			<slot />
			<SideBar {sources} />
		</div>
	</div>
</div>
<Toaster position="top-center" richColors />
