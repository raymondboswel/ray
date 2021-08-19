<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	let animation = undefined;
</script>

<article transition:slide={{ delay: 250, duration: 300, easing: quintOut }}>
	<header class="text-3xl text-center">Indispensable resources</header>

	<section class="p-10 flex">
		<div class="mx-5 md:mx-40 text-xl">
			<ul>
				<li>Motivation</li>
				<li>Time</li>
				<li>Bonus resources: Reddit + Twitter</li>
			</ul>
		</div>
	</section>
</article>

<style>
	ul {
		list-style: inside;
	}
</style>
