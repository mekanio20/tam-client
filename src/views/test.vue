<template>
    <div>
        
    </div>
</template>

<script setup>
const activeCards = ref(['active'])
const isVisible = ref(false)

const handleCardClick = (cardType) => {
    if (activeCards.value.includes(cardType)) {
        activeCards.value = activeCards.value.filter(card => card !== cardType)
    } else {
        activeCards.value.push(cardType)
    }
}

onMounted(() => {
    setTimeout(() => {
        isVisible.value = true
    }, 100)
})
</script>