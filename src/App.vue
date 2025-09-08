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
</template>

<script setup>
import baseLayout from '@/layouts/baseLayout.vue';
import Toast from '@/components/common/Toast.vue';
import { useToast } from '@/composables/useToast.js';

const route = useRoute()
const { toasts, removeToast } = useToast()

const layouts = {
  'base-layout': baseLayout,
}
const layout = computed(() => {
  return layouts[route.meta.layout] || layouts['base-layout']
})
</script>