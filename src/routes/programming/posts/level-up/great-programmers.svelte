<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
import Factory from '$lib/components/Factory.svelte';
  let factory = false;

  function showFactory() {
    factory = true;
  }
</script>

<article transition:slide="{{delay: 250, duration: 300, easing: quintOut }}">
  <header class="text-3xl text-center">The impact of great programmers</header>

  <section class="p-10">
    <header class="text-2xl">Great programmers:</header> 
    <div class="flex justify-around">
      <ul>
        <li>Change the world</li>
      <li on:click="{showFactory}">Create new industries</li>
        <li>Enable others</li>
        <li>Are voracious learners</li>
      </ul>
      <div class="ml-14 bg-white rounded">
        {#if factory}
        <Factory></Factory>
        {/if}
      </div>
    </div>
  </section>
</article>

<style>
  ul {
    list-style: inside;
  }

  li {
    cursor: pointer;
  }
</style>