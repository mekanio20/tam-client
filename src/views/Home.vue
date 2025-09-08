<template>
    <Banner />
    <CategorySection :sectionTitle="'Meşhur bölümlerimiz'" :categories="categories.categories.slice(0, 4)" />
    <TopProductSection />
    <ProductSection :sectionTitle="'Ýagtylandyryş'" :products="products" @toggleFavorite="toggleFavorite"
        @addToCart="addToCart" />
    <ProductSection :sectionTitle="'Gap-gaçlar'" :products="products" @toggleFavorite="toggleFavorite"
        @addToCart="addToCart" />
    <ProductSection :sectionTitle="'Siziň üçin harytlar'" :products="products" @toggleFavorite="toggleFavorite"
        @addToCart="addToCart" />
    <!-- Login -->
    <LoginModal v-model="isLoginModal" @forgot_password="openResetPassword" @register="openRegister" />
    <RegisterModal v-model="isRegisterModal" @send_otp="send_otp" @login="openLogin" />
    <OtpModal v-model="isOtpModal" :data="otpData" />
    <ResetPasswordModal v-model="isResetPasswordModal" />
</template>

<script setup>
const categories = useCategoriesStore()
const auth = useAuthStore()
const isLoginModal = ref(false)
const isOtpModal = ref(false)
const isRegisterModal = ref(false)
const isResetPasswordModal = ref(false)
const otpData = ref({})

// Ensure modal visibility reflects authentication state on load and updates
const syncRegisterModal = () => {
    console.log('Auth', auth.isAuthenticated);
    isRegisterModal.value = !auth.isAuthenticated
}

onMounted(() => {
    auth.loadTokens()
    syncRegisterModal()
})

watch(() => auth.isAuthenticated, () => {
    if (auth.isAuthenticated) {
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
const toggleFavorite = (id) => {
    const product = products.value.find(product => product.id === id)
    product.favorite = !product.favorite
}
const addToCart = (product) => {
    console.log(product)
}

const products = ref([
    {
        id: 1,
        title: 'Щетка для уборки с совком для уборки',
        image: '/images/product-1.png',
        price: 2300,
        old_price: 3000,
        currency: 'TMT',
        favorite: false
    },
    {
        id: 2,
        title: 'Щетка для уборки с совком для уборки',
        image: '/images/product-1.png',
        price: 2300,
        old_price: 3000,
        currency: 'TMT',
        favorite: false
    },
    {
        id: 3,
        title: 'Щетка для уборки с совком для уборки',
        image: '/images/product-1.png',
        price: 2300,
        old_price: 3000,
        currency: 'TMT',
        favorite: false
    },
    {
        id: 4,
        title: 'Щетка для уборки с совком для уборки',
        image: '/images/product-1.png',
        price: 2300,
        old_price: 3000,
        currency: 'TMT',
        favorite: false
    },
    {
        id: 5,
        title: 'Щетка для уборки с совком для уборки',
        image: '/images/product-1.png',
        price: 2300,
        old_price: 3000,
        currency: 'TMT',
        favorite: false
    },
    {
        id: 6,
        title: 'Щетка для уборки с совком для уборки',
        image: '/images/product-1.png',
        price: 2300,
        old_price: 3000,
        currency: 'TMT',
        favorite: false
    }
])

// const categories = ref([
//     {
//         id: 1,
//         title: 'Ösümlikler',
//         image: '/images/com-5.webp',
//         bg_color: '#037D841F',
//         circle_bg_color: '#037D84',
//     },
//     {
//         id: 2,
//         title: 'Ösümlikler',
//         image: '/images/com-6.webp',
//         bg_color: '#FFC1071F',
//         circle_bg_color: '#FFC107'
//     },
//     {
//         id: 3,
//         title: 'Ösümlikler',
//         image: '/images/com-7.webp',
//         bg_color: '#FFC1071F',
//         circle_bg_color: '#FFC107'
//     },
//     {
//         id: 4,
//         title: 'Ösümlikler',
//         image: '/images/com-8.webp',
//         bg_color: '#FFC1071F',
//         circle_bg_color: '#FFC107'
//     },
//     {
//         id: 5,
//         title: 'Ösümlikler',
//         image: '/images/com-9.webp',
//         bg_color: '#FFC1071F',
//         circle_bg_color: '#FFC107'
//     },
//     {
//         id: 6,
//         title: 'Ösümlikler',
//         image: '/images/com-10.webp',
//         bg_color: '#FFC1071F',
//         circle_bg_color: '#FFC107'
//     }
// ])
</script>