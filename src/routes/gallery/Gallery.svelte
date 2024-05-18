<script lang="ts">
  import { onMount } from "svelte";
  import ImageSlider from "$lib/ui/ImageSlider.svelte";
  import { contributionService } from "$lib/services/contribution-service";
  import type { Lore } from "$lib/types/contribution-types";

  let images: string[] = [];
  let loading: boolean = true;

  onMount(async () => {
    const lores: Lore[] = await contributionService.getAllLores();
    images = lores.flatMap(lore => lore.images);
    loading = false;
  });
</script>

<style>
  .gallery-container {
    padding: 2rem;
  }
</style>

<div class="gallery-container">
  {#if loading}
    <p>Loading images...</p>
  {:else if images.length > 0}
    <ImageSlider {images} />
  {:else}
    <p>No Images</p>
  {/if}
</div>
