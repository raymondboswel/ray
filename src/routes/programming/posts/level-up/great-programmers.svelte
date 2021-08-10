<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Factory from '$lib/components/Factory.svelte';
	import Rocket from '$lib/components/Rocket.svelte';
	import EnableOthers from '$lib/components/EnableOthers.svelte';
	import Learning from '$lib/components/Learning.svelte';
	let animation = undefined;

	function showFactory() {
		animation = 'factory';
	}

	function showRocket() {
		animation = 'rocket';
	}

	function showEnableOthers() {
		animation = 'enable others';
	}

	function showLearning() {
		animation = 'show learning';
	}
</script>

<article transition:slide={{ delay: 250, duration: 300, easing: quintOut }}>
	<header class="text-3xl text-center">The impact of great programmers</header>

	<section class="p-10">
		<header class="text-2xl">Great programmers:</header>
		<div class="flex justify-around">
			<ul>
				<li on:click={showRocket}>Change the world &lt-- click us</li>
				<li on:click={showFactory}>Create new industries</li>
				<li on:click={showEnableOthers}>Enable others</li>
				<li on:click={showLearning}>Are voracious learners</li>
			</ul>
			<div class="ml-14 bg-white rounded">
				{#if animation == 'factory'}
					<Factory />
				{:else if animation == 'rocket'}
					<Rocket />
				{:else if animation == 'enable others'}
					<EnableOthers />
				{:else if animation == 'show learning'}
					<Learning />
				{/if}
			</div>
		</div>
	</section>
</article>

<style>
	ul {
		list-style: inside;
	}

	li {
		cursor: pointer;
	}
</style>
