<template>
  <nav class="navbar is-warning" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <!-- logo website... -->
      <a class="navbar-item">
        <img src="http://localhost:3000/uploads/booklogo.png" alt="" />
      </a>
    </div>

    <div class="navbar-menu">
      <!-- name in navbar -->
      <div class="navbar-start">
        <router-link to="/bookpage" class="navbar-item is-spaced">
          <p class="navbar-item is-spaced"> BookHome </p>
        </router-link>
        
        <router-link to="/catbook" class="navbar-item is-spaced">
              <p class="navbar-item">Catagories</p>
        </router-link>
        
      </div>
      <div class="navbar-end">
         <router-link to="/profile" class="navbar-item">
              <img src="http://localhost:3000/uploads/person.png" alt="" />
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbarbook",
};
</script>

<style>
</style>