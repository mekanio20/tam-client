<template>
  <div class="flex">
    <!-- Sidebar -->
    <div
      class="fixed left-0 sm:top-[112px] top-[95px] sm:h-[calc(100vh-112px)] h-[calc(100vh-95px)] bg-white shadow-lg border-r border-gray-200 transition-transform duration-300 ease-in-out z-40 flex flex-col"
      :class="[
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
        'w-full md:w-72'
      ]" @mouseleave="scheduleCloseSubmenu" @mouseenter="cancelCloseSubmenu">

      <!-- Menu Categories -->
      <div class="flex-1 py-4 overflow-y-auto sidebar-scroll">
        <div class="space-y-1 px-3">
          <!-- Search -->
          <SearchBar class="mb-6" v-if="isMobile" v-model="searchQuery" :placeholder="'Haryt ady boýunça gözle...'"
            @search="handleSearch" />
          <!-- Categories -->
          <div v-for="(category, index) in categories" :key="category.id"
            class="transform transition-all duration-300 ease-out" :style="{
        transitionDelay: `${index * 50}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-20px)'
      }">
            <div @click="handleCategoryClick(category)" @mouseenter="onCategoryMouseEnter(category)"
              class="group flex items-center justify-between px-4 py-3 text-[#0C1A30] rounded-lg hover:bg-gray-50 transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-sm cursor-pointer"
              :class="{
        'bg-[#FEB9181F] text-[#FFBA19]': selectedCategory === category.id
      }">
              <div class="">
                <div v-if="category?.image?.path" class="w-[20px] h-[20px] mr-2">
                  <img class="w-full h-full object-cover" :src="category.image.path">
                </div>
                <span class="font-medium group-hover:translate-x-1 transition-transform duration-200 sm:text-base text-sm">
                  {{ category.name }}
                </span>
              </div>
              <div v-if="category.children.length > 0">
                <chevron_right-icon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Submenu (desktop only) -->
    <div v-if="isMobileMenuOpen && isSubmenuOpen && submenuItems.length > 0"
      class="fixed left-0 md:left-72 top-[95px] w-full md:w-64 h-[calc(100vh-95px)] bg-white  z-40 flex flex-col"
      @mouseenter="cancelCloseSubmenu" @mouseleave="scheduleCloseSubmenu">
      <!-- Back button for mobile -->
      <div class="md:hidden flex items-center px-4 py-3 border-b border-gray-200">
        <button @click="goBackToCategories"
          class="flex items-center text-[#0C1A30] hover:text-[#FEB918] transition-colors">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          <span class="font-medium">{{ activeParentCategory }}</span>
        </button>
      </div>
      <div class="flex-1 py-4 overflow-y-auto sidebar-scroll">
        <div class="space-y-1 px-3">
          <div v-for="(item, index) in submenuItems" :key="`${activeParentCategory}-${index}-${item.id}`"
            class="transform transition-all duration-300 ease-out">
            <router-link :to="`/product/list?subcategory=${item.id}`" @click="selectSubcategory(item.id)"
              class="group flex items-center px-4 py-3 text-[#0C1A30] rounded-lg hover:bg-gray-50 transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-sm">
              <div v-if="item?.image?.path" class="w-[20px] h-[20px] mr-2">
                <img class="w-full h-full object-cover" :src="item.image.path">
              </div>
              <span class="font-medium group-hover:translate-x-1 transition-transform duration-200 sm:text-base text-sm">
                {{ item.name }}
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Overlay (click to close) -->
    <div v-if="isMobileMenuOpen" class="fixed left-0 right-0 bottom-0 top-[112px] bg-black bg-opacity-40 z-10"
      @click="toggleMobileMenu"></div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCategoriesStore } from '@/stores/categories'
import { useRouter } from 'vue-router'

const router = useRouter()
const categoryStore = useCategoriesStore()
const { categories } = storeToRefs(categoryStore)
const { fetchCategories } = categoryStore
// Reactive data
const props = defineProps({ isMobileMenuOpen: Boolean })
const emit = defineEmits(['toggleMobileMenu'])
const selectedCategory = ref(null)
const isVisible = ref(false)
const isSubmenuOpen = ref(false)
const activeParentCategory = ref(null)
const submenuItems = ref([])
const searchQuery = ref('');
const isMobile = ref(false)
let closeSubmenuTimeoutId = null

// Methods

const handleSearch = (value) => {
  if (typeof value === 'string') {
    searchQuery.value = value
  }
  if (searchQuery.value && searchQuery.value.trim().length > 0) {
    router.push({ name: 'SearchResults', query: { q: searchQuery.value.trim() } })
  }
};

const toggleMobileMenu = () => {
  emit('toggleMobileMenu')
}

const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
  emit('toggleMobileMenu', false)
}

const handleCategoryClick = (category) => {
  if (category && category.children && category.children.length > 0) {
    // If category has subcategories, show them on mobile
    if (window.innerWidth < 768) {
      activeParentCategory.value = category.name
      submenuItems.value = category.children
      isSubmenuOpen.value = true
    } else {
      // On desktop, navigate to category page even if it has subcategories
      selectCategory(category.id)
      router.push(`/product/list?category=${category.id}`)
    }
  } else {
    // If no subcategories, navigate directly on both mobile and desktop
    selectCategory(category.id)
    router.push(`/product/list?category=${category.id}`)
  }
}

const selectSubcategory = (subcategoryId) => {
  selectedCategory.value = subcategoryId
  emit('toggleMobileMenu', false)
  // Close submenu after selection
  isSubmenuOpen.value = false
  activeParentCategory.value = null
  submenuItems.value = []
}

const onCategoryMouseEnter = (category) => {
  // Only show submenu on hover for desktop (md and above)
  if (window.innerWidth >= 768) {
    if (category && category.children && category.children.length > 0) {
      activeParentCategory.value = category.name
      submenuItems.value = category.children
      isSubmenuOpen.value = true
      cancelCloseSubmenu()
    } else {
      scheduleCloseSubmenu()
    }
  }
}

const scheduleCloseSubmenu = () => {
  if (closeSubmenuTimeoutId) {
    clearTimeout(closeSubmenuTimeoutId)
  }
  closeSubmenuTimeoutId = setTimeout(() => {
    isSubmenuOpen.value = false
    activeParentCategory.value = null
    submenuItems.value = []
  }, 200)
}

const cancelCloseSubmenu = () => {
  if (closeSubmenuTimeoutId) {
    clearTimeout(closeSubmenuTimeoutId)
    closeSubmenuTimeoutId = null
  }
}

const goBackToCategories = () => {
  isSubmenuOpen.value = false
  activeParentCategory.value = null
  submenuItems.value = []
}

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 1024
}

// Lifecycle
onMounted(() => {
  fetchCategories()
  checkScreenSize()
  isVisible.value = true
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<style scoped>
/* Custom thin, rounded, yellow scrollbar for the categories list */
.sidebar-scroll::-webkit-scrollbar {
  width: 3px;
}

.sidebar-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-scroll::-webkit-scrollbar-thumb {
  background: #FEBD24;
  border-radius: 9999px;
  /* rounded-full */
}

.sidebar-scroll::-webkit-scrollbar-thumb:hover {
  background: #FEBD24;
}

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