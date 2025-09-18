<template>
    <div class="bg-white">
        <MainContainer>
            <div class="py-6">
                <LinkGroup :items="[{ label: 'Sargytlar', to: '/account/orders' }]" />
            </div>
            <SectionTitle title="Sargytlar" />
        </MainContainer>
        <NoDataSection v-if="!orders.length && !loading" image="/images/box.png" desc="Sargytlaryňyzyň sanawy boş" />
        <!-- Orders Table -->
        <MainContainer v-else class="mt-5">
            <OrdersTable :rows="tableRows" />
        </MainContainer>
    </div>
</template>

<script setup>
const ordersStore = useOrdersStore()
const { orders, loading } = storeToRefs(ordersStore)

const tableRows = computed(() => {
    return (orders.value || []).map(o => ({
        id: o.id,
        status: o.status_label || o.status || '',
        document: o.document || o.code || `#${o.id}`,
        date: o.created_at || o.date || '',
        paymentType: o.payment_type_label || o.payment_type || '',
        amount: o.total_amount_label || o.total_amount || o.amount || ''
    }))
})

onMounted(async () => {
    await ordersStore.fetchOrders()
})
</script>