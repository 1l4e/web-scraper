<script lang="ts">
	import { page } from '$app/stores';
	let data = $page.error;
</script>

<div class="text-center h-[50vh] flex justify-center items-center flex-col">
	<h1 class="mb-4 text-6xl font-semibold text-red-500">{$page.status}</h1>
	<p class="mb-4 text-lg text-gray-600">{data?.message}</p>
	<div class="animate-bounce">
		<svg
			class="mx-auto h-16 w-16 text-red-500"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
			></path>
		</svg>
	</div>
	<p class="mt-4 text-gray-600">Let's get you back <a href="/" class="text-primary">HOME</a>.</p>
</div>
