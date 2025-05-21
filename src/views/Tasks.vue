<template>
  <div id="app">
    <div class="bg-green-50">
      <div class="min-h-screen max-w-4xl mx-auto px-4 sm:py-10">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">
          Your Tasks
        </h2>

        <div class="bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            Pending Tasks
          </h3>
          <ul id="pending-tasks" class="space-y-4"></ul>
          <button id="add-task-btn" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add a task +
          </button>
        </div>

        <div class="bg-gray-100 p-6 rounded-lg shadow-md mt-10">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            Completed Tasks
          </h3>
          <ul id="completed-tasks" class="space-y-4"></ul>
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
              <input type="text" id="taskTitle" class="border border-gray-300 p-2 w-full rounded" required />
            </div>
            <div class="mb-4">
              <label for="taskDescription" class="block text-gray-700">
                Description
              </label>
              <textarea id="taskDescription" class="border border-gray-300 p-2 w-full rounded" required></textarea>
            </div>
            <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Send
            </button>
          </form>
        </div>

        <div class="mt-10 text-center">
          <button @click="checkServer"
          class="text-red-600 hover:text-white bg-green-50 hover:bg-red-600 border-2 border-red-600 
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
      taskTitle: '',
      taskDescription: '',
      xhrResult: '',
    };
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
  },
};
</script>
