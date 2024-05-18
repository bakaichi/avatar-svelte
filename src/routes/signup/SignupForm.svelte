  <script lang="ts">
    import { goto } from "$app/navigation";
    import { contributionService } from "$lib/services/contribution-service";
    import { currentSession } from "$lib/stores";
    import Message from "$lib/ui/Message.svelte";
    import UserDetails from "$lib/ui/UserDetails.svelte";
    import UserCredentials from "$lib/ui/UserCredentials.svelte";

    let username = "";
    let email = "";
    let password = "";
    let message = "";

    async function signup() {
      console.log(`Attempting to sign up with username: ${username}, email: ${email}`);
      const success = await contributionService.signup({ username, email, password });
      if (success) {
        const session = await contributionService.login(email, password);
        if (session) {
          currentSession.set(session);
          localStorage.twoa = JSON.stringify(session);
          goto("/lore");
        } else {
          message = "Signup successful but login failed. Please try logging in.";
        }
      } else {
        message = "Error trying to sign up";
      }
    }
  </script>

  {#if message}
    <Message {message} />
  {/if}
  <form on:submit|preventDefault={signup}>
    <UserDetails bind:username />
    <UserCredentials bind:email bind:password />
    <button class="button is-success is-fullwidth">Create Account</button>
    <br />
  </form>
