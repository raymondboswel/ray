<script>
	import { draw, fly, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { goto } from '$app/navigation';
</script>

<span
	on:click={() => goto('/about')}
	transition:fly={{ delay: 500, duration: 400, x: 500, y: 0, opacity: 1, easing: quintOut }}
	class=" menu-item mb-2 hover:bg-dark-grey"
>
	About
</span>
<span
	transition:fly={{ delay: 600, duration: 400, x: 500, y: 0, opacity: 1, easing: quintOut }}
	class="menu-item mb-2 hover:bg-dark-grey"
>
	Programming
</span>
<span
	transition:fly={{ delay: 700, duration: 400, x: 500, y: 0, opacity: 1, easing: quintOut }}
	class="menu-item mb-2 hover:bg-dark-grey"
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
		background: #46a29f;
		margin-right: 4px;
	}

	path {
		stroke: black;
		fill: white;
	}
</style>
