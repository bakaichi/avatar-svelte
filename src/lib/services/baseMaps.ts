import type { LatLngBounds, ImageOverlay } from "leaflet";

export async function initializeBaseMaps(): Promise<{ [key: string]: ImageOverlay }> {
  const L = await import("leaflet");
  const bounds: LatLngBounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180));

  const terrainImageUrl = "https://i.imgur.com/OZtEVSz.png";
  const satelliteImageUrl = "https://i.imgur.com/oTezX4G.png";
  const waterTribes = "https://i.imgur.com/m2A0G0m.png";
  const airNomads = "https://i.imgur.com/KhWR80B.png";
  const fireNation = "https://i.imgur.com/YHXPYBK.png";
  const earthKingdom = "https://i.imgur.com/kJ0S9Vv.png";

  return {
    "Terrain": L.imageOverlay(terrainImageUrl, bounds),
    "Satellite": L.imageOverlay(satelliteImageUrl, bounds),
    "Water Tribes": L.imageOverlay(waterTribes, bounds),
    "Air Nomads": L.imageOverlay(airNomads, bounds),
    "Fire Nation": L.imageOverlay(fireNation, bounds),
    "Earth Kingdom": L.imageOverlay(earthKingdom, bounds)
  };
}
