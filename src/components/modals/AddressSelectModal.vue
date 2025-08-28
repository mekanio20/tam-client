<template>
    <!-- Modal Overlay -->
    <Transition enter-active-class="transition-opacity duration-300 ease-out" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-show="show" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            @click="$emit('close')">
            <!-- Modal Container -->
            <Transition enter-active-class="transition-transform duration-300 ease-out"
                enter-from-class="translate-y-full sm:scale-95" enter-to-class="translate-y-0 sm:scale-100"
                leave-active-class="transition-transform duration-200 ease-in"
                leave-from-class="translate-y-0 sm:scale-100" leave-to-class="translate-y-full sm:scale-95">
                <div v-show="show"
                    class="bg-white w-[700px] overflow-y-auto px-12 py-10 rounded-[14px] flex flex-col relative"
                    @click.stop>
                    <!-- Header -->
                    <div class="flex items-center justify-center pb-10">
                        <h2 class="text-[22px] text-center font-medium text-[#0C1A30]">Salgy goşmak</h2>
                        <button @click="$emit('close')"
                            class="absolute top-10 right-12 flex items-center justify-center bg-[#F6F7F9] rounded-full hover:bg-gray-100">
                            <close-icon />
                        </button>
                    </div>

                    <div class="flex flex-col space-y-10">
                        <div class="flex flex-col space-y-3">
                            <h4 class="text-sm text-[#838589]">
                                Hemişelik salgy
                            </h4>
                            <div class="flex items-center justify-between rounded-lg border p-3 cursor-pointer"
                                @click="selectAddress(fixedAddress?.id)"
                                :class="fixedAddress?.id === avtiveAddress.id ? 'border-[#FEB918] bg-[#FEB9180D]' : 'border-[#EDEDED]'">
                                <h5
                                    :class="fixedAddress?.id === avtiveAddress.id ? 'text-[#FEB918] font-semibold' : 'text-[#0C1A30]'">
                                    {{ fixedAddress.address }}</h5>
                                <!-- Radio Circle -->
                                <div :class="[
            'w-[22px] h-[22px] ml-2 rounded-full transition-all duration-300 flex items-center justify-center',
            fixedAddress.id === avtiveAddress.id
                ? 'border-[#FEB918] border-4 bg-[#FEB9180D]'
                : 'border-[#EDEDED] border-2 bg-white group-hover:border-[#FEB918]'
        ]">
                                    <div v-if="avtiveAddress?.id" class="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col space-y-3">
                            <h4 class="text-sm text-[#838589]">
                                Salgy
                            </h4>
                            <div v-for="item in filteredAddress" :key="item.id" @click="selectAddress(item.id)"
                                :class="item.id === avtiveAddress.id ? 'border-[#FEB918] bg-[#FEB9180D]' : 'border-[#EDEDED]'"
                                class="flex items-center justify-between rounded-lg border p-3 cursor-pointer">
                                <h5
                                    :class="item.id === avtiveAddress.id ? 'text-[#FEB918] font-semibold' : 'text-[#0C1A30]'">
                                    {{ item.address }}</h5>
                                <!-- Radio Circle -->
                                <div :class="[
            'w-[22px] h-[22px] ml-2 rounded-full transition-all duration-300 flex items-center justify-center',
            item.id === avtiveAddress.id
                ? 'border-[#FEB918] border-4 bg-[#FEB9180D]'
                : 'border-[#EDEDED] border-2 bg-white group-hover:border-[#FEB918]'
        ]">
                                    <div class="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Footer Button -->
                    <div class="flex items-center justify-center gap-4 mt-14">
                        <button @click="$emit('addAddress')"
                            class="flex-1 flex items-center justify-center gap-4 font-semibold border border-[#FBBF24] text-[#FBBF24] px-4 py-3 rounded-lg hover:bg-[#FFF8E1] transition">
                            <!-- Icon -->
                           <add-icon color="#FBBF24" />
                            <span>Salg y goşmak</span>
                        </button>

                        <button @click="$emit('submit', avtiveAddress)" class="flex-1 bg-[#007B83] text-white font-semibold px-4 py-3 rounded-lg hover:bg-[#00666B] transition">
                            Dowam etmek
                        </button>
                    </div>
                </div>
            </Transition>
        </div>
    </Transition>
</template>

<script setup>
const emit = defineEmits(['close', 'submit', 'addAddress'])
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    }
})
const addresses = ref([
    { id: 1, address: 'Tashkent', isFixed: true, avtive: true },
    { id: 2, address: 'Chilonzor', isFixed: false, avtive: false },
    { id: 3, address: 'Mirzo Ulugbek', isFixed: false, avtive: false },
    { id: 4, address: 'Mirzo Ulugbek', isFixed: false, avtive: false },
])
// Methods
const selectAddress = (addressId) => {
    addresses.value.forEach((item) => {
        if (item.id === addressId) {
            item.avtive = true
        } else {
            item.avtive = false
        }
    })
}
const handleSubmit = () => {
    emit('submit')
}
// Computed
const avtiveAddress = computed(() => {
    const address = addresses.value.find((address) => address.avtive === true)
    return address ? address : {}
})
const fixedAddress = computed(() => {
    const address = addresses.value.find((address) => address.isFixed === true)
    return address ? address : {}
})
const filteredAddress = computed(() => {
    return addresses.value.filter((address) => address.isFixed === false)
})
</script>