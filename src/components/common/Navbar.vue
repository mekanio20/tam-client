<template>
    <div class="max-w-[1500px] mx-auto bg-white">
        <MainContainer class="flex items-center justify-between">
            <router-link to="/" class="w-[150px] flex-shrink-0">
                <logo-icon />
            </router-link>
            <div class="flex items-center space-x-5">
                <button type="button" @click="toggleMobileMenu"
                    class="sm:flex hidden items-center space-x-3 bg-[#FEB918] rounded-lg px-4 py-3 cursor-pointer">
                    <grid-icon v-if="!isMobileMenuOpen" />
                    <!-- close svg -->
                    <close_menu-icon v-else />
                    <span class="font-semibold text-white leading-[100%]">Bölümler</span>
                </button>
                <div class="lg:block w-[400px] hidden">
                    <SearchBar v-model="searchQuery" :placeholder="'Haryt ady boýunça gözle...'"
                        @search="handleSearch" />
                </div>
                <div class="flex items-end space-x-4">
                    <LanguageButton />
                    <router-link v-for="item in items" :key="item.id" :to="item.link" @mouseenter="hovered = item.id"
                        @mouseleave="hovered = null"
                        class="sm:flex items-center space-x-20 pb-[8px] group hidden transition-colors duration-300">
                        <div class="flex flex-col items-center space-y-1 relative">
                            <div v-if="item.name === 'Sebet' && getItemCount() > 0" class="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#037D84] flex items-center justify-center text-[9px] font-semibold text-white">
                                {{ getItemCount() }}
                            </div>
                            <component :is="icons[item?.icon]" :color="hovered === item.id ? '#FEB918' : '#0C1A30'" />
                            <span class="text-[12px] text-[#0C1A30] group-hover:text-[#FEB918]">{{
                    item.name }}</span>
                        </div>
                    </router-link>
                </div>
            </div>
        </MainContainer>

        <!-- Mobile Bottom Navigation -->
        <div class="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 !z-50">
            <div class="flex items-center justify-evenly py-2">
                <button type="button" @click="toggleMobileMenu" @mouseenter="hovered = 'categories'"
                    @mouseleave="hovered = null"
                    class="flex flex-col items-center space-y-1 py-2 px-3 rounded-lg group transition-colors duration-300">
                    <grid-icon :color="hovered === 'categories' ? '#FEB918' : '#0C1A30'" :size="24" />
                    <span class="text-[10px] text-[#0C1A30] group-hover:text-[#FEB918]">Bölümler</span>
                </button>
                <router-link v-for="item in items" :key="item.id" :to="item.link" @mouseenter="hovered = item.id"
                    @mouseleave="hovered = null"
                    class="flex flex-col items-center space-y-1 py-2 px-3 rounded-lg group transition-colors duration-300">
                    <component :is="icons[item?.icon]" :color="hovered === item.id ? '#FEB918' : '#0C1A30'" />
                    <span class="text-[10px] text-[#0C1A30] group-hover:text-[#FEB918]">{{
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
onMounted(() => loadIcons())

const router = useRouter()
const searchQuery = ref('');
const hovered = ref(null)
const cartStore = useCartStore()
const { getItemCount } = cartStore
const items = ref([
    { id: 1, link: '/account', name: 'Hasap', icon: 'user-icon' },
    { id: 2, link: '/account/basket', name: 'Sebet', icon: 'shopping_cart-icon' },
    { id: 3, link: '/account/favorites', name: 'Halananlar', icon: 'favorite-icon' },
    { id: 4, link: '/account/orders', name: 'Sargytlar', icon: 'order-icon' },
]);
const handleSearch = (value) => {
    if (typeof value === 'string') {
        searchQuery.value = value
    }
    if (searchQuery.value && searchQuery.value.trim().length > 0) {
        router.push({ name: 'SearchResults', query: { q: searchQuery.value.trim() } })
    }
};
const toggleMobileMenu = () => {
    emit('openSidebar')
}
</script>