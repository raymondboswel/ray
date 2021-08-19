<script>
	import { slide, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	let animation = undefined;
	let showJoe = false;
	let showSam = false;
	let showRich = false;
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
	<section class="flex justify-center">
		<span
			on:click={() => (showJoe = true)}
			class="inline-block text-3xl transform rotate-90 cursor-pointer">-&gt</span
		>
	</section>
	{#if showJoe}
		<section transition:fly="{{delay: 250, duration: 300, x: 500, y: 0, opacity: 0.5, easing: quintOut}}" class="p-10 flex \">
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
		<section transition:fly="{{delay: 600, duration: 600, x: 0, y: -500, opacity: 0.5, easing: quintOut}}" class="flex justify-center">
		<span on:click="{() => {showSam = true}}" class="inline-block text-3xl transform rotate-90 cursor-pointer">-&gt</span>
		</section>
	{/if}
	{#if showSam}
		<section transition:fly="{{delay: 250, duration: 300, x: 500, y: 0, opacity: 0.5, easing: quintOut}}" class="p-10 flex">
			<header class="text-2xl w-1/3">Sam Learner:</header>
			<div class="">
				<ul>
					<li>Makes cool graphics at the New York Times</li>
					<li>
						<a
							class="underline "
							href="https://github.com/sdl60660/pittsburgh-steps"
							target="_blank">Pittburgh steps</a
						>
					</li>
				</ul>
			</div>
		</section>
		<section transition:fly="{{delay: 600, duration: 600, x: 0, y: -500, opacity: 0.5, easing: quintOut}}" class="flex justify-center">
		<span on:click="{() => showRich = true}" class="inline-block text-3xl transform rotate-90 cursor-pointer">-&gt</span>
		</section>
	{/if}
	{#if showRich}
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
	{/if}
</article>

<style>
	ul {
		list-style: inside;
	}
</style>
