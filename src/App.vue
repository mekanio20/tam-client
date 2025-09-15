<template>
  <component :is="layout"></component>
  
  <!-- Toast Container -->
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <Toast
      v-for="toast in toasts"
      :key="toast.id"
      :toast="toast"
      @close="removeToast(toast.id)"
    />
  </div>

  <!-- City Select Modal -->
  <CitySelectModal
    v-model="showCityModal"
    :cities="cities"
    @select="handleCitySelect"
  />
</template>

<script setup>
import baseLayout from '@/layouts/baseLayout.vue';
const { toasts, removeToast } = useToast()
const route = useRoute()
const cities = ref([])
const showCityModal = ref(false)
const productStore = useProductsStore()
const { fetchAvailableCities } = productStore

const layouts = {
  'base-layout': baseLayout,
}
const layout = computed(() => {
  return layouts[route.meta.layout] || layouts['base-layout']
})

onMounted(async () => {
  cities.value = await fetchAvailableCities()
  const storedCity = localStorage.getItem('city')
  if (!storedCity) {
    showCityModal.value = true
  }
})

const handleCitySelect = (selected) => {
  try {
    const code = typeof selected === 'string'
      ? selected
      : (selected.code ?? selected.value ?? selected.id ?? selected.name ?? '')
    if (!code) return
    localStorage.setItem('city', String(code))
  } catch (e) {
    // Fallback to storing raw string if stringify fails
    localStorage.setItem('city', String(selected))
  }
}
</script>