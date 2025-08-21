<template>
    <div class="min-h-screen">
        <!-- Filter Drawer -->
        <Transition enter-active-class="transition-transform duration-300 ease-out" enter-from-class="translate-x-full"
            enter-to-class="translate-x-0" leave-active-class="transition-transform duration-300 ease-in"
            leave-from-class="translate-x-0" leave-to-class="translate-x-full" class="bg-gray-100 p-4">
            <div v-if="showSidebar"
                class="fixed right-0 top-0 h-full w-full max-w-[360px] bg-[#F6F7F9] z-50 overflow-y-auto">
                <!-- Header -->
                <div
                    class="flex items-center justify-between bg-white px-8 py-5 my-4 rounded-2xl border-b border-gray-100">
                    <h2 class="text-[22px] font-semibold text-[#0C1A30]">Filter</h2>
                    <button @click="$emit('close')"
                        class="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors duration-200">
                        <close-icon />
                    </button>
                </div>

                <!-- Price Section -->
                <div class="mb-4 px-8 bg-white p-4 rounded-2xl">
                    <h3 class="font-medium text-[#0C1A30] mb-4">Baha</h3>
                    <div class="grid grid-cols-2 gap-6">
                        <div class="flex flex-col space-y-2">
                            <label for="start" class="text-[13px] text-[#838589]">
                                Başlangyç
                            </label>
                            <input type="number" id="start" v-model="startPrice"
                                class="border-none outline-none p-3 bg-[#F6F7F9] rounded-md">
                        </div>
                        <div class="flex flex-col space-y-2">
                            <label for="end" class="text-[13px] text-[#838589]">
                                Soňy
                            </label>
                            <input type="number" id="end" v-model="endPrice"
                                class="border-none outline-none p-3 bg-[#F6F7F9] rounded-md">
                        </div>
                    </div>
                </div>

                <!-- Brend Section -->
                <div class="px-8 bg-white p-4 rounded-2xl">
                    <h3 class="font-medium text-[#0C1A30] mb-4">Brend</h3>
                    <div class="space-y-3">
                        <label v-for="option in brendOptions" :key="option.id"
                            class="flex items-center cursor-pointer group">
                            <input type="radio" :value="option.value" v-model="selectedBrend" class="sr-only">
                            <div :class="[
                'w-5 h-5 rounded-full border-2 mr-3 transition-all duration-200 flex items-center justify-center',
                selectedBrend === option.value
                    ? 'border-[#FEB918] bg-[#FEB918]'
                    : 'border-gray-300 group-hover:border-gray-400'
            ]">
                                <div v-if="selectedBrend === option.value" class="w-2 h-2 rounded-full bg-white" />
                            </div>
                            <span class="text-[#0C1A30] group-hover:text-[#182945] transition-colors duration-200">
                                {{ option.label }}
                            </span>
                        </label>
                    </div>

                    <!-- Show More Button -->
                    <button @click="showMore = !showMore"
                        class="text-[#FEB918] text-sm font-medium mt-4 hover:text-[#e9b947] transition-colors duration-200">
                        {{ showMore ? 'Az görkez...' : 'Ählisini gör......' }}
                    </button>

                    <!-- Additional Options (Hidden by default) -->
                    <Transition enter-active-class="transition-all duration-300 ease-out"
                        enter-from-class="max-h-0 opacity-0" enter-to-class="max-h-40 opacity-100"
                        leave-active-class="transition-all duration-300 ease-in" leave-from-class="max-h-40 opacity-100"
                        leave-to-class="max-h-0 opacity-0">
                        <div v-if="showMore" class="space-y-3 mt-3 overflow-hidden">
                            <label v-for="option in additionalBrendOptions" :key="option.id"
                                class="flex items-center cursor-pointer group">
                                <input type="radio" :value="option.value" v-model="selectedBrend" class="sr-only">
                                <div :class="[
                'w-5 h-5 rounded-full border-2 mr-3 transition-all duration-200 flex items-center justify-center',
                selectedBrend === option.value
                    ? 'border-[#FEB918] bg-[#FEB918]'
                    : 'border-gray-300 group-hover:border-gray-400'
            ]">
                                    <div v-if="selectedBrend === option.value" class="w-2 h-2 rounded-full bg-white" />
                                </div>
                                <span class="text-[#0C1A30] group-hover:text-[#182945] transition-colors duration-200">
                                    {{ option.label }}
                                </span>
                            </label>
                        </div>
                    </Transition>
                </div>

                <!-- Footer Buttons -->
                <div
                    class="border-t bg-white absolute bottom-4 left-0 right-0 rounded-2xl border-gray-100 p-6 flex gap-3">
                    <button @click="clearFilters"
                        class="flex-1 py-3 px-4 text-[#838589] bg-[#EBEBEB] rounded-lg hover:bg-gray-200 transition-colors duration-200">
                        Arassala
                    </button>
                    <button @click="applyFilters"
                        class="flex-1 py-3 px-4 bg-[#FEB918] text-white rounded-lg hover:opacity-60 duration-300 font-medium">
                        Filterle
                    </button>
                </div>
            </div>
        </Transition>
        <div v-if="showSidebar" @click="$emit('close')" class="fixed inset-0 bg-black bg-opacity-40 z-40" />
        <div :class="showSidebar ? 'blur-sm' : ''">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
defineProps({
    showSidebar: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['close', 'applyFilters'])
const startPrice = ref(0)
const endPrice = ref(0)
const selectedBrend = ref('')
const showMore = ref(false)

// Options
const brendOptions = [
    { id: 1, value: 'ak-bulut-1', label: 'Ak bulut' },
    { id: 2, value: 'silver-1', label: 'Silver' },
    { id: 3, value: 'ak-bulut-2', label: 'Ak bulut' },
    { id: 4, value: 'silver-2', label: 'Silver' }
]

const additionalBrendOptions = [
    { id: 5, value: 'premium', label: 'Premium' },
    { id: 6, value: 'deluxe', label: 'Deluxe' },
    { id: 7, value: 'classic', label: 'Classic' }
]

// Methods
const clearFilters = () => {
    startPrice.value = 0
    endPrice.value = 0
    selectedBrend.value = ''
    showMore.value = false
}

const applyFilters = () => {
    emit('applyFilters', {
        start_price: startPrice.value,
        end_price: endPrice.value,
        brend: selectedBrend.value
    })
}
</script>