<script>
    import Gallery from './Gallery.svelte';
    import Card from "$lib/ui/Card.svelte";
    import { subTitle } from "$lib/stores";

    subTitle.set("Recent Image Gallery")
  </script>
  

  <Card title="Image Gallery">
    <Gallery />
  </Card>