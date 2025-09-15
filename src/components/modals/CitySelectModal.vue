<template>
  <div v-if="modelValue" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="$emit('update:modelValue', false)">
    <div class="relative bg-white rounded-[14px] w-full max-w-md mx-auto transform transition-all duration-300 ease-out" @click.stop>
      <button @click="$emit('update:modelValue', false)" class="w-[38px] h-[38px] absolute top-[30px] right-4 rounded-full bg-[#F6F7F9] flex items-center justify-center transition-colors duration-200 z-10">
        <close-icon />
      </button>

      <div class="absolute top-16 right-0 -z-10 overflow-hidden rounded-tr-2xl">
        <div class="w-[100px]">
          <img src="/icons/bg-1.png" />
        </div>
      </div>

      <div class="px-6 pt-8 pb-6 text-center">
        <ModalTitle :title="title" />
      </div>

      <div class="px-6 pb-6">
        <div class="space-y-3 max-h-72 overflow-auto pr-1">
          <button
            v-for="city in cities"
            :key="city.id || city.value || city"
            @click="selectCity(city)"
            class="w-full text-left px-4 py-3 rounded-lg border border-[#F0F1F3] hover:border-[#037D84] hover:text-[#037D84] transition-colors duration-200"
          >
            {{ displayCity(city) }}
          </button>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Boolean, required: true },
  cities: { type: Array, default: () => [] },
  title: { type: String, default: 'Şäheri saýlaň' },
})
const emit = defineEmits(['update:modelValue', 'select'])

const displayCity = (city) => {
  if (typeof city === 'string') return city
  return city.name || city.title || city.label || city.value || ''
}

const selectCity = (city) => {
  emit('select', city)
  emit('update:modelValue', false)
}
</script>


