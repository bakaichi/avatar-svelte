<script lang="ts">
import { contributionService } from "$lib/services/contribution-service";
import Coordinates from "$lib/ui/Coordinates.svelte";
import type { Character, Lore } from "$lib/types/contribution-types";
import { get } from "svelte/store";
import { currentSession, latestContribution } from "$lib/stores";
import { determineNation } from "$lib/services/contribution-utils";


export let characterList: Character[] = [];
  let bookno = 0;
  let selectedCharacter = "";
  let lat = 52.160858;
  let lng = -7.15242;
  let addedLore = "";
  let message = "Contribute, I know you wanna!";
  

  function generateCustomId(nation: string): string {
    const timestamp = Date.now().toString();
    return `${nation}-${timestamp}`;
  };



  async function contribute() {
    if (selectedCharacter && bookno && addedLore) {
      const character = characterList.find((character) => character._id === selectedCharacter);
      if (character) {
        const lore: Lore = {
          bookno: bookno,
          charactersinv: selectedCharacter,
          lat: lat,
          lng: lng,
          lore: addedLore,
          contributor: $currentSession.name,
          nation: determineNation(lat, lng),
          _id: generateCustomId(determineNation(lat, lng)),
        };
        const success = await contributionService.contribute(lore, get(currentSession));
        if (!success) {
          message = "Contribution not completed - some error occurred";
          return;
        }
        latestContribution.set(lore);
        message = `Thanks! You contributed to ${lore.nation}'s lore' ${lore._id} `;
      }
    } else {
      message = "Please select bookno, characters, and add lore.";
    }
  }
</script>

<form on:submit|preventDefault={contribute}>
  <div class="field">
    <label class="label" for="bookno">Enter Book No.:</label>
    <input bind:value={bookno} class="input" type="number" min="1" max="3" placeholder="Enter book number" name="bookno" id="bookno" />
  </div>
  <div class="field">
    <label class="label" for="character">Select Character:</label>
    <div class="select">
      <select bind:value={selectedCharacter}>
        {#each characterList as character}
          <option value={character._id}>{character.name}</option>
        {/each}
      </select>
    </div>
  </div>
  <Coordinates bind:lat={lat} bind:lng={lng} />
  <div class="field">
    <label class="label" for="lore">Enter Lore:</label>
    <input bind:value={addedLore} class="input" type="text" placeholder="Enter lore" name="lore" id="lore" />
  </div>
  <div class="field">
    <div class="control">
      <button class="button is-success is-fullwidth">Contribute!</button>
    </div>
  </div>
</form>

<div class="box mt-4">
  <div class="content has-text-centered">
    {message}
  </div>
</div>