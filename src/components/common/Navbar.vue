<template>
    <div class="bg-white overflow-visible no-scrollbar rounded-b-3xl relative">
        <MainContainer class="flex items-center justify-between">
            <div class="w-[180px] flex-shrink-0">
                <logo-icon />
            </div>
            <div class="flex items-center space-x-5">
                <button type="button" @click="toggleMobileMenu"
                    class="flex items-center space-x-3 bg-[#FEB918] rounded-lg px-4 py-3 cursor-pointer">
                    <grid-icon v-if="!isMobileMenuOpen" />
                    <!-- close svg -->
                    <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="#fff" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M6 6L18 18" stroke="#fff" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>


                    <span class="font-semibold text-white leading-[100%]">Bölümler</span>
                </button>
                <div class="w-[520px]">
                    <SearchBar v-model="searchQuery" :placeholder="'Haryt ady boýunça gözle...'"
                        @search="handleSearch" />
                </div>
                <div class="flex items-end space-x-4">
                    <LanguageButton />
                    <div v-for="item in items" :key="item.id" class="flex items-center space-x-20 pb-[8px]">
                        <div class="flex flex-col items-center space-y-1">
                            <component :is="icons[item?.icon]" />
                            <span class="text-[12px] text-[#0C1A30]">{{ item.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>
    </div>
</template>

<script setup>
const emit = defineEmits(['openSidebar'])
const props = defineProps({ isMobileMenuOpen: Boolean })
const { icons, loadIcons } = useIcons()
onMounted(() => { loadIcons() })

const searchQuery = ref('');
const items = ref([
    { id: 1, name: 'Sargytlar', icon: 'order-icon' },
    { id: 2, name: 'Halananlar', icon: 'favorite-icon' },
    { id: 3, name: 'Hasap', icon: 'user-icon' },
    { id: 4, name: 'Sebet', icon: 'shopping_cart-icon' },
]);
const handleSearch = () => {
    console.log(searchQuery.value);
};
const toggleMobileMenu = () => {
    emit('openSidebar')
}
</script>