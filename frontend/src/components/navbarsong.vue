<template>
<nav class="navbar is-warning" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <!-- logo website... -->
                <a class="navbar-item">
                    <img src="http://localhost:3000/uploads/songlogo.png" alt="">
                </a>
            </div>

            <div class="navbar-menu">
                <!-- name in navbar -->
                <div class="navbar-start">
                   <router-link to="/songpage" class="navbar-item is-spaced">
          <p class="navbar-item is-spaced"> Song </p>
        </router-link>
        
        <router-link to="/catsong" class="navbar-item is-spaced">
              <p class="navbar-item"> Type </p>
        </router-link>
                </div>
                <div class="navbar-end">
                    <router-link class="navbar-item" to="/profile">
                        <img src="http://localhost:3000/uploads/person.png" alt="">
                    </router-link>
                </div>
            </div>
        </nav>
</template>

<script>
export default {
    name: "navbarsong"
}
</script>

<style>

</style>