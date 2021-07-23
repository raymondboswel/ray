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

{#if show}
	<!-- <section class="flex justify-end ml-20 mr-10 mt-8">
        <div class="flex-grow flex flex-col ">
            {#if showText}
              <p class="mr-4 text-shale" transition:scale="{{delay: 0, duration: 400, start: 0, opacity: 1, easing: quintOut}}">
                {about1}
              </p>

              <p class="mr-4 my-2  text-shale" transition:scale="{{delay: 800, duration: 400, start: 0, opacity: 1, easing: quintOut}}">
                {about2}
              </p>              
              <p class="mr-4  text-shale" transition:scale="{{delay: 800, duration: 400, start: 0, opacity: 1, easing: quintOut}}">
                {about3}
              </p>   
            {/if}
        </div>
    </section> -->
{/if}

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
