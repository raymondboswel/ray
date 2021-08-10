<script>
	import { draw, fly, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { goto } from '$app/navigation';
	import { getStores, navigating, page, session } from '$app/stores';

	page.subscribe((p) => {
		console.log(p.path);
	});
</script>

<span
	on:click={() => goto('/about')}
	in:fly={{ delay: 500, duration: 400, x: 500, y: 0, opacity: 1, easing: quintOut }}
	class=" menu-item mb-2 hover:bg-dark-grey {$page.path == '/about' ? 'bg-dark-grey' : 'bg-marine'}"
>
	About
</span>
<span
	on:click={() => goto('/programming/projects')}
	in:fly={{ delay: 600, duration: 400, x: 500, y: 0, opacity: 1, easing: quintOut }}
	class="menu-item mb-2 hover:bg-dark-grey {$page.path == '/programming'
		? 'bg-dark-grey'
		: 'bg-marine'}"
>
	Programming
</span>
<span
	on:click={() => goto('/interests')}
	in:fly={{ delay: 700, duration: 400, x: 500, y: 0, opacity: 1, easing: quintOut }}
	class="menu-item mb-2 hover:bg-dark-grey {$page.path.includes('/interests')
		? 'bg-dark-grey'
		: 'bg-marine'}"
>
	Interests
</span>

<style>
	.menu-item {
		border: solid 3px #46a29f;
	}

	p {
		color: white;
	}

	span {
		cursor: pointer;
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
