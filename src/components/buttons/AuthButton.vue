<template>
    <button type="submit" :disabled="!isFormValid" :class="[
        'w-full py-4 font-bold rounded-lg transition-all duration-200 transform cursor-pointer',
        isFormValid
            ? 'bg-[#FEB918] hover:bg-yellow-500 text-white hover:scale-[1.01] active:scale-[0.98]'
            : 'bg-gray-200 text-white cursor-not-allowed'
    ]">
        {{ title }}
    </button>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    isFormValid: {
        type: Boolean,
        required: true
    }
})
</script>