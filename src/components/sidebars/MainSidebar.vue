<template>
  <div class="flex">
    <!-- Sidebar -->
    <div
      class="fixed left-0 top-[112px] h-[calc(100vh-112px)] bg-white shadow-lg border-r border-gray-200 transition-transform duration-300 ease-in-out z-40 flex flex-col"
      :class="[
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
        'w-64 md:w-72'
      ]"
      @mouseleave="scheduleCloseSubmenu"
      @mouseenter="cancelCloseSubmenu">

      <!-- Menu Categories -->
      <div class="flex-1 py-4 overflow-y-auto sidebar-scroll">
        <div class="space-y-1 px-3">
          <div v-for="(category, index) in categories" :key="category.name"
            class="transform transition-all duration-300 ease-out" :style="{
        transitionDelay: `${index * 50}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-20px)'
      }">
            <a href="#" @click.prevent="selectCategory(category.name)" @mouseenter="onCategoryMouseEnter(category)"
              class="group flex items-center px-4 py-3 text-[#0C1A30] rounded-lg hover:bg-gray-50 transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-sm"
              :class="{
        'bg-[#FEB9181F] text-[#FFBA19]': selectedCategory === category.name
      }">
              <span class="font-medium group-hover:translate-x-1 transition-transform duration-200">
                {{ category.name }}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Submenu (desktop only) -->
    <div v-if="isMobileMenuOpen && isSubmenuOpen" class="fixed left-64 md:left-72 top-[112px] w-64 h-[calc(100vh-112px)] bg-white shadow-lg border-l border-[#EDEDED] z-40 hidden md:flex flex-col"
      @mouseenter="cancelCloseSubmenu" @mouseleave="scheduleCloseSubmenu">
      <div class="flex-1 py-4 overflow-y-auto sidebar-scroll">
        <div class="space-y-1 px-3">
          <div v-for="(item, index) in submenuItems" :key="`${activeParentCategory}-${index}-${item}`" class="transform transition-all duration-300 ease-out">
            <a href="#" class="group flex items-center px-4 py-3 text-[#0C1A30] rounded-lg hover:bg-gray-50 transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-sm">
              <span class="font-medium group-hover:translate-x-1 transition-transform duration-200">
                {{ item }}
              </span>
            </a>
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
const selectedCategory = ref('Мебель')
const isVisible = ref(false)
const isSubmenuOpen = ref(false)
const activeParentCategory = ref(null)
const submenuItems = ref([])
let closeSubmenuTimeoutId = null

// Categories data matching the image
// const categories = ref([
//   { name: 'Мебель', children: ['Диваны', 'Стулья', 'Столы', 'Шкафы', 'Тумбы'] },
//   { name: 'Кухня и столовая', children: ['Посуда', 'Кухонная техника', 'Столовые приборы'] },
//   { name: 'Спальня', children: ['Кровати', 'Матрасы', 'Комоды'] },
//   { name: 'Ванная комната' },
//   { name: 'Гостиная' },
//   { name: 'Офис' },
//   { name: 'Детская комната' },
//   { name: 'Прихожая' },
//   { name: 'Освещение' },
//   { name: 'Текстиль и декор' },
//   { name: 'Уборка и стирка' },
//   { name: 'Освещение' },
//   { name: 'Текстиль и декор' },
//   { name: 'Уборка и стирка' },
//   { name: 'Освещение' },
//   { name: 'Текстиль и декор' },
//   { name: 'Уборка и стирка' },
//   { name: 'Кухонные принадлежности' },
//   { name: 'Сад и огород' },
//   { name: 'Инструменты и техника' },
//   { name: 'Товары для животных' }
// ])

// Methods
const toggleMobileMenu = () => {
  emit('toggleMobileMenu')
}

const selectCategory = (categoryName) => {
  selectedCategory.value = categoryName
  if (window.innerWidth < 768) {
    emit('toggleMobileMenu', false)
  }
}

const onCategoryMouseEnter = (category) => {
  if (category && category.children && category.children.length) {
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
  console.log(categories.value);
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
  border-radius: 9999px; /* rounded-full */
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