<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { contributionService } from "$lib/services/contribution-service";
  import LoreList from "$lib/ui/LoreList.svelte";
  import Card from "$lib/ui/Card.svelte";
  import type { Lore } from "$lib/types/contribution-types";
  import { get } from "svelte/store";
  import { currentSession, subTitle } from "$lib/stores";

  let lore: Lore | null = null;
  let errorMessage = "";
  subTitle.set("Complete Lore")


  onMount(async () => {
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
  });
</script>

{#if lore}
    <LoreList contributions={[lore]} />
{:else if errorMessage}
  <p>{errorMessage}</p>
{:else}
  <p>Loading...</p>
{/if}
