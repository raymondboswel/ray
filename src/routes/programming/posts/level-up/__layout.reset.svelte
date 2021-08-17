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

	let touchstartX = 0;
	let touchstartY = 0;
	let touchendX = 0;
	let touchendY = 0;

	let gestureZone;

	function handleGesture() {
		if (touchendX <= touchstartX) {
			console.log('Swiped left');

			nextPage();
		}

		if (touchendX >= touchstartX) {
			console.log('Swiped right');
			prevPage();
		}

		if (touchendY <= touchstartY) {
			console.log('Swiped up');
		}

		if (touchendY >= touchstartY) {
			console.log('Swiped down');
		}

		if (touchendY === touchstartY) {
			console.log('Tap');
		}
	}

	function prevPage() {
		currentPage.update((cur) => {
					if (cur > 0) {
						return cur - 1;
					} else {
						return cur;
					}
				});
	}

	function nextPage() {

		currentPage.update((cur) => {
			if (cur == Object.keys(navigationMap).length - 1) {
				return cur;
			} else {
				console.log('current', cur);
				return cur + 1;
			}
		});
	}

	function handleKeyDown(event) {
		switch (event.key) {
			case 'ArrowLeft':
				prevPage();
				break;
			case 'ArrowRight':
				nextPage()
				break;
		}
	}

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
			document.removeEventListener('keydown', handleKeyDown);
			gestureZone.removeEventListener(
				'touchstart',
				function (event) {
					touchstartX = event.changedTouches[0].screenX;
					touchstartY = event.changedTouches[0].screenY;
				},
				false
			);

			gestureZone.removeEventListener(
				'touchend',
				function (event) {
					touchendX = event.changedTouches[0].screenX;
					touchendY = event.changedTouches[0].screenY;
					handleGesture();
				},
				false
			);
		}
	});

	onMount(() => {
		unsubscribe = currentPage.subscribe((p) => {
			console.log(p);
			console.log(window.location.pathname);
			if (window.location.pathname !== navigationMap[p]) {
				goto(navigationMap[p]);
			}
		});
		document.addEventListener('keydown', handleKeyDown);

		gestureZone = document.getElementById('gestureZone');

		gestureZone.addEventListener(
			'touchstart',
			function (event) {
				touchstartX = event.changedTouches[0].screenX;
				touchstartY = event.changedTouches[0].screenY;
			},
			false
		);

		gestureZone.addEventListener(
			'touchend',
			function (event) {
				touchendX = event.changedTouches[0].screenX;
				touchendY = event.changedTouches[0].screenY;
				handleGesture();
			},
			false
		);
	});
</script>

<article class="bg-ebony text-white h-full p-8" id="gestureZone">
	<slot />
</article>
