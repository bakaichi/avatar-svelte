<script lang="ts">
  import * as echarts from 'echarts';
  import { onMount } from "svelte";
  import { contributionService } from "$lib/services/contribution-service";
  import { currentSession, subTitle } from "$lib/stores";
  import { get } from "svelte/store";
  import type { DataSet } from "$lib/types/contribution-types";
  import { generateByBook, generateByNation, generateByCharacter } from "$lib/services/contribution-utils";

  let totalByBook: DataSet;
  let totalByNation: DataSet;
  let totalOverTime: DataSet;
  let totalByCharacter: DataSet;

  subTitle.set("Contributions Data");

  onMount(async () => {
      const contributionList = await contributionService.getLores(get(currentSession));
      totalByBook = generateByBook(contributionList);
      totalByNation = generateByNation(contributionList);
      totalOverTime = generateByBook(contributionList);
      totalByCharacter = generateByCharacter(contributionList);

      renderChart('chartByBook', totalByBook, 'bar');
      renderChart('chartByNation', totalByNation, 'pie');
      renderChart('chartOverTime', totalOverTime, 'line');
      renderChart('chartByCharacter', totalByCharacter, 'donut');
  });

  function renderChart(containerId: string, data: DataSet, type: 'bar' | 'pie' | 'line' | 'donut') {
    const chartDom = document.getElementById(containerId);
    const myChart = echarts.init(chartDom!); // Assert that chartDom is not null
    const options = getChartOptions(data, type);
    myChart.setOption(options);
  }

  function getChartOptions(data: DataSet, type: 'bar' | 'pie' | 'line' | 'donut') {
    let options = {};
    switch(type) {
      case 'bar':
        options = {
          xAxis: { 
            type: 'category', 
            data: data.labels,
            axisLabel: {
              fontSize: 14,
              fontWeight: 'bold'
            }
          },
          yAxis: { 
            type: 'value',
            axisLabel: {
              fontSize: 14,
              fontWeight: 'bold'
            }
          },
          series: [{ 
            data: data.datasets[0].values, 
            type: 'bar',
            label: {
              show: true,
              position: 'top',
              fontSize: 14,
              fontWeight: 'bold',
              color: '#ffffff'
            }
          }]
        };
        break;
      case 'pie':
      case 'donut':
        options = {
          series: [{
            type: 'pie',
            radius: type === 'donut' ? ['50%', '70%'] : '50%',
            data: data.labels.map((label: string, index: number) => ({ name: label, value: data.datasets[0].values[index] })),
            label: {
              fontSize: 14,
              fontWeight: 'bold',
              color: '#ffffff'
            }
          }],
          textStyle: {
            color: '#ffffff'
          }
        };
        break;
      case 'line':
        options = {
          xAxis: { 
            type: 'category', 
            data: data.labels,
            axisLabel: {
              fontSize: 14,
              fontWeight: 'bold',
              color: '#ffffff'
            }
          },
          yAxis: { 
            type: 'value',
            axisLabel: {
              fontSize: 14,
              fontWeight: 'bold',
              color: '#ffffff'
            }
          },
          series: [{ 
            data: data.datasets[0].values, 
            type: 'line',
            label: {
              show: true,
              position: 'top',
              fontSize: 14,
              fontWeight: 'bold',
              color: '#ffffff'
            }
          }],
          textStyle: {
            color: '#ffffff'
          }
        };
        break;
    }
    return options;
  }
</script>

<div class="columns">
  <div class="column is-two-thirds">
    <div class="columns is-multiline">
      <div class="column is-half box has-text-centered" style="width: 100%">
        <h1 class="title is-4">Contributions per Character</h1>
        <div id="chartByCharacter" style="width: 100%; height: 400px;"></div>
    </div>
      <div class="column is-half box has-text-centered">
          <h1 class="title is-4">Contributions by Book Number</h1>
          <div id="chartByBook" style="width: 100%; height: 400px;"></div>
      </div>
      <div class="column is-half box has-text-centered">
          <h1 class="title is-4">Distribution by Nation</h1>
          <div id="chartByNation" style="width: 100%; height: 400px;"></div>
      </div>
      <div class="column is-half box has-text-centered">
          <h1 class="title is-4">Contributions To Books</h1>
          <div id="chartOverTime" style="width: 100%; height: 400px;"></div>
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
    margin: 5vh;
  }

  .has-text-centered {
    text-align: center;
  }

  .box {
    background-color: #1f1224; /* chart background */
  }

  .title {
    color: #ffffff; 
  }
</style>
