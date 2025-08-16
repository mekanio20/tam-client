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
            <div class="absolute top-14 right-0 -z-10 overflow-hidden rounded-tr-2xl">
                <div class="w-[100px]">
                    <img src="/icons/bg-1.png" />
                </div>
            </div>

            <!-- Modal Header -->
            <div class="px-6 pt-8 pb-8 text-center">
                <!-- Title -->
                <ModalTitle title="Açar sözi üýtgetmek" />
                <!-- Subtitle -->
                <h2 class="text-[#0C1A30] text-start font-medium">Tassyklama kody</h2>
            </div>

            <!-- Modal Body -->
            <AuthContainer>
                <FormSection @submit="handleSubmit" class="space-y-5">
                    <!-- Phone Number Field -->
                    <FormGroup>
                        <FormTitle :id="'code'" :title="'Kody giriziň'" />
                        <FormInput v-model="code" :label="'code'" :type="'number'" />
                    </FormGroup>

                    <div class="w-full">
                        <div class="flex items-center justify-center pb-5">
                            <span class="text-sm font-medium">
                                {{ timer }}
                            </span>
                        </div>
    
                        <!-- Submit Button -->
                        <AuthButton :title="'Ulgama girmek'" :isFormValid="isFormValid" />
                    </div>

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
const code = ref()
const timer = ref('01:00')

// Computed properties
const isFormValid = computed(() => {
    return code.value >= 1000
})

// Methods
const handleSubmit = () => {
    console.log('Form submitted');
    if (isFormValid.value) {
        console.log('Form submitted:', {
            code: code.value,
        })
    }
}

const startTimer = () => {
    let seconds = 60;
    const interval = setInterval(() => {
        seconds--;
        timer.value = `00:${seconds < 10 ? `0${seconds}` : seconds}`;
        if (seconds === 0) {
            clearInterval(interval);
            timer.value = '01:00';
        }
    }, 1000);
};

const closeModal = () => {
    emit('update:modelValue', false)
}
</script>