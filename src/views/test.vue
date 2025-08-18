<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <div
      class="fixed left-0 top-0 h-full bg-white shadow-lg border-r border-gray-200 transition-transform duration-300 ease-in-out z-40"
      :class="[
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
        'w-64 md:w-72'
      ]">

      <!-- Menu Categories -->
      <nav class="flex-1 overflow-y-auto py-4">
        <div class="space-y-1 px-3">
          <div v-for="(category, index) in categories" :key="category.name"
            class="transform transition-all duration-300 ease-out" :style="{
        transitionDelay: `${index * 50}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-20px)'
      }">
            <a href="#" @click.prevent="selectCategory(category.name)"
              class="group flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-sm"
              :class="{
        'bg-gray-50 text-teal-600 border-l-4 border-teal-600 ml-0 pl-3': selectedCategory === category.name
      }">
              <component :is="'div'"
                class="mr-3 p-2 rounded-lg transition-all duration-200 group-hover:bg-white group-hover:shadow-sm"
                :class="{
        'bg-teal-50 text-teal-600': selectedCategory === category.name,
        'bg-gray-100 text-gray-600': selectedCategory !== category.name
      }">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="category.icon"></path>
                </svg>
              </component>

              <span class="font-medium group-hover:translate-x-1 transition-transform duration-200">
                {{ category.name }}
              </span>
            </a>
          </div>
        </div>
      </nav>
    </div>

    <!-- Overlay (click to close) -->
    <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-black bg-opacity-40 z-30" @click="toggleMobileMenu"></div>

    <!-- Main Content -->
    <div class="flex-1 transition-all duration-300 ease-in-out" :class="[
        isMobileMenuOpen ? 'md:ml-72 blur-sm' : 'md:ml-0'
      ]">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
// Reactive data
const isMobileMenuOpen = ref(false)
const selectedCategory = ref('Мебель')
const isVisible = ref(false)

// Categories data matching the image
const categories = ref([
  { name: 'Мебель', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z' },
  { name: 'Кухня и столовая', icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' },
  { name: 'Спальня', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
  { name: 'Ванная комната', icon: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0' },
  { name: 'Уборка и стирка', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
  { name: 'Освещение', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' }
])

// Methods
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const selectCategory = (categoryName) => {
  selectedCategory.value = categoryName
  if (window.innerWidth < 768) {
    isMobileMenuOpen.value = false
  }
}

// Lifecycle
onMounted(() => {
  isVisible.value = true
})
</script>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

/* Custom scrollbar */
nav::-webkit-scrollbar {
  width: 6px;
}

nav::-webkit-scrollbar-track {
  background: transparent;
}

nav::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

nav::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>