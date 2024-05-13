<script lang="ts">
  import { contributionService } from "$lib/services/contribution-service";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { onMount } from "svelte";
  import type { Lore } from "$lib/types/contribution-types";
  import { get } from "svelte/store";
  import { subTitle, currentSession } from "$lib/stores";
  import type { ImageOverlay } from "leaflet";

  subTitle.set("View Lore Map")
  let map: LeafletMap;

  let baseMaps: { [key: string]: ImageOverlay };

  onMount(async () => {
    const L = await import("leaflet");
    const terrainImageUrl = "https://i.imgur.com/OZtEVSz.png";
    const satelliteImageUrl = "https://i.imgur.com/oTezX4G.png";
  
    const waterTribes = "https://i.imgur.com/m2A0G0m.png";
    const airNomads = "https://i.imgur.com/KhWR80B.png";
    const fireNation = "https://i.imgur.com/YHXPYBK.png"
    const earthKingdom = "https://i.imgur.com/kJ0S9Vv.png"
    
    const bounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180));

    baseMaps = {
      "Terrain": L.imageOverlay(terrainImageUrl, bounds),
      "Satellite": L.imageOverlay(satelliteImageUrl, bounds),
      "Water Tribes" : L.imageOverlay(waterTribes, bounds),
      "Air Nomads" : L.imageOverlay(airNomads, bounds),
      "Fire Nation" : L.imageOverlay(fireNation, bounds),
      "Earth Kingdom" : L.imageOverlay(earthKingdom, bounds)
    };

    const contributions = await contributionService.getLores(get(currentSession));
    contributions.forEach((contribution: Lore) => {
      if (typeof contribution.lore == "string") {
        const popup = `Characters: ${contribution.charactersinv}, \n Lore: ${contribution.lore}`;
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