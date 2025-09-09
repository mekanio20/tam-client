<template>
  <div class="flex">
    <!-- Sidebar -->
    <div
      class="fixed left-0 top-[112px] h-[calc(100vh-112px)] bg-white shadow-lg border-r border-gray-200 transition-transform duration-300 ease-in-out z-40 flex flex-col"
      :class="[
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
        'w-64 md:w-72'
      ]" @mouseleave="scheduleCloseSubmenu" @mouseenter="cancelCloseSubmenu">

      <!-- Menu Categories -->
      <div class="flex-1 py-4 overflow-y-auto sidebar-scroll">
        <div class="space-y-1 px-3">
          <div v-for="(category, index) in categories" :key="category.id"
            class="transform transition-all duration-300 ease-out" :style="{
        transitionDelay: `${index * 50}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-20px)'
      }">
            <router-link :to="`/product/list?category=${category.id}`" @click.prevent="selectCategory(category.id)"
              @mouseenter="onCategoryMouseEnter(category)"
              class="group flex items-center px-4 py-3 text-[#0C1A30] rounded-lg hover:bg-gray-50 transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-sm"
              :class="{
        'bg-[#FEB9181F] text-[#FFBA19]': selectedCategory === category.id
      }">
              <div v-if="category?.image?.path" class="w-[20px] h-[20px] mr-2">
                <img class="w-full h-full object-cover" :src="category.image.path">
              </div>
              <span class="font-medium group-hover:translate-x-1 transition-transform duration-200">
                {{ category.name }}
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Submenu (desktop only) -->
    <div v-if="isMobileMenuOpen && isSubmenuOpen && submenuItems.length > 0"
      class="fixed left-64 md:left-72 top-[112px] w-64 h-[calc(100vh-112px)] bg-white shadow-lg border-l border-[#EDEDED] z-40 hidden md:flex flex-col"
      @mouseenter="cancelCloseSubmenu" @mouseleave="scheduleCloseSubmenu">
      <div class="flex-1 py-4 overflow-y-auto sidebar-scroll">
        <div class="space-y-1 px-3">
          <div v-for="(item, index) in submenuItems" :key="`${activeParentCategory}-${index}-${item.id}`"
            class="transform transition-all duration-300 ease-out">
            <router-link :to="`/product/list?subcategory=${item.id}`" @click="selectSubcategory(item.id)"
              class="group flex items-center px-4 py-3 text-[#0C1A30] rounded-lg hover:bg-gray-50 transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-sm">
              <div v-if="item?.image?.path" class="w-[20px] h-[20px] mr-2">
                <img class="w-full h-full object-cover" :src="item.image.path">
              </div>
              <span class="font-medium group-hover:translate-x-1 transition-transform duration-200">
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
const categoryStore = useCategoriesStore()
const { categories, loading, error } = storeToRefs(categoryStore)
const { fetchCategories, addCategory, updateCategory, deleteCategory } = categoryStore
// Reactive data
const props = defineProps({ isMobileMenuOpen: Boolean })
const emit = defineEmits(['toggleMobileMenu'])
const selectedCategory = ref(null)
const isVisible = ref(false)
const isSubmenuOpen = ref(false)
const activeParentCategory = ref(null)
const submenuItems = ref([])
let closeSubmenuTimeoutId = null

// Methods
const toggleMobileMenu = () => {
  emit('toggleMobileMenu')
}

const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
  emit('toggleMobileMenu', false)
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
  if (category && category.children && category.children.length > 0) {
    activeParentCategory.value = category.name
    submenuItems.value = category.children
    isSubmenuOpen.value = true
    cancelCloseSubmenu()
  } else {
    scheduleCloseSubmenu()
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

// Lifecycle
onMounted(() => {
  fetchCategories()
  isVisible.value = true
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