<template>
    <div class="min-h-screen">
        <!-- Header -->
        <MainContainer>
            <div class="pt-6">
                <LinkGroup :items="[{ label: 'Sebet', to: '/account/basket' }]" />
            </div>
            <!-- Title -->
            <div class="py-8 lg:w-[950px]">
                <div class="flex items-center justify-between">
                    <div class="flex items-end space-x-5">
                        <h1 class="text-[30px] font-semibold text-[#0C1A30]">Sebet</h1>
                        <span class="text-[#838589] text-sm pb-2">{{ cartItems.length }} haryt</span>
                    </div>
                    <button @click="clearCart"
                        class="flex items-center space-x-2 bg-[#FA004C] text-white px-4 py-2 rounded-lg font-medium hover:opacity-60 transition-opacity duration-300">
                        <delete-icon :size="18" color="white" />
                        <span>Arassala</span>
                    </button>
                </div>
            </div>
            <!-- Content -->
            <div class="w-full flex lg:flex-row flex-col items-start lg:space-x-6 lg:space-y-0 space-y-6 mb-10">
                <!-- Cart Items -->
                <div class="lg:w-[950px] w-full space-y-4 px-4 py-8 bg-white rounded-xl overflow-hidden">
                    <TransitionGroup enter-active-class="transition-all duration-300 ease-out"
                        enter-from-class="opacity-0 transform translate-x-8"
                        enter-to-class="opacity-100 transform translate-x-0"
                        leave-active-class="transition-all duration-200 ease-in"
                        leave-from-class="opacity-100 transform translate-x-0"
                        leave-to-class="opacity-0 transform translate-x-8"
                        move-class="transition-transform duration-300 ease-out">
                        <div v-for="(item, index) in cartItems" :key="index"
                            class="bg-white rounded-xl py-6 border-b border-[#EDEDED]"
                            :class="{ 'border-b-0 pb-0': index === cartItems.length - 1 }">
                            <div class="flex items-start space-x-4">
                                <!-- Product Image -->
                                <div
                                    class="w-[100px] h-[105px] bg-gradient-to-br from-green-400 to-green-600 rounded-[10px] flex items-center justify-center flex-shrink-0">
                                </div>

                                <!-- Product Info -->
                                <div class="flex-1 flex items-center space-x-8 min-w-0 pr-6">
                                    <div class="w-[238px] h-[105px] flex flex-col justify-between flex-shrink-0">
                                        <h3 class="text-base font-medium text-[#0C1A30] mb-1">
                                            {{ item.name }}
                                        </h3>
                                        <div class="flex items-center space-x-4">
                                            <button @click="toggleFavorite(item.id)"
                                                class="w-[33px] h-[33px] bg-[#F6F7F9] rounded-full flex items-center justify-center cursor-pointer">
                                                <favorite-icon :size="16"
                                                    :color="item.isFavorite ? '#FA004C' : '#A9A9A9'"
                                                    :fill="item.isFavorite ? '#FA004C' : 'transparent'" />
                                            </button>
                                            <button @click="removeItem(item.id)"
                                                class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                                                <delete-icon :size="16" color="#A9A9A9" />
                                            </button>
                                        </div>
                                    </div>
                                    <div class="w-full flex items-center justify-between">
                                        <!-- Price -->
                                        <div class="font-semibold text-[#0C1A30]">
                                            {{ item.price }} TMT
                                        </div>

                                        <!-- Quantity Controls -->
                                        <div class="flex items-center space-x-1">
                                            <button @click="decreaseQuantity(item.id)" :disabled="item.quantity <= 1"
                                                class="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5F5F5] text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                                -
                                            </button>

                                            <span class="w-8 text-center font-medium text-[#0C1A30]">
                                                {{ item.quantity }}
                                            </span>

                                            <button @click="increaseQuantity(item.id)"
                                                class="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5F5F5] text-gray-600 hover:bg-gray-200 transition-colors">
                                                +
                                            </button>
                                        </div>

                                        <!-- Total Price -->
                                        <div class="font-semibold text-[#0C1A30] ml-4">
                                            {{ item.price * item.quantity }} TMT
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TransitionGroup>

                    <!-- Empty Cart State -->
                    <div v-if="cartItems.length === 0" class="text-center py-12">
                        <svg class="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <h3 class="mt-4 text-lg font-medium text-[#0C1A30]">Sebet boş</h3>
                        <p class="mt-2 text-sm text-gray-500">Haryt goşmak üçin dükan sahypasyna gidiň</p>
                    </div>
                </div>

                <!-- Order Summary -->
                <div class="lg:w-[370px] w-full py-6 p-8 bg-white rounded-xl sticky top-32">
                    <!-- Promo Code Section -->
                    <div class="mb-4">
                        <div class="flex items-center space-x-2 p-3 bg-[#F6F7F9] rounded-lg mb-4">
                            <div class="w-7 h-7 bg-[#037D841F] rounded-full flex items-center justify-center">
                                <discount_circle-icon />
                            </div>
                            <span class="text-sm text-[#838589]">Promokod giriziň</span>
                        </div>

                        <div class="flex items-center space-x-2 p-3 bg-[#F6F7F9] rounded-lg mb-4">
                            <div class="w-7 h-7 bg-[#FEB91826] rounded-full flex items-center justify-center">
                                <star-icon />
                            </div>
                            <span class="text-sm text-[#0C1A30]">Arzanladyş kartyny ulan</span>
                        </div>
                    </div>

                    <!-- Price Breakdown -->
                    <div class="space-y-3 mb-6">
                        <div class="py-6 space-y-3">
                            <div class="flex justify-between items-center">
                                <span class="text-[#0C1A30]">Jemi:</span>
                                <span class="font-medium text-[#0C1A30]">{{ subtotal }} TMT</span>
                            </div>

                            <div class="flex justify-between items-center">
                                <span class="text-[#0C1A30]">Arzanladyş:</span>
                                <span class="font-medium text-[#FA004C]">-{{ discount }} TMT</span>
                            </div>

                            <div class="flex justify-between items-center">
                                <span class="text-[#0C1A30]">Arzanladyş kupony:</span>
                                <span class="font-medium text-[#FEB918]">-{{ couponDiscount }} TMT</span>
                            </div>
                        </div>

                        <div class="border-t border-[#EDEDED] pt-3">
                            <div class="flex justify-between items-center pt-4">
                                <span class="font-medium text-[#0C1A30]">Jemi:</span>
                                <span class="font-bold text-[#037D84]">{{ total }} TMT</span>
                            </div>
                        </div>
                    </div>

                    <!-- Checkout Button -->
                    <button @click="checkout" :disabled="cartItems.length === 0"
                        class="w-full bg-[#FEB918] text-white font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors transform hover:scale-[1.02] active:scale-[0.98]">
                        Sargyt etmek
                    </button>
                </div>
            </div>
        </MainContainer>
        <!--  -->
        <ProductSection :sectionTitle="'Siziň üçin harytlar'" :products="products" @toggleFavorite="_toggleFavorite"
            @addToCart="addToCart" />
    </div>
</template>

<script setup>
// Cart items data
const cartItems = ref([
    {
        id: 1,
        name: 'Щетка для уборки с совком для уборки',
        description: 'Arassaçylyk üçin enjam',
        price: 2500,
        quantity: 5,
        isFavorite: false
    },
    {
        id: 2,
        name: 'Щетка для уборки с совком для уборки',
        description: 'Arassaçylyk üçin enjam',
        price: 2500,
        quantity: 5,
        isFavorite: true
    },
    {
        id: 3,
        name: 'Щетка для уборки с совком для уборки',
        description: 'Arassaçylyk üçin enjam',
        price: 2500,
        quantity: 5,
        isFavorite: false
    },
    {
        id: 4,
        name: 'Щетка для уборки с совком для уборки',
        description: 'Arassaçylyk üçin enjam',
        price: 2500,
        quantity: 5,
        isFavorite: false
    }
])
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

// Computed properties for pricing
const subtotal = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const discount = computed(() => 250)
const couponDiscount = computed(() => 250)

const total = computed(() => {
    return subtotal.value - discount.value - couponDiscount.value
})

// Methods
const increaseQuantity = (id) => {
    const item = cartItems.value.find(item => item.id === id)
    if (item) {
        item.quantity++
    }
}

const decreaseQuantity = (id) => {
    const item = cartItems.value.find(item => item.id === id)
    if (item && item.quantity > 1) {
        item.quantity--
    }
}

const toggleFavorite = (id) => {
    const item = cartItems.value.find(item => item.id === id)
    if (item) {
        item.isFavorite = !item.isFavorite
    }
}

const _toggleFavorite = (id) => {
    const product = products.value.find(product => product.id === id)
    product.favorite = !product.favorite
}

const removeItem = (id) => {
    const index = cartItems.value.findIndex(item => item.id === id)
    if (index !== -1) {
        cartItems.value.splice(index, 1)
    }
}

const clearCart = () => {
    cartItems.value = []
}

const checkout = () => {
    if (cartItems.value.length === 0) return

    // Handle checkout logic
    console.log('Checkout initiated with items:', cartItems.value)
    console.log('Total amount:', total.value, 'TMT')

    // You can emit an event or navigate to checkout page
    alert(`Sargyt tassyklandy! Jemi: ${total.value} TMT`)
}

const addToCart = (product) => {
    console.log(product)
}
</script>