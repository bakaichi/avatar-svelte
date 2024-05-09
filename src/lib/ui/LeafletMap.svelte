<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import { onMount } from "svelte";
  import type { Control, Map as LeafletMap, LatLngBounds } from "leaflet";

  export let id = "home-map-id";
  export let height = 80; // height in viewport height (vh) units

  let imap: LeafletMap;
  let control: Control.Layers;

  // Function to add markers to the map
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
    imap.flyTo({ lat: lat, lng: lng});
  };

  onMount(() => {
    if (typeof window !== 'undefined') {
      import("leaflet").then((L) => {
        const leaflet = L.default;

        const imageUrl = "https://i.imgur.com/OZtEVSz.png"; // URL of your custom map image
        const imageBounds: LatLngBounds = leaflet.latLngBounds(
          leaflet.latLng(-90, -180),
          leaflet.latLng(90, 180)
        );

        let imageLayer = leaflet.imageOverlay(imageUrl, imageBounds, {
          opacity: 1,
          interactive: false
        });

        imap = leaflet.map(id, {
          center: [0, 0],
          zoom: 3.5,
          minZoom: 2,
          maxZoom: 3.5,
          maxBounds: imageBounds,
          layers: [imageLayer]
        });

        imap.setMaxBounds(imageBounds);

        imap.on('drag', () => {
          imap.panInsideBounds(imageBounds, { animate: true });
        });

        control = leaflet.control.layers({}, {}).addTo(imap);
      });
    }
  });
</script>

<div id="{id}" class="box" style="height: {height}vh;"></div>
