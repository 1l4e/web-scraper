<script lang="ts">
	import { hexUrl } from '$lib/util';
	export let image: string,
		title: string,
		description: string,
		link: string,
		source: string,
		status: string;
</script>

<li
	class={`flex rounded-md gap-5 bg-cover overflow-hidden`}
	style={`background-image: url('${image}');`}
>
	<a
		data-portal="card"
		class="flex w-[220px] h-[320px]"
		href={`/parent?id=${hexUrl(link)}&source=${source}`}
	>
		<div class="flex w-[220px] justify-center items-end text-3xl relative">
			<span
				class="portal-key absolute top-0 w-full left-0 text-7xl text-black text-center text-shadow"
				>&nbsp;
			</span>
			<div class="flex flex-col">
				<span class="w-full text-[24px] drop-shadow-sm text-black text-center text-shadow">
					{title}
				</span>
				<span class="w-full font-bold text-[16px] text-orange-500 text-center text-shadow">
					{status} - {description}
				</span>
			</div>
		</div>
	</a>
</li>
