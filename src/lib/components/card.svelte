<script lang="ts">
	import { hexUrl } from '$lib/util';
	import type { Source } from '@prisma/client';
	export let image: string,
		title: string,
		description: string,
		link: string,
		source: string,
		sourceData: Source,
		status: string;
	if (!image.startsWith('http')) image = sourceData.url + image;
</script>

<li
	class={`flex w-[220px] h-[320px] hover:scale-105 duration-200 btn rounded-md gap-5 bg-cover overflow-hidden bg-primary-content`}
	style={`background-image: url('${image}');`}
>
	<a
		data-portal="card"
		class="flex w-[220px] h-[320px]"
		href={`/parent?id=${hexUrl(link)}&source=${source}`}
	>
		<div class="flex w-[220px] justify-center items-end text-3xl relative">
			<span
				class="portal-key absolute top-0 w-full left-0 text-7xl text-red-500 text-center text-shadow"
				>&nbsp;
			</span>
			<div class="flex flex-col">
				<span class="w-full text-[20px] drop-shadow-sm text-red-500 font-bold text-center bg-black">
					{title}
				</span>
				<span class="w-full font-bold text-[16px] text-orange-500 text-center bg-black">
					{status} - {description}
				</span>
			</div>
		</div>
	</a>
</li>
