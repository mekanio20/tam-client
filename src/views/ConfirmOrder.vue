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
                        <h1 class="text-[30px] font-semibold text-[#0C1A30]">Sargydy tassyklamak</h1>
                        <span class="text-[#838589] text-sm pb-2">{{ cartItems.length }} haryt</span>
                    </div>
                    <button @click="cartStore.clearCart"
                        class="border border-[#838589] rounded-md py-2 px-4 text-sm flex items-center space-x-2 hover:bg-gray-50 transition-colors">
                        <arrow_right-icon class="rotate-180" color="black" />
                        <span class="text-[#838589]">Yza</span>
                    </button>
                </div>
            </div>
            <!-- Content -->
            <div class="w-full flex lg:flex-row flex-col items-start lg:space-x-6 lg:space-y-0 space-y-6 mb-10">
                <!-- Cart Items -->
                <div class="lg:w-[950px] w-full space-y-4 sm:p-8 py-8 px-3 bg-white rounded-xl overflow-hidden">
                    <h1 class="text-lg font-medium text-[#0C1A30]">Maglumatlaryňyzy giriziň</h1>
                    <!-- Form -->
                    <FormSection class="w-full">
                        <div class="grid grid-cols-2 gap-6">
                            <FormGroup>
                                <FormTitle :id="'address'" :title="'Salgyňyz'" />
                                <div v-if="!formData.address" class="w-full">
                                    <button @click="showAddressAddModal = true"
                                        class="bg-[#F6F7F9] w-full h-[100px] rounded-[8px] flex items-center justify-center text-[#037D84] font-medium hover:bg-[#EDF0F2] transition-colors">
                                        <span>+ Salgy goşmak</span>
                                    </button>
                                </div>
                                <div v-else class="w-full">
                                    <div class="bg-[#F6F7F9] rounded-[8px] p-4 border border-[#EDEDED]">
                                        <div class="flex items-start justify-between">
                                            <div class="flex-1">
                                                <div class="flex items-center space-x-2 mb-2">
                                                    <div class="w-2 h-2 bg-[#FEB918] rounded-full"></div>
                                                    <span class="text-sm font-medium text-[#0C1A30]">Saýlanan
                                                        salgy</span>
                                                </div>
                                                <p class="text-[#0C1A30] text-sm leading-relaxed">{{ formData.address }}
                                                </p>
                                            </div>
                                            <button @click="showAddressAddModal = true"
                                                class="ml-3 p-2 text-[#037D84] hover:bg-[#E6F7F8] rounded-lg transition-colors">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                                                    </path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <FormTitle :id="'note'" :title="'Bellik'" />
                                <textarea v-model="formData.note"
                                    class="w-full h-[100px] resize-none px-5 py-4 bg-[#F6F7F9] border-0 rounded-[10px] focus:ring-1 focus:ring-[#FEB918] focus:bg-white outline-none transition-all duration-200 pr-12"></textarea>
                            </FormGroup>
                        </div>
                        <div class="pb-4 pt-10 space-y-8">
                            <h2 class="text-lg font-medium text-[#0C1A30]">Töleg görnüşi</h2>
                            <div class="sm:max-w-[600px] max-w-[324px] grid grid-cols-3 gap-4">
                                <PaymentTypeCard title="Nagt töleg"
                                    :icon="{ name: 'bank_note-icon', bg_color: '#FA004C14' }"
                                    :selected="selectedCard === 'cash'" @toggle="selectPayment('cash')" />
                                <PaymentTypeCard title="Kart bilen töleg"
                                    :icon="{ name: 'payment-icon', bg_color: '#009FE314' }"
                                    :selected="selectedCard === 'card'" @toggle="selectPayment('card')" />
                                <PaymentTypeCard title="Garyşyk töleg"
                                    :icon="{ name: 'star-icon', bg_color: '#FEB91814' }"
                                    :selected="selectedCard === 'mixed'" @toggle="selectPayment('mixed')" />
                            </div>
                        </div>
                        <div class="pb-4 pt-10 space-y-8">
                            <h2 class="text-lg font-medium text-[#0C1A30]">Eltip bermek hyzmaty</h2>
                            <div v-if="deliveryLoading" class="flex items-center justify-center py-8">
                                <div class="text-gray-500">Eltip bermek hyzmatlary ýüklenýär...</div>
                            </div>
                            <div v-else class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
                                <OrderTypeCard v-for="item in deliveryMethods" :key="item.id" :title="item.name"
                                    :regionPrices="item.region_prices || []"
                                    :selected="selectedDeliveryMethod?.id === item.id"
                                    @toggle="selectDeliveryMethod(item)" />
                            </div>

                            <!-- Time Slots Section -->
                            <div v-if="selectedDeliveryMethod?.time_slots?.length > 0" class="pt-6 space-y-4">
                                <h3 class="text-md font-medium text-[#0C1A30]">Wagt aralygy</h3>
                                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                    <button v-for="slot in selectedDeliveryMethod.time_slots" :key="slot.id"
                                        @click="selectedTimeSlot = slot" :class="[
                    'p-3 rounded-lg border text-sm font-medium transition-all duration-200',
                    selectedTimeSlot?.id === slot.id
                        ? 'border-[#FEB918] bg-[#FEB9180D] text-[#FEB918]'
                        : 'border-[#EDEDED] bg-white text-[#0C1A30] hover:border-[#FEB918]'
                ]">
                                        {{ slot.time_slot }}
                                    </button>
                                </div>
                            </div>

                            <!-- Preferred Delivery Date -->
                            <div class="mt-4 space-y-4">
                                <h3 class="text-lg font-medium text-[#0C1A30]">Eltip bermek senesi</h3>
                                <FormGroup>
                                    <FormTitle :id="'delivery_date'" :title="'Senäni saýlaň'" />
                                    <input v-model="preferredDeliveryDate" type="date" id="delivery_date"
                                        class="w-full px-5 py-4 bg-[#F6F7F9] border-0 rounded-[10px] focus:ring-1 focus:ring-[#FEB918] focus:bg-white outline-none transition-all duration-200"
                                        :min="new Date().toISOString().split('T')[0]">
                                </FormGroup>
                            </div>
                        </div>
                        <div class="border-t border-[#EDEDED] mt-5">
                            <div class="py-4 flex justify-between items-center">
                                <span class="font-medium text-2xl text-[#0C1A30]">Jemi:</span>
                                <span class="font-bold text-2xl text-[#037D84]">{{ total }} TMT</span>
                            </div>
    
                            <!-- Checkout Button -->
                            <button @click="checkout" :disabled="cartItems.length === 0 || loading"
                                class="w-full bg-[#FEB918] text-white font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors transform">
                                {{ loading ? 'Sargyt edilýär...' : 'Sargyt etmek' }}
                            </button>
                        </div>
                    </FormSection>
                </div>
            </div>
        </MainContainer>
        <!-- Product Section -->
        <!-- <ProductSection :sectionTitle="'Siziň üçin harytlar'" :products="products" @toggleFavorite="_toggleFavorite" /> -->
    </div>
    <!-- Address Select Modal -->
    <AddressSelectModal :show="showAddressAddModal" @submit="handleAddressSelect" @addAddress="addAddress"
        @close="showAddressAddModal = false" />
    <!-- Address Add Modal -->
    <AddressAddModal :show="showAddressSelectModal" @submit="handleAddressAdd"
        @close="showAddressSelectModal = false" />
</template>

<script setup>
const cartStore = useCartStore()
const { fetchCart } = cartStore
const { cartItems, total, subtotal, couponDiscount, loading } = storeToRefs(cartStore)
const addressesStore = useClientAddressesStore()
const { fetchAddresses, createAddress, updateAddress, deleteAddress } = addressesStore
const router = useRouter()

const regionsStore = useRegionsStore()
const { deliveryMethods, loading: deliveryLoading } = storeToRefs(regionsStore)
const { fetchDeliveryMethods } = regionsStore

const showAddressAddModal = ref(false)
const showAddressSelectModal = ref(false)
const selectedCard = ref('')
const selectedDeliveryMethod = ref(null)
const selectedTimeSlot = ref(null)
const preferredDeliveryDate = ref('')
const { success, error: toastError } = useToast()
const formData = ref({
    fullname: '',
    phone: '',
    address: '',
    note: ''
})

// Methods
const addAddress = () => {
    showAddressAddModal.value = false
    showAddressSelectModal.value = true
}
const selectPayment = (type) => {
    selectedCard.value = type
}

const selectDeliveryMethod = (method) => {
    selectedDeliveryMethod.value = method
    selectedTimeSlot.value = null // Reset time slot when delivery method changes
}

const _toggleFavorite = (id) => {
    const product = products.value.find(product => product.id === id)
    product.favorite = !product.favorite
}

// clearCart function removed - using cart store's clearCart instead

const checkout = async () => {
    if (cartItems.value.length === 0) return

    // Validation
    if (!selectedCard.value) {
        toastError('Şowsuz boldy', 'Töleg görnüşini saýlaň')
        return
    }

    if (!selectedDeliveryMethod.value) {
        toastError('Şowsuz boldy', 'Eltip bermek hyzmatyny saýlaň')
        return
    }

    if (!formData.value.address) {
        toastError('Şowsuz boldy', 'Salgyňyzy giriziň')
        return
    }

    try {
        const checkoutData = {
            deliveryAddress: formData.value.address,
            deliveryNote: formData.value.note,
            paymentMethod: selectedCard.value,
            notes: formData.value.note,
            deliveryMethodId: selectedDeliveryMethod.value.id,
            selectedTimeSlot: selectedTimeSlot.value?.id || null,
            preferredDeliveryDate: preferredDeliveryDate.value || null
        }

        // Use cart store checkout function
        await cartStore.checkout(checkoutData)

        // Reset form after successful checkout
        formData.value = {
            fullname: '',
            phone: '',
            address: '',
            note: ''
        }
        selectedCard.value = ''
        selectedDeliveryMethod.value = null
        selectedTimeSlot.value = null
        preferredDeliveryDate.value = ''

        // Navigate to success page or orders page
        router.push({ name: 'Orders' }) // Uncomment if you want to redirect

    } catch (error) {
        console.error('Checkout error:', error)
        // Error handling is already done in cart store
    }
}

// addToCart is now handled directly in ProductCard component

const handleAddressSelect = (addressData) => {
    formData.value.address = addressData.address || ''
    showAddressAddModal.value = false
}

const handleAddressAdd = async (addressData) => {
    try {
        await createAddress(addressData)
        showAddressAddModal.value = false
        showAddressSelectModal.value = false
        success('Üstünlikli', 'Salgy üstünlikli goşuldy')
    } catch (e) {
        toastError('Şowsuz boldy', e?.response?.data?.message || e?.message || 'Salgy goşulmady')
    } finally {
        await fetchAddresses()
    }
}

// Lifecycle
onMounted(async () => {
    try {
        await fetchCart()
        await fetchDeliveryMethods()
    } catch (error) {
        console.error('Error fetching delivery methods:', error)
        toastError('Şowsuz boldy', 'Eltip bermek hyzmatlary ýüklenmedi')
    }
})
</script>