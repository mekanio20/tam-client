<template>
    <article
        class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer card-hover"
        v-motion :initial="{ opacity: 0, y: 20, scale: 0.9 }" :enter="{ opacity: 1, y: 0, scale: 1 }" :delay="delay"
        :duration="600">
        <!-- Product Image -->
        <div class="relative overflow-hidden">
            <img :src="product.image" :alt="product.name"
                class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy" />

            <!-- Favorite Button -->
            <button @click.stop="toggleFavorite"
                class="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                :class="{ 'opacity-100': product.favorite }">
                <svg class="w-4 h-4 transition-colors duration-300"
                    :class="product.favorite ? 'text-pink-500 fill-pink-500' : 'text-gray-600'" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>
        </div>

        <!-- Product Info -->
        <div class="p-4">
            <h3 class="font-medium text-gray-900 mb-2 text-lg">{{ product.name }}</h3>
            <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ product.description }}</p>

            <!-- Price and Add Button -->
            <div class="flex items-center justify-between">
                <span class="text-lg font-semibold text-gray-900">{{ formatPrice(product.price) }} TMT</span>
                <button @click.stop="addToCart"
                    class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 active:scale-95">
                    Goş
                </button>
            </div>
        </div>
    </article>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

// Props
const props = defineProps({
    product: {
        type: Object,
        required: true
    },
    delay: {
        type: Number,
        default: 0
    }
})

// Emits
const emit = defineEmits(['add-to-cart', 'toggle-favorite'])

// Methods
const formatPrice = (price) => {
    return price.toFixed(2)
}

const addToCart = () => {
    emit('add-to-cart', props.product)
}

const toggleFavorite = () => {
    emit('toggle-favorite', props.product.id)
}
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.card-hover {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>