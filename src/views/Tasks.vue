<template>
  <div id="app">
    <div class="bg-green-50">
      <div class="min-h-screen max-w-4xl mx-auto px-4 sm:py-10">

        <div class="bg-gray-100 p-6 rounded-lg shadow-md">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-2xl font-semibold text-gray-900">
              Your Tasks
            </h3>
            <button
              @click="addTask"
              class="flex items-center text-white px-4 py-2 rounded 
              bg-blue-600 hover:bg-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
              Add
            </button>
          </div>

          <ul class="space-y-4">
            <!-- Pending Tasks -->
            <li
              v-for="(task, index) in notDone"
              :key="'notdone-' + index"
              class="flex justify-between items-center bg-white text-gray-800 p-4 
              rounded shadow">
              <span>
                {{ task }}
              </span>
              <div class="flex space-x-2">
                <button
                  @click="markAsDone(index)"
                  class="p-2 rounded-md text-green-600 hover:bg-green-100"
                  title="Mark as done">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </li>

            <!-- Completed Tasks -->
            <li
              v-for="(task, index) in done"
              :key="'done-' + index"
              class="flex justify-between items-center bg-white p-4 rounded shadow">
              <span class="line-through text-gray-500">
                {{ task }}
              </span>
              <div class="flex space-x-2">
                <button
                  @click="restoreTask(index)"
                  class="p-2 rounded-md text-blue-600 hover:bg-blue-100"
                  title="Restore task">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
                <button
                  @click="deleteTask(index)"
                  class="p-2 rounded-md text-red-600 hover:bg-red-100"
                  title="Delete task">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </li>
          </ul>
        </div>

        <div class="mt-10 text-center">
          <button @click="checkServer"
          class="text-red-600 hover:text-white 
          bg-green-50 hover:bg-red-600 
          border-2 border-red-600 
          font-medium rounded-lg text-sm px-4 py-2">
            Check server
          </button>
          <div class="mt-2 font-bold text-gray-800">
            {{ xhrResult }}
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentUser: null,
      userData: {
        todos: {
          notDone: [],
          done: [],
        }
      },
      taskTitle: '',
      taskDescription: '',
      xhrResult: '',
    };
  },

  computed: {
    notDone() {
      return this.userData.todos.notDone;
    },
    done() {
      return this.userData.todos.done;
    },
  },

  mounted() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      alert('Please login first.');
      window.location.href = 'login.html';
      return;
    }

    this.currentUser = currentUser;

    const storedData = localStorage.getItem(currentUser);
    if (storedData) {
      this.userData = JSON.parse(storedData);
    } else {
      this.saveUserData();
    }
  },

  methods: {
    checkServer() {
      console.log('checkServer called');

      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://httpbin.org/get');
      xhr.onload = () => {
        console.log('xhr loaded, status:', xhr.status);
        if (xhr.status === 200) {
          this.xhrResult = 'Test server is active';
        } else {
          this.xhrResult = `Error! Status: ${xhr.status}`;
        }
      };
      xhr.onerror = () => {
        console.log('xhr error');
        this.xhrResult = 'Request error (check your connection)';
      };
      xhr.send();
    },

    // TASKS MANAGEMENT METHODS
    saveUserData() {
      localStorage.setItem(this.currentUser, JSON.stringify(this.userData));
    },
    markAsDone(index) {
      const task = this.notDone[index];
      this.userData.todos.notDone.splice(index, 1);
      this.userData.todos.done.push(task);
      this.saveUserData();
    },
    deleteTask(index) {
      this.userData.todos.done.splice(index, 1);
      this.saveUserData();
    },
    restoreTask(index) {
      const task = this.done[index];
      this.userData.todos.done.splice(index, 1);
      this.userData.todos.notDone.push(task);
      this.saveUserData();
    },
    addTask() {
      const task = prompt('Enter your task:');
      if (task && task.trim()) {
        this.userData.todos.notDone.push(task.trim());
        this.saveUserData();
      }
    },
  },
};
</script>
