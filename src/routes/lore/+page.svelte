<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import { subTitle } from "$lib/stores";
  import LoreForm from "./Loreform.svelte";

  subTitle.set("Add Lore Here");
</script>

<Card title="Please Contribute">
  <LoreForm />
</Card>
