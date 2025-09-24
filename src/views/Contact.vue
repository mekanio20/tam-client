<template>
    <div class="min-h-screen bg-white">
        <!-- Main Content -->
        <MainContainer>
            <LinkGroup :items="[{ label: 'Habarlaşmak', to: '/contact' }]" />

            <!-- Header -->
            <div class="max-w-[1500px] mx-auto">
                <SectionTitle title="Habarlaşmak" />

                <!-- Responsive Form & Info Section -->
                <div class="flex flex-col lg:flex-row gap-10 lg:gap-40 pt-10">
                    <!-- Form Section -->
                    <FormSection @submit="handleSubmit" class="space-y-8 flex-1 flex flex-col">
                        <FormGroup>
                            <FormTitle :id="'name'" :title="'Adyňyz'" />
                            <FormInput v-model="formData.name" :label="'name'" />
                        </FormGroup>

                        <FormGroup>
                            <FormTitle :id="'phone'" :title="'Telefon belgisi'" />
                            <FormInput v-model="formData.phone" :label="'phone'" :type="'tel'"
                                :placeholder="'+993 ********'" />
                        </FormGroup>

                        <FormGroup>
                            <FormTitle :id="'email'" :title="'E-poçta salgysy'" />
                            <FormInput v-model="formData.email" :label="'email'" :type="'email'"
                                :placeholder="'example@.com'" />
                        </FormGroup>

                        <FormGroup>
                            <FormTitle :id="'contact'" :title="'Habarlaşmak'" />
                            <textarea v-model="formData.contact"
                                class="w-full h-[100px] resize-none px-5 py-4 bg-[#F6F7F9] border-0 rounded-[10px] 
                         focus:ring-1 focus:ring-[#FEB918] focus:bg-white outline-none transition-all duration-200 pr-12"></textarea>
                        </FormGroup>

                        <button @click.stop="handleSubmit" class="sm:w-[350px] w-full self-center bg-[#037D84] hover:bg-[#25969c] 
                       text-white rounded-md py-3 text-sm font-medium transition">
                            <span v-if="false">Ugradylýar...</span>
                            <span v-else>Ugrat</span>
                        </button>
                    </FormSection>

                    <!-- Contact Info -->
                    <div class="space-y-8 flex-1 pt-8">
                        <div v-for="(item, index) in items" :key="index" class="flex items-center sm:space-x-6 space-x-3">
                            <div class="sm:w-[55px] sm:h-[55px] w-[50px] h-[50px] bg-[#FFF1D1] rounded-full flex items-center justify-center">
                                <component :is="icons[item?.icon]" :size="19" :color="'#FEB918'" />
                            </div>
                            <span class="text-base sm:text-lg md:text-xl text-[#0C1A30]">
                                {{ item.value }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>
    </div>
</template>

<script setup>
const { icons, loadIcons } = useIcons()
onMounted(() => {
    loadIcons()
})

const formData = ref({
    name: '',
    phone: '',
    email: '',
    contact: ''
})

const items = ref([
    { icon: 'phone-icon', value: '136010' },
    { icon: 'phone-icon', value: '136020' },
    { icon: 'mail-icon', value: 'tamrahat@gmail.com' },
    { icon: 'tiktok-icon', value: '@tamrahat.com.tm1' },
    { icon: 'instagram-icon', value: '@tamrahat.store' }
])

const handleSubmit = () => {
    console.log(formData.value)
}
</script>