<template>
  <div class="bg-green-50 min-h-screen py-12">
    <div class="max-w-6xl mx-auto px-4">
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 class="text-xl font-semibold text-green-700 mb-2">{{ feature.title }}</h2>
          <p class="text-gray-700">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'

export default {
  name: 'Features',
  components: {
    AppHeader,
  },
  data() {
    return {
      isLoggedIn: !!localStorage.getItem('currentUser'),
      userName: localStorage.getItem('currentUser') || '',
      features: [
        {
          title: 'Minimalistic Design',
          description: 'Our sleek and simple design allows for an intuitive user experience.',
        },
        {
          title: 'Task Organization',
          description: 'Sort your tasks by categories and priorities for maximum efficiency.',
        },
        {
          title: 'Reminder Notifications',
          description: 'Set up task reminders to ensure you never miss an important deadline.',
        },
        {
          title: 'Cloud Sync',
          description: 'Access your tasks from any device with automatic cloud synchronization.',
        },
        {
          title: 'Collaboration Tools',
          description: 'Share task lists with team members and collaborate in real-time.',
        },
        {
          title: 'Dark Mode',
          description: 'Switch to dark mode for a comfortable viewing experience at night.',
        },
      ],
    }
  },
}
</script>
