<script lang="ts">
  import type { Lore } from "$lib/types/contribution-types";
  import { sanitizeOutput } from "$lib/services/sanitization";

  export let contributions: Lore[];
</script>

<div class="contributions-container">
  {#each contributions as contribution}
    <div class="box contribution">
      <p><strong>Book No.:</strong> {contribution.bookno}</p>
      <p><strong>Characters:</strong> {contribution.charactersinv}</p>
      <p><strong>Latitude:</strong> {contribution.lat}</p>
      <p><strong>Longitude:</strong> {contribution.lng}</p>
      <p><strong>Lore:</strong> {@html sanitizeOutput(contribution.lore)}</p>
      <p><strong>Contributor:</strong> {contribution.contributor}</p>
    </div>
  {/each}
</div>

<style>
  .contributions-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .contribution {
    padding: 1rem;
    border-radius: 8px;
  }
  .contribution p {
    margin-bottom: 0.5rem;
  }
</style>
