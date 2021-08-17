<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	let animation = undefined;
</script>

<article transition:slide={{ delay: 250, duration: 300, easing: quintOut }}>
	<header class="text-3xl text-center">Some great programmers</header>

	<section class="p-10 flex">
		<header class="text-2xl w-1/3">Jose Valim:</header>
		<div class="">
			<ul>
				<li>Rails core team member</li>
				<li>Creator of Elixir</li>
				<li>Phoenix core team member</li>
				<li>Ecto core team member</li>
				<li>Main contributor to Nx - Numerical Extensions for Elixir (ML/AI)</li>
				<li>Regular conference speaker</li>
			</ul>
		</div>
	</section>
	<section class="p-10 flex \">
		<header class="text-2xl w-1/3">Joe Armstrong:</header>
		<div class="">
			<ul>
				<li>Co-creator of Erlang</li>
				<li>Erlang is used by Ericsson to route about half the world's cellphone traffic</li>
				<li>Author</li>
				<li>Regular presenter at conferences</li>
			</ul>
		</div>
	</section>
	<section class="p-10 flex">
		<header class="text-2xl w-1/3">Sam Learner:</header>
		<div class="">
			<ul>
				<li>Makes cool graphics at the New York Times</li>
				<li>
					<a class="underline " href="https://github.com/sdl60660/pittsburgh-steps" target="_blank"
						>Pittburgh steps</a
					>
				</li>
			</ul>
		</div>
	</section>
	<section class="p-10 flex">
		<header class="text-2xl w-1/3">Rich Harris:</header>
		<div class="">
			<ul>
				<li>Makes cool graphics at the New York Times</li>
				<li>Creator of Rollup</li>
				<li>
					Creator of <a class="underline" href="https://svelte.dev" target="_blank">Svelte</a>
				</li>
			</ul>
		</div>
	</section>
</article>

<style>
	ul {
		list-style: inside;
	}
</style>
