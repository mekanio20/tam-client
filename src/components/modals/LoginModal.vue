<template>
    <!-- Modal Backdrop -->
    <div v-if="modelValue" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click="$emit('update:modelValue', false)">
        <!-- Modal Content -->
        <div class="relative bg-white rounded-[14px] w-full max-w-md mx-auto transform transition-all duration-300 ease-out"
            @click.stop>

            <!-- Close Button -->
            <button @click="$emit('update:modelValue', false)"
                class="w-[38px] h-[38px] absolute top-[30px] right-4 rounded-full bg-[#F6F7F9] flex items-center justify-center transition-colors duration-200 z-10">
                <close-icon />
            </button>

            <!-- Background decorative element -->
            <div class="absolute top-16 right-0 -z-10 overflow-hidden rounded-tr-2xl">
                <div class="w-[100px]">
                    <img src="/icons/bg-1.png" />
                </div>
            </div>

            <!-- Modal Header -->
            <div class="px-6 pt-8 pb-6 text-center">
                <!-- Title -->
                <ModalTitle title="Hoş Geldiniz!" />

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
        activeTab === 'email'
            ? 'bg-white text-[#0C1A30] shadow-sm'
            : 'text-[#838589] hover:text-[#0C1A30]'
    ]" @click="setActiveTab('email')">
                        Elektron salgy
                    </button>
                </div>
            </div>

            <!-- Modal Body -->
            <AuthContainer>
                <!-- Phone Tab Content -->
                <FormSection v-if="activeTab === 'phone'" @submit="handleSubmit" class="space-y-6">
                    <!-- Phone Number Field -->
                    <FormGroup class="pb-3">
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
                                <eye-icon v-if="!showPassword" />
                                <eye_hide-icon v-else />
                            </button>
                        </div>
                    </FormGroup>

                    <!-- Submit Button -->
                    <AuthButton :title="'Ulgama girmek'" :isFormValid="isFormValid" :loading="auth.loading"
                        :loadingText="'Ugradylýar'" />

                </FormSection>

                <!-- Email Tab Content (placeholder) -->
                <FormSection v-else @submit="handleSubmit" class="space-y-6">
                    <!-- Email Field -->
                    <FormGroup class="pb-3">
                        <FormTitle :id="'email'" :title="'E-poçta salgysy'" />
                        <FormInput v-model="email" :label="'email'" :type="'email'" :placeholder="'example@.com'" />
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
                                <eye-icon v-if="!showPassword" />
                                <eye_hide-icon v-else />
                            </button>
                        </div>
                    </FormGroup>

                    <!-- Submit Button -->
                    <AuthButton :title="'Ulgama girmek'" :isFormValid="isFormValid" :loading="auth.loading"
                        :loadingText="'Ugradylýar'" />
                </FormSection>

                <!-- Footer Links -->
                <div class="flex items-center justify-between pt-10">
                    <button
                        class="text-[#0C1A30] hover:text-gray-900 hover:underline text-sm font-medium transition-colors duration-200"
                        @click="forgotPassword">
                        Açar sözi unutdym
                    </button>
                    <button
                        class="text-[#037D84] hover:text-[#2d989e] hover:underline text-sm font-medium transition-colors duration-200"
                        @click.stop="redirectRegister">
                        Hasap döret
                    </button>
                </div>
            </AuthContainer>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    }
})
const emit = defineEmits(['update:modelValue', 'success', 'forgot_password', 'register'])

// Modal state
const activeTab = ref('phone')

// Form state
const phoneNumber = ref('')
const password = ref('')
const email = ref('')
const showPassword = ref(false)

// Computed properties
const isFormValid = computed(() => {
    if (!password.value) return false;

    if (activeTab.value === 'phone') return phoneNumber.value.length > 10;
    if (activeTab.value === 'email') return email.value.length > 0;

    return false;
});

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

const handleSubmit = async () => {
    if (isFormValid.value) {
        try {
            const identifier = phoneNumber.value || email.value
            await auth.login({ username: identifier, password: password.value })
            emit('update:modelValue', false)
            emit('success', true)
        } catch (err) {
            console.error(err)
            emit('success', false)
        }
    }
}

const forgotPassword = () => {
    emit('forgot_password')
}
const redirectRegister = () => {
    emit('register')
}
</script>