<template>
  <component :is="layout"></component>
</template>

<script setup>
import baseLayout from '@/layouts/baseLayout.vue';
const route = useRoute()
const layouts = {
  'base-layout': baseLayout,
}
const layout = computed(() => {
  return layouts[route.meta.layout] || layouts['base-layout']
})
</script>