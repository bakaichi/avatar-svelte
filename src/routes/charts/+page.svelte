<script lang="ts">
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import { onMount } from "svelte";
  import { contributionService } from "$lib/services/contribution-service";
  import { currentSession, subTitle } from "$lib/stores";
  import { get } from "svelte/store";
  import type { DataSet } from "$lib/types/contribution-types";
  import { generateByBook, generateByNation, generateOverTime, generateByCharacter } from "$lib/services/contribution-utils";

  let totalByBook: DataSet;
  let totalByNation: DataSet;
  let totalOverTime: DataSet;
  let totalByCharacter: DataSet;

  subTitle.set("Contributions Data");

  onMount(async () => {
      const contributionList = await contributionService.getLores(get(currentSession));
      totalByBook = generateByBook(contributionList);
      totalByNation = generateByNation(contributionList);
      totalOverTime = generateOverTime(contributionList);
      totalByCharacter = generateByCharacter(contributionList);
  });
</script>

<div class="columns">
  <div class="column is-two-thirds">
    <div class="columns is-multiline">
      <div class="column is-half box has-text-centered">
          <h1 class="title is-4">Contributions by Book Number</h1>
          <Chart data={totalByBook} type="bar" />
      </div>
      <div class="column is-half box has-text-centered">
          <h1 class="title is-4">Distribution by Nation</h1>
          <Chart data={totalByNation} type="pie" maxSlices="4" />
      </div>
      <div class="column is-half box has-text-centered">
          <h1 class="title is-4">Contributions Over Time</h1>
          <Chart data={totalOverTime} type="line" />
      </div>
      <div class="column is-half box has-text-centered">
          <h1 class="title is-4">Contributions per Character</h1>
          <Chart data={totalByCharacter} type="donut" maxSlices="4" />
      </div>
    </div>
  </div>
  <div class="column is-one-third has-text-centered">
    <img alt="Sokka" src="/sokka.png" class="sokka-image" id="sokka" />
  </div>
</div>

<style>
  .sokka-image {
    width: 100%;
    max-width: auto;
    height: auto;
    margin: 0 auto;
  }

  .has-text-centered {
    text-align: center;
  }
</style>
