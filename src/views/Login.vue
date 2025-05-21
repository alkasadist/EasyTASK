<template>
  <div class="bg-green-50 flex items-center justify-center min-h-screen p-4">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center text-green-600">
        EasyTASK
      </h2>
      <form @submit.prevent="login" class="mt-6">
        <div>
          <label for="username" class="block text-gray-700">Username</label>
          <input
            id="username"
            v-model="username"
            type="text"
            class="w-full px-4 py-2 mt-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        </div>
        <div class="mt-4">
          <label for="password" class="block text-gray-700">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="w-full px-4 py-2 mt-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full mt-6 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Log In
        </button>
      </form>
      <p class="mt-4 text-center text-gray-600">
        Don't have an account?
        <router-link to="/registration" class="text-green-600 hover:underline">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    login() {
      if (this.username && this.password) {
        localStorage.setItem('currentUser', this.username)
        this.$router.push('/tasks')
      } else {
        alert('Please enter username and password')
      }
    }
  }
}
</script>
