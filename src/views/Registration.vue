<template>
  <div class="bg-green-50 flex items-center justify-center min-h-screen p-4">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center text-green-600">Get started with EasyTASK</h2>
      <form @submit.prevent="register" class="mt-6">
        <div>
          <label for="username" class="block text-gray-700">
            Username
          </label>
          <input
            id="username"
            v-model="username"
            type="text"
            class="w-full px-4 py-2 mt-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          >
        </div>
        <div class="mt-4">
          <label for="password" class="block text-gray-700">
            Password
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="w-full px-4 py-2 mt-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          >
        </div>
        <button
          type="submit"
          class="w-full mt-6 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
          Sign Up
        </button>
      </form>
      <p class="mt-4 text-center text-gray-600">
        Already have an account?
        <router-link to="/login" class="text-green-600 hover:underline">Log In</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Registration',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    register() {
      if (this.username && this.password) {
        localStorage.setItem('currentUser', this.username)
        this.$router.push('/')
      } else {
        alert('Registration error')
      }
    }
  }
}
</script>
