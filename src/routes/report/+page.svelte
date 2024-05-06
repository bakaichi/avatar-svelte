<script lang="ts">
    import { subTitle } from "$lib/stores";
    import Card from "$lib/ui/Card.svelte";
    import ContributionList from "$lib/ui/ContributionList.svelte";

    subTitle.set("Contributions to date");
</script>
 
<Card title="Contributions">
  <ContributionList />
</Card>
