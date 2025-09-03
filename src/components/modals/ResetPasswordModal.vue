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
                <ModalTitle :title="step === 'request' ? 'Açar sözi üýtgetmek' : 'Tassyklama'" />
                <!-- Subtitle -->
                <h2 class="text-[#0C1A30] text-start font-medium">
                    {{ step === 'request' ? 'Telefon belgisi' : 'Kody we täze açar sözi giriziň' }}
                </h2>
            </div>

            <!-- Modal Body -->
            <AuthContainer>
                <FormSection @submit="handleSubmit" class="space-y-8">
                    <!-- Request OTP -->
                    <template v-if="step === 'request'">
                        <FormGroup class="pb-5">
                            <FormTitle :id="'phone'" :title="'Telefon belgisi'" />
                            <FormInput v-model="phoneNumber" :label="'phone'" :type="'tel'"
                                :placeholder="'+993 ********'" />
                        </FormGroup>
                        <AuthButton :title="'Dowam etmek'" :isFormValid="isFormValid" :loading="auth.loading" :loadingText="'Ugradylýar'" />
                    </template>

                    <!-- Confirm OTP + New Password -->
                    <template v-else>
                        <FormGroup>
                            <FormTitle :id="'code'" :title="'Kody giriziň'" />
                            <FormInput v-model="code" :label="'code'" :type="'number'" :placeholder="'123456'" />
                        </FormGroup>
                        <FormGroup>
                            <FormTitle :id="'new_password'" :title="'Täze açar sözi'" />
                            <FormInput v-model="newPassword" :label="'new_password'" :type="showPassword ? 'text' : 'password'" :placeholder="'•••••••••'" />
                        </FormGroup>
                        <div class="flex items-center justify-between">
                            <button type="button" @click="backToPhone" class="text-sm text-[#0C1A30] hover:underline">
                                Yza
                            </button>
                            <div class="w-40">
                                <AuthButton :title="'Tassyklamak'" :isFormValid="isFormValid" :loading="auth.loading" :loadingText="'Tassyklanýar'" />
                            </div>
                        </div>
                    </template>

                </FormSection>
            </AuthContainer>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
})
const emit = defineEmits(['update:modelValue'])

// Form state
const phoneNumber = ref('+993 63755727')
const code = ref('')
const newPassword = ref('')
const showPassword = ref(false)
const step = ref('request') // 'request' | 'confirm'

// Computed properties
const isFormValid = computed(() => {
    if (step.value === 'request') {
        return phoneNumber.value.length > 10
    }
    return String(code.value).length >= 4 && newPassword.value.length >= 6
})

// Methods
const handleSubmit = async () => {
    if (!isFormValid.value) return
    try {
        if (step.value === 'request') {
            const res = await auth.sendOtp({ identifier: phoneNumber.value, purpose: 'reset_password' })
            if (res.status === 'ok') {
                step.value = 'confirm'
            }
        } else {
            const res = await auth.resetPassword({ identifier: phoneNumber.value, otp: code.value, new_password: newPassword.value })
            if (res.status === 'ok') {
                emit('update:modelValue', false)
                // reset state
                step.value = 'request'
                code.value = ''
                newPassword.value = ''
            }
        }
    } catch (e) {
        console.error(e)
    }
}

const backToPhone = () => {
    step.value = 'request'
}

const closeModal = () => {
    emit('update:modelValue', false)
    // optional reset
    step.value = 'request'
    code.value = ''
    newPassword.value = ''
}
</script>