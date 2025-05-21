<template>
  <div id="app">
    <AppHeader :is-logged-in="isLoggedIn" :user-name="userName" @logout="logout" />
    <router-view />
  </div>
</template>

<script>
import AppHeader from './views/components/AppHeader.vue'

export default {
  components: { AppHeader },
  data() {
    return {
      isLoggedIn: !!localStorage.getItem('currentUser'),
      userName: localStorage.getItem('currentUser') || ''
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('currentUser')
      this.isLoggedIn = false
      this.userName = ''
      this.$router.push('/')
    }
  }
}
</script>
