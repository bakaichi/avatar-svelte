<script lang="ts">
    import Card from "$lib/ui/Card.svelte";
    import ContributionList from "$lib/ui/ContributionList.svelte";
    import { contributionService } from "$lib/services/contribution-service";
    import type { Lore } from "$lib/types/contribution-types";
    import { currentSession, subTitle } from "$lib/stores";
    import { onMount } from "svelte";
    import { get } from "svelte/store";



    subTitle.set("Contributions to date");
    let contributions: Lore[] = [];
    onMount(async () => {
      contributions = await contributionService.getLores(get(currentSession));
    });
</script>
 
<Card title="Contributions">
  <ContributionList {contributions} />
</Card>
