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
      <th>Contributor</th>
    </thead>
    <tbody>
      {#each contributions as contribution}
        <tr>
          <td>{contribution.bookno}<br></td>
          <td>{contribution.charactersinv}</td>
          <td>{contribution.lat}</td>
          <td>{contribution.lng}</td>
          <td>{contribution.contributor}</td>
        </tr>
      {/each}
    </tbody>
  </table>