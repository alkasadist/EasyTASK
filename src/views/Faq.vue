<template>
  <div class="bg-green-50 min-h-screen py-10">
    <div class="container mx-auto px-4 lg:px-6 max-w-4xl">
      <h1 class="text-4xl font-bold text-gray-900 mb-6">
        FAQ — Frequently Asked Questions
      </h1>
      <div class="space-y-6">
        <section v-for="(item, index) in faqItems" :key="index">
          <h2 class="text-2xl font-semibold text-green-700 mb-2">
            {{ item.question }}
          </h2>
          <p class="text-gray-700">
            {{ item.answer }}
          </p>
        </section>
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

    </div>
  </div>
</template>

<script>
export default {
  name: "Faq",
  data() {
    return {
      faqItems: [
        {
          question: "What is EasyTASK?",
          answer: "EasyTASK is a minimalistic to-do list app designed to help you organize tasks efficiently and stay productive."
        },
        {
          question: "How do I create an account?",
          answer: "You can create an account by clicking on the \"Get Started\" button on the homepage or the registration page."
        },
        {
          question: "Is my data secure?",
          answer: "We take your privacy seriously. All your tasks and personal data are stored securely and never shared with third parties."
        },
        {
          question: "Can I access EasyTASK on mobile?",
          answer: "Yes! EasyTASK is fully responsive and works on all modern mobile browsers."
        },
      ]
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
  }
}
</script>
