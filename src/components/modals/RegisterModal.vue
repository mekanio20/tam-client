<template>
    <!-- Modal Backdrop -->
    <div v-if="modelValue" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click="$emit('update:modelValue', false)">
        <!-- Modal Content -->
        <div class="relative bg-white rounded-[14px] w-full max-w-md mx-auto transform transition-all duration-300 ease-out"
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
            <div class="px-6 pt-8 pb-8 text-center">
                <!-- Title -->
                <ModalTitle title="Hoş Geldiniz!" />
                <!-- Subtitle -->
                <h2 class="text-[#0C1A30] text-start font-medium">Hasap döretmek</h2>
            </div>

            <!-- Modal Body -->
            <AuthContainer>
                <!-- Phone Tab Content -->
                <FormSection v-if="activeTab === 'phone'" @submit="handleSubmit" class="space-y-8">
                    <!-- Name Field -->
                    <FormGroup>
                        <FormTitle :id="'name'" :title="'Adyňyz'" />
                        <FormInput v-model="name" :label="'name'"
                            :placeholder="'+993 61626364'" />
                    </FormGroup>

                    <!-- Phone Number Field -->
                    <FormGroup>
                        <FormTitle :id="'phone'" :title="'Telefon belgisi'" />
                        <FormInput v-model="phoneNumber" :label="'phone'" :type="'tel'"
                            :placeholder="'+993 ********'" />
                    </FormGroup>

                    <!-- Password Field -->
                    <FormGroup class="pb-5">
                        <FormTitle :id="'phone'" :title="'Açar sözi'" />
                        <div class="relative">
                            <FormInput v-model="password" :label="'phone'" :type="showPassword ? 'text' : 'password'"
                                :placeholder="'•••••••••'" />
                            <button @click="togglePassword"
                                class="absolute right-4 top-1/2 transform -translate-y-1/2 hover:text-[#838589] transition-colors duration-200"
                                type="button">
                                <component v-if="!showPassword" :is="icons['eye-icon']" />
                                <!-- <component v-else :is="icons['eye_remove-icon']" /> -->
                            </button>
                        </div>
                    </FormGroup>

                    <!-- Submit Button -->
                    <button type="submit" :disabled="!isFormValid" :class="[
        'w-full py-4 font-bold rounded-lg transition-all duration-200 transform',
        isFormValid
            ? 'bg-[#FEB918] hover:bg-yellow-500 text-white hover:scale-[1.01] active:scale-[0.98]'
            : 'bg-gray-200 text-white cursor-not-allowed'
    ]">
                        Ulgama gir
                    </button>

                </FormSection>

                <!-- Electron Tab Content (placeholder) -->
                <FormSection v-else @submit="handleSubmit" class="space-y-6">
                    <!-- Phone Number Field -->
                    <FormGroup class="pb-3">
                        <FormTitle :id="'email'" :title="'E-poçta salgysy'" />
                        <FormInput v-model="email" :label="'email'" :type="'email'"
                            :placeholder="'example@.com'" />
                    </FormGroup>

                    <!-- Password Field -->
                    <FormGroup class="pb-5">
                        <FormTitle :id="'phone'" :title="'Açar sözi'" />
                        <div class="relative">
                            <FormInput v-model="password" :label="'phone'" :type="showPassword ? 'text' : 'password'"
                                :placeholder="'•••••••••'" />
                            <button @click="togglePassword"
                                class="absolute right-4 top-1/2 transform -translate-y-1/2 hover:text-[#838589] transition-colors duration-200"
                                type="button">
                                <component v-if="!showPassword" :is="icons['eye-icon']" />
                                <!-- <component v-else :is="icons['eye_remove-icon']" /> -->
                            </button>
                        </div>
                    </FormGroup>

                    <!-- Submit Button -->
                    <button type="submit" :disabled="!isFormValid" :class="[
        'w-full py-4 font-bold rounded-lg transition-all duration-200 transform',
        isFormValid
            ? 'bg-[#FEB918] hover:bg-yellow-500 text-white hover:scale-[1.01] active:scale-[0.98]'
            : 'bg-gray-200 text-white cursor-not-allowed'
    ]">
                        Ulgama gir
                    </button>
                </FormSection>

                <!-- Footer Links -->
                <div class="flex items-center justify-between pt-10">
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
            </AuthContainer>
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
const email = ref('')
const name = ref('')
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
    console.log('Form submitted');
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