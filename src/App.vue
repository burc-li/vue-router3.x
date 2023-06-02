<template>
  <div id="app">
    <div class="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </div>
    <div class="route">
      <P>测试this.$route 响应式：</P>
      {{ this.$route }}
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
  width: 600px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
