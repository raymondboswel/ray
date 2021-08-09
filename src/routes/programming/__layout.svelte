<script>
	import { assets } from '$app/paths';
	import { draw, fly, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { about1, about2, about3 } from '$lib/about.text';
	import Nav from '$lib/components/Nav.svelte';
	import { onMount } from 'svelte';
import { goto } from '$app/navigation';
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
		class="bg-dark-grey flex rounded shadow   h-full "
		in:scale={{ delay: 0, duration: 400, start: 0, opacity: 1, easing: quintOut }}
	>
		<section id="sidebar" class="text-white font-bold bg-marine rounded hidden md:block ">
    <div class="p-4 cursor-pointer" on:click="{() => goto('/programming/projects')}">Projects</div>
      <div class="p-4 cursor-pointer" on:click="{() => goto('/programming/posts')}">Posts</div>
		</section>
		<section class="flex-grow block md:flex md:flex-col justify-start p-4 h-full overflow-y-auto">
      <slot></slot>
    </section>
	</article>
{/if}


<style>
  span {
    min-height: 200px;
    align-items: center;
  }
</style>