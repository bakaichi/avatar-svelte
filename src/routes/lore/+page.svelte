<script lang="ts">
  import { currentSession, subTitle } from "$lib/stores";
  import LoreForm from "./Loreform.svelte";
  import Card from "$lib/ui/Card.svelte";
  import { contributionService } from "$lib/services/contribution-service";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import type { Character } from "$lib/types/contribution-types";

  let characterList: Character[] = [];

  subTitle.set("Add Lore Here");

  onMount(async () => {
    characterList = await contributionService.getCharacters(get(currentSession));
  });
</script>

<Card title="Please Contribute">
  <LoreForm {characterList} />
</Card>
