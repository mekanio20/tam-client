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
            <div class="px-6 pt-8 pb-8 text-center">
                <!-- Title -->
                <ModalTitle title="Hoş Geldiniz!" />
                <!-- Subtitle -->
                <h2 class="text-[#0C1A30] text-start font-medium">Hasap döretmek</h2>
            </div>

            <!-- Modal Body -->
            <AuthContainer>
                <!-- Phone Tab Content -->
                <FormSection @submit="handleSubmit" class="space-y-4">
                    <!-- Firstname Field -->
                    <FormGroup>
                        <FormTitle :id="'firstname'" :title="'Adyňyz'" />
                        <FormInput v-model="firstname" :label="'firstname'"
                            :placeholder="''" />
                    </FormGroup>

                    <!-- Lastname Field -->
                    <FormGroup>
                        <FormTitle :id="'lastname'" :title="'Familiýaňyz'" />
                        <FormInput v-model="lastname" :label="'lastname'"
                            :placeholder="''" />
                    </FormGroup>

                    <!-- Phone Number Field -->
                    <FormGroup>
                        <FormTitle :id="'phone'" :title="'Telefon belgisi'" />
                        <FormInput v-model="phoneNumber" :label="'phone'" :type="'tel'"
                            :placeholder="'+993 ********'" />
                    </FormGroup>

                    <!-- Password Field -->
                    <FormGroup class="pb-2">
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
                    <AuthButton :title="'Dowam etmek'" :isFormValid="isFormValid" :loading="auth.loading" :loadingText="'Ugradylýar'" />

                </FormSection>
                
                <!-- Footer Links -->
                <div @click="redirectLogin" class="flex items-center justify-center pt-8">
                    <div class="flex items-center space-x-1">
                        <span class="text-[#0C1A30] text-sm font-medium transition-colors duration-200">Hasabyňyz barmy?</span>
                        <button
                            class="text-[#037D84] hover:text-[#2d989e] hover:underline text-sm font-medium transition-colors duration-200">
                            Ulgama giriň
                        </button>
                    </div>
                </div>
            </AuthContainer>
        </div>
    </div>
</template>

<script setup>
defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
})
const emit = defineEmits(['update:modelValue', 'login', 'send_otp', 'forgot_password'])
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

// Form state
const phoneNumber = ref('+993 63755727')
const showPassword = ref(false)
const password = ref('adminadmin')
const firstname = ref('Mekan')
const lastname = ref('Baylyyew')

// Computed properties
const isFormValid = computed(() => {
    return phoneNumber.value.length > 10 && password.value.length > 0 && firstname.value.length > 0 && lastname.value.length > 0
})

// Methods
const togglePassword = () => {
    showPassword.value = !showPassword.value
}

const handleSubmit = async () => {
    if (isFormValid.value) {
        try {
            const otp = await auth.sendOtp({ identifier: phoneNumber.value, purpose: "registration" })
            if (otp.status === "ok") {
                emit('send_otp', {
                    first_name: firstname.value,
                    last_name: lastname.value,
                    identifier: phoneNumber.value,
                    password: password.value
                })
            }
        } catch (err) {
            console.error(err)
        }
    }
}

const redirectLogin = () => {
    emit('login')
}
</script>