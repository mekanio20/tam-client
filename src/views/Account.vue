<template>
    <div class="min-h-screen bg-white">
        <MainContainer>
            <div class="py-6">
                <LinkGroup :items="[{ label: 'Hasap', to: '/account' }]" />
            </div>
            <SectionTitle title="Hasap maglumatlary" />

            <!-- Main Content -->
            <div class="grid lg:grid-cols-2 gap-8 py-10">
                <!-- Left Column - Account Information -->
                <section class="rounded-[10px] border border-[#EDEDED] p-8">
                    <div class="flex items-center space-x-6 mb-10">
                        <div class="w-[50px] h-[50px] rounded-full bg-[#FEB91833] flex items-center justify-center">
                            <user-icon color="#FEB918" />
                        </div>
                        <h2 class="text-lg font-semibold text-[#0C1A30]">Hasap maglumatlaryny</h2>
                    </div>

                    <div class="flex flex-col space-y-10">
                        <div class="grid grid-cols-2 gap-4">
                            <!-- Name Field -->
                            <div class="flex flex-col space-y-2">
                                <label for="fullname" class="text-[13px] text-[#838589]">
                                    Adyňyz
                                </label>
                                <input id="fullname" type="text" v-model="formData.fullname"
                                    class="border-none outline-none p-3 bg-[#F6F7F9] rounded-md">
                            </div>
                            <!-- Phone Field -->
                            <div class="flex flex-col space-y-2">
                                <label for="phone" class="text-[13px] text-[#838589]">
                                    Telefon belgiňiz
                                </label>
                                <input id="phone" type="text" v-model="formData.phone"
                                    class="border-none outline-none p-3 bg-[#F6F7F9] rounded-md">
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <!-- Email Field -->
                            <div class="flex flex-col space-y-2">
                                <label for="email" class="text-[13px] text-[#838589]">
                                    Elektron salgyňyz
                                </label>
                                <input id="email" type="email" v-model="formData.email"
                                    class="border-none outline-none p-3 bg-[#F6F7F9] rounded-md">
                            </div>
                        </div>

                        <!-- Save Button -->
                        <button
                            class="w-[353px] mx-auto !mt-16 bg-[#037D84] text-white font-medium py-3 px-4 rounded-lg hover:bg-teal-700 active:bg-teal-800 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                            @click="saveAccount">
                            Ýatda sakla
                        </button>
                    </div>
                </section>

                <!-- Right Column - Addresses -->
                <section class="rounded-[10px] border border-[#EDEDED] p-8">
                    <div class="flex items-center space-x-6 mb-10">
                        <div class="w-[50px] h-[50px] rounded-full bg-[#DF3DFF33] flex items-center justify-center">
                            <map_pin-icon color="#DF3DFF" :size="24" />
                        </div>
                        <h2 class="text-lg font-semibold text-[#0C1A30]">Salgylarym</h2>
                    </div>

                    <!-- Delivery Address -->
                    <div class="mb-4 grid grid-cols-1 gap-10">
                        <div v-if="addresses.length > 0" class="flex flex-col space-y-2 relative">
                            <label for="address" class="text-[13px] text-[#838589]">
                                Hemişelik salgy
                            </label>
                            <input id="address" type="text" :value="avtiveAddress"
                                class="border-none outline-none p-3 bg-[#F6F7F9] rounded-md">
                        </div>
                        <div v-for="(item, index) in addresses" :key="index" class="flex flex-col space-y-2 relative">
                            <label :for="`address` + index" class="text-[13px] text-[#838589]">
                                Salgy
                            </label>
                            <input :id="`address` + index" type="text" v-model="item.display_name"
                                class="border-none outline-none p-3 pr-10 bg-[#F6F7F9] rounded-md">
                            <delete-icon @click="removeAddress(index)" class="absolute right-3 top-[43px] transform -translate-y-1/2 cursor-pointer" />
                        </div>
                    </div>

                    <!-- Add Address Button -->
                    <button
                        class="w-[239px] !mt-16 bg-[#FEB918] text-white font-medium py-3 px-4 rounded-lg hover:bg-yellow-600 active:bg-yellow-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center"
                        @click="showModal = true">
                        <add-icon class="mr-2" />
                        Salgy goşmak
                    </button>
                </section>
            </div>

            <!-- Bottom Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-6 mt-8">
                <button
                    class="flex items-center space-x-4 bg-[#009FE31A] text-[#0C1A30] py-3 px-6 rounded-[10px] transform hover:scale-[1.02] transition-all duration-200"
                    @click="openDictionary">
                    <div class="w-[35px] h-[35px] rounded-full bg-white flex items-center justify-center">
                        <shield-icon />
                    </div>
                    <span class="font-medium">
                        Açar sözlük täzelemek
                    </span>
                </button>

                <button
                    class="flex items-center space-x-4 bg-[#FA004C1A] text-[#FA004C] py-3 px-6 rounded-[10px] transform hover:scale-[1.02] transition-all duration-200"
                    @click="logout">
                    <div class="w-[35px] h-[35px] rounded-full bg-white flex items-center justify-center">
                        <logout_circle-icon />
                    </div>
                    <span class="font-medium">
                        Hasapdan çykmak
                    </span>
                </button>
            </div>
        </MainContainer>
        <!-- Address Modal -->
        <AddressModal :show="showModal" @submit="addAddress" @close="showModal = false" />
    </div>
</template>

<script setup>
const showModal = ref(false)
const formData = ref({
    fullname: 'Ataýewa Aýbibi',
    phone: '+993 61616161',
    email: ''
})
const addresses = ref([])

const avtiveAddress = computed(() => {
    const active = addresses.value.find(address => address.checked)
    return active ? active.display_name : ''
})

const saveAccount = () => {
    console.log('Hiding account')
    // Add hide account functionality here
}

const addAddress = (addressData) => {
    addresses.value.push(addressData)
    showModal.value = false
}

const removeAddress = (index) => {
    addresses.value.splice(index, 1)
}

const openDictionary = () => {
    console.log('Opening dictionary')
}

const logout = () => {
    console.log('Logging out')

}
</script>