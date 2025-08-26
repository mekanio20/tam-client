<template>
  <div id="app" class="min-h-screen bg-gray-100 flex items-center justify-center">
    <button @click="showModal = true"
      class="bg-amber-400 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-500 transition-colors">
      Adres sayla
    </button>

    <AddressModal :show="showModal" @close="showModal = false" />
  </div>
</template>

<script setup>
const showModal = ref(false)
</script>