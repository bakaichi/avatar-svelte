<script lang="ts">
  import { currentSession, subTitle, latestContribution } from "$lib/stores";
  import LoreForm from "./Loreform.svelte";
  import Card from "$lib/ui/Card.svelte";
  import { contributionService } from "$lib/services/contribution-service";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import type { Character, Lore } from "$lib/types/contribution-types";
  import ContributionList from "$lib/ui/ContributionList.svelte";

  let characterList: Character[] = [];
  let contributions: Lore [] = [];

  subTitle.set("Add Lore Here");

  onMount(async () => {
    characterList = await contributionService.getCharacters(get(currentSession));
    contributions = await contributionService.getLores(get(currentSession))
  });

  latestContribution.subscribe(async (lore) => {
    if (lore) {
      contributions.push(lore);
      contributions = [...contributions]
    }
  });
</script>

<div class="columns">
  <div class="column">
    <Card title="Donatinons to Date">
      <ContributionList {contributions} />
    </Card>
  </div>
  <div class="column">
    <Card title="Please Donate">
      <LoreForm {characterList} />
    </Card>
  </div>
</div>
