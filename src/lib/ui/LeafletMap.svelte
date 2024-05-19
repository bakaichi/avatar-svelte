<script lang="ts">
  import { onMount } from "svelte";
  import type { Map as LeafletMap, LatLngBounds, ImageOverlay } from "leaflet";
  import "leaflet/dist/leaflet.css";
  import { contributionService } from "$lib/services/contribution-service";
  import type { Lore } from "$lib/types/contribution-types";
  import { get } from "svelte/store";
  import { currentSession } from "$lib/stores";

  export let id: string = "home-map-id";
  export let height: number = 80; // vh
  export let baseMaps: { [key: string]: ImageOverlay };

  let imap: LeafletMap;
  let initialized: boolean = false;
  let allMarkers: any[] = [];
  let leaflet: typeof import('leaflet');

  onMount(() => {
    // ensuring that the code runs only on the client side
    if (typeof window !== 'undefined' && baseMaps) {
      initMap();
    }
  });

  async function initMap() {
    leaflet = await import("leaflet");
    const bounds: LatLngBounds = leaflet.latLngBounds(
      leaflet.latLng(-90, -180),
      leaflet.latLng(90, 180)
    );

    imap = leaflet.map(id, {
      center: [0, 0],
      zoom: 3.5,
      minZoom: 2,
      maxZoom: 3.5,
    });

    if (baseMaps['Terrain']) {
      baseMaps['Terrain'].addTo(imap);
    }

    leaflet.control.layers(baseMaps, {}, { collapsed: false }).addTo(imap);
    imap.setMaxBounds(bounds);

    imap.on('drag', () => {
      imap.panInsideBounds(bounds, { animate: true });
    });

    imap.on('baselayerchange', (e) => {
      updateMarkers(e.name);
    });

    await loadMarkers();
    initialized = true;
  }

  async function loadMarkers() {
    const contributions: Lore[] = await contributionService.getLores(get(currentSession));
    allMarkers = contributions.map((contribution: Lore) => ({
      lat: contribution.lat,
      lng: contribution.lng,
      popup: `Characters: ${contribution.charactersinv}, <br> Book no.: ${contribution.bookno}`,
      nation: contribution.nation,
      id: contribution._id,
    }));
    updateMarkers('Terrain');
  }

  function updateMarkers(layerName: string) {
    imap.eachLayer((layer) => {
      if (layer instanceof leaflet.Marker) {
        imap.removeLayer(layer);
      }
    });

    allMarkers.forEach(marker => {
      if (shouldDisplayMarker(marker.nation, layerName)) {
        addMarker(marker.lat, marker.lng, marker.popup, marker.id);
      }
    });
  }

  function shouldDisplayMarker(nation: string, layerName: string): boolean {
    if (layerName === 'Terrain' || layerName === 'Satellite') {
      return true;
    }
    return nation === layerName;
  }

  export function addMarker(lat: number, lng: number, popupText: string, id: string) {
    if (imap) {
      leaflet.marker([lat, lng]).addTo(imap)
        .bindPopup(`${popupText}<br> <a href="/maps/${id}">Click for details</a>`);
    }
  }

  export function moveTo(lat: number, lng: number) {
    if (imap) {
      imap.flyTo({ lat: lat, lng: lng });
    }
  }
</script>

<div id="{id}" style="height: {height}vh;"></div>