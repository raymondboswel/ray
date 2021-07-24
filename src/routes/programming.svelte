<script>
	import { assets } from '$app/paths';
	import { draw, fly, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { about1, about2, about3 } from '$lib/about.text';
	import Nav from '$lib/components/Nav.svelte';
	import { onMount } from 'svelte';
	let show = false;
	let show1 = false;
	let duration = 1000;
	let delay = 200;
	let showHi = false;
	let showContent = false;
	onMount(() => {
		setTimeout(() => {
			showContent = true;
		}, 500);
	});
</script>

{#if showContent}
	<article
		class="bg-dark-grey flex rounded shadow   "
		in:scale={{ delay: 0, duration: 400, start: 0, opacity: 1, easing: quintOut }}
	>
		<section id="sidebar" class="text-white font-bold bg-marine rounded ">
			<div class="p-4">Projects</div>
		</section>
		<section class="flex-grow flex flex-col justify-evenly p-4">
			<span class="bg-dark-grey rounded flex  border p-2 border-shale mb-3">
				<img class="w-56 mr-2 cursor-pointer" src="{assets}/guilds.png" />
				<aside class="text-white">
					<div class="font-bold text-white text-lg">Guilds</div>
					<p>
						I wrote this project to help organize guild events at work. The app allows you to
						register an organization, add guilds and create events for the guilds. You can also
						generate a series of events which will auto assign to guild members, with assignment
						biased towards the least active members.
					</p>
					<p>Stack: Elixir, Phoenix, Postgres</p>
					<p>
						<a target="_blank" rel=external href="https://github.com/raymondboswel/guilds" class="text-aqua cursor-pointer underline">Code</a>
						<a target="_blank" rel="external" href="https://guilds.gigalixirapp.com" class="text-aqua cursor-pointer underline">Live</a>
					</p>
				</aside>
			</span>
			<!-- <span class="bg-dark-grey rounded flex flex-col border p-2 border-shale">
				<img class="w-56" src="{assets}/guilds.png" />
				<div class="font-bold text-white">Readable</div>
			</span> -->
		</section>
	</article>
{/if}
