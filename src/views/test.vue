<template>
    <div class="min-h-screen bg-gray-100 p-4">
        <!-- Demo Button -->
        <button @click="showDrawer = true"
            class="bg-orange-400 text-white px-6 py-3 rounded-lg hover:bg-orange-500 transition-colors duration-200 mb-4">
            Open Filter
        </button>
        <!-- Overlay -->
        <Transition enter-active-class="transition-opacity duration-300 ease-out" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition-opacity duration-300 ease-in"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="showDrawer" @click="showDrawer = false" class="fixed inset-0 bg-black bg-opacity-40 z-40" />
        </Transition>

        <FilterSidebar :showDrawer="showDrawer" @close="showDrawer = false" @applyFilters="applyFilters" />
    </div>
</template>

<script setup>
// Reactive data
const showDrawer = ref(false)

// Methods
const applyFilters = (data) => {
    console.log(data);
    showDrawer.value = false
}
</script>