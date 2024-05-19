<script lang="ts">
    import { onMount } from "svelte";
    import type { Lore } from "$lib/types/contribution-types";
    import type { ImageOverlay, Map as LeafletMap } from "leaflet";
    import L from "leaflet";
    import { contributionService } from "$lib/services/contribution-service";
    import { get } from "svelte/store";
    import { currentSession } from "$lib/stores";
  
    export let lore: Lore;
    export let mapType: string;
    export let baseMaps: { [key: string]: ImageOverlay };
  
    let mapId: string = `map-${Math.random().toString(36).substring(2)}`;
    let map: LeafletMap;
  
    onMount(async () => {
      const bounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180));
      
      map = L.map(mapId, {
        center: [lore.lat, lore.lng],
        zoom: 3.5,
        layers: [baseMaps[mapType]],
        zoomControl: true,
        doubleClickZoom: false,
        scrollWheelZoom: true,
        dragging: true,
      });
  
      map.setMaxBounds(bounds);
  
      if (mapType === 'Terrain' || mapType === 'Satellite') {
        // Load all markers for Terrain and Satellite layers
        const session = get(currentSession);
        const contributions = await contributionService.getLores(session);
        
        contributions.forEach(contribution => {
          const marker = L.marker([contribution.lat, contribution.lng]).addTo(map);
          const popup = L.popup().setContent(`
            <strong>Location:</strong> ${contribution.lore}
            <br> <a href="/maps/${contribution._id}">Click for details</a>
          `);
          marker.bindPopup(popup);
        });
      } else {
        // Load only the specific marker for the nation specific layer
        const marker = L.marker([lore.lat, lore.lng]).addTo(map);
        const popup = L.popup().setContent(`
          <strong>Location:</strong> ${lore.lore}
        `);
        marker.bindPopup(popup);
      }
    });
  </script>
  
  <style>
    .leaflet-container {
      height: 45vh; 
      width: 50vh; 
    }
  </style>
  
  <div id="{mapId}" class="leaflet-container"></div>
  