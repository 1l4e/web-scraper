<script lang="ts">
	import { enhance } from '$app/forms';
	export let form;
</script>

<div class="flex flex-col w-full justify-center items-center">
	<h1 class="text-3xl py-20">Sign up</h1>
	<form method="post" use:enhance class="flex flex-col gap-4 max-w-xl w-full">
		<label class="form-control w-full mx-auto">
			<div class="label">
				<span class="label-text">What is your name?</span>
			</div>
			<input
				name="username"
				autocomplete="off"
				type="email"
				placeholder="Email"
				class="input input-bordered input-secondary w-full"
			/>
		</label>
		<label class="form-control w-full">
			<div class="label">
				<span class="label-text">What is your password?</span>
			</div>
			<input
				name="password"
				autocomplete="off"
				type="password"
				placeholder="Password"
				class="input input-bordered input-secondary w-full"
			/>
		</label>
		<label class="form-control w-full">
			<div class="label">
				<span class="label-text">Referer</span>
			</div>
			<input
				name="referer"
				autocomplete="off"
				type="password"
				placeholder="referer"
				class="input input-bordered input-secondary w-full"
			/>
		</label>
		<button class="btn btn-secondary mt-10">Submit</button>
	</form>
	<a class="btn btn-ghosted mt-10" href="/login">Already have account,Sign in</a>
	{#if form?.message}
		<p class="text-red-500">{form.message}</p>
	{/if}
</div>
