<script>
	import '../app.postcss';
	import Nav from '$lib/components/Nav.svelte';
	import { assets } from '$app/paths';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { goto } from '$app/navigation';

	let show = false;
	setTimeout(() => {
		show = true;
	}, 100);
</script>

<article style="background-color: #0B0C10" class="h-full w-full overflow-x-none pt-8 px-12">
	{#if show}
		<div class="flex justify-between items-center mx-20">
			<div
				in:fly={{ delay: 300, duration: 400, x: -500, y: 0, opacity: 1, easing: quintOut }}
				class="text-shale text-3xl"
			>
				Hi! I'm Raymond.
			</div>
			<img
				alt=""
				on:click={() => goto('/')}
				in:fly={{ delay: 0, duration: 400, x: 200, y: 0, opacity: 1, easing: quintOut }}
				class="h-20 w-20 rounded-full border-2 border-shale cursor-pointer"
				src="{assets}/beer_hat_l.jpg"
			/>
		</div>
	{/if}

	<section class="flex">
		<div class="flex-grow ml-20 mr-10 mt-10">
			<slot />
		</div>
		{#if show}
			<div class="font-bold md:flex-col justify-start  md:flex hidden mr-16 mt-8">
				<Nav />
			</div>
			<div class="absolute bottom-0 left-0 w-full flex justify-center md:hidden">
				<Nav />
			</div>
		{/if}
	</section>
</article>

<style>
	.menu-item {
		border: solid 3px #46a29f;
	}

	span {
		cursor: pointer;
		color: white;
		border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
		padding: 1em;
		line-height: 1.5em;
		background: #46a29f;
		margin-right: 4px;
	}

	path {
		stroke: black;
		fill: white;
	}
</style>
