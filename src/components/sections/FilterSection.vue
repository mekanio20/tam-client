<template>
    <div class="w-full bg-white">
        <MainContainer>
            <!-- Filter Controls -->
            <section class="flex flex-wrap items-center gap-3 mb-6">
                <!-- Arzanlayış Button -->
                <button
                    class="bg-gradient-to-r from-[#FF6F00] to-[#FEB918] hover:bg-orange-600 px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 group">
                    <span class="text-white font-semibold">Arzanladyş</span>
                    <offer-icon />
                </button>

                <!-- Filter Dropdown -->
                <div class="relative" ref="filterRef">
                    <button @click="toggleFilter"
                        class="bg-[#F6F7F9] px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3">
                        <filter-icon />
                        <span class="text-[#0C1A30]">Filter</span>
                    </button>
                </div>

                <!-- Sort Dropdown -->
                <div class="relative" ref="sortRef">
                    <button @click="toggleSort"
                        class="bg-[#F6F7F9] px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-between gap-3 min-w-[215px]">
                        <div class="flex items-center gap-3">
                            <sort-icon />
                            <span class="text-[#0C1A30]"> {{ selectedSort }}</span>
                        </div>
                        <dropdown-icon :isRotate="isSortOpen" />
                    </button>

                    <!-- Sort Options Menu -->
                    <Transition name="dropdown">
                        <div v-if="isSortOpen"
                            class="absolute top-full left-0 mt-2 w-full bg-white shadow-xl border border-[#F6F7F9] min-w-[250px] rounded-lg z-50">
                            <div v-for="(option, index) in options" :key="index" @click="selectSort(option)"
                                class="flex items-center px-4 py-3 cursor-pointer transition-all duration-200 hover:bg-gray-50">
                                <!-- Radio Button -->
                                <div class="flex items-center justify-center mr-4">
                                    <div v-if="selectedSort === option"
                                        class="w-5 h-5 bg-[#037D84] rounded-full flex items-center justify-center">
                                        <check-icon />
                                    </div>
                                    <div v-else class="w-5 h-5 border-2 border-[#EDEDED] rounded-full"></div>
                                </div>

                                <!-- Option Text -->
                                <span class="text-[#0C1A30] font-normal">
                                    {{ option }}
                                </span>
                            </div>
                        </div>
                    </Transition>
                </div>

                <div class="relative" ref="categoryRef">
                    <!-- Category Dropdown -->
                    <button @click="toggleCategory"
                        class="bg-[#F6F7F9] px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-between gap-3 min-w-[215px]">
                        <span class="text-[#0C1A30]">{{ selectedCategory }}</span>
                        <dropdown-icon :isRotate="isCategoryOpen" />
                    </button>

                    <!-- Category Options Menu -->
                    <Transition name="dropdown">
                        <div v-if="isCategoryOpen"
                            class="absolute top-full left-0 mt-2 w-full max-h-[200px] overflow-y-auto bg-white shadow-xl border border-[#F6F7F9] rounded-lg z-50">
                            <button v-for="(category, index) in categories" :key="category"
                                @click="selectCategory(category)"
                                class="w-full flex items-center px-4 py-3 cursor-pointer transition-all duration-200 hover:bg-gray-50"
                                :class="{
                        'text-[#037D84] bg-[#F6F7F9]': selectedCategory === category,
                        'text-[#0C1A30]': selectedCategory !== category
                    }" v-motion :initial="{ opacity: 0, x: 10 }" :enter="{ opacity: 1, x: 0 }" :delay="index * 50">
                                {{ category }}
                            </button>
                        </div>
                    </Transition>
                </div>

            </section>
        </MainContainer>
    </div>
</template>

<script setup>
// Refs
const filterRef = ref(null)
const sortRef = ref(null)
const categoryRef = ref(null)

// State
const isFilterOpen = ref(false)
const isSortOpen = ref(false)
const isCategoryOpen = ref(false)
const selectedSort = ref('Köne harytlar')
const selectedCategory = ref('Kiçi kategoriya')

// Options
const options = [
    'Täze harytlar',
    'Köne harytlar',
    'Arzandan gymmada',
    'Gymmatdan arzana',
    'Köp satylanlar'
]

const categories = [
    'Kiçi kategoriya',
    'Uly kategoriya',
    'Orta kategoriya',
    'Premium kategoriya'
]

// Products data
const products = ref([
    {
        id: 1,
        name: 'Tabak doly',
        description: 'Ýaşyl reňkli keramika tabaklar',
        price: 45.00,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
        favorite: false
    },
    {
        id: 2,
        name: 'Pletka sebetler',
        description: 'Tebigy materiallardan sebetler',
        price: 32.50,
        image: 'https://images.unsplash.com/photo-1586083702768-190ae093d34d?w=400&h=300&fit=crop',
        favorite: false
    },
    {
        id: 3,
        name: 'Aşhana gurallary',
        description: 'Premium hil gurallary',
        price: 89.90,
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
        favorite: true
    },
    {
        id: 4,
        name: 'Keramika çanaklar',
        description: 'Dürli ölçegdäki çanaklar',
        price: 28.75,
        image: 'https://images.unsplash.com/photo-1584054062862-90577b7b8eff?w=400&h=300&fit=crop',
        favorite: false
    }
])

// Methods
const toggleFilter = () => {
    isFilterOpen.value = !isFilterOpen.value
    isSortOpen.value = false
    isCategoryOpen.value = false
}

const toggleSort = () => {
    isSortOpen.value = !isSortOpen.value
    isFilterOpen.value = false
    isCategoryOpen.value = false
}

const toggleCategory = () => {
    isCategoryOpen.value = !isCategoryOpen.value
    isFilterOpen.value = false
    isSortOpen.value = false
}

const selectSort = (option) => {
    selectedSort.value = option
    isSortOpen.value = false
}

const selectCategory = (category) => {
    selectedCategory.value = category
    isCategoryOpen.value = false
}

// Click outside handler
const handleClickOutside = (event) => {
    if (filterRef.value && !filterRef.value.contains(event.target)) {
        isFilterOpen.value = false
    }
    if (sortRef.value && !sortRef.value.contains(event.target)) {
        isSortOpen.value = false
    }
    if (categoryRef.value && !categoryRef.value.contains(event.target)) {
        isCategoryOpen.value = false
    }
}

// Lifecycle
onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-8px) scale(0.95);
}

.dropdown-enter-to,
.dropdown-leave-from {
    opacity: 1;
    transform: translateY(0) scale(1);
}
</style>