<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	interface $$Props extends HTMLInputAttributes {
		label: string;
		nolabel?: boolean;
		value?: string;
	}
	export let label: string;
	export let nolabel: boolean = false;
	export let value: string = '';
</script>

<label class="form-control">
	{#if !nolabel}
		<div class="label">
			<span class="label-text">{label}</span>
		</div>
	{/if}
	<input
		{...$$restProps}
		bind:value
		class="input input-bordered input-secondary w-full placeholder:text-gray-700"
	/>
</label>
