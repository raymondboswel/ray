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
	let showText = false;
	onMount(() => {
		setTimeout(() => {
			showText = true;
		}, 500);
	});
</script>

{#if showText}
	<section
		class="bg-dark-grey h-full overflow-y-auto"
		in:scale={{ delay: 0, duration: 400, start: 0, opacity: 1, easing: quintOut }}
	>
		<div class="flex-grow flex flex-col ">
			<p class="mr-4 text-shale">
        I am a software engineer from South Africa, working as a team lead and full stack 
engineer at Fastcomm. 
        We build projects in Angular and Elixir,
though I'm really excited about Svelte as well these days (which is what this little site is built in).
			</p>

			<p
				class="mr-4 my-2  text-shale"
				in:scale={{ delay: 0, duration: 400, start: 0, opacity: 1, easing: quintOut }}
			>
				{about2}
			</p>
			<p
				class="mr-4  text-shale"
				in:scale={{ delay: 0, duration: 400, start: 0, opacity: 1, easing: quintOut }}
			>
				{about3}
			</p>
		</div>
	</section>
{/if}

<style>
	section {
		color: white;
		border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
		padding: 1em;
		line-height: 1.5em;
		margin-right: 4px;
	}
</style>
