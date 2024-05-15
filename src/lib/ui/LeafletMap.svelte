<script lang="ts">
  import { afterUpdate } from "svelte";
  import type { Map as LeafletMap, LatLngBounds, ImageOverlay } from "leaflet";
  import "leaflet/dist/leaflet.css";
  import { contributionService } from "$lib/services/contribution-service";
  import type { Lore } from "$lib/types/contribution-types";
  import { get } from "svelte/store";
  import { currentSession } from "$lib/stores";
  import L from "leaflet";

  export let id: string = "home-map-id";
  export let height: number = 80; // vh
  export let baseMaps: { [key: string]: ImageOverlay };

  let imap: LeafletMap;
  let initialized: boolean = false;
  let allMarkers: any[] = [];

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

    if (baseMaps['Terrain']) {
      baseMaps['Terrain'].addTo(imap);
    }

    L.control.layers(baseMaps, {}, { collapsed: false }).addTo(imap);
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
      if (layer instanceof L.Marker) {
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

  function addMarker(lat: number, lng: number, popupText: string, id: string) {
    if (imap) {
      import("leaflet").then((L) => {
        const marker = L.marker([lat, lng]).addTo(imap);
        const popup = L.popup({ autoClose: false, closeOnClick: true });
        popup.setContent(`${popupText}<br> <a href="/maps/${id}">Click for details</a>`);
        marker.bindPopup(popup);
      });
    }
  }

  export function moveTo(lat: number, lng: number) {
    if (imap) {
      imap.flyTo({ lat: lat, lng: lng });
    }
  }
</script>

<div id="{id}" style="height: {height}vh;"></div>