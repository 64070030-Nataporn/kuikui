<template>
  <nav class="navbar is-warning" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <!-- logo website... -->
                <a class="navbar-item">
                    <img src="http://localhost:3000/uploads/movlogo.png" alt="">
                </a>
            </div>

            <div class="navbar-menu">
                <!-- name in navbar -->
                <div class="navbar-start">
                   <router-link to="/moviepage" class="navbar-item is-spaced">
          <p class="navbar-item is-spaced"> Movie </p>
        </router-link>
        
        <router-link to="/catmovie" class="navbar-item is-spaced">
              <p class="navbar-item">Catagories</p>
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
    name: "navbarmov",
}
</script>

<style>

</style>