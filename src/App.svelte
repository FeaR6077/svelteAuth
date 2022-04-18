<script lang="ts">
  import { onMount } from "svelte";
  import auth from "./auth/authService";
  import { isAuthenticated, user } from "./stores/auth";

  let auth0Client: any;

  // on mount check if user is Auth
  onMount(async () => {
    auth0Client = await auth.createClient();

    isAuthenticated.set(await auth0Client.isAuthenticated());
    user.set(await auth0Client.getUser());
  });

  // log user in
  const login = () => {
    auth.loginWithPopup(auth0Client);
  };

  //log user out
  const logout = () => {
    auth.logout(auth0Client);
  };
</script>

<main>
  <!-- App Bar -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="navbar-brand">Svelte Auth Page using auth0</div>

    <div class="collapse navbar-collapse" id="navbarText">
      <div class="navbar-nav mr-auto user-details">
        {#if $isAuthenticated}
          <span class="text-white"
            >&nbsp;&nbsp;{$user["name"]} ({$user["email"]})</span
          >
        {:else}<span>&nbsp;</span>{/if}
      </div>
      <span class="navbar-text">
        <ul class="navbar-nav float-right">
          {#if $isAuthenticated}
            <li class="nav-item">
              <a class="nav-link" href="/#" on:click={logout}>Log Out</a>
            </li>
          {:else}
            <li class="nav-item">
              <a class="nav-link" href="/#" on:click={login}>Log In</a>
            </li>
          {/if}
        </ul>
      </span>
    </div>
  </nav>

  <!-- Application -->
  {#if !$isAuthenticated}
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-10 offset-md-1">
          <div class="jumbotron">
            <h1 class="display-4">Welcome to this page</h1>
            <ul>
              <li>Login to start &#128272;</li>
            </ul>
            <br />
            <button
              class="btn btn-primary btn-lg mr-auto ml-auto"
              on:click={login}>Log in</button
            >
          </div>
        </div>
      </div>
    </div>
  {:else}
    <div class="container" id="main-application">
      Welcome, you are logged in now
    </div>
  {/if}
</main>

<style>
  #main-application {
    margin-top: 50px;
  }
</style>
