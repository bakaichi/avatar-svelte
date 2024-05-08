<script lang="ts">
    import type { Lore } from "$lib/types/contribution-types";

    export let contributions: Lore[];
  </script>

<table class="table is-fullwidth">
    <thead>
      <th>Book Number</th>
      <th>Characters</th>
      <th>Latitude</th>
      <th>Longitude</th>
      <th>Lore</th>
      <th>Contributor</th>
    </thead>
    <tbody>
      {#each contributions as contribution}
        <tr>
          <td>{contribution.bookno}</td>
          <td>
            {#if typeof contribution.charactersinv == "string"}
              {contribution.charactersinv}
            {/if}
          </td>
          <td>{contribution.lat}</td>
          <td>{contribution.lng}</td>
          <td>{contribution.lore}</td>
          <td>{contribution.contributor}</td>
        </tr>
      {/each}
    </tbody>
  </table>