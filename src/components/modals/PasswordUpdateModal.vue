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
                <div v-show="show" class="bg-white w-[500px] overflow-y-auto px-8 py-4 rounded-[14px] flex flex-col relative" @click.stop>
                    <!-- Header -->
                    <div class="flex items-center justify-center pt-4 pb-5">
                        <h2 class="text-[22px] text-center font-medium text-[#0C1A30]">Açar sözüni täzelemek</h2>
                        <button @click="$emit('close')"
                            class="absolute top-8 right-5 flex items-center justify-center bg-[#F6F7F9] rounded-full hover:bg-gray-100">
                            <close-icon />
                        </button>
                    </div>

                    <!-- Content -->
                    <FormSection @submit="handleSubmit" class="space-y-4">
                        <!-- Phone Number -->
                        <FormGroup>
                            <FormTitle :id="'identifier'" :title="'Telefon belgiňiz'" />
                            <FormInput 
                                v-model="formData.identifier" 
                                :label="'identifier'" 
                                type="tel"
                                :icon="{ name: 'phone-icon', size: 14 }" />
                        </FormGroup>

                        <!-- OTP Code -->
                        <FormGroup>
                            <FormTitle :id="'otp'" :title="'Tassyklama kody'" />
                            <div class="flex space-x-2">
                                <FormInput 
                                    v-model="formData.otp" 
                                    :label="'otp'" 
                                    type="text"
                                    class="flex-1" />
                                <button 
                                    type="button"
                                    @click="sendOtp"
                                    :disabled="!formData.identifier || otpLoading"
                                    class="px-4 py-3 bg-[#FEB918] text-white rounded-lg hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                    {{ otpLoading ? 'Ugradylýar...' : 'Ugrat' }}
                                </button>
                            </div>
                        </FormGroup>

                        <!-- New Password -->
                        <FormGroup>
                            <FormTitle :id="'new_password'" :title="'Täze açar sözlük'" />
                            <FormInput 
                                v-model="formData.new_password" 
                                :label="'new_password'" 
                                type="password" />
                        </FormGroup>

                        <!-- Confirm New Password -->
                        <FormGroup>
                            <FormTitle :id="'confirm_password'" :title="'Täze açar sözlügi tassyklamak'" />
                            <FormInput 
                                v-model="formData.confirm_password" 
                                :label="'confirm_password'" 
                                type="password"
                                :icon="{ name: 'eye-icon', size: 14 }" />
                        </FormGroup>
                    </FormSection>

                    <!-- Footer Button -->
                    <button 
                        @click="handleSubmit"
                        :disabled="loading"
                        class="w-full mt-6 bg-[#FEB918] text-white font-bold py-3 px-4 rounded-lg hover:bg-amber-500 transition-colors transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed">
                        {{ loading ? 'Täzeleýär...' : 'Täzelemek' }}
                    </button>
                </div>
            </Transition>
        </div>
    </Transition>
</template>

<script setup>
const authStore = useAuthStore()
const { sendOtp: sendOtpApi, resetPassword: resetPasswordApi } = authStore

const formData = ref({
    identifier: '',
    otp: '',
    new_password: '',
    confirm_password: ''
})

const loading = ref(false)
const otpLoading = ref(false)
const props = defineProps({ show: Boolean })
const emit = defineEmits(['close', 'submit'])

const sendOtp = async () => {
    if (!formData.value.identifier) {
        alert('Telefon belgini giriziň')
        return
    }
    
    otpLoading.value = true
    try {
        await sendOtpApi({ 
            identifier: formData.value.identifier, 
            purpose: 'reset_password'
        })
    } catch (e) {
        console.error('OTP send failed:', e)
    } finally {
        otpLoading.value = false
    }
}

const handleSubmit = async () => {
    if (!formData.value.identifier) {
        alert('Telefon belgini giriziň')
        return
    }
    
    if (!formData.value.otp) {
        alert('Tassyklama kodyny giriziň')
        return
    }
    
    if (!formData.value.new_password) {
        alert('Täze açar sözlügi giriziň')
        return
    }
    
    if (formData.value.new_password !== formData.value.confirm_password) {
        alert('Täze açar sözlükler gabat gelmeýär')
        return
    }
    
    if (formData.value.new_password.length < 8) {
        alert('Täze açar sözlük azyndan 8 simwoldan ybarat bolmaly')
        return
    }
    
    loading.value = true
    try {
        await resetPasswordApi({
            identifier: formData.value.identifier,
            otp: formData.value.otp,
            new_password: formData.value.new_password
        })
        emit('submit', true) // Success
    } catch (e) {
        console.error('Password reset failed:', e)
        emit('submit', false) // Error
    } finally {
        loading.value = false
    }
}

// Reset form when modal closes
watch(() => props.show, (newVal) => {
    if (!newVal) {
        formData.value = {
            identifier: '',
            otp: '',
            new_password: '',
            confirm_password: ''
        }
    }
})
</script>
