<template>
    <input :id="label" :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder"
        class="w-full px-5 py-4 bg-[#F6F7F9] border-0 rounded-[10px] focus:ring-1 focus:ring-[#FEB918] focus:bg-white outline-none transition-all duration-200 pr-12" />
</template>

<script setup>
defineProps({
    modelValue: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
    label: {
        type: String,
        default: ''
    }
})
</script>