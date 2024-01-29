<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import Input from '$lib/components/input.svelte';
	import Scraper from '$lib/components/scraper.svelte';
	import { objectExtract } from '$lib';
	import { CheckCircleFilled, DeleteFilled, PlusOutlined } from 'svelte-ant-design-icons';
	import { toast } from 'svelte-sonner';
	import { defaultTypes } from '$lib/util';

	export let data: PageData;
	const source = data.source;
	const scraperData: any = data.source?.scraper.data;
	const scraper = objectExtract(scraperData);
	const scrapers = data.scrapers;
	let scraperId = data.source?.scraper.id;
	let newName: string;
	export let form: any;

	$: types = defaultTypes;
	function updateSource() {
		toast.message('Updating...');
		return async ({ update }: any) => {
			update({ reset: false });
			toast.message(form.message);
		};
	}

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
	function deleteSource() {
		toast.message('Sending request...');
		return async ({ update }: any) => {
			update({ reset: false });
			toast.message(form.message);
		};
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
	<h1 class="text-3xl py-5">
		{source?.name} - {source?.active}
	</h1>
</div>

<div class="flex justify-end gap-6 py-6">
	<div class="flex justify-end w-full">
		<div class="tooltip" data-tip="Delete source">
			<label for="cfm_active" class="btn btn-info">
				<CheckCircleFilled size={20} />
			</label>
		</div>
		<input type="checkbox" id="cfm_active" class="modal-toggle" />
		<div class="modal" role="dialog">
			<div class="modal-box">
				<h3 class="font-bold text-lg">Deactive this Source</h3>
				<p class="py-4">This action cannot be undone</p>
				<div class="modal-action">
					<label for="cfm_active" class="btn">Close!</label>
					<form action="?/active" use:enhance={() => deleteSource()} method="post">
						<input type="hidden" name="active" value={source?.active} />
						<button type="submit" class="btn btn-info">Change</button>
					</form>
				</div>
			</div>
		</div>
		<!-- </form> -->
	</div>
	<div class="flex justify-end w-full">
		<div class="tooltip" data-tip="Delete source">
			<label for="cfm_delete" class="btn btn-error">
				<DeleteFilled size={20} />
			</label>
		</div>
		<input type="checkbox" id="cfm_delete" class="modal-toggle" />
		<div class="modal" role="dialog">
			<div class="modal-box">
				<h3 class="font-bold text-lg">Delete this Source</h3>
				<p class="py-4">This action cannot be undone</p>
				<div class="modal-action">
					<label for="cfm_delete" class="btn">Close!</label>
					<form action="?/delete" use:enhance={() => deleteSource()} method="post">
						<button type="submit" class="btn btn-error">Delete</button>
					</form>
				</div>
			</div>
		</div>
		<!-- </form> -->
	</div>
</div>
<div class="flex w-full flex-row max-w-7xl px-4 mx-auto gap-4">
	<form
		action="?/update"
		method="post"
		use:enhance={() => updateSource()}
		class="flex flex-col gap-4 w-full"
	>
		<div class="flex flex-col lg:flex-row gap-4 justify-start">
			<Input
				name="name"
				label="Name"
				type="text"
				placeholder="Source Name"
				nolabel
				value={source?.name}
			/>
			<Input
				name="url"
				label="Url"
				type="text"
				placeholder="Source Url"
				nolabel
				value={source?.url}
			/>
			<Input
				name="image"
				label="Image"
				type="text"
				placeholder="Image"
				nolabel
				value={source?.image || ''}
			/>
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
						<PlusOutlined size="20" />
					</button>
					<span>{newName}</span>
				</div>
			</div>
		{/if}
		<button type="submit" class="btn btn-primary">Add</button>
	</form>
</div>
{#if form?.message}
	<p>{form.message}</p>
{/if}
