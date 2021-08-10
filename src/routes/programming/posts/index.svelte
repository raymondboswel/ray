<script>
	import { assets } from '$app/paths';
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

<section
	on:click={() => goto('/programming/posts/level-up')}
	class="flex-grow block md:flex md:flex-col justify-start p-4 h-full overflow-y-auto cursor-pointer"
>
	<span class="bg-dark-grey rounded flex flex-col md:flex-row  border p-2 border-shale mb-3">
		<img class="h-full md:w-56 md:mr-2 cursor-pointer" src="{assets}/super-mario.jpg" />
		<aside class="text-white">
			<div class="font-bold text-white text-lg">Leveling up your programming powers</div>
			<p>Some tips and ideas on things to do when starting out as a programmer.</p>
		</aside>
	</span>
</section>
