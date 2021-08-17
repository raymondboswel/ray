<script>
	import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { assets } from '$app/paths';
  import { fade } from 'svelte/transition';
import { onMount } from 'svelte';
  
  let showFeet = false;

  onMount(() => {
    setTimeout(() => {
      showFeet = true;

    }, 500)

    setTimeout(() => {
      showFeet = false;
    }, 4000);
  })

</script>

<article transition:slide={{ delay: 250, duration: 300, easing: quintOut }}>
	<header class="text-3xl text-center">Ways to learn</header>

	<section class="p-10 flex">
		<div class="mx-4 md:mx-40 text-xl">
			<ul>
        <li>Online Courses
          <ul class="ml-8 ">
            <li><a target="_blank" href="https://ocw.mit.edu/">MIT Open Course Ware</a> 
            </li>
            <li>Coursera</li>
            <li>Udemy</li>
            <li>Udacity</li>
          </ul>
        </li>
        <li><a href="https://projecteuler.net">Project Euler</a></li>
        <li><a href="http://rosalind.info/">Rosalind - Bioinformatics</a></li>
        <li>Personal blog - Creating it, but also writing about what you learn</li>
        <li>Toy projects</li>
        <li><a href="https://github.com/EbookFoundation/free-programming-books">Books</a></li>
			</ul>
		</div>
  </section>
  {#if showFeet}
  <img transition:fade="{{delay: 1500, duration: 600}}" class="foot1" src="{assets}/foot.svg" alt="">
  <img transition:fade="{{delay: 500, duration: 600}}" class="foot2" src="{assets}/foot.svg" alt="">
 <img transition:fade="{{delay: 2500, duration: 600}}" class="foot3" src="{assets}/foot.svg" alt="">
 <img transition:fade="{{delay: 3500, duration: 600}}" class="foot4" src="{assets}/foot.svg" alt=""> 
 {/if}
</article>

<style>

  .foot1 {
    transform: rotate(20deg);
  }

  .foot2 {
    transform: scaleX(-1) rotate(-40deg);
    
  }

  .foot3 {
    position: absolute;
    top: 20%;
    left: 30%;
    transform: scaleX(-1) rotate(-40deg) 
  }

  .foot4 {
    position: absolute;
    top: -10%;
    left: 20%;
    transform: rotate(20deg) 
  }
	ul {
		list-style: inside;
	}

  a {
    text-decoration: underline;
  }
</style>
