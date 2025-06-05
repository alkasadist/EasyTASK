<template>
  <div id="app">
    <div class="bg-green-50">
      <div class="min-h-screen max-w-4xl mx-auto px-4 sm:py-10">

        <!-- Кнопка добавления новой группы -->
        <button v-if="!showAddGroupInput"
          @click="showAddGroupInput = true"
          class="flex items-center mb-6 text-white px-4 py-2 rounded-lg 
          bg-indigo-500 hover:bg-indigo-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          New Group
        </button>

        <!-- Инпут для добавления группы -->
        <div v-if="showAddGroupInput" class="py-5 rounded-lg max-w-sm">
          <input 
            v-model="newGroupName"
            type="text" 
            placeholder="New group name"
            class="border p-2 w-full mb-4 rounded-lg"
            @keyup.enter="addNewGroup">
          <div class="flex justify-end space-x-2">
            <button @click="showAddGroupInput = false" class="rounded-lg px-3 py-1
                text-gray-800 hover:text-red-600
                bg-green-50 
                border-1 border-gray-800">
              Cancel
            </button>
            <button @click="addNewGroup" class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg">
              Add
            </button>
          </div>
        </div>

        <!-- Список групп задач -->
        <div 
          v-for="(group, groupIndex) in taskGroups" 
          :key="'group-'+groupIndex"
          class="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
          
          <!-- Заголовок группы -->
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-2xl font-semibold text-gray-900">
              {{ group.name }}
            </h3>
            <div class="flex space-x-2">
              <button 
                @click="toggleGroupVisibility(groupIndex)"
                class="text-gray-600 p-2 rounded-lg 
                hover:text-gray-700 hover:bg-gray-200 focus:outline-none"
                :aria-expanded="!group.collapsed">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    :d="group.collapsed ? 'm19.5 8.25-7.5 7.5-7.5-7.5' : 'M5 15l7-7 7 7'" />
                </svg>
              </button>
              <button
                @click="removeGroup(groupIndex)"
                class="text-gray-600 p-2 rounded-lg 
                hover:text-red-600 hover:bg-gray-200 focus:outline-none"
                title="Delete group">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Содержимое группы -->
          <div v-if="!group.collapsed">
            <ul class="space-y-4">
              <!-- Невыполненные задачи -->
              <li
                v-for="(task, index) in group.todos.notDone"
                :key="'notdone-'+groupIndex+'-'+index"
                class="flex justify-between items-center bg-white text-gray-800 p-4 rounded-lg shadow">
                <span>{{ task }}</span>
                <div class="flex space-x-2">
                  <button
                    @click="markAsDone(groupIndex, index)"
                    class="p-2 rounded-lg text-green-600 hover:bg-green-100"
                    title="Mark as done">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </li>
              
              <!-- Кнопка добавления задачи -->
              <button
                @click="addTask(groupIndex)"
                class="flex items-center text-white px-4 py-2 rounded-lg 
                bg-indigo-500 hover:bg-indigo-600 mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                New Task
              </button>

              <!-- Выполненные задачи -->
              <li
                v-for="(task, index) in group.todos.done"
                :key="'done-'+groupIndex+'-'+index"
                class="flex justify-between items-center bg-white p-4 rounded-lg shadow">
                <span class="line-through text-gray-400">{{ task }}</span>
                <div class="flex space-x-2">
                  <button
                    @click="restoreTask(groupIndex, index)"
                    class="p-2 rounded-lg text-blue-600 hover:bg-blue-100"
                    title="Restore task">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  <button
                    @click="deleteTask(groupIndex, index)"
                    class="p-2 rounded-lg text-red-600 hover:bg-red-100"
                    title="Delete task">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Проверка сервера -->
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
      taskGroups: [],
      showAddGroupInput: false,
      newGroupName: '',
      taskTitle: '',
      taskDescription: '',
      xhrResult: ''
    };
  },

  mounted() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      alert('Please login first.');
      window.location.href = 'login.html';
      return;
    }

    this.currentUser = currentUser;
    this.loadTaskGroups();
  },

  methods: {
    loadTaskGroups() {
      const storedData = localStorage.getItem(this.currentUser);
      if (storedData) {
        this.taskGroups = JSON.parse(storedData);
        // Если данные в старом формате, преобразуем их
        if (!Array.isArray(this.taskGroups)) {
          this.taskGroups = [{
            name: 'Your Tasks',
            collapsed: false,
            todos: this.taskGroups.todos || { notDone: [], done: [] }
          }];
        }
      } else {
        // Создаем первую группу по умолчанию
        this.taskGroups = [{
          name: 'Your Tasks',
          collapsed: false,
          todos: { notDone: [], done: [] }
        }];
        this.saveTaskGroups();
      }
    },

    saveTaskGroups() {
      localStorage.setItem(this.currentUser, JSON.stringify(this.taskGroups));
    },

    addNewGroup() {
      if (this.newGroupName.trim()) {
        this.taskGroups.push({
          name: this.newGroupName.trim(),
          collapsed: false,
          todos: { notDone: [], done: [] }
        });
        this.saveTaskGroups();
        this.showAddGroupInput = false;
        this.newGroupName = '';
      }
    },

    removeGroup(index) {
        this.taskGroups.splice(index, 1);
        this.saveTaskGroups();
    },

    toggleGroupVisibility(index) {
      this.taskGroups[index].collapsed = !this.taskGroups[index].collapsed;
      this.saveTaskGroups();
    },

    addTask(groupIndex) {
      const task = prompt('Enter your task:');
      if (task && task.trim()) {
        this.taskGroups[groupIndex].todos.notDone.push(task.trim());
        this.saveTaskGroups();
      }
    },

    markAsDone(groupIndex, taskIndex) {
      const task = this.taskGroups[groupIndex].todos.notDone[taskIndex];
      this.taskGroups[groupIndex].todos.notDone.splice(taskIndex, 1);
      this.taskGroups[groupIndex].todos.done.push(task);
      this.saveTaskGroups();
    },

    deleteTask(groupIndex, taskIndex) {
      this.taskGroups[groupIndex].todos.done.splice(taskIndex, 1);
      this.saveTaskGroups();
    },

    restoreTask(groupIndex, taskIndex) {
      const task = this.taskGroups[groupIndex].todos.done[taskIndex];
      this.taskGroups[groupIndex].todos.done.splice(taskIndex, 1);
      this.taskGroups[groupIndex].todos.notDone.push(task);
      this.saveTaskGroups();
    },

    checkServer() {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://httpbin.org/get');
      xhr.onload = () => {
        this.xhrResult = xhr.status === 200 
          ? 'Test server is active' 
          : `Error! Status: ${xhr.status}`;
      };
      xhr.onerror = () => {
        this.xhrResult = 'Request error (check your connection)';
      };
      xhr.send();
    }
  }
};
</script>
