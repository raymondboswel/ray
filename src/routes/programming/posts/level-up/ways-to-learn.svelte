<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	let animation = undefined;

</script>

<article transition:slide={{ delay: 250, duration: 300, easing: quintOut }}>
	<header class="text-3xl text-center">Ways to learn</header>

	<section class="p-10 flex">
		<div class="mx-40 text-xl">
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
</article>

<style>
	ul {
		list-style: inside;
	}

  a {
    text-decoration: underline;
  }
</style>
