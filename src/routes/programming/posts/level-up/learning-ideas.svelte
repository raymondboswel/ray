<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	let animation = undefined;

</script>

<article transition:slide={{ delay: 250, duration: 300, easing: quintOut }}>
	<header class="text-3xl text-center">Learning Ideas</header>

	<section class="p-10 flex">
		<div class="mx-40 text-xl">
			<ul>
        <li>Things to help you kick ass at work</li>
        <li>Satisfy your curiosity</li>
        <li>Fundamentals - Data structures, algorithms</li>
        <li>New languages and frameworks</li>
        <li>Related areas - Design, DevOps, Business</li>
			</ul>
		</div>
  </section>

</article>

<style>
	ul {
		list-style: inside;
	}
</style>
