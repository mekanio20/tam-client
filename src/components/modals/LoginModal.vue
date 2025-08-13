<template>
    <!-- Modal Backdrop -->
    <div v-if="modelValue" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click="$emit('update:modelValue', false)">
        <!-- Modal Content -->
        <div class="relative bg-white rounded-[14px] w-full max-w-md mx-auto shadow-2xl transform transition-all duration-300 ease-out"
            @click.stop>

            <!-- Close Button -->
            <button @click="closeModal"
                class="w-[38px] h-[38px] absolute top-[30px] right-4 rounded-full bg-[#F6F7F9] flex items-center justify-center transition-colors duration-200 z-10">
                <component :is="icons['close-icon']" />
            </button>

            <!-- Background decorative element -->
            <div class="absolute top-16 right-0 -z-10 overflow-hidden rounded-tr-2xl">
                <div class="w-[100px]">
                    <img src="/icons/bg-1.png" />
                </div>
            </div>

            <!-- Modal Header -->
            <div class="px-6 pt-8 pb-6 text-center">
                <h1 class="text-[22px] font-medium text-[#0C1A30] mb-16">Hoş Geldiniz!</h1>

                <!-- Tab Navigation -->
                <div class="flex bg-[#F6F7F9] rounded-lg p-1 mb-5">
                    <button :class="['flex-1 py-4 px-10 font-medium rounded-md transition-all duration-200 leading-[100%]',
        activeTab === 'phone'
            ? 'bg-white text-[#0C1A30] shadow-sm'
            : 'text-[#838589] hover:text-[#0C1A30]'
    ]" @click="setActiveTab('phone')">
                        Telefon belgi
                    </button>
                    <button :class="['flex-1 py-4 px-10 font-medium rounded-md transition-all duration-200 leading-[100%]',
        activeTab === 'electron'
            ? 'bg-white text-[#0C1A30] shadow-sm'
            : 'text-[#838589] hover:text-[#0C1A30]'
    ]" @click="setActiveTab('electron')">
                        Elektron salgy
                    </button>
                </div>
            </div>

            <!-- Modal Body -->
            <div class="px-6 pb-8">
                <!-- Phone Tab Content -->
                <div v-if="activeTab === 'phone'" class="space-y-6">
                    <!-- Phone Number Field -->
                    <div class="pb-3">
                        <label class="block text-[#838589] mb-3 text-left">
                            Telefon belgisi
                        </label>
                        <div class="relative">
                            <input v-model="phoneNumber" type="tel"
                                class="w-full px-5 py-4 bg-[#F6F7F9] border-0 rounded-[10px] focus:ring-1 focus:ring-[#FEB918] focus:bg-white outline-none transition-all duration-200"
                                placeholder="+993 61626364" @input="formatPhoneNumber" />
                        </div>
                    </div>

                    <!-- Password Field -->
                    <div class="pb-5">
                        <label class="block text-[#838589] mb-3 text-left">
                            Açar sözi
                        </label>
                        <div class="relative">
                            <input v-model="password" :type="showPassword ? 'text' : 'password'"
                                class="w-full px-5 py-4 bg-[#F6F7F9] border-0 rounded-[10px] focus:ring-1 focus:ring-[#FEB918] focus:bg-white outline-none transition-all duration-200 pr-12"
                                placeholder="•••••••••" />
                            <button @click="togglePassword"
                                class="absolute right-4 top-1/2 transform -translate-y-1/2 hover:text-[#838589] transition-colors duration-200"
                                type="button">
                                <component v-if="!showPassword" :is="icons['eye-icon']" />
                                <!-- <component v-else :is="icons['eye_remove-icon']" /> -->
                            </button>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <button @click="handleSubmit" :disabled="!isFormValid" :class="[
        'w-full py-4 font-bold rounded-lg transition-all duration-200 transform',
        isFormValid
            ? 'bg-[#FEB918] hover:bg-yellow-500 text-white hover:scale-[1.01] active:scale-[0.98]'
            : 'bg-gray-200 text-white cursor-not-allowed'
    ]">
                        Ulgama gir
                    </button>

                    <!-- Footer Links -->
                    <div class="flex items-center justify-between pt-4">
                        <button
                            class="text-[#0C1A30] hover:text-gray-900 text-sm font-medium transition-colors duration-200"
                            @click="forgotPassword">
                            Açar sözi unutdym
                        </button>
                        <button
                            class="text-[#037D84] hover:text-[#2d989e] text-sm font-medium transition-colors duration-200"
                            @click="createAccount">
                            Hasap döret
                        </button>
                    </div>
                </div>

                <!-- Electron Tab Content (placeholder) -->
                <div v-else class="text-center py-8">
                    <div class="text-gray-500 mb-4">
                        <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <p class="text-[#838589]">Elektron salqy bilen girmek üçin<br>e-mail adresiňizi giriziň</p>
                    <div class="mt-6">
                        <input type="email"
                            class="w-full px-4 py-4 text-lg bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                            placeholder="email@example.com" />
                    </div>
                    <button
                        class="w-full mt-4 py-4 text-lg font-medium rounded-xl bg-yellow-400 hover:bg-yellow-500 text-gray-900 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]">
                        Dowam et
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { icons, loadIcons } = useIcons()
onMounted(() => { loadIcons() })

defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
})
const emit = defineEmits(['update:modelValue'])

// Modal state
const showModal = ref(true)
const activeTab = ref('phone')

// Form state
const phoneNumber = ref('+993 61626364')
const password = ref('')
const showPassword = ref(false)

// Computed properties
const isFormValid = computed(() => {
    return phoneNumber.value.length > 10 && password.value.length > 0
})

// Methods
const setActiveTab = (tab) => {
    activeTab.value = tab
}

const togglePassword = () => {
    showPassword.value = !showPassword.value
}

const formatPhoneNumber = (event) => {
    let value = event.target.value.replace(/\D/g, '')
    if (value.startsWith('993')) {
        value = '+993 ' + value.slice(3)
    }
    phoneNumber.value = value
}

const handleSubmit = () => {
    if (isFormValid.value) {
        console.log('Form submitted:', {
            phone: phoneNumber.value,
            password: password.value
        })
    }
}

const forgotPassword = () => {
    console.log('Forgot password clicked')
}

const createAccount = () => {
    console.log('Create account clicked')
}

const closeModal = () => {
    emit('update:modelValue', false)
}
</script>