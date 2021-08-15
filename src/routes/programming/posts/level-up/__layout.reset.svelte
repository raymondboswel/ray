<script>
	import { goto } from '$app/navigation';

	import { currentPage } from '$lib/stores/level-up-navigation.store';

	import { onMount } from 'svelte';

	const navigationMap = {
		2: '/programming/posts/level-up/examples',
		1: '/programming/posts/level-up/great-programmers',
		0: '/programming/posts/level-up'
	};

	onMount(() => {
		currentPage.subscribe((p) => {
			console.log(window.location.pathname);
			if (window.location.pathname !== navigationMap[p]) {
				goto(navigationMap[p]);
			}
		});
		document.addEventListener('keydown', function (event) {
			switch (event.key) {
				case 'ArrowLeft':
					currentPage.update((cur) => {
						if (cur > 0) {
							return cur - 1;
						} else {
							return cur;
						}
					});
					break;
				case 'ArrowRight':
					currentPage.update((cur) => {
						if (cur == Object.keys(navigationMap).length - 1) {
							return cur;
						} else {
							return cur + 1;
						}
					});
					break;
			}
		});
	});
</script>

<article class="bg-ebony text-white h-full p-8">
	<slot />
</article>
