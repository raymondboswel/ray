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

<section class="flex-grow block md:flex md:flex-col justify-start p-4 h-full overflow-y-auto">
	<span class="bg-dark-grey rounded flex flex-col md:flex-row  border p-2 border-shale mb-3">
		<img class="h-full md:w-56 md:mr-2 cursor-pointer" src="{assets}/guilds.png" />
		<aside class="text-white">
			<div class="font-bold text-white text-lg">Guilds</div>
			<p>
				I wrote this project to help organize guild events at work. The app allows you to register
				an organization, add guilds and create events for the guilds. You can also generate a series
				of events which will auto assign to guild members, with assignment biased towards the least
				active members.
			</p>
			<p>Stack: Elixir, Phoenix, Postgres</p>
			<p>
				<a
					target="_blank"
					rel="external"
					href="https://github.com/raymondboswel/guilds"
					class="text-aqua cursor-pointer underline">Code</a
				>
				<a
					target="_blank"
					rel="external"
					href="https://guilds.gigalixirapp.com"
					class="text-aqua cursor-pointer underline">Live</a
				>
			</p>
		</aside>
	</span>
	<span class="bg-dark-grey rounded flex flex-col md:flex-row  border p-2 border-shale mb-3">
		<img class="w-full md:w-56 md:mr-2 cursor-pointer" src="{assets}/functional-composition.png" />
		<aside class="text-white">
			<div class="font-bold text-white text-lg">Functional Composition</div>
			<p>
				This fun little project was written to explore web audio, and showcase some functional
				programming techniques for a presentation for my colleagues.
			</p>
			<p>Stack: Angular, RxJs, Web Audio API</p>
			<p>
				<a
					target="_blank"
					rel="external"
					href="https://github.com/raymondboswel/functional-composition"
					class="text-aqua cursor-pointer underline">Code</a
				>
				<a
					target="_blank"
					rel="external"
					href="https://functional-composition.vercel.app"
					class="text-aqua cursor-pointer underline">Live</a
				>
			</p>
		</aside>
	</span>
</section>
