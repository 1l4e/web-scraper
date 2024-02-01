<script lang="ts">
	import { enhance } from '$app/forms';
	import { objectExtract } from '$lib';
	import PlusCircle from '$lib/components/icons/PlusCircle.svelte';
	import Input from '$lib/components/input.svelte';
	import Scraper from '$lib/components/scraper.svelte';
	import { defaultSource2, defaultTypes } from '$lib/util';
	import type { PageData } from './$types';
	import { toast } from 'svelte-sonner';

	export let data: PageData;
	let scraperId: any;
	let newName: string;

	$: scrapers = data.scrapers;
	let scraper = objectExtract(defaultSource2);
	$: types = defaultTypes;

	function addScraper() {
		if (scrapers.find((s: any) => s.id === 'new')) {
			return;
		}
		scraperId = 'new';
		scrapers.push({
			id: scraperId,
			name: 'New Scraper',
			...scraper
		});
	}
	function addItem(str: string) {
		if (scraper[str]) {
			toast.error('Scraper already exists');
			return;
		}
		scraper[str] = [
			{
				name: str,
				selector: '',
				type: 'text',
				multiple: false,
				children: [],
				deleteable: true
			}
		];
	}
</script>

<div class="flex justify-center flex-row">
	<h1 class="text-3xl py-5">Add New Source</h1>
</div>

<div class="flex w-full flex-row max-w-7xl px-4 mx-auto gap-4">
	<form
		method="post"
		use:enhance={() => {
			return async ({ update }) => {
				update({ reset: false });
			};
		}}
		class="flex flex-col gap-4 w-full"
	>
		<div class="flex flex-col lg:flex-row gap-4 justify-start">
			<Input name="name" label="Name" type="text" placeholder="Source Name" nolabel />
			<Input name="url" label="Url" type="text" placeholder="Source Url" nolabel />
			<Input name="image" label="Image" type="text" placeholder="Image" nolabel />
		</div>
		<div class="label">
			<span class="label-text">Scraper</span>
		</div>
		<div class="flex flex-row gap-5">
			<select name="scraper" bind:value={scraperId} class="select select-primary w-full max-w-xs">
				<option disabled selected>Select Scraper</option>
				{#each scrapers as item, i (i)}
					<option value={item.id}>{item.name}</option>
				{/each}
			</select>
			<button on:click|preventDefault={() => addScraper()} type="button" class="btn btn-primary"
				>Add new scraper</button
			>
		</div>
		{#if scrapers.find((item) => item.id === scraperId)}
			<div class="flex flex-col gap-4">
				{#each Object.entries(scraper) as [key, value]}
					<div class="flex flex-col gap-2">
						<span class="font-bold">{key.toUpperCase()}</span>
						<Scraper name={key} childNumber={4} bind:scraper={value} {types} />
					</div>
				{/each}
				<div class="flex items-end gap-4">
					<Input label="Add new Selector" type="text" bind:value={newName} />
					<button
						on:click|preventDefault={() => addItem(newName)}
						type="button"
						class="btn btn-primary"
					>
						<PlusCircle />
					</button>
					<span>{newName}</span>
				</div>
			</div>
		{/if}
		<button type="submit" class="btn btn-primary">Add</button>
	</form>
</div>
