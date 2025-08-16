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
                <ModalTitle title="Açar sözi üýtgetmek" />
                <!-- Subtitle -->
                <h2 class="text-[#0C1A30] text-start font-medium">Täze açar sözi</h2>
            </div>

            <!-- Modal Body -->
            <AuthContainer>
                <FormSection @submit="handleSubmit" class="space-y-8">
                    <!-- Phone Number Field -->
                    <FormGroup class="pb-5">
                        <FormTitle :id="'phone'" :title="'Telefon belgisi'" />
                        <FormInput v-model="phoneNumber" :label="'phone'" :type="'tel'"
                            :placeholder="'+993 ********'" />
                    </FormGroup>

                    <!-- Submit Button -->
                    <AuthButton :title="'Dowam etmek'" :isFormValid="isFormValid" />

                </FormSection>
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
const emit = defineEmits(['update:modelValue'])

// Form state
const phoneNumber = ref('+993 61626364')

// Computed properties
const isFormValid = computed(() => {
    return phoneNumber.value.length > 10
})

// Methods
const handleSubmit = () => {
    console.log('Form submitted');
    if (isFormValid.value) {
        console.log('Form submitted:', {
            phone: phoneNumber.value,
        })
    }
}

const closeModal = () => {
    emit('update:modelValue', false)
}
</script>