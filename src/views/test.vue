<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <div
      class="fixed left-0 top-0 h-full bg-white shadow-lg border-r border-gray-200 transition-transform duration-300 ease-in-out z-40"
      :class="[
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        'w-64 md:w-72'
      ]">
      <!-- Header -->
      <div class="p-6 border-b border-gray-100">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold">
            <span class="text-teal-600">Tam</span><span class="text-orange-400">Rahat</span>
          </h1>
          <button @click="toggleMobileMenu"
            class="md:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Location -->
        <div class="flex items-center mt-3 text-sm text-gray-500">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z">
            </path>
          </svg>
          Türkmenistan, Aşgabat
        </div>
      </div>

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

    <!-- Mobile Menu Overlay -->
    <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" @click="toggleMobileMenu">
    </div>

    <!-- Mobile Menu Button -->
    <button @click="toggleMobileMenu"
      class="fixed top-4 left-4 z-50 md:hidden bg-white p-3 rounded-lg shadow-lg border border-gray-200 transition-all duration-200 hover:shadow-xl hover:scale-105">
      <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>

    <!-- Main Content -->
    <div class="flex-1 transition-all duration-300 ease-in-out" :class="[
        'md:ml-72',
        isMobileMenuOpen ? 'ml-0' : 'ml-0'
      ]">
      <!-- Header Section -->
      <div class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <!-- Search Section -->
            <div class="flex-1 max-w-2xl">
              <div class="relative">
                <div class="flex">
                  <button
                    class="px-4 py-2 bg-orange-400 text-white rounded-l-lg font-medium hover:bg-orange-500 transition-colors duration-200 flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                    </svg>
                    Bölümler
                  </button>
                  <input type="text" placeholder="Haryt adynyň gözle..."
                    class="flex-1 px-4 py-2 border-t border-b border-gray-300 focus:outline-none focus:border-orange-400 transition-colors duration-200">
                  <button
                    class="px-6 py-2 bg-orange-400 text-white rounded-r-lg hover:bg-orange-500 transition-colors duration-200">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Banner Section -->
      <div class="relative bg-gradient-to-r from-green-500 to-green-600 overflow-hidden">
        <div class="absolute inset-0 bg-black opacity-20"></div>
        <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div class="text-center">
            <h2 class="text-4xl md:text-5xl font-bold text-white mb-4 opacity-0 animate-fade-in-up"
              style="animation-delay: 200ms">
              Arz üçin dürli
            </h2>
            <p class="text-2xl md:text-3xl text-white mb-2 opacity-0 animate-fade-in-up" style="animation-delay: 400ms">
              aýratyn harytlar
            </p>
            <div
              class="inline-block bg-orange-400 text-white px-6 py-2 rounded-full text-xl font-bold opacity-0 animate-fade-in-up"
              style="animation-delay: 600ms">
              20%
            </div>
            <p class="text-xl text-white mt-2 opacity-0 animate-fade-in-up" style="animation-delay: 800ms">
              arzykda!!!
            </p>
          </div>
        </div>
      </div>

      <!-- Product Categories -->
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="(product, index) in productCategories" :key="product.title"
            class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 opacity-0 animate-fade-in-up"
            :style="{ animationDelay: `${index * 200 + 1000}ms` }">
            <div class="aspect-w-16 aspect-h-9 bg-gradient-to-br" :class="product.bgColor">
              <div class="flex items-center justify-center p-8">
                <div class="text-center">
                  <div class="text-6xl mb-4">{{ product.icon }}</div>
                  <h3 class="text-xl font-bold text-white">{{ product.title }}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

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

// Product categories for the main content
const productCategories = ref([
  { title: 'Jaýlar', icon: '🏠', bgColor: 'from-amber-400 to-orange-500' },
  { title: 'Maşýlar', icon: '🚗', bgColor: 'from-pink-400 to-red-500' },
  { title: 'Akkumulýatorlar we generatorlar', icon: '🔋', bgColor: 'from-green-400 to-teal-500' }
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