<script>
	import { goto } from '$app/navigation';

	import { currentPage } from '$lib/stores/level-up-navigation.store';

	import { onDestroy, onMount } from 'svelte';

	const navigationMap = {
		5: '/programming/posts/level-up/ways-to-learn',
		4: '/programming/posts/level-up/learning-ideas',
		3: '/programming/posts/level-up/meta-learning',
		2: '/programming/posts/level-up/examples',
		1: '/programming/posts/level-up/great-programmers',
		0: '/programming/posts/level-up'
	};

	let unsubscribe;

	function handleKeyDown(event) {
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
							console.log('current',cur);
							return cur + 1;
						}
					});
					break;
			}
	}

	onDestroy(() => {
		if(unsubscribe) {
			unsubscribe();	
			document.removeEventListener('keydown', handleKeyDown)
		} 
	})

	onMount(() => {
		unsubscribe = currentPage.subscribe((p) => {
			console.log(p);
			console.log(window.location.pathname);
			if (window.location.pathname !== navigationMap[p]) {
				goto(navigationMap[p]);
			}
		});
		document.addEventListener('keydown', handleKeyDown);
	});
</script>

<article class="bg-ebony text-white h-full p-8">
	<slot />
</article>
