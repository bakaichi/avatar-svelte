<!-- lib/ui/LoreList.svelte -->
<script lang="ts">
    import type { Lore } from "$lib/types/contribution-types";
    import {sanitizeOutput} from "$lib/services/sanitization"
  
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
          <td>{contribution.charactersinv}</td>
          <td>{contribution.lat}</td>
          <td>{contribution.lng}</td>
          <td>{sanitizeOutput(contribution.lore)}</td>     
         <td>{contribution.contributor}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  