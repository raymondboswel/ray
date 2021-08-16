<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	let animation = undefined;

</script>

<article transition:slide={{ delay: 250, duration: 300, easing: quintOut }}>
	<header class="text-3xl text-center">Meta learning - learning how to learn</header>

	<section class="p-10 flex">
		<div class="mx-40 text-xl">
			<ul>
				<li ><a class="underline" href="https://www.coursera.org/learn/learning-how-to-learn" target="_blank">Coursera - Learning how to learn</a></li>
				<li ><a class="underline" href="https://www.scotthyoung.com/blog/ultralearning/" target="_blank">Ultralearning</a></li>
			</ul>
		</div>
  </section>
  <section class="p-10">
    <header class="text-center text-2xl">Executive summary</header>
		<div class="mx-40 text-xl">
			<ul>
        <li>Pick a direction / field of study</li>
        <li>Map out the areas to be mastered</li>
        <li>Find good sources of info</li>
        <li>Set a schedule</li>
        <li>Be consistent</li>
        <li>Get a study group</li>
        <li>Find a mentor</li>
        <li>Break topics into chunks</li>
        <li>Spaced repetition</li>
        <li>Commit to one thing</li>
        <li>Keep a list of things to learn at a later stage (to keep you focused on what you're  studying now) </li>
			</ul>
		</div>
  </section>
</article>

<style>
	ul {
		list-style: inside;
	}
</style>
