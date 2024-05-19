<script lang="ts">
  import { onMount } from "svelte";
  import { contributionService } from "$lib/services/contribution-service";
  import type { Lore } from "$lib/types/contribution-types";

  let images: string[] = [];
  let loading: boolean = true;
  let activeIndex: number = 0;

  onMount(async () => {
    try {
      const lores: Lore[] = await contributionService.getAllLores();
      images = lores.flatMap(lore => lore.images).slice(-7); // Get the most recent 5 images
    } catch (error) {
      console.error('Error fetching lores:', error);
    } finally {
      loading = false;
    }
  });

  function setActive(index: number) {
    activeIndex = index;
  }

  function handleKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Enter' || event.key === ' ') {
      setActive(index);
    }
  }
</script>

<style>
  @import url("https://fonts.googleapis.com/css?family=Montserrat:400,400i,700");

  *,
  ::before,
  ::after {
    box-sizing: border-box;
    border-style: solid;
    border-width: 0;
  }
  .options {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    overflow: hidden;
    min-width: 600px;
    max-width: 900px;
    width: calc(100% - 100px);
    height: 400px;
  }

  .option {
    position: relative;
    overflow: hidden;
    min-width: 60px;
    margin: 10px;
    background-size: auto 120%;
    background-position: center;
    cursor: pointer;
    transition: .5s cubic-bezier(0.05, 0.61, 0.41, 0.95);
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .option.active {
    flex-grow: 10000;
    transform: scale(1);
    max-width: 600px;
    margin: 0px;
    border-radius: 40px;
    background-size: auto 100%;
  }

  .option:not(.active) {
    flex-grow: 1;
    border-radius: 30px;
  }

  .option .shadow {
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    height: 120px;
    transition: .5s cubic-bezier(0.05, 0.61, 0.41, 0.95);
  }

  .option .label {
    display: flex;
    position: absolute;
    bottom: 10px;
    left: 10px;
    height: 40px;
    transition: .5s cubic-bezier(0.05, 0.61, 0.41, 0.95);
  }

  .option .label .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 40px;
    max-width: 40px;
    height: 40px;
    border-radius: 100%;
    background-color: white;
  }

  .option .label .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    color: white;
    white-space: pre;
  }

  .option .label .info .main {
    font-weight: bold;
    font-size: 1.2rem;
  }

  .option .label .info .sub {
    transition-delay: .1s;
  }

  .option .icon i {
    font-size: 1.5rem;
    color: #33def4;
  }
</style>

<div class="options">
  {#if loading}
    <p>Loading images...</p>
  {:else if images.length > 0}
    {#each images as image, index}
      <button 
        class="option {index === activeIndex ? 'active' : ''}" 
        style="background-image: url({image});" 
        on:click={() => setActive(index)} 
        on:keydown={(event) => handleKeyDown(event, index)} 
        tabindex="0"
        aria-label="Image {index + 1}"
      >
        <div class="shadow"></div>
        <div class="label">
          <div class="icon">
            <i class="fas fa-sun "></i>
          </div>
          <div class="info">
            <div class="main">Image {index + 1}</div>
            <div class="sub">Description {index + 1}</div>
          </div>
        </div>
      </button>
    {/each}
  {:else}
    <p>No Images</p>
  {/if}
</div>