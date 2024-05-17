<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { contributionService } from "$lib/services/contribution-service";
  import SingleLoreMap from "$lib/ui/SingleLoreMap.svelte";
  import LoreList from "$lib/ui/LoreList.svelte";
  import { get } from "svelte/store";
  import { currentSession, subTitle } from "$lib/stores";
  import { initializeBaseMaps } from "$lib/services/baseMaps";
  import type { Lore } from "$lib/types/contribution-types";
  import type { ImageOverlay } from "leaflet";

  let lore: Lore | null = null;
  let baseMaps: { [key: string]: ImageOverlay } = {};
  let errorMessage = "";

  subTitle.set("Complete Lore Details");

  onMount(async () => {
    try {
      baseMaps = await initializeBaseMaps();
      const params = get(page).params;
      const id = params.id;
      const session = get(currentSession);

      if (session && id) {
        lore = await contributionService.getLoresById(id, session);
        if (!lore) {
          errorMessage = "Lore not found";
        }
      } else {
        errorMessage = "Invalid session or ID";
      }
    } catch (error) {
      console.error(error);
      errorMessage = "An error occurred while loading the maps";
    }
  });

  async function deleteImage(imageUrl: string) {
    if (lore) {
      const session = get(currentSession);
      const success = await contributionService.deleteImage(lore._id, imageUrl, session);
      if (success) {
        lore.images = lore.images.filter(img => img !== imageUrl);
      } else {
        console.error("Failed to delete image");
      }
    }
  }
</script>

<style>
  .container {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
  .maps {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .list {
    flex: 1;
  }
  .images {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .images img {
    max-width: 100px;
    max-height: 100px;
    position: relative;
  }
  .images .image-container {
    position: relative;
  }
  .images .delete-button {
    position: absolute;
    top: 0;
    right: 0;
    background: red;
    color: white;
    border: none;
    cursor: pointer;
  }
</style>

<div class="container">
  {#if lore}
    <div class="maps">
      <SingleLoreMap lore={lore} mapType="Terrain" {baseMaps} />
      <SingleLoreMap lore={lore} mapType="Satellite" {baseMaps} />
      <SingleLoreMap lore={lore} mapType={lore.nation} {baseMaps} />
    </div>
    <div class="list">
      <LoreList contributions={[lore]} />
      <div class="images">
        {#each lore.images as image}
          <div class="image-container">
            <img src={image} alt="User Added images" />
            <button class="delete-button" on:click={() => deleteImage(image)}>X</button>
          </div>
        {/each}
      </div>
    </div>
  {:else if errorMessage}
    <p>{errorMessage}</p>
  {:else}
    <p>Loading...</p>
  {/if}
</div>
