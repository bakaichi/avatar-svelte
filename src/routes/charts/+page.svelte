<script lang="ts">
    // @ts-ignore
    import Chart from "svelte-frappe-charts";
    import { onMount } from "svelte";
    import { contributionService } from "$lib/services/contribution-service";
    import { currentSession, subTitle } from "$lib/stores";
    import { get } from "svelte/store";
    import Card from "$lib/ui/Card.svelte";
    import type { DataSet } from "$lib/types/contribution-types";
    import { generateByBook } from "$lib/services/contribution-utils";


    let totalByBook: DataSet;

    subTitle.set("Contributions Data");

    onMount(async () => {
    const contributionList = await contributionService.getLores(get(currentSession));    
    const characters = await contributionService.getCharacters(get(currentSession));

    totalByBook = generateByBook(contributionList);
  });
</script>

  <div class="columns">
    <div class="column box has-text-centered">
      <h1 class="title is-4">Contributions by Book Number</h1>
      <Chart data={totalByBook} type="bar" />
    </div>
    <div class="column has-text-centered">
      <img alt="Sokka" src="/sokka.png" width="500" />
    </div>
  </div>
  