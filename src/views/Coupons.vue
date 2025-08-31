<template>
    <div class="min-h-screen bg-white py-8 px-4">
        <MainContainer>
            <div class="pt-6">
                <LinkGroup :items="[{ label: 'Kuponlar', to: '/coupons' }]" />
            </div>
        </MainContainer>
        <div class="max-w-4xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-16">
                <h1 class="lg:text-[30px] text-xl font-semibold text-[#0C1A30] mb-2">
                    Arzanladyş karty
                </h1>
            </div>

            <section class="w-full h-[356px]">
                <div class="grid grid-cols-3 gap-10">
                    <!-- Loyalty Card Section -->
                    <section class="col-span-2">
                        <img src="/images/offer-card.png" class="w-full h-full object-cover rounded-[10px]">
                    </section>

                    <!-- Card Info Section -->
                    <aside class="px-10 py-6 lg:px-14 lg:py-10 space-y-8 bg-[#F6F7F9] rounded-[10px]">

                        <!-- Points -->
                        <div class="transform transition-all duration-300 hover:scale-105">
                            <h3 class="text-[22px] font-semibold text-[#0C1A30] mb-2">
                                {{ cardData.points }} Points
                            </h3>
                            <p class="text-[#0C1A3080] text-sm">Available</p>
                        </div>

                        <!-- Status -->
                        <div class="py-6 border-t border-b border-gray-100">
                            <h4 class="text-[22px] font-semibold text-[#0C1A30] mb-2">
                                {{ cardData.status }}
                            </h4>
                            <p class="text-[#0C1A3080] text-sm">Status</p>
                        </div>

                        <!-- Card Number -->
                        <div class="">
                            <h5 class="text-[22px] font-semibold text-[#0C1A30] mb-2">
                                {{ cardData.cardNumber }}
                            </h5>
                            <p class="text-[#0C1A3080] text-sm">Card number</p>
                        </div>
                    </aside>
                </div>
            </section>

            <!-- Transaction History -->
            <section class="mt-12 w-full">
                <div class="overflow-hidden">

                    <!-- Header -->
                    <div class="py-6">
                        <h2 class="text-[22px] font-semibold text-[#0C1A30]">Sargyt taryhy</h2>
                    </div>

                    <!-- Table -->
                    <div class="overflow-x-auto rounded-[10px]">
                        <table class="w-full">
                            <thead class="bg-[#F6F7F9]">
                                <tr>
                                    <th class="px-6 lg:px-8 py-4 text-left text-sm font-medium text-[#0C1A30]">
                                        Order ID
                                    </th>
                                    <th class="px-6 lg:px-8 py-4 text-left text-sm font-medium text-[#0C1A30]">
                                        Wagty
                                    </th>
                                    <th class="px-6 lg:px-8 py-4 text-left text-sm font-medium text-[#0C1A30]">
                                        Status
                                    </th>
                                    <th class="px-6 lg:px-8 py-4 text-left text-sm font-medium text-[#0C1A30]">
                                        Gazanylan/sarp edilen bal
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-[#EDEDED]">
                                <tr v-for="(transaction, index) in transactions" :key="index"
                                    class="transform transition-all duration-300 hover:bg-gray-50 cursor-pointer">

                                    <td class="px-6 lg:px-8 py-5     whitespace-nowrap">
                                        <span class="text-base font-medium text-[#0C1A30]">{{ transaction.id }}</span>
                                    </td>

                                    <td class="px-6 lg:px-8 py-5     whitespace-nowrap">
                                        <span class="text-base text-[#0C1A30]">{{ transaction.date }}</span>
                                    </td>

                                    <td class="px-6 lg:px-8 py-5     whitespace-nowrap">
                                        <span class="text-base font-medium text-[#0C1A30]">
                                            {{ transaction.status }}
                                        </span>
                                    </td>

                                    <td class="px-6 lg:px-8 py-5     whitespace-nowrap">
                                        <span class="text-base font-medium transition-colors duration-300"
                                            :class="transaction.isPositive ? 'text-[#FEB918] hover:text-yellow-500' : 'text-[#838589] hover:text-gray-600'">
                                            {{ transaction.points }}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
const cardData = {
    brand: 'TamRahat',
    barcode: '700408281116113712',
    cardNumber: '#454',
    points: 500,
    status: 'Standard'
}

const transactions = ref([
    { id: '#495', date: '23.08.2025 - 21:34:06', status: 'Standard', points: '+500', isPositive: true },
    { id: '#495', date: '23.08.2025 - 21:34:06', status: 'Diamond', points: '-245', isPositive: false },
    { id: '#495', date: '23.08.2025 - 21:34:06', status: 'Standard', points: '+125', isPositive: true },
    { id: '#495', date: '23.08.2025 - 21:34:06', status: 'Gold', points: '+495', isPositive: true },
    { id: '#495', date: '23.08.2025 - 21:34:06', status: 'Gold', points: '-4955', isPositive: false },
    { id: '#495', date: '23.08.2025 - 21:34:06', status: 'Standard', points: '+395', isPositive: true },
])
</script>