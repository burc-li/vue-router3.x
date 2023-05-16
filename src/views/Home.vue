<template>
  <div class="home">
    <h1>This is an Home page</h1>

    <router-link to="/a">切 a</router-link> |
    <router-link to="/b">切 b</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted () {
    console.log(this.$router)
  }
}
</script>
