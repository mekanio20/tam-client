<template>
    <div class="min-h-screen bg-white">
        <!-- Main Content -->
        <MainContainer>
            <LinkGroup :items="[{ label: 'Sorag-jogap', to: '/faq' }]" />
            <!-- Header -->
            <div class="bg-white">
                <div class="sm:max-w-[1500px] mx-auto px-4 py-6">
                    <h1 class="text-[30px] font-semibold text-[#0C1A30] text-center transition-all duration-700"
                        :class="{ 'opacity-100 translate-y-0': isVisible, 'opacity-0 translate-y-4': !isVisible }">
                        Sorag-jogap
                    </h1>
                </div>
            </div>
            <div class="py-4">
                <!-- Navigation Tabs -->
                <div class="mb-8" role="tablist">
                    <div class="flex flex-wrap gap-2 sm:gap-0 sm:space-x-2">
                        <button v-for="(tab, index) in faqs" :key="index" @click="activeTab = tab.id" :class="[
                'px-6 py-2 sm:text-base text-sm rounded-lg transition-all duration-200',
                activeTab === tab.id
                    ? 'bg-[#FEB918] text-white font-semibold'
                    : 'bg-white text-[#838589] hover:bg-gray-50 border border-[#EDEDED]'
            ]" :aria-selected="activeTab === tab.id" role="tab">
                            {{ tab.name }}
                        </button>
                    </div>
                </div>

                <!-- FAQ Accordion -->
                <section class="space-y-6">
                    <div v-for="(item, index) in faqs?.questions" :key="item.id"
                        class="bg-[#F6F7F9] rounded-[10px] overflow-hidden transition-all duration-500" :class="{
                'opacity-100 translate-y-0': isVisible,
                'opacity-0 translate-y-8': !isVisible
            }" :style="{ transitionDelay: `${300 + index * 100}ms` }">
                        <!-- Question Header -->
                        <button @click="toggleAccordion(item.id)"
                            class="w-full px-6 py-5 text-left flex items-center justify-between transition-colors duration-200 group">
                            <h3 class="text-base font-medium text-[#0C1A30]">
                                {{ item.text }}
                            </h3>
                            <svg class="w-5 h-5 text-[#0C1A30] transition-transform duration-300 group-hover:text-gray-700"
                                :class="{ 'rotate-180': openAccordion === item.id }" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <!-- Answer Content -->
                        <div class="overflow-hidden transition-all duration-300 ease-in-out" :class="[
                openAccordion === item.id
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
            ]">
                            <div class="px-6 pb-5">
                                <div class="sm:pt-4">
                                    <p v-if="item.answer"
                                        class="text-[#838589] leading-relaxed transition-all duration-300"
                                        :class="{ 'translate-y-0 opacity-100': openAccordion === item.id, 'translate-y-2 opacity-0': openAccordion !== item.id }">
                                        {{ item.answer }}
                                    </p>
                                    <p v-else class="text-[#838589] italic transition-all duration-300"
                                        :class="{ 'translate-y-0 opacity-100': openAccordion === item.id, 'translate-y-2 opacity-0': openAccordion !== item.id }">
                                        Bu sorag üçin jogap heniz goşulmadyk.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </MainContainer>
    </div>
</template>

<script setup>
const faqStore = useFaqStore()
const { faqs } = storeToRefs(faqStore)
const { fethcFaqs } = faqStore
const activeTab = ref(1)
const openAccordion = ref(0)
const isVisible = ref(false)

const tabs = ref([
    {
        id: 1,
        name: 'Ählisi'
    },
    {
        id: 2,
        name: 'Kargo hyzmatlary'
    },
    {
        id: 3,
        name: 'Howpsuzlyk'
    },
    {
        id: 4,
        name: 'Sargyt'
    },
    {
        id: 5,
        name: 'Kargo hyzmatlary'
    },
    {
        id: 6,
        name: 'Howpsuzlyk'
    },
    {
        id: 7,
        name: 'Sargyt'
    }
])

onMounted(async () => {
    await fethcFaqs()
    console.log('Faq -> ', faqs.value);
    setTimeout(() => {
        isVisible.value = true
    }, 100)
})

const toggleAccordion = (id) => {
    if (openAccordion.value === id) {
        openAccordion.value = null
    } else {
        openAccordion.value = id
    }
}
</script>