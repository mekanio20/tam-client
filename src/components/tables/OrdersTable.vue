<template>
    <div class="w-full">
        <!-- Navigation Tabs -->
        <div class="mb-8" role="tablist">
            <div class="flex flex-wrap gap-2 sm:gap-0 sm:space-x-2">
                <button v-for="(tab, index) in tabs" :key="index" @click="activeTab = tab.id" :class="[
                    'px-6 py-2 sm:text-base text-sm rounded-lg transition-all duration-200',
                    activeTab === tab.id
                        ? 'bg-[#FEB918] text-white font-semibold'
                        : 'bg-white text-[#838589] hover:bg-gray-50 border border-[#EDEDED]'
                ]" :aria-selected="activeTab === tab.id" role="tab">
                    {{ tab.name }}
                </button>
            </div>
        </div>

        <!-- Table Container -->
        <section class="bg-white rounded-xl overflow-hidden">
            <!-- Desktop Table -->
            <div class="hidden md:block overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-[#F6F7F9]">
                        <tr>
                            <th v-for="(column, index) in columns" :key="index"
                                class="px-6 py-4 text-left sm:text-base text-sm font-medium text-[#0C1A30]">
                                {{ column.label }}
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr v-for="(row, rowIndex) in filteredData" :key="rowIndex"
                            class="hover:bg-gray-50 transition-colors duration-150 group">
                            <td class="px-6 py-4">
                                <span :class="getStatusClass(row.status)" class="px-5 py-2 text-sm rounded-full">
                                    {{ row.status }}
                                </span>
                            </td>
                            <td class="px-6 py-4 sm:text-base text-sm font-medium text-[#0C1A30]">
                                {{ row.document }}
                            </td>
                            <td class="px-6 py-4 sm:text-base text-sm font-medium text-[#0C1A30]">
                                {{ row.date }}
                            </td>
                            <td class="px-6 py-4 sm:text-base text-sm font-medium text-[#0C1A30]">
                                {{ row.paymentType }}
                            </td>
                            <td class="px-6 py-4 sm:text-base text-sm font-medium text-[#0C1A30]">
                                {{ row.amount }}
                            </td>
                            <td class="px-6 py-4">
                                <button v-if="row.status !== 'Garaşylýar'"
                                    class="px-4 py-2 bg-gray-200 text-gray-500 text-sm font-medium rounded-lg cursor-not-allowed"
                                    disabled>
                                    Goýbolsun etmek
                                </button>
                                <button v-else
                                    class="px-4 py-2 bg-[#FA004C] text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none"
                                    @click="cancelItem(row.id)">
                                    Goýbolsun etmek
                                </button>
                            </td>
                            <td class="px-6 py-4">
                                <button
                                    class="px-4 py-2 border-[1px] border-[#FEB918] text-[#FEB918] text-sm font-medium rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none"
                                    @click="viewItem(row.id)">
                                    Görmek
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Mobile Cards -->
            <div class="md:hidden space-y-4 p-4">
                <div v-for="(row, index) in filteredData" :key="index"
                    class="bg-white border border-gray-200 rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow duration-200">
                    <div class="flex justify-between items-start">
                        <span :class="getStatusClass(row.status)" class="px-3 py-1 text-xs rounded-full">
                            {{ row.status }}
                        </span>
                        <span class="text-base font-medium text-[#0C1A30]">{{ row.document }}</span>
                    </div>

                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span class="text-xs text-gray-500">Senesi:</span>
                            <span class="text-xs text-[#0C1A30]">{{ row.date }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-xs text-gray-500">Töleg görnüsi:</span>
                            <span class="text-xs text-[#0C1A30]">{{ row.paymentType }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-xs text-gray-500">Jemi:</span>
                            <span class="text-xs font-semibold text-[#0C1A30]">{{ row.amount }}</span>
                        </div>
                    </div>

                    <div class="flex gap-2 pt-3">
                        <button v-if="row.status !== 'Garaşylýar'"
                            class="flex-1 px-3 py-2 bg-gray-200 text-gray-500 text-xs font-medium rounded-lg cursor-not-allowed"
                            disabled>
                            Goýbolsun etmek
                        </button>
                        <button v-else
                            class="flex-1 px-3 py-2 bg-red-500 text-white text-xs font-medium rounded-lg hover:bg-red-600 transition-all duration-200"
                            @click="cancelItem(row.id)">
                            Goýbolsun etmek
                        </button>
                        <button
                            class="flex-1 px-3 py-2 border-2 border-orange-300 text-orange-600 text-xs font-medium rounded-lg hover:bg-orange-50 transition-all duration-200"
                            @click="viewItem(row.id)">
                            Görmek
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
// Reactive data
const activeTab = ref(1)

const tabs = ref([
    { id: 1, name: 'Ählisi' },
    { id: 2, name: 'Garaşylýanlar' },
    { id: 3, name: 'Kabul edilenler' },
    { id: 4, name: 'Goýbolsun edilenler' }
])

const columns = ref([
    { key: 'status', label: 'Ýagdaýy' },
    { key: 'product_label', label: 'Haryt belgisi' },
    { key: 'date', label: 'Senesi' },
    { key: 'payment_type', label: 'Töleg görnüşi' },
    { key: 'amount', label: 'Jemi' },
    { key: 'cancel', label: 'Goýbolsun' },
    { key: 'view', label: 'Görmek' }
])

const data = ref([
    {
        id: 1,
        status: 'Garaşylýar',
        document: '0012',
        date: '29.07.2025 - 16:05:20',
        paymentType: 'Nagt',
        amount: '2500 TMT'
    },
    {
        id: 2,
        status: 'Kabul edildi',
        document: '0012',
        date: '29.07.2025 - 16:05:20',
        paymentType: 'Nagt',
        amount: '2500 TMT'
    },
    {
        id: 3,
        status: 'Goýbolsun edildi',
        document: '0012',
        date: '29.07.2025 - 16:05:20',
        paymentType: 'Nagt',
        amount: '2500 TMT'
    },
    {
        id: 4,
        status: 'Kabul edildi',
        document: '0012',
        date: '29.07.2025 - 16:05:20',
        paymentType: 'Nagt',
        amount: '2500 TMT'
    },
    {
        id: 5,
        status: 'Goýbolsun edildi',
        document: '0012',
        date: '29.07.2025 - 16:05:20',
        paymentType: 'Nagt',
        amount: '2500 TMT'
    },
    {
        id: 6,
        status: 'Goýbolsun edildi',
        document: '0012',
        date: '29.07.2025 - 16:05:20',
        paymentType: 'Nagt',
        amount: '2500 TMT'
    },
    {
        id: 7,
        status: 'Kabul edildi',
        document: '0012',
        date: '29.07.2025 - 16:05:20',
        paymentType: 'Nagt',
        amount: '2500 TMT'
    },
    {
        id: 8,
        status: 'Goýbolsun edildi',
        document: '0012',
        date: '29.07.2025 - 16:05:20',
        paymentType: 'Nagt',
        amount: '2500 TMT'
    }
])

// Computed properties
const filteredData = computed(() => {
    if (activeTab.value === 'ahlisi') return data.value
    if (activeTab.value === 'garasiylanlar') return data.value.filter(item => item.status === 'Garaşylýar')
    if (activeTab.value === 'kabul') return data.value.filter(item => item.status === 'Kabul edildi')
    if (activeTab.value === 'goybolsun') return data.value.filter(item => item.status === 'Goýbolsun edildi')
    return data.value
})

// Methods
const getStatusClass = (status) => {
    switch (status) {
        case 'Garaşylýar':
            return 'bg-[#FEB9181A] text-[#FEB918]'
        case 'Kabul edildi':
            return 'bg-[#037D841F] text-[#037D84]'
        case 'Goýbolsun edildi':
            return 'bg-[#FA004C1F] text-[#FA004C]'
        default:
            return 'bg-gray-100 text-gray-800'
    }
}

const cancelItem = (id) => {
    const item = data.value.find(item => item.id === id)
    if (item) {
        item.status = 'Goýbolsun edildi'
    }
}

const viewItem = (id) => {
    console.log('Viewing item:', id)
    // Add your view logic here
}

// Lifecycle hooks
onMounted(() => {
    // Initialize animations on mount
})
</script>