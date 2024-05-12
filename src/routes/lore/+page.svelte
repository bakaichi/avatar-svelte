<script lang="ts">
    // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import { currentSession, subTitle, latestContribution } from "$lib/stores";
  import LoreForm from "./Loreform.svelte";
  import Card from "$lib/ui/Card.svelte";
  import { contributionService } from "$lib/services/contribution-service";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import type { Character, DataSet, Lore } from "$lib/types/contribution-types";
  import ContributionList from "$lib/ui/ContributionList.svelte";
  import { generateByBook } from "$lib/services/contribution-utils";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";

  let characterList: Character[] = [];
  let contributions: Lore [] = [];
  let totalByBook: DataSet;
  let map: LeafletMap;


  subTitle.set("Add Lore Here");

  onMount(async () => {
    characterList = await contributionService.getCharacters(get(currentSession));
    contributions = await contributionService.getLores(get(currentSession));
    totalByBook = generateByBook(contributions);
  });

  latestContribution.subscribe(async (lore) => {
    if (lore) {
      contributions.push(lore);
      contributions = [...contributions];
      totalByBook = generateByBook(contributions);
    }
    if (typeof lore.bookno !== "string") {
      const popup = `${lore.bookno}`;
      map.addMarker(lore.lat, lore.lng, popup);
      map.moveTo(lore.lat, lore.lng);
    }
  });
</script>

<div class="columns">
  <div class="column">
    <Card title="Contributions by Book to Date">
      <Chart data={totalByBook} type="bar"/>
    </Card>
  </div>
  <div class="column">
    <Card title="Please Donate">
      <LoreForm {characterList} />
    </Card>
  </div>
</div>
