<script lang="ts">
  import { contributionService } from "$lib/services/contribution-service";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { onMount } from "svelte";
  import type { Lore } from "$lib/types/contribution-types";
  import { get } from "svelte/store";
  import { subTitle, currentSession } from "$lib/stores";
  import { initializeBaseMaps } from "$lib/services/baseMaps";
  import type { ImageOverlay } from "leaflet";

  subTitle.set("View Lore Map");
  let map: LeafletMap;
  let baseMaps: { [key: string]: ImageOverlay };

  onMount(async () => {
    baseMaps = await initializeBaseMaps();

    const contributions = await contributionService.getLores(get(currentSession));
    contributions.forEach((contribution: Lore) => {
      if (typeof contribution.lore == "string") {
        const popup = `Characters: ${contribution.charactersinv} <br>`;
        map.addMarker(contribution.lat, contribution.lng, popup);
      }
    });
    const lastContribution = contributions[contributions.length -1];
    if (lastContribution) map.moveTo(lastContribution.lat, lastContribution.lng);
  });
</script>

<Card title="Lore Locations">
  <LeafletMap bind:this={map} height={70} baseMaps={baseMaps} />
</Card>
