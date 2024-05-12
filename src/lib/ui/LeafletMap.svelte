<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  import type { Map as LeafletMap, LatLngBounds, ImageOverlay } from "leaflet";
  import "leaflet/dist/leaflet.css";

  export let id: string = "home-map-id";
  export let height: number = 80; // height in viewport height (vh) units
  export let baseMaps: { [key: string]: ImageOverlay };

  let imap: LeafletMap;
  let initialized: boolean = false;

  afterUpdate(() => {
    if (baseMaps && !initialized) {
      initMap();
    }
  });

  async function initMap() {
    const L = await import("leaflet");
    const bounds: LatLngBounds = L.latLngBounds(
      L.latLng(-90, -180),
      L.latLng(90, 180)
    );

    imap = L.map(id, {
      center: [0, 0],
      zoom: 3.5,
      minZoom: 2,
      maxZoom: 3.5,
    });

    // Explicitly add the "Terrain" layer first if it exists
    if (baseMaps['Terrain']) {
      baseMaps['Terrain'].addTo(imap);
    }

    // Add all base maps to the control
    L.control.layers(baseMaps, {}, { collapsed: false }).addTo(imap);

    imap.setMaxBounds(bounds);

    imap.on('drag', () => {
      imap.panInsideBounds(bounds, { animate: true });
    });

    initialized = true; // Set flag to avoid reinitialization
  }

  export function addMarker(lat: number, lng: number, popupText: string) {
    if (imap) {
      import("leaflet").then((L) => {
        const marker = L.marker([lat, lng]).addTo(imap);
        const popup = L.popup({autoClose: false, closeOnClick: true});
        popup.setContent(popupText);
        marker.bindPopup(popup);
      });
    }
  };

  export function moveTo(lat: number, lng: number) {
    if (imap) {
      imap.flyTo({ lat: lat, lng: lng});
    }
  };
</script>

<div id="{id}" style="height: {height}vh;"></div>
