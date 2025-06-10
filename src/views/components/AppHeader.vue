<template>
  <div class="bg-green-50">
    <header>
      <div class="w-full container mx-auto px-4 lg:px-6">
        <nav class="px-4 lg:px-6 py-2.5 bg-green-50 border-gray-200">
          <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <router-link
              :to="isLoggedIn ? '/tasks' : '/'"
              class="flex items-center self-center text-xl font-semibold whitespace-nowrap
               text-green-600 hover:text-green-700">
              EasyTASK
            </router-link>
            
            <div v-if="isLoggedIn" class="flex items-center lg:order-2">
              <router-link to="/profile" class="flex items-center mr-4">
                <img 
                  :src="userAvatar" 
                  alt="User avatar"
                  class="w-8 h-8 rounded-full object-cover border-2 border-green-600">
              </router-link>
              <span class="text-gray-800 font-medium text-sm px-4">
                {{ userName }}
              </span>
              <a
                href="#"
                @click.prevent="$emit('logout')"
                class="rounded-lg text-sm px-4 lg:px-4 py-2 lg:py-2 
                text-red-600 hover:text-white font-medium
                bg-green-50 hover:bg-red-600 border-2 border-red-600">
                Sign Out
              </a>
            </div>

            <div v-else class="flex items-center lg:order-2">
              <router-link
                to="/login"
                class="rounded-lg text-sm px-3.5 lg:px-5 py-2 lg:py-2.5 mr-2
                font-medium text-gray-800 hover:text-white hover:bg-green-600
                focus:ring-4 focus:ring-gray-300 
                border sm:border-none border-green-600">
                Log in
              </router-link>
              <router-link
                to="/registration"
                class="rounded-lg text-sm px-3.5 lg:px-5 py-2 lg:py-2.5 mr-2
                font-medium text-white 
                bg-green-600 hover:bg-green-700 
                border border-green-600 sm:border-none">
                Get Started
              </router-link>
            </div>

            <div
              class="justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2">
              <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-12 lg:mt-0">
                <li>
                  <router-link
                    to="/features"
                    class="block rounded py-2 pr-4 pl-3 lg:bg-transparent lg:p-0
                    text-black hover:text-green-800"
                    aria-current="page">
                    Features
                  </router-link>
                </li>
                <li>
                  <router-link
                    to="/faq"
                    class="block rounded py-2 pr-4 pl-3 lg:bg-transparent lg:p-0
                    text-black hover:text-green-800"
                    aria-current="page">
                    FAQ
                  </router-link>
                </li>
                <li>
                  <a
                    class="block py-2 pr-4 pl-3 rounded lg:bg-transparent lg:p-0
                    text-black hover:text-green-800 line-through"
                    aria-current="page">
                    About EasyTASK
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
    userName: {
      type: String,
      default: "",
    },
  },
  computed: {
    userAvatar() {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const userData = JSON.parse(localStorage.getItem(`user_${currentUser}`)) || {};
        // Возвращаем аватар пользователя или стандартное изображение
        return userData.photo || this.getDefaultAvatar();
      }
      return this.getDefaultAvatar();
    }
  },
  methods: {
    getDefaultAvatar() {
      // Можно использовать встроенный SVG или ссылку на изображение
      // Вот пример SVG-аватара с инициалами (если есть имя пользователя)
      if (this.userName) {
        const initials = this.userName.split(' ').map(n => n[0]).join('').toUpperCase();
        return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%234CAF50'/><text x='50%' y='50%' font-size='40' fill='white' text-anchor='middle' dy='.3em'>${initials}</text></svg>`;
      }
      // Или просто зеленый круг, если имени нет
      return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%234CAF50'/></svg>`;
    }
  },
};
</script>