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
              class="text-white px-4 py-2 rounded 
              bg-blue-600 hover:bg-blue-700">
              Add task +
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
                  class="text-white px-4 py-2 rounded 
                  bg-green-600 hover:bg-green-700">
                  Done
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
                  class="text-white px-4 py-2 rounded 
                  bg-blue-600 hover:bg-blue-700">
                  Restore
                </button>
                <button
                  @click="deleteTask(index)"
                  class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                  Delete
                </button>
              </div>
            </li>
          </ul>
        </div>

        <div class="bg-green-200 p-6 rounded-lg shadow-md mt-10 max-w-xl mx-auto" id="formContainer">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            Encountered any problems? Contact our support:
          </h3>
          <form id="taskForm" @submit.prevent="contactSupport">
            <div class="mb-4">
              <label for="taskTitle" class="block text-gray-700">
                Title
              </label>
              <input v-model="taskTitle" type="text" id="taskTitle" class="border border-gray-300 p-2 w-full rounded" required />
            </div>
            <div class="mb-4">
              <label for="taskDescription" class="block text-gray-700">
                Description
              </label>
              <textarea v-model="taskDescription" id="taskDescription" class="border border-gray-300 p-2 w-full rounded" required />
            </div>
            <button type="submit"
            class="px-4 py-2 rounded
            bg-green-600 hover:bg-green-700
            text-white">
              Send
            </button>
          </form>
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
      this.saveUserData(); // создать пустые задачи, если данных нет
    }
  },

  methods: {
    contactSupport() {
      fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          title: this.taskTitle,
          body: this.taskDescription,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert('Form submitted successfully!');
          this.taskTitle = '';
          this.taskDescription = '';
        })
        .catch(() => {
          alert('Error sending data to the server');
        });
    },
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
