<template>
  <div class="bg-green-50">
    <div class="relative isolate px-5 sm:pt-14 lg:px-8">
      <div class="mx-auto max-w-2xl py-5 lg:py-10">
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Minimalistic To-Do List
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Stay organized and productive with my simple and efficient to-do list app.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-green-600 py-5 sm:py-10">
    <div class="mx-auto max-w-7xl px-5 lg:px-8">
      <div class="mx-auto max-w-2xl lg:text-center">
        <h2 class="text-base font-semibold leading-7 text-green-200">
          Stay Organized
        </h2>
        <p class="mt-2 text-xl font-bold tracking-tight text-white sm:text-4xl">
          Effortlessly manage your tasks
        </p>
        <p class="mt-1 sm:mt-6 text-lg leading-8 text-green-200">
          Keep track of your to-dos with our minimalistic and user-friendly design,
          task organization features, and reminder notifications.
        </p>
      </div>
      <div class="mx-auto max-w-2xl mt-6 lg:mt-20 lg:max-w-none">
        <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-6 lg:max-w-none lg:grid-cols-3">
          <div class="flex flex-col">
            <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 
            text-white">
              Minimalistic Design
            </dt>
            <dd class="mt-1 lg:mt-4 flex flex-auto flex-col text-base leading-7 
            text-green-200">
              <p class="flex-auto">
                Sleek and simple design for easy use
              </p>
              <p class="mt-1 sm:mt-6">
                <router-link
                  to="/features"
                  class="text-sm font-semibold leading-6 text-white">
                  Learn more →
                </router-link>
              </p>
            </dd>
          </div>
          <div class="flex flex-col">
            <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 
            text-white">
              Task Organization
            </dt>
            <dd class="mt-1 lg:mt-4 flex flex-auto flex-col text-base leading-7 
            text-green-200">
              <p class="flex-auto">
                Efficiently organize tasks with categories and priorities
              </p>
              <p class="mt-1 sm:mt-6">
                <router-link
                  to="/features"
                  class="text-sm font-semibold leading-6 text-white">
                  Learn more →
                </router-link>
              </p>
            </dd>
          </div>
          <div class="flex flex-col">
            <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 
            text-white">
              Reminder Notifications
            </dt>
            <dd class="mt-1 lg:mt-4 flex flex-auto flex-col text-base leading-7 
            text-green-200">
              <p class="flex-auto">
                Set reminders for important tasks to stay on track
              </p>
              <p class="mt-1 sm:mt-6">
                <router-link
                  to="/features"
                  class="text-sm font-semibold leading-6 text-white">
                  Learn more →
                </router-link>
              </p>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>

  <div class="bg-green-50">
    <div class="px-5 py-5 sm:px-6 lg:px-10">
      <div class="py-5 mx-auto max-w-2xl text-center">
        <h2 class="text-2xl font-bold tracking-tight text-gray-800 sm:text-4xl">
          Start checking off tasks with ease
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-lg leading-8 text-gray-600">
          Sign up now and experience the simplicity of our to-do list project.
        </p>
        <div class="py-5 mt-4 flex items-center justify-center gap-x-6">
          <router-link
            to="/registration"
            class="rounded-md px-3.5 py-2.5 
            text-sm font-semibold text-white shadow-sm
            bg-green-600 hover:bg-green-700
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
            Sign up
          </router-link>
          <router-link
            to="/features"
            class="text-sm font-semibold leading-6 text-gray-900">
            Learn more →
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'

export default {
  name: 'App',
  components: { AppHeader },
  data() {
    return {
      isLoggedIn: !!localStorage.getItem('currentUser'),
      userName: localStorage.getItem('currentUser') || ''
    }
  },
}
</script>
