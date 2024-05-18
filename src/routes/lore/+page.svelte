<script lang="ts">
  import * as echarts from 'echarts';
  import { currentSession, subTitle, latestContribution } from "$lib/stores";
  import LoreForm from "./Loreform.svelte";
  import Card from "$lib/ui/Card.svelte";
  import { contributionService } from "$lib/services/contribution-service";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import type { Character, DataSet, Lore } from "$lib/types/contribution-types";
  import { generateByBook } from "$lib/services/contribution-utils";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";

  let characterList: Character[] = [];
  let contributions: Lore[] = [];
  let totalByBook: DataSet;
  let map: LeafletMap;

  subTitle.set("Add Lore Here");

  onMount(async () => {
    characterList = await contributionService.getCharacters(get(currentSession));
    contributions = await contributionService.getLores(get(currentSession));
    totalByBook = generateByBook(contributions);
    renderChart('chartByBook', totalByBook, 'bar');
  });

  latestContribution.subscribe(async (lore) => {
    if (lore) {
      contributions.push(lore);
      contributions = [...contributions];
      totalByBook = generateByBook(contributions);
      renderChart('chartByBook', totalByBook, 'bar');
    }
    if (typeof lore.bookno !== "string") {
      const popup = `${lore.bookno}`;
      map.addMarker(lore.lat, lore.lng, popup);
      map.moveTo(lore.lat, lore.lng);
    }
  });

  function renderChart(containerId: string, data: DataSet, type: 'bar') {
    const chartDom = document.getElementById(containerId);
    const myChart = echarts.init(chartDom!);
    const options = getChartOptions(data, type);
    myChart.setOption(options);
  }

  function getChartOptions(data: DataSet, type: 'bar') {
    let options = {};
    switch(type) {
      case 'bar':
        options = {
          xAxis: { type: 'category', data: data.labels },
          yAxis: { type: 'value' },
          series: [{ data: data.datasets[0].values, type: 'bar' }]
        };
        break;
    }
    return options;
  }
</script>

<div class="columns">
  <div class="column">
    <Card title="Contributions by Book to Date">
      <div id="chartByBook" style="width: 100%; height: 400px;"></div>
    </Card>
  </div>
  <div class="column">
    <Card title="Please Donate">
      <LoreForm {characterList} />
    </Card>
  </div>
</div>
