<template>
  <div id="app">
    <div class="route">
      <h1>测试this.$route 响应式：</h1>
      {{ this.$route }}
    </div>
    <div class="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {}
  },
  mounted () {}
}
</script>

<style>
#app {
  padding: 24px;
}
.route {
  height: 180px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
