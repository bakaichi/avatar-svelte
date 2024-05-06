<script lang="ts">

import Coordinates from "$lib/ui/Coordinates.svelte";

  const characerList = [
    {
      name: "Zuko"
    },
    {
      name: "Aang"
    },
    {
      name: "Katara"
    },
  ];

  let selectedCharacter = "Aang";
  let lat = 52.160858;
  let lng = -7.15242;

  async function contribute() {
    console.log(`Just contributed: ${selectedCharacter}'s lore`);
    console.log(`lat: ${lat}, lng: ${lng}`);
  }
</script>

<form on:submit|preventDefault={contribute}>
  <div class="field">
    <label class="label" for="bookno">Enter Book No.:</label>
    <input class="input" type="number" min="1" max="3" placeholder="Enter book number" name="bookno">  </div>
  <div class="field">
    <label class="label" for="character">Select Characters:</label>
    <div class="select">
      <select bind:value={selectedCharacter}>
        {#each characerList as character}
          <option>{character.name}</option>
        {/each}
      </select>
    </div>
    <div class="field">
      <label for="coordinates" class="label">Enter Coordinates</label>
      <Coordinates bind:lat bind:lng />
    </div>
    <div class="field">
      <label class="label" for="lore">Enter Lore:</label>
      <input class="input" type="text" placeholder="Enter lore" name="lore">
    </div>
  </div>
  <div class="field">
    <div class="control">
      <button class="button is-success is-fullwidth">Contribute!</button>
    </div>
  </div>
</form>

