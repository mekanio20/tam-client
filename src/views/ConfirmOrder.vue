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
                    <button @click="clearCart"
                        class="border border-[#838589] rounded-md py-2 px-4 text-sm flex items-center space-x-2">
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
                        <div class="pb-4 grid grid-cols-2 gap-6">
                            <FormGroup>
                                <FormTitle :id="'name'" :title="'Adyňyz'" />
                                <FormInput v-model="formData.fullname" :label="'name'" />
                            </FormGroup>
                            <FormGroup>
                                <FormTitle :id="'phone'" :title="'Telefon belgisi'" />
                                <FormInput v-model="formData.phone" :label="'phone'" :type="'tel'"
                                    :placeholder="'+993 ********'" />
                            </FormGroup>
                            <FormGroup>
                                <FormTitle :id="'address'" :title="'Salgyňyz'" />
                                <button @click="showAddressAddModal = true"
                                    class="bg-[#F6F7F9] w-full h-[100px] rounded-[8px] flex items-center justify-center text-[#037D84] font-medium">
                                    <span v-if="!formData.address">+ Salgy goşmak</span>
                                    <span v-else class="text-[#0C1A30]">{{ formData.address }}</span>
                                </button>
                            </FormGroup>
                            <FormGroup>
                                <FormTitle :id="'note'" :title="'Bellik'" />
                                <textarea v-model="formData.note"
                                    class="w-full h-[100px] resize-none px-5 py-4 bg-[#F6F7F9] border-0 rounded-[10px] focus:ring-1 focus:ring-[#FEB918] focus:bg-white outline-none transition-all duration-200 pr-12"></textarea>
                            </FormGroup>
                        </div>
                        <div class="pb-4 pt-10 space-y-8">
                            <h2 class="text-lg font-medium text-[#0C1A30]">Töleg görnüşi</h2>
                            <div class="sm:max-w-[400px] max-w-[324px] grid grid-cols-2 gap-4">
                                <PaymentTypeCard title="Nagt töleg"
                                    :icon="{ name: 'bank_note-icon', bg_color: '#FA004C14' }"
                                    :selected="selectedCard === 'cash'" @toggle="selectPayment('cash')" />
                                <PaymentTypeCard title="Kart bilen töleg"
                                    :icon="{ name: 'payment-icon', bg_color: '#009FE314' }"
                                    :selected="selectedCard === 'card'" @toggle="selectPayment('card')" />
                            </div>
                        </div>
                        <div class="pb-4 pt-10 space-y-8">
                            <h2 class="text-lg font-medium text-[#0C1A30]">Eltip bermek hyzmaty</h2>
                            <div class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
                                <OrderTypeCard v-for="item in orderTypes" :key="item.id" :title="item.name"
                                    :price="item.price" :selected="selectedOrderType === item.type"
                                    @toggle="selectOrderType(item.type)" />
                            </div>
                        </div>
                    </FormSection>
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
                        class="w-full bg-[#FEB918] text-white font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors transform">
                        Sargyt etmek
                    </button>
                </div>
            </div>
        </MainContainer>
        <!-- Product Section -->
        <ProductSection :sectionTitle="'Siziň üçin harytlar'" :products="products" @toggleFavorite="_toggleFavorite" />
    </div>
    <!-- Address Select Modal -->
    <AddressSelectModal :show="showAddressAddModal" @submit="handleAddressSelect" @addAddress="addAddress"
        @close="showAddressAddModal = false" />
    <!-- Address Add Modal -->
    <AddressAddModal :show="showAddressSelectModal" @submit="handleAddressAdd"
        @close="showAddressSelectModal = false" />
</template>

<script setup>
const showAddressAddModal = ref(false)
const showAddressSelectModal = ref(false)
const selectedCard = ref('')
const selectedOrderType = ref('')
const formData = ref({
    fullname: '',
    phone: '',
    address: '',
    note: ''
})
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
const orderTypes = ref([
    { id: 1, name: 'Express', price: 20, type: 'express' },
    { id: 2, name: 'Ýönekeý', price: 15, type: 'standard' },
    { id: 3, name: 'Welaýatlara', price: 50, type: 'province' },
    { id: 4, name: 'Änewe', price: 35, type: 'anew' },
    { id: 5, name: 'Özüň almak', price: 0, type: 'delivery' }
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
const addAddress = () => {
    showAddressAddModal.value = false
    showAddressSelectModal.value = true
}
const selectPayment = (type) => {
    selectedCard.value = type
}

const selectOrderType = (type) => {
    selectedOrderType.value = type
}

const _toggleFavorite = (id) => {
    const product = products.value.find(product => product.id === id)
    product.favorite = !product.favorite
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

// addToCart is now handled directly in ProductCard component

const handleAddressSelect = (addressData) => {
    formData.value.address = addressData.display_name || ''
    showAddressAddModal.value = false
}
const handleAddressAdd = (addressData) => {
    addresses.value.push(addressData)
    showAddressSelectModal.value = false
}
</script>