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
        {
          question: "How can I contact support?",
          answer: "You can reach out to us via the contact form on the \"About EasyTASK\" page (coming soon)."
        }
      ]
    }
  }
}
</script>
