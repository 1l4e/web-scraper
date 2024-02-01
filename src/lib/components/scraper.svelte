<script lang="ts">
	import { toast } from 'svelte-sonner';
	import Input from './input.svelte';
	export let name: string;
	export let scraper: any = [];
	import { defaultTypes } from '$lib/util';
	import PlusIcon from './icons/PlusIcon.svelte';
	import MinusIcon from './icons/MinusIcon.svelte';
	import MinusCircle from './icons/MinusCircle.svelte';
	import PlusCircle from './icons/PlusCircle.svelte';
	export let child: boolean = false;
	$: expanded = false;
	const addSelector = () => {
		scraper = [
			...scraper,
			{
				id: scraper.length,
				name: '',
				selector: '',
				multiple: false,
				type: 'text',
				children: [],
				deleteable: true
			}
		];
	};

	const addChild = (id: number) => {
		const updatedScraper = [...scraper];

		const targetItem = updatedScraper[id];

		const newChild = {
			id: targetItem.children.length,
			name: '',
			selector: '',
			multiple: false,
			type: 'text',
			children: [],
			deleteable: true
		};

		const updatedItem = {
			...targetItem,
			children: [...targetItem.children, newChild]
		};

		updatedScraper[id] = updatedItem;
		scraper = updatedScraper;
		toast.success('Added child');
	};

	const handleChangeGroup = (str: string) => {
		if (str === 'group') {
			if (!types.includes(name)) {
				types.push(name);
				toast.success(`Added ${name} to types`);
			}
		} else {
			if (defaultTypes.includes(name)) {
				toast.error('This is default type');
				return;
			}
			if (types.includes(name)) {
				types = types.filter((item: string) => item !== name);
				toast.success(`Removed ${name} from types`);
			}
		}
	};
	export let childNumber: number;
	const removeSelector = (id: any) => {
		scraper = scraper.filter(
			(item: any) =>
				!(item.name === id.name && item.type === id.type && item.selector === id.selector)
		);
		toast.success('Removed selector');
	};
	function calculateColorClass() {
		const colors = ['border-blue-500', 'border-green-500', 'border-yellow-500', 'border-red-500'];
		const colorIndex = childNumber ? childNumber : 0 % colors.length;
		return colors[colorIndex];
	}
	export let types: any;
	scraper.forEach((item: any) => {
		if (!types.includes(item.type)) {
			types.push(item.type);
		}
	});
</script>

<div class={`flex flex-col gap-4 w-full border-l  ${calculateColorClass()}`}>
	<div class="flex pl-8 flex-col w-full relative">
		{#each scraper as item, i (i)}
			<div class="flex flex-col gap-4 w-full relative justify-center">
				{#if item?.children?.length > 0}
					<button
						class="text-2xl absolute -left-[25px] top-[24px] cursor-pointer w-5 h-5 flex justify-center items-center select-none"
						on:click|preventDefault={() => (expanded = !expanded)}
					>
						{#if expanded}
							<MinusCircle />
						{:else}
							<PlusCircle />
						{/if}
					</button>
				{/if}
				<div class="flex flex-row gap-4 relative items-end">
					<Input
						name={`${name}_name_${i}`}
						label="Name"
						type="text"
						placeholder="Scraper Name"
						bind:value={item.name}
						nolabel
					/>
					<Input
						nolabel
						name={`${name}_selector_${i}`}
						label="Selector"
						type="text"
						placeholder=".class"
						bind:value={item.selector}
					/>
					<select
						name={`${name}_type_${i}`}
						bind:value={item.type}
						class="select select-primary w-full max-w-[150px]"
						on:change={(e) => handleChangeGroup(e.currentTarget.value)}
					>
						<option disabled>Choose a type?</option>
						{#each types as type}
							<option value={type}>{type}</option>
						{/each}
					</select>
					<div class="form-control">
						<label class="label cursor-pointer flex flex-col">
							<span class="label-text">Multi</span>
							<input
								name={`${name}_multiple_${i}`}
								type="text"
								bind:value={item.multiple}
								class={`checkbox checkbox-primary text-transparent ${
									item.multiple === 'true' ? 'bg-green-500' : 'bg-transparent'
								}`}
								on:click|preventDefault={() =>
									item.multiple === 'true' ? (item.multiple = 'false') : (item.multiple = 'true')}
							/>
						</label>
					</div>
					<div class="flex gap-2.5">
						<button on:click|preventDefault={() => addChild(i)} class="btn btn-primary">
							<PlusIcon />
						</button>
						<button on:click|preventDefault={() => removeSelector(item)} class="btn btn-error">
							<MinusIcon />
						</button>
					</div>
				</div>
				<div class={`${!expanded ? 'hidden' : 'flex'}`}>
					<svelte:self
						childNumber={i % 4}
						name={`${name}_children_${i}`}
						bind:scraper={item.children}
						child
						{types}
					/>
				</div>
			</div>
		{/each}
		{#if !child}
			<div class="mt-4">
				<button on:click|preventDefault={() => addSelector()} class="btn btn-primary">
					<PlusIcon />
				</button>
			</div>
		{/if}
	</div>
</div>
