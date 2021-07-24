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
		setTimeout(() => (show = true), 500);
		setTimeout(() => (show1 = true), 1000);
		setTimeout(() => {
			showHi = true;
			setTimeout(() => {
				showHi = false;
				setTimeout(() => {
					showText = true;
				}, 500);
			}, 1000);
		}, 300);
	});
</script>

<section class="h-full p-3 bg-dark-grey">
	<header class="text-shale text-xl font-bold">Welcome to my home on the web.</header>
	<p>
		It's still very much under construction, but in a nutshell:
		<br /> I'm going to gradually deploy and expose some of the toy projects I've done in the
		programming section. <br />The about and interests section will contain more personal stuff.
		<br />I hope you enjoy your stay!
	</p>
</section>

<style>
	.menu-item {
		border: solid 3px #46a29f;
	}

	section {
		color: white;
		border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
		padding: 1em;
		line-height: 1.5em;
		margin-right: 4px;
	}

	path {
		stroke: black;
		fill: white;
	}
</style>
