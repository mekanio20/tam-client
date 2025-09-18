<template>
    <div class="min-h-screen">
        <!-- Header -->
        <MainContainer>
            <div class="sm:py-6 pt-6">
                <LinkGroup :items="[{ label: 'Sebet', to: '/account/basket' }]" />
            </div>
            <!-- Title -->
            <div class="py-8 lg:w-[950px]">
                <div class="flex items-center justify-between">
                    <div class="flex items-end space-x-5">
                        <h1 class="sm:text-[30px] text-[26px] leading-[100%] font-semibold text-[#0C1A30]">Sebet</h1>
                        <span class="text-[#838589] text-sm">{{ cartStore.getItemCount() }} haryt</span>
                    </div>
                    <button @click="clearCart"
                        class="flex items-center space-x-2 bg-[#FA004C] text-white px-4 py-2 rounded-lg font-medium hover:opacity-60 transition-opacity duration-300">
                        <delete-icon :size="18" color="white" />
                        <span class="sm:text-base text-sm">Arassala</span>
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
                                <div class="w-[100px] h-[100px] flex-shrink-0">
                                    <img class="w-full h-full object-cover rounded-[10px]"
                                        :src="item.product_image || '/images/box.png'" alt="Product Image">
                                </div>

                                <!-- Product Info -->
                                <div class="flex-1 flex items-center space-x-8 min-w-0 pr-6">
                                    <div class="w-[238px] h-[105px] flex flex-col justify-between flex-shrink-0">
                                        <h3 class="text-base font-medium text-[#0C1A30] mb-1">
                                            {{ item.product_name }}
                                        </h3>
                                        <div class="flex items-center space-x-4">
                                            <button @click="toggleLike(item.product)"
                                                class="w-[33px] h-[33px] bg-[#F6F7F9] rounded-full flex items-center justify-center cursor-pointer">
                                                <favorite-icon :size="16" :color="item.is_liked ? '#FA004C' : '#A9A9A9'"
                                                    :fill="item.is_liked ? '#FA004C' : 'transparent'" />
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
                                            {{ item.unit_price }} TMT
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
                                            {{ item.total_price }} TMT
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TransitionGroup>

                    <!-- Empty Cart State -->
                    <div v-if="cartItems.length === 0" class="text-center py-12">
                        <basket-icon />
                        <h3 class="mt-4 text-lg font-medium text-[#0C1A30]">Sebet boş</h3>
                        <p class="mt-2 text-sm text-gray-500">Haryt goşmak üçin dükan sahypasyna gidiň</p>
                    </div>
                </div>

                <!-- Order Summary -->
                <div class="lg:w-[370px] w-full py-6 p-8 bg-white rounded-xl sticky top-32">
                    <!-- Promo Code Section -->
                    <div class="mb-4">
                        <!-- Gift Card -->
                        <div v-if="!cartStore.giftCard"
                            class="flex items-center space-x-2 p-3 bg-[#F6F7F9] rounded-lg mb-4 cursor-pointer hover:bg-[#E8F4F8] transition-colors"
                            @click="showGiftCardModal = true">
                            <div class="w-7 h-7 bg-[#037D841F] rounded-full flex items-center justify-center">
                                <discount_circle-icon />
                            </div>
                            <span class="text-sm text-[#838589]">Promokod giriziň</span>
                        </div>
                        <div v-else class="flex items-center justify-between p-3 bg-[#E8F4F8] rounded-lg mb-4">
                            <div class="flex items-center space-x-2">
                                <div class="w-7 h-7 bg-[#037D841F] rounded-full flex items-center justify-center">
                                    <discount_circle-icon />
                                </div>
                                <span class="text-sm text-[#0C1A30]">Gift Card: {{ cartStore.giftCard.number }}</span>
                            </div>
                            <button @click="removeGiftCard" class="text-red-500 hover:text-red-700">
                                <close-icon :size="16" />
                            </button>
                        </div>

                        <!-- Loyalty Card -->
                        <div v-if="!cartStore.loyaltyCard"
                            class="flex items-center space-x-2 p-3 bg-[#F6F7F9] rounded-lg mb-4 cursor-pointer hover:bg-[#FEF3E2] transition-colors"
                            @click="showLoyaltyCardModal = true">
                            <div class="w-7 h-7 bg-[#FEB91826] rounded-full flex items-center justify-center">
                                <star-icon />
                            </div>
                            <span class="text-sm text-[#0C1A30]">Arzanladyş kartyny ulan</span>
                        </div>
                        <div v-else class="flex items-center justify-between p-3 bg-[#FEF3E2] rounded-lg mb-4">
                            <div class="flex items-center space-x-2">
                                <div class="w-7 h-7 bg-[#FEB91826] rounded-full flex items-center justify-center">
                                    <star-icon />
                                </div>
                                <span class="text-sm text-[#0C1A30]">Loyalty Card: {{ cartStore.loyaltyCard.number
                                    }}</span>
                            </div>
                            <button @click="removeLoyaltyCard" class="text-red-500 hover:text-red-700">
                                <close-icon :size="16" />
                            </button>
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
                    <button @click="checkout" :disabled="cartStore.cartItems.length === 0"
                        class="w-full bg-[#FEB918] text-white font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors transform hover:scale-[1.02] active:scale-[0.98]">
                        Sargyt etmek
                    </button>
                </div>
            </div>
        </MainContainer>
        <!--  -->
        <ProductSection :sectionTitle="'Siziň üçin harytlar'" :products="products" />

        <!-- Gift Card Modal -->
        <div v-if="showGiftCardModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            @click="showGiftCardModal = false">
            <div class="bg-white rounded-lg p-6 w-96 max-w-md mx-4" @click.stop>
                <h3 class="text-lg font-semibold mb-4">Gift Card Giriziň</h3>
                <input v-model="giftCardNumber" type="text" placeholder="Gift card number"
                    class="w-full p-3 border border-gray-300 rounded-lg mb-4" />
                <div class="flex space-x-3">
                    <button @click="applyGiftCard"
                        class="flex-1 bg-[#037D84] text-white py-2 px-4 rounded-lg hover:bg-[#036A70] transition-colors">
                        Ulan
                    </button>
                    <button @click="showGiftCardModal = false"
                        class="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors">
                        Ýatyrmak
                    </button>
                </div>
            </div>
        </div>

        <!-- Loyalty Card Modal -->
        <div v-if="showLoyaltyCardModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            @click="showLoyaltyCardModal = false">
            <div class="bg-white rounded-lg p-6 w-96 max-w-md mx-4" @click.stop>
                <h3 class="text-lg font-semibold mb-4">Loyalty Card Giriziň</h3>
                <input v-model="loyaltyCardId" type="number" placeholder="Loyalty card ID"
                    class="w-full p-3 border border-gray-300 rounded-lg mb-4" />
                <div class="flex space-x-3">
                    <button @click="applyLoyaltyCard"
                        class="flex-1 bg-[#FEB918] text-white py-2 px-4 rounded-lg hover:bg-[#E6A500] transition-colors">
                        Ulan
                    </button>
                    <button @click="showLoyaltyCardModal = false"
                        class="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors">
                        Ýatyrmak
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const cartStore = useCartStore()
const productStore = useProductsStore()
const likesStore = useLikesStore()
const { products } = storeToRefs(productStore)
const { fetchNewestProducts } = productStore
const { cartItems, total, subtotal, couponDiscount } = storeToRefs(cartStore)
const { likes } = storeToRefs(likesStore)
const { fetchLikes, createLike, deleteLike } = likesStore

// Modal states
const showGiftCardModal = ref(false)
const showLoyaltyCardModal = ref(false)
const giftCardNumber = ref('')
const loyaltyCardId = ref(null)

// Fetch cart data on component mount
onMounted(async () => {
    try {
        const cart = await cartStore.fetchCart()
        console.log('Cart loaded:', cart);
        // Fetch recommended products
        await fetchNewestProducts()
        await fetchLikes()
    } catch (error) {
        console.error('Error loading cart:', error)
    }
})

// Methods
const increaseQuantity = async (id) => {
    try {
        await cartStore.increaseQuantity(id)
    } catch (error) {
        console.error('Error increasing quantity:', error)
    }
}

const decreaseQuantity = async (id) => {
    try {
        await cartStore.decreaseQuantity(id)
    } catch (error) {
        console.error('Error decreasing quantity:', error)
    }
}

const removeItem = async (id) => {
    try {
        await cartStore.removeItem(id)
    } catch (error) {
        console.error('Error removing item:', error)
    }
}

const clearCart = async () => {
    try {
        await cartStore.clearCart()
    } catch (error) {
        console.error('Error clearing cart:', error)
    }
}

const checkout = async () => {
    if (cartStore.cartItems.length === 0) return

    try {
        // Basic checkout data - you can expand this with a form
        const checkoutData = {
            deliveryAddress: "Default address", // This should come from user input
            deliveryNote: "",
            paymentMethod: "cash",
            notes: "",
            deliveryMethodId: 1,
            selectedTimeSlot: 1,
            preferredDeliveryDate: new Date().toISOString().split('T')[0]
        }

        await cartStore.checkout(checkoutData)
        // Navigate to order confirmation or success page
        // router.push('/orders')
    } catch (error) {
        console.error('Error during checkout:', error)
    }
}

// addToCart is now handled directly in ProductCard component

// Gift Card and Loyalty Card methods
const applyGiftCard = async () => {
    if (!giftCardNumber.value.trim()) return

    try {
        await cartStore.applyGiftCard(giftCardNumber.value)
        showGiftCardModal.value = false
        giftCardNumber.value = ''
    } catch (error) {
        console.error('Error applying gift card:', error)
    }
}

const applyLoyaltyCard = async () => {
    if (!loyaltyCardId.value) return

    try {
        await cartStore.applyLoyaltyCard(loyaltyCardId.value)
        showLoyaltyCardModal.value = false
        loyaltyCardId.value = null
    } catch (error) {
        console.error('Error applying loyalty card:', error)
    }
}

const removeGiftCard = async () => {
    try {
        await cartStore.removeGiftCard()
    } catch (error) {
        console.error('Error removing gift card:', error)
    }
}

const removeLoyaltyCard = async () => {
    try {
        await cartStore.removeLoyaltyCard()
    } catch (error) {
        console.error('Error removing loyalty card:', error)
    }
}

const toggleLike = async (productId) => {
    try {
        const likeItem = likes.value.find(item => item.product === productId)
        if (!likeItem) {
            await createLike(productId)
        } else {
            await deleteLike(likeItem.id)
        }
        await cartStore.fetchCart()
    } catch (error) {
        console.error('Error toggling like:', error)
    }
}

</script>