<script lang="ts">
	export let menu: any;
	export let data: any;
</script>

<div class="navbar bg-base-100 container mx-auto drop-shadow-md">
	<div class="navbar-start">
		<div class="dropdown">
			<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/></svg
				>
			</div>
			<ul class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
				{#each menu as item}
					<li>
						{#if item.children}
							<details>
								<summary>{item.name}</summary>
								<ul>
									{#each item.children as child}
										<li>
											<a href={child.slug}>{child.name}</a>
										</li>
									{/each}
								</ul>
							</details>
						{:else}
							<a href={item.slug} class="justify-between">
								{item.name}
							</a>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
		<a href="/" class="btn btn-ghost text-xl">Mangasi</a>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			{#each menu as item}
				<li>
					{#if item.children}
						<details>
							<summary>{item.name}</summary>
							<ul>
								{#each item.children as child}
									<li>
										<a href={child.slug}>{child.name}</a>
									</li>
								{/each}
							</ul>
						</details>
					{:else}
						<a href={item.slug} class="justify-between">
							{item.name}
						</a>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
	<div class="navbar-end">
		{#if data?.userId}
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
					<div class="w-10 rounded-full">
						<img
							alt="Tailwind CSS Navbar component"
							src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
						/>
					</div>
				</div>
				<ul
					class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li><a href="/setting">Settings</a></li>
					<li><a href="/logout">Logout</a></li>
				</ul>
			</div>
		{:else}
			<a href="/login" class="btn btn-ghost btn-circle">Login</a>
		{/if}
	</div>
</div>
