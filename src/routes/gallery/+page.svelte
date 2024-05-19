<script>
    import Gallery from '../../lib/ui/Gallery.svelte';
    import Card from "$lib/ui/Card.svelte";
    import { subTitle } from "$lib/stores";

    subTitle.set("Recent Image Gallery")
  </script>
  

  <Card title="Image Gallery">
    <Gallery />
  </Card>