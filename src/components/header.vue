<template>
  <div class="bg-green-50">
    <header>
      <div class="w-full container mx-auto px-4 lg:px-6">
        <nav class="bg-green-50 border-gray-200 px-4 lg:px-6 py-2.5">
          <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a :href="isLoggedIn ? 'tasks.html' : 'index.html'" class="flex items-center">
              <span
                class="text-green-600 self-center text-xl font-semibold whitespace-nowrap hover:text-green-700"
              >
                EasyTASK
              </span>
            </a>

            <div v-if="isLoggedIn" class="flex items-center lg:order-2">
              <span class="text-gray-800 font-medium text-sm px-4">{{ userName }}</span>
              <a
                href="#"
                @click.prevent="$emit('logout')"
                class="text-red-600 hover:text-white bg-green-50 hover:bg-red-600 border-2 border-red-600 font-medium rounded-lg text-sm px-4 lg:px-4 py-2 lg:py-2"
              >
                Sign Out
              </a>
            </div>

            <div v-else class="flex items-center lg:order-2">
              <a
                href="login.html"
                class="
                text-gray-800 hover:bg-green-600 hover:text-white 
                focus:ring-4 focus:ring-gray-300 
                border border-green-600 sm:border-none 
                font-medium rounded-lg text-sm 
                px-3.5 lg:px-5 py-2 lg:py-2.5 mr-2"
              >
                Log in
              </a>
              <a
                href="registration.html"
                class="text-white bg-green-600 hover:bg-green-700 font-medium border border-green-600 sm:border-none rounded-lg text-sm px-3.5 lg:px-5 py-2 lg:py-2.5 mr-2"
              >
                Get Started
              </a>
            </div>

            <div
              class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-12 lg:mt-0 ">
                <li>
                  <a
                    href="features.html"
                    class="block py-2 pr-4 pl-3 hover:text-green-800 text-black rounded lg:bg-transparent lg:p-0"
                    aria-current="page"
                    >Features</a
                  >
                </li>
                <li>
                  <a
                    href="faq.html"
                    class="block py-2 pr-4 pl-3 hover:text-green-800 text-black rounded lg:bg-transparent lg:p-0"
                    aria-current="page"
                    >FAQ</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block py-2 pr-4 pl-3 hover:text-green-800 text-black rounded lg:bg-transparent lg:p-0 line-through"
                    aria-current="page"
                    >About EasyTASK</a
                  >
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
};
</script>
