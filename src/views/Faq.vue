<template>
  <div id="app">
    <app-header
      :is-logged-in="isLoggedIn"
      :user-name="userName"
      @logout="logout"
    />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'

export default {
  name: 'App',
  components: {
    AppHeader
  },
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
      this.$router.push('/')  // перенаправление на главную страницу после выхода
    }
  }
}
</script>

<style>
/* Можно добавить глобальные стили */
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background-color: #f0fdf4; /* например, светло-зеленый фон, чтобы совпадало с tailwind */
}
</style>
