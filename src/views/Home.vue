<template>
    <Banner />
    <CategorySection :sectionTitle="'Meşhur bölümlerimiz'" :categories="categories" />
    <TopProductSection :products="mostPurchasedProducts" />
    <ProductSection 
        v-for="category in categoriesWithProducts" 
        :key="category.id"
        :sectionTitle="category.name" 
        :products="categoryProducts[category?.id] || []" 
        :link="`/product/list?category=${category.id}`"
    />
    <!-- Login -->
    <LoginModal v-model="isLoginModal" @forgot_password="openResetPassword" @register="openRegister" @success="fetchData" />
    <RegisterModal v-model="isRegisterModal" @send_otp="send_otp" @login="openLogin" />
    <OtpModal v-model="isOtpModal" :data="otpData" @success="fetchData" />
    <ResetPasswordModal v-model="isResetPasswordModal" @success="fetchData" />
</template>

<script setup>
const authStore = useAuthStore()
const categoryStore = useCategoriesStore()
const isLoginModal = ref(false)
const isOtpModal = ref(false)
const isRegisterModal = ref(false)
const isResetPasswordModal = ref(false)
const otpData = ref({})
const route = useRoute();

const productStore = useProductsStore()
const { fetchMostPurchasedProducts } = productStore
const { categories } = storeToRefs(categoryStore)
const { fetchCategories, fetchCategoryProducts } = categoryStore
const likesStore = useLikesStore()
const { fetchLikes } = likesStore
const mostPurchasedProducts = ref([])
const categoryProducts = ref({})

// Computed property to filter categories that have products and limit to max 3
const categoriesWithProducts = computed(() => {
    if (!categories.value) return []
    
    return categories.value
        .filter(category => {
            const products = categoryProducts.value[category.id]
            return products && products.length > 0
        })
        .slice(0, 3) // Limit to maximum 3 categories
})

// Ensure modal visibility reflects authentication state on load and updates
const syncRegisterModal = () => {
    isRegisterModal.value = !authStore.isAuthenticated
}

const fetchData = async (isTrue) => {
    if (isTrue) {
        // Fetch categories and their products
        await fetchCategories()
        await fetchLikes()
        mostPurchasedProducts.value = await fetchMostPurchasedProducts()
        
        // Fetch products for each category
        if (categories.value && categories.value.length > 0) {
            let counter = 0
            for (const category of categories.value) {
                try {
                    const products = await fetchCategoryProducts(category.id)
                    if (products.length > 0) counter++
                    categoryProducts.value[category.id] = products
                    if (counter > 2) break
                } catch (error) {
                    console.error(`Error fetching products for category ${category.id}:`, error)
                    categoryProducts.value[category.id] = []
                }
            }
        }
    }
}

onMounted(async () => {
    // Load tokens
    authStore.loadTokens()
    syncRegisterModal()
    // Fetch data
    await fetchData(true)
})

watch(() => [authStore.isAuthenticated, route.query.refresh], () => {
    if (authStore.isAuthenticated) {
        isRegisterModal.value = false
    }
})

const openLogin = () => {
    isRegisterModal.value = false
    isLoginModal.value = true
}

const openResetPassword = () => {
    isLoginModal.value = false
    isResetPasswordModal.value = true
}

const openRegister = () => {
    isLoginModal.value = false
    isRegisterModal.value = true
}

const send_otp = (data) => {
    otpData.value = data
    isRegisterModal.value = false
    isOtpModal.value = true
}
</script>