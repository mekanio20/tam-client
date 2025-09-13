<template>
    <div class="bg-white h-[180px] rounded-lg overflow-hidden p-2 relative cursor-pointer" @click="goToDetail">
        <!-- Badge Icon -->
        <div
            class="absolute right-2 top-2 flex-shrink-0 sm:w-[45px] sm:h-[45px] w-[40px] h-[40px] bg-[#FEB91826] rounded-full flex items-center justify-center">
            <rate-icon />
        </div>

        <div class="h-full flex items-center space-x-4">
            <!-- Product Image -->
            <div class="w-[40%] h-full bg-pink-100 rounded-md flex items-center justify-center shrink-0">
                <img :src="product?.image_urls[0] || '/images/box.png'"
                    class="w-full h-full object-contain" />
            </div>

            <!-- Content -->
            <div class="w-full flex flex-col justify-center space-y-4">
                <!-- Name -->
                <p class="lg:text-lg sm:text-base text-sm text-[#0C1A30] font-medium leading-snug line-clamp-2 w-[80%]">
                    {{ product.name }}
                </p>

                <!-- Price -->
                <p class="lg:text-lg sm:text-base text-sm font-semibold text-[#FFA100]">
                    {{ product.price }} TMT
                </p>

                <!-- Button -->
                <button @click.stop="$emit('addToCart', product)"
                    class="w-full border border-[#FEB918] text-[#FFA100] rounded-md py-2 text-sm font-medium hover:bg-orange-50 transition">
                    Sebede goş
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});
const router = useRouter()
const goToDetail = () => {
    router.push({ name: "ProductDetail", params: { id: props.product.id } })
};
</script>