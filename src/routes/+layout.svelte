<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import { Toaster } from 'svelte-sonner';
	import '../app.css';
	import { navigating } from '$app/stores';
	import NProgress from 'nprogress';
	import { menu } from '$lib/util';

	import 'nprogress/nprogress.css';
	import Portal from '$lib/components/portal.svelte';
	import { ROLE } from '@prisma/client';
	import { page } from '$app/stores';
	import Error from '$lib/components/error/error.svelte';

	NProgress.configure({
		minimum: 0.16
	});

	export let data: any;
	let title = 'XemPhim';
	$: {
		if ($page.data?.title) {
			title = $page.data?.title;
		}
	}
	$: {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	}
</script>

<div
	class="flex w-full max-w-screen min-h-screen flex-col gap-6 relative bg-primary-content bg-boxed"
>
	<div class="w-full flex flex-col gap-6">
		{#if data?.userId && data?.role === ROLE.ADMIN}
			<Header {menu} {data} />
		{/if}
		<div class="flex mx-auto w-full flex-col gap-6 bg-primary-content mb-[120px]">
			{#if $page.error}
				<Error />
			{:else}
				<slot />
			{/if}
		</div>
	</div>
</div>
<Toaster position="top-center" richColors />
<Portal />
<svelte:head>
	<title>{title}</title>
</svelte:head>
