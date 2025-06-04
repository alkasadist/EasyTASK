<template>
  <div id="app">
    <AppHeader :is-logged-in="isLoggedIn" :user-name="userName" @logout="logout" />
    <router-view @login-success="handleLogin" />
  </div>
</template>

<script>
import AppHeader from './views/components/AppHeader.vue';

export default {
  components: {
    AppHeader
  },
  data() {
    return {
      isLoggedIn: false,
      userName: ''
    };
  },
  methods: {
    handleLogin(userName) {
      this.isLoggedIn = true;
      this.userName = userName;
    },
    logout() {
      this.isLoggedIn = false;
      this.userName = '';
      localStorage.removeItem("currentUser"); // если используешь
      this.$router.push('/');
    }
  },
  mounted() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.isLoggedIn = true;
      this.userName = JSON.parse(localStorage.getItem(currentUser))?.name || '';
    }
  }
};
</script>
