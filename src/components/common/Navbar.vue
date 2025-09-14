<template>
    <div class="bg-white overflow-visible no-scrollbar rounded-none sm:rounded-b-3xl relative">
        <MainContainer class="flex items-center justify-between">
            <router-link to="/" class="w-[150px] flex-shrink-0">
                <logo-icon />
            </router-link>
            <div class="flex items-center space-x-5">
                <button type="button" @click="toggleMobileMenu"
                    class="sm:flex hidden items-center space-x-3 bg-[#FEB918] rounded-lg px-4 py-3 cursor-pointer">
                    <grid-icon v-if="!isMobileMenuOpen" />
                    <!-- close svg -->
                    <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="#fff" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M6 6L18 18" stroke="#fff" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                    <span class="font-semibold text-white leading-[100%]">Bölümler</span>
                </button>
                <div class="lg:block w-[400px] hidden">
                    <SearchBar v-model="searchQuery" :placeholder="'Haryt ady boýunça gözle...'"
                        @search="handleSearch" />
                </div>
                <div class="flex items-end space-x-4">
                    <LanguageButton />
                    <router-link v-for="item in items" :key="item.id" :to="item.link"
                        class="sm:flex items-center space-x-20 pb-[8px] group hidden">
                        <div class="flex flex-col items-center space-y-1">
                            <component :is="icons[item?.icon]" />
                            <span
                                class="text-[12px] text-[#0C1A30] group-hover:text-[#FEB918] transition-colors duration-200 ">{{
                    item.name }}</span>
                        </div>
                    </router-link>
                </div>
            </div>
        </MainContainer>

        <!-- Mobile Bottom Navigation -->
        <div class="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
            <div class="flex items-center justify-around py-2">
                <button type="button" @click="toggleMobileMenu"
                    class="flex flex-col items-center space-y-1 py-2 px-3 rounded-lg group">
                    <grid-icon color="#0C1A30" :size="24" />
                    <span
                        class="text-[10px] text-[#0C1A30] group-hover:text-[#FEB918] transition-colors duration-200">Bölümler</span>
                </button>
                <router-link v-for="item in items" :key="item.id" :to="item.link"
                    class="flex flex-col items-center space-y-1 py-2 px-3 rounded-lg group">
                    <component :is="icons[item?.icon]" />
                    <span
                        class="text-[10px] text-[#0C1A30] group-hover:text-[#FEB918] transition-colors duration-200">{{
                    item.name }}</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['openSidebar'])
const props = defineProps({ isMobileMenuOpen: Boolean })
const { icons, loadIcons } = useIcons()
onMounted(() => { loadIcons() })

const searchQuery = ref('');
const items = ref([
    { id: 1, link: '/account', name: 'Hasap', icon: 'user-icon' },
    { id: 2, link: '/account/basket', name: 'Sebet', icon: 'shopping_cart-icon' },
    { id: 3, link: '/account/favorites', name: 'Halananlar', icon: 'favorite-icon' },
    { id: 4, link: '/account/orders', name: 'Sargytlar', icon: 'order-icon' },
]);
const handleSearch = () => {
    console.log(searchQuery.value);
};
const toggleMobileMenu = () => {
    emit('openSidebar')
}
</script>