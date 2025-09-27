<template>
    <div class="min-h-screen bg-white">
        <!-- Header -->
        <MainContainer>
            <LinkGroup
                :items="[{ label: 'Sargytlar', to: '/account/orders' }, { label: `#${orderId}`, to: `/account/order/detail/${orderId}` }]" />
            <!-- Title -->
            <div class="pb-8 sm:pt-4 pt-6 w-full">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-5">
                        <h1 class="lg:text-[30px] leading-[100%] sm:text-[30px] text-lg font-semibold text-[#0C1A30]">
                            #{{ orderId }}</h1>
                        <span class="text-[#838589] text-sm">{{ orderItems.length }} haryt</span>
                    </div>
                    <div v-if="orderStatus" :class="getStatusClass(orderStatus)" class="px-5 py-2 text-sm rounded-full">
                        {{ orderStatus }}
                    </div>
                </div>
            </div>
            <div class="w-full flex lg:flex-row flex-col items-start lg:space-x-6 mb-10">
                <!-- Main Content -->
                <div class="bg-white w-full">
                    <div v-if="loading" class="p-8 text-center">
                        <div class="text-gray-500">Ýüklenýär...</div>
                    </div>
                    <div v-else class="divide-y divide-[#EDEDED] rounded-xl overflow-hidden">
                        <!-- Dynamic Order Items -->
                        <div v-for="(item, index) in orderItems" :key="index" class="py-5">
                            <div class="flex items-center space-x-6 justify-between">
                                <div class="flex-shrink-0 flex items-center space-x-3">
                                    <div
                                        class="w-[100px] h-[100px] bg-[#F6F7F9] rounded-[10px] flex items-center justify-center">
                                        <img v-if="item.product_image" :src="item.product_image"
                                            class="w-full h-full object-cover rounded-[10px]">
                                        <svg v-else class="w-6 h-6 text-green-600" fill="currentColor"
                                            viewBox="0 0 20 20">
                                            <path
                                                d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                        </svg>
                                    </div>
                                    <h3 class="text-sm font-medium text-[#0C1A30] max-w-[150px]">
                                        {{ item.product_name || 'Haryt ady' }}
                                    </h3>
                                </div>
                                <div class="flex-shrink-0 flex items-center space-x-8">
                                    <div class="space-y-2">
                                        <span class="text-[12px] text-[#838589]">Bahasy</span>
                                        <div class="font-medium text-[#0C1A30]">{{ item.unit_price }} TMT</div>
                                    </div>
                                    <div class="space-y-2">
                                        <span class="text-[12px] text-[#838589]">Sany</span>
                                        <div class="font-medium text-[#0C1A30]">{{ item.quantity }}</div>
                                    </div>
                                    <div class="space-y-2">
                                        <span class="text-[12px] text-[#838589]">Jemi</span>
                                        <div class="font-medium text-[#0C1A30]">{{ item.total_price }} TMT</div>
                                    </div>
                                </div>
                                <!-- Add to Cart Button / Quantity Controls -->
                                <div v-if="!isInCart(item.product)" class="flex-shrink-0">
                                    <button @click="addToCart(item)"
                                        class="text-sm text-[#FFA100] border border-[#FEB918] px-8 py-2 rounded-md font-medium hover:bg-[#FFA100] hover:text-white hover:border-[#FFA100] transition-all duration-300 ease-in-out">
                                        Sebede goş
                                    </button>
                                </div>

                                <!-- Quantity Controls -->
                                <div v-else
                                    class="flex items-center space-x-2 flex-shrink-0 border border-[#FEB918] rounded-md px-4 py-2">
                                    <button @click="decreaseQuantity(item.product)" :disabled="cartLoading"
                                        class="w-6 h-6 flex items-center justify-center rounded-full bg-[#F5F5F5] text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs">
                                        -
                                    </button>
                                    <div class="text-center font-medium text-[#0C1A30] min-w-[20px]">
                                        <div v-if="cartLoading"
                                            class="animate-spin rounded-full h-3 w-3 border border-gray-300 border-t-[#0C1A30] mx-auto">
                                        </div>
                                        <span v-else>{{ getCartItem(item.product)?.quantity || 0 }}</span>
                                    </div>
                                    <button @click="increaseQuantity(item.product)" :disabled="cartLoading"
                                        class="w-6 h-6 flex items-center justify-center rounded-full bg-[#F5F5F5] text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs">
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Contact Information Section -->
                    <div
                        class="lg:w-[600px] w-full space-y-4 sm:p-8 py-8 px-3 bg-white border-t border-[#EDEDED] rounded-xl overflow-hidden">
                        <h1 class="text-lg font-medium text-[#0C1A30]">Maglumatlar</h1>
                        <!-- Form -->
                        <FormSection class="w-full">
                            <div class="pb-4 grid sm:grid-cols-2 grid-cols-1 gap-6">
                                <FormGroup>
                                    <FormTitle :id="'address'" :title="'Salgyňyz'" />
                                    <textarea v-model="formData.address" :disabled="true"
                                        :class="{ 'cursor-not-allowed': true }"
                                        class="w-full h-[100px] resize-none px-5 py-4 bg-[#F6F7F9] border-0 rounded-[10px] focus:ring-1 focus:ring-[#FEB918] focus:bg-white outline-none transition-all duration-200 pr-12"></textarea>
                                </FormGroup>
                                <FormGroup>
                                    <FormTitle :id="'note'" :title="'Bellik'" />
                                    <textarea v-model="formData.note" :disabled="true"
                                        :class="{ 'cursor-not-allowed': true }"
                                        class="w-full h-[100px] resize-none px-5 py-4 bg-[#F6F7F9] border-0 rounded-[10px] focus:ring-1 focus:ring-[#FEB918] focus:bg-white outline-none transition-all duration-200 pr-12"></textarea>
                                </FormGroup>
                            </div>
                            <div class="grid sm:grid-cols-2 grid-cols-1 gap-6">
                                <div class="pb-4 pt-10 space-y-8">
                                    <h2 class="text-lg font-medium text-[#0C1A30]">Töleg görnüşi</h2>
                                    <div
                                        class="w-fit px-6 py-3 border border-[#EDEDED] rounded-lg flex items-center space-x-3">
                                        <div
                                            class="w-7 h-7 bg-[#FA004C14] rounded-full flex items-center justify-center">
                                            <bank_note-icon />
                                        </div>
                                        <p class="text-[#0C1A30]">
                                            {{ orderDetails.payment_method || 'Töleg görnüşi' }}
                                        </p>
                                    </div>
                                </div>
                                <div class="pb-4 sm:pt-10 space-y-8">
                                    <h2 class="text-lg font-medium text-[#0C1A30]">Eltip bermek hyzmaty</h2>
                                    <div
                                        class="w-fit px-6 py-3 border border-[#EDEDED] rounded-lg flex items-center space-x-6">
                                        <p class="text-[#0C1A30]">{{ orderDetails.delivery_method_info?.name }}</p>
                                        <p v-if="orderDetails.delivery_fee" class="text-[#FEB918] text-sm">
                                            {{ orderDetails.delivery_fee }} TMT
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </FormSection>
                    </div>
                </div>
                <!-- Order Summary -->
                <div class="lg:w-[370px] w-full py-6 px-2 bg-white rounded-xl sticky top-32 flex-shrink-0">
                    <!-- Gift Card and Loyalty Card Section -->
                    <div class="mb-6">
                        <!-- Gift Card -->
                        <div v-if="orderDetails.gift_card_info"
                            class="flex items-center justify-between p-3 bg-[#E8F4F8] rounded-lg mb-4">
                            <div class="flex items-center space-x-2">
                                <div class="w-7 h-7 bg-[#037D841F] rounded-full flex items-center justify-center">
                                    <discount_circle-icon />
                                </div>
                                <span class="text-sm text-[#0C1A30]">Gift Card: {{ orderDetails.gift_card_info.number ||
                    orderDetails.gift_card_info.card_number }}</span>
                            </div>
                            <span class="text-sm text-[#037D84] font-medium">{{ orderDetails.gift_card_info?.amount_used
                    || 0 }} TMT</span>
                        </div>
                        <div v-else class="flex items-center space-x-2 p-3 bg-[#F6F7F9] rounded-lg mb-4">
                            <div class="w-7 h-7 bg-[#037D841F] rounded-full flex items-center justify-center">
                                <discount_circle-icon />
                            </div>
                            <span class="text-sm text-[#838589]">Gift Card ulanylmady</span>
                        </div>

                        <!-- Loyalty Card -->
                        <div v-if="orderDetails.loyalty_card_info"
                            class="flex items-center justify-between p-3 bg-[#FEF3E2] rounded-lg mb-4">
                            <div class="flex items-center space-x-2">
                                <div class="w-7 h-7 bg-[#FEB91826] rounded-full flex items-center justify-center">
                                    <star-icon />
                                </div>
                                <span class="text-sm text-[#0C1A30]">Loyalty Card: {{
                    orderDetails.loyalty_card_info.card_name || orderDetails.loyalty_card_info.number
                }}</span>
                            </div>
                            <span class="text-sm text-[#FEB918] font-medium">{{
                        orderDetails.loyalty_card_info?.amount_used || 0 }} TMT</span>
                        </div>
                        <div v-else class="flex items-center space-x-2 p-3 bg-[#F6F7F9] rounded-lg mb-4">
                            <div class="w-7 h-7 bg-[#FEB91826] rounded-full flex items-center justify-center">
                                <star-icon />
                            </div>
                            <span class="text-sm text-[#838589]">Loyalty Card ulanylmady</span>
                        </div>
                    </div>

                    <!-- Price Breakdown -->
                    <div class="space-y-3">
                        <div v-if="orderDetails.gift_card_info?.amount_used || orderDetails.loyalty_card_info?.amount_used"
                            class="py-6 space-y-3">
                            <div v-if="orderDetails.gift_card_info?.amount_used"
                                class="flex justify-between items-center">
                                <span class="text-[#0C1A30]">Gift Card arzanladyşy:</span>
                                <span class="font-medium text-[#037D84]">-{{ orderDetails.gift_card_info.amount_used }}
                                    TMT</span>
                            </div>

                            <div v-if="orderDetails.loyalty_card_info?.amount_used"
                                class="flex justify-between items-center">
                                <span class="text-[#0C1A30]">Loyalty Card arzanladyşy:</span>
                                <span class="font-medium text-[#FEB918]">-{{ orderDetails.loyalty_card_info.amount_used
                                    }} TMT</span>
                            </div>
                        </div>

                        <div class="border-t border-[#EDEDED] pt-3">
                            <div class="flex text-2xl justify-between items-center">
                                <span class="font-medium text-[#0C1A30]">Jemi:</span>
                                <span class="font-bold text-[#037D84]">{{ orderTotal }} TMT</span>
                            </div>
                        </div>
                    </div>

                    <!-- Checkout Button -->
                    <!-- <button @click="checkout"
                        class="w-full bg-[#FEB918] text-white font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors transform">
                        Sargyt etmek
                    </button> -->
                </div>
            </div>
        </MainContainer>
    </div>
</template>

<script setup>
// Store and router
const ordersStore = useOrdersStore()
const { order_info, loading } = storeToRefs(ordersStore)
const { fetchOrder } = ordersStore
const cartStore = useCartStore()
const { addItem, isInCart, getCartItem, increaseQuantity: cartIncreaseQuantity, decreaseQuantity: cartDecreaseQuantity, loading: cartLoading } = cartStore
const route = useRoute()

// Form data - will be populated from API
const formData = ref({
    fullname: '',
    phone: '',
    address: '',
    note: ''
})

// Get order ID from route params
const orderId = computed(() => route.params.id)

// Computed properties for order data
const orderDetails = computed(() => order_info.value || {})
const orderItems = computed(() => orderDetails.value.items || [])
console.log('Order items', orderItems.value);
const orderTotal = computed(() => orderDetails.value.total_amount || 0)
// Status mapping for display
const getStatusLabel = (status) => {
    const statusMap = {
        'pending': 'Garaşylýar',
        'accepted': 'Kabul edildi',
        'assigned_to_courier': 'Kurýer bellendi',
        'delivering': 'Ýolda',
        'delivered': 'Gowşuryldy',
        'completed': 'Tamamlandy',
        'rejected': 'Ýatyryldy',
        'canceled': 'Goýbolsun edildi'
    }
    return statusMap[status] || status
}

const orderStatus = computed(() => {
    const status = orderDetails.value.status_label || orderDetails.value.status || ''
    return status.includes('Garaşylýar') || status.includes('Kabul') || status.includes('Ýolda') || status.includes('Gowşuryldy') || status.includes('Tamamlandy') || status.includes('Ýatyryldy') || status.includes('Goýbolsun') ? status : getStatusLabel(orderDetails.value.status)
})

// Status styling
const getStatusClass = (status) => {
    const originalStatus = orderDetails.value.status
    switch (originalStatus) {
        case 'pending':
            return 'bg-[#FEB9181A] text-[#FEB918]'
        case 'accepted':
            return 'bg-[#037D841F] text-[#037D84]'
        case 'assigned_to_courier':
            return 'bg-[#037D841F] text-[#037D84]'
        case 'delivering':
            return 'bg-[#037D841F] text-[#037D84]'
        case 'delivered':
            return 'bg-[#037D841F] text-[#037D84]'
        case 'completed':
            return 'bg-[#037D841F] text-[#037D84]'
        case 'rejected':
            return 'bg-[#FA004C1F] text-[#FA004C]'
        case 'canceled':
            return 'bg-[#FA004C1F] text-[#FA004C]'
        default:
            return 'bg-gray-100 text-gray-800'
    }
}

// Fetch order data on component mount
onMounted(async () => {
    try {
        if (orderId.value) {
            await fetchOrder(orderId.value)
            // Update form data with order information
            if (order_info.value) {
                formData.value = {
                    fullname: order_info.value.client_name || '',
                    phone: order_info.value.client_phone || '',
                    address: order_info.value.delivery_address || '',
                    note: order_info.value.delivery_note || ''
                }
            }
        }
    } catch (error) {
        console.error('Error fetching order details:', error)
    }
})

// Add item to cart
const addToCart = async (item) => {
    try {
        await addItem(item.product_id || item.id, item.quantity || 1)
        // Show success message or toast
        console.log('Added to cart:', item.product_name)
    } catch (error) {
        console.error('Error adding item to cart:', error)
    }
}

const increaseQuantity = async (productId) => {
    try {
        const cartItem = getCartItem(productId)
        if (cartItem) {
            await cartIncreaseQuantity(cartItem.id)
        }
    } catch (error) {
        console.error('Error increasing quantity:', error)
    }
}

const decreaseQuantity = async (productId) => {
    try {
        const cartItem = getCartItem(productId)
        if (cartItem) {
            await cartDecreaseQuantity(cartItem.id)
        }
    } catch (error) {
        console.error('Error decreasing quantity:', error)
    }
}

const checkout = () => {
    alert(`Sargyt tassyklandy! Jemi: ${orderTotal.value} TMT`)
}
</script>