<script lang="ts">
  import { goto } from "$app/navigation";
  import { contributionService } from "$lib/services/contribution-service";
  import { currentSession } from "$lib/stores";
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";

  let email = "";
  let password = "";
  let message = "";

  async function login() {
    console.log(`attemting to log in email: ${email} with password: ${password}`);
    let session = await contributionService.login(email, password);
    if (session) {
      currentSession.set(session);
      localStorage.twoa = JSON.stringify(session);
      goto("/lore");
    } else {
      email = "";
      password = "";
      message = "Invalid Credentials";
    }
  }
</script>

{#if message}
  <Message {message} />
{/if}
<form on:submit|preventDefault={login}>
  <UserCredentials bind:email bind:password />
  <button class="button is-success is-fullwidth">Log In</button>
</form>
