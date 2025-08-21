<template>
    <div class="group cursor-pointer flex flex-col space-y-3">
        <div class="bg-[#F6F7F9] group-hover:bg-[#DCE7FF] rounded-[10px] overflow-hidden duration-300 h-[310px]">
            <div class="relative w-full h-full flex items-center justify-center">
                <!-- Product Image -->
                <img v-if="product.image" :src="product.image" class="object-contain pb-5">

                <!-- Favorite -->
                <button type="button" @click="$emit('toggleFavorite', product.id)" class="absolute right-2 top-2">
                    <div class="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center">
                        <favorite-icon v-if="!product.favorite" color="#A9A9A9" :size="19" />
                        <favorite-icon v-else color="#FA004C" fill="#FA004C" :size="19" />
                    </div>
                </button>

                <!-- Add to Cart -->
                <div
                    class="absolute w-full px-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button @click="$emit('addToCart', product)"
                        class="w-full py-3 text-center sm:text-base text-sm bg-white text-[#FFA100] text-[13px] font-semibold rounded-[6px]">
                        Sebede goş
                    </button>
                </div>
            </div>
        </div>


        <div class="flex flex-col space-y-3">
            <div class="flex items-center sm:space-x-8 space-x-3">
                <p class="sm:text-[18px] font-semibold text-nowrap"
                    :class="[product.old_price ? 'text-[#FA004C] ' : 'text-[#0C1A30]']">{{ product.price }} {{
                    product.currency || 'TMT' }}</p>
                <p v-if="product.old_price" class="text-[#838589] sm:text-sm text-xs line-through text-nowrap">{{ product.old_price }} {{
                    product.currency || 'TMT' }}</p>
            </div>
            <h3 class="font-medium text-[#0C1A30] sm:text-base text-sm tracking-[0.2px]">
                {{ product.title }}
            </h3>
        </div>

    </div>
</template>

<script setup>
defineEmits(['toggleFavorite'])
defineProps({
    product: {
        type: Object,
        required: true
    }
})
</script>