<script lang="ts">
	import { hexUrl } from '$lib/util';
	export let image: string, title: string, description: string, link: string, source: string;
</script>

<li class={`fle gap-5 bg-cover`} style={`background-image: url('${image}');`}>
	<a
		data-portal="card"
		class="flex w-[220px] h-[320px]"
		href={`/parent?id=${hexUrl(link)}&source=${source}`}
	>
		<div class="flex w-[220px] justify-center items-end text-3xl relative">
			<span
				class="portal-key absolute top-0 left=0 bg-black/50 w-full left-0 text-7xl text-white text-center"
				>&nbsp;
			</span>
			<div class="flex flex-col bg-black/50">
				<span class="w-full bg-slate-600/20 text-red-500 text-center">
					{title}
				</span>
				<span class="w-full bg-slate-600/20 text-md text-red-500 text-center">
					{description}
				</span>
			</div>
		</div>
	</a>
</li>
