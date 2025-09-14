<template>
    <form @submit.prevent="onSearch"
    class="sm:h-[44px] h-[42px] flex items-center border-[#FEB918] border-[1px] bg-[#FEB918] rounded-lg overflow-hidden w-full">
      <!-- Input -->
      <input v-model="modelValueLocal" type="text" :placeholder="placeholder"
        class="flex-1 px-6 bg-white text-[#0C1A30] placeholder-[#838589] rounded-r-lg focus:outline-none h-full sm:text-sm text-xs"
        @input="emitInput" @focus="$emit('focus')" @blur="$emit('blur')" />
      <!-- Button -->
      <button @click="onSearch" type="submit"
        class="bg-[#FEB918] hover:bg-[#ecb10c] transition-all px-5 h-full flex items-center justify-center">
        <search-icon />
      </button>
    </form>
  </template>
  
  <script setup>
  // Props
  const props = defineProps({
    modelValue: String,
    placeholder: {
      type: String,
      default: ''
    }
  })
  
  // Emit
  const emit = defineEmits(['update:modelValue', 'search', 'focus', 'blur'])
  
  // Local v-model
  const modelValueLocal = ref(props.modelValue)
  
  watch(() => props.modelValue, (val) => {
    modelValueLocal.value = val
  })
  
  const emitInput = () => {
    emit('update:modelValue', modelValueLocal.value)
  }
  
  const onSearch = () => {
    emit('search', modelValueLocal.value)
  }
  </script>
  