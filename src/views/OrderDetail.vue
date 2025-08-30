<template>
    <div class="min-h-screen overflow-auto">
        <!-- Header -->
        <MainContainer>
            <div class="pt-6">
                <LinkGroup
                    :items="[{ label: 'Sargytlar', to: '/account/orders' }, { label: '0002', to: '/account/order/detail/0002' }]" />
            </div>
            <!-- Title -->
            <div class="py-8 lg:w-[950px]">
                <div class="flex items-center justify-between">
                    <div class="flex items-end space-x-5">
                        <h1 class="text-[30px] font-semibold text-[#0C1A30]">0012</h1>
                        <span class="text-[#838589] text-sm pb-2">4 haryt</span>
                    </div>
                    <div class="px-5 py-2 text-sm rounded-full bg-[#037D841F] text-[#037D84]">
                        Kabul edildi
                    </div>
                </div>
            </div>
            <div class="w-full flex lg:flex-row flex-col items-start lg:space-x-6 lg:space-y-0 space-y-6 mb-10">
                <!-- Main Content -->
                <div class="bg-white">
                    <div class="divide-y divide-[#EDEDED] px-4 rounded-xl overflow-hidden">
                        <!-- Service Item 1 -->
                        <div class="py-5">
                            <div class="flex items-center justify-between">
                                <div class="flex-shrink-0 flex items-center space-x-4">
                                    <div
                                        class="w-[100px] h-[100px] bg-[#F6F7F9] rounded-[10px] flex items-center justify-center">
                                        <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                        </svg>
                                    </div>
                                    <h3 class="text-sm font-medium text-[#0C1A30] max-w-[211px]">
                                        Щетка для уборки с совком для уборки
                                    </h3>
                                </div>
                                <div class="flex-shrink-0 flex items-center space-x-14">
                                    <div class="space-y-2">
                                        <span class="text-[12px] text-[#838589]">Bahasy</span>
                                        <div class="font-medium text-[#0C1A30]">2500 TMT</div>
                                    </div>
                                    <div class="space-y-2">
                                        <span class="text-[12px] text-[#838589]">Sany</span>
                                        <div class="font-medium text-[#0C1A30]">5</div>
                                    </div>
                                    <div class="space-y-2">
                                        <span class="text-[12px] text-[#838589]">Jemi</span>
                                        <div class="font-medium text-[#0C1A30]">2500 TMT</div>
                                    </div>
                                </div>
                                <button
                                    class="flex-shrink-0 text-sm text-[#FFA100] border border-[#FEB918] px-8 py-2 rounded-md font-medium hover:bg-[#FFA100] hover:text-white hover:border-[#FFA100] transition-all duration-300 ease-in-out">
                                    Sebede goş
                                </button>
                            </div>
                        </div>

                        <!-- Service Item 2 -->
                        <div class="py-5">
                            <div class="flex items-center justify-between">
                                <div class="flex-shrink-0 flex items-center space-x-4">
                                    <div
                                        class="w-[100px] h-[100px] bg-[#F6F7F9] rounded-[10px] flex items-center justify-center">
                                        <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                        </svg>
                                    </div>
                                    <h3 class="text-sm font-medium text-[#0C1A30] max-w-[211px]">
                                        Щетка для уборки с совком для уборки
                                    </h3>
                                </div>
                                <div class="flex-shrink-0 flex items-center space-x-14">
                                    <div class="space-y-2">
                                        <span class="text-[12px] text-[#838589]">Bahasy</span>
                                        <div class="font-medium text-[#0C1A30]">2500 TMT</div>
                                    </div>
                                    <div class="space-y-2">
                                        <span class="text-[12px] text-[#838589]">Sany</span>
                                        <div class="font-medium text-[#0C1A30]">5</div>
                                    </div>
                                    <div class="space-y-2">
                                        <span class="text-[12px] text-[#838589]">Jemi</span>
                                        <div class="font-medium text-[#0C1A30]">2500 TMT</div>
                                    </div>
                                </div>
                                <button
                                    class="flex-shrink-0 text-sm text-[#FFA100] border border-[#FEB918] px-8 py-2 rounded-md font-medium hover:bg-[#FFA100] hover:text-white hover:border-[#FFA100] transition-all duration-300 ease-in-out">
                                    Sebede goş
                                </button>
                            </div>
                        </div>

                        <!-- Service Item 3 -->
                        <div class="py-5">
                            <div class="flex items-center justify-between">
                                <div class="flex-shrink-0 flex items-center space-x-4">
                                    <div
                                        class="w-[100px] h-[100px] bg-[#F6F7F9] rounded-[10px] flex items-center justify-center">
                                        <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                        </svg>
                                    </div>
                                    <h3 class="text-sm font-medium text-[#0C1A30] max-w-[211px]">
                                        Щетка для уборки с совком для уборки
                                    </h3>
                                </div>
                                <div class="flex-shrink-0 flex items-center space-x-14">
                                    <div class="space-y-2">
                                        <span class="text-[12px] text-[#838589]">Bahasy</span>
                                        <div class="font-medium text-[#0C1A30]">2500 TMT</div>
                                    </div>
                                    <div class="space-y-2">
                                        <span class="text-[12px] text-[#838589]">Sany</span>
                                        <div class="font-medium text-[#0C1A30]">5</div>
                                    </div>
                                    <div class="space-y-2">
                                        <span class="text-[12px] text-[#838589]">Jemi</span>
                                        <div class="font-medium text-[#0C1A30]">2500 TMT</div>
                                    </div>
                                </div>
                                <button
                                    class="flex-shrink-0 text-sm text-[#FFA100] border border-[#FEB918] px-8 py-2 rounded-md font-medium hover:bg-[#FFA100] hover:text-white hover:border-[#FFA100] transition-all duration-300 ease-in-out">
                                    Sebede goş
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Contact Information Section -->
                    <div
                        class="lg:w-[950px] w-full space-y-4 sm:p-8 py-8 px-3 bg-white border-t border-[#EDEDED] rounded-xl overflow-hidden">
                        <h1 class="text-lg font-medium text-[#0C1A30]">Maglumatlar</h1>
                        <!-- Form -->
                        <FormSection class="w-full">
                            <div class="pb-4 grid grid-cols-2 gap-6">
                                <FormGroup>
                                    <FormTitle :id="'name'" :title="'Adyňyz'" />
                                    <FormInput v-model="formData.fullname" :label="'name'" :disabled="true" />
                                </FormGroup>
                                <FormGroup>
                                    <FormTitle :id="'phone'" :title="'Telefon belgisi'" />
                                    <FormInput v-model="formData.phone" :label="'phone'" :type="'tel'"
                                        :placeholder="'+993 ********'" :disabled="true" />
                                </FormGroup>
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
                            <div class="grid grid-cols-2 gap-6">
                                <div class="pb-4 pt-10 space-y-8">
                                    <h2 class="text-lg font-medium text-[#0C1A30]">Töleg görnüşi</h2>
                                    <div
                                        class="w-fit px-6 py-3 border border-[#EDEDED] rounded-lg flex items-center space-x-3">
                                        <div
                                            class="w-7 h-7 bg-[#FA004C14] rounded-full flex items-center justify-center">
                                            <bank_note-icon />
                                        </div>
                                        <p class="text-[#0C1A30]">
                                            Nagt töleg
                                        </p>
                                    </div>
                                </div>
                                <div class="pb-4 pt-10 space-y-8">
                                    <h2 class="text-lg font-medium text-[#0C1A30]">Eltip bermek hyzmaty</h2>
                                    <div
                                        class="w-fit px-6 py-3 border border-[#EDEDED] rounded-lg flex items-center space-x-6">
                                        <p class="text-[#0C1A30]">Ýönekeý</p>
                                        <p class="text-[#FEB918] text-sm">
                                            15 manat
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </FormSection>
                    </div>
                </div>
                <!-- Order Summary -->
                <div class="lg:w-[370px] w-full py-6 p-8 bg-white rounded-xl sticky top-32 flex-shrink-0">
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
                                <span class="font-medium text-[#0C1A30]">213 TMT</span>
                            </div>

                            <div class="flex justify-between items-center">
                                <span class="text-[#0C1A30]">Arzanladyş:</span>
                                <span class="font-medium text-[#FA004C]">-12 TMT</span>
                            </div>

                            <div class="flex justify-between items-center">
                                <span class="text-[#0C1A30]">Arzanladyş kupony:</span>
                                <span class="font-medium text-[#FEB918]">-33 TMT</span>
                            </div>
                        </div>

                        <div class="border-t border-[#EDEDED] pt-3">
                            <div class="flex justify-between items-center pt-4">
                                <span class="font-medium text-[#0C1A30]">Jemi:</span>
                                <span class="font-bold text-[#037D84]">424 TMT</span>
                            </div>
                        </div>
                    </div>

                    <!-- Checkout Button -->
                    <button @click="checkout"
                        class="w-full bg-[#FEB918] text-white font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors transform">
                        Sargyt etmek
                    </button>
                </div>
            </div>
        </MainContainer>
    </div>
</template>

<script setup>
const formData = ref({
    fullname: 'Ataýewa Aýbibi',
    phone: '+993 61616161',
    address: 'Arçabil şaýoly, 32 - jaý, 44 - otag',
    note: ''
})
const checkout = () => {

    alert(`Sargyt tassyklandy! Jemi: 123 TMT`)
}
</script>