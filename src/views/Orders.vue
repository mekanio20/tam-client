<template>
    <div class="bg-white">
        <MainContainer>
            <LinkGroup :items="[{ label: 'Sargytlar', to: '/account/orders' }]" />
            <SectionTitle title="Sargytlar" />
        </MainContainer>
        <!-- <NoDataSection v-if="!orders.length && !loading" image="/icons/default.webp" desc="Sargytlaryňyzyň sanawy boş" /> -->
        <!-- Orders Table -->
        <MainContainer class="mt-5">
            <OrdersTable :rows="tableRows" @statusChange="handleStatusChange" />
        </MainContainer>
    </div>
</template>

<script setup>
const ordersStore = useOrdersStore()
const { orders, loading } = storeToRefs(ordersStore)

// Status mapping for display
const getStatusLabel = (status) => {
    const statusMap = {
        'pending': 'Garaşylýar',
        'accepted': 'Kabul edildi',
        'assigned_to_courier': 'Kurýer bellendi',
        'delivering': 'Ýolda',
        'delivered': 'Gowşuryldy',
        'completed': 'Tamamlandy',
        'rejected': 'Ýatyryldy',
        'canceled': 'Goýbolsun edildi'
    }
    return statusMap[status] || status
}

const tableRows = computed(() => {
    return (orders.value || []).map(o => ({
        id: o.id,
        status: o.status_label || getStatusLabel(o.status) || o.status || '',
        originalStatus: o.status, // Keep original status for styling
        document: o.document || o.code || `#${o.id}`,
        date: o.created_at,
        amount: o.total_amount,
        paymentType: o.payment_method,
        date: o.date_created
    }))
})

// Methods
const handleStatusChange = async (status) => {
    const queryParams = status ? { status } : {}
    await ordersStore.fetchOrders(queryParams)
}

onMounted(async () => {
    await ordersStore.fetchOrders()
})
</script>