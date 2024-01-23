<script lang="ts">
	import { hexUrl } from '$lib/util';
	export let image: string,
		title: string,
		description: string,
		link: string,
		source: string,
		status: string;
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
			<div class="flex flex-col bg-black">
				<span class="w-full text-[24px] text-yellow-500 text-center">
					{title}
				</span>
				<span class="w-full font-bold text-[16px] text-orange-500 text-center">
					{status} - {description}
				</span>
			</div>
		</div>
	</a>
</li>
