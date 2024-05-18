<script lang="ts">
  export let message = "";
  import {sanitizeOutput} from "$lib/services/sanitization"

</script>

<article class="message is-danger">
  <div class="message-body">
    {sanitizeOutput(message)}
  </div>
</article>