<template>
    <div class="group cursor-pointer flex flex-col sm:space-y-3 space-y-2" @click="goToDetail(product.id)">
        <div
            class="bg-[#F6F7F9] group-hover:bg-[#DCE7FF] rounded-[10px] overflow-hidden duration-300 sm:h-[300px] h-[220px]">
            <div class="relative w-full h-full flex items-center justify-center">
                <!-- Product Image -->
                <img v-if="product?.preview?.path" :src="product.preview.path" class="w-full h-full object-cover">

                <!-- Favorite -->
                <button type="button" @click.stop="toggleLike" class="absolute right-2 top-2">
                    <div
                        class="sm:w-[40px] sm:h-[40px] w-[35px] h-[35px] rounded-full bg-white flex items-center justify-center">
                        <favorite-icon v-if="!isLiked" color="#A9A9A9" :size="16" />
                        <favorite-icon v-else color="#FA004C" fill="#FA004C" :size="16" />
                    </div>
                </button>

                <!-- Add to Cart -->
                <div
                    class="absolute w-full px-4 bottom-4 sm:opacity-0 sm:group-hover:opacity-100 sm:transition-opacity sm:duration-300">
                    <button @click.stop="addToCart" :disabled="isAddingToCart"
                        class="w-full sm:py-3 py-2 text-center sm:text-base text-sm bg-white text-[#FFA100] text-[13px] font-semibold rounded-[6px] disabled:opacity-50 disabled:cursor-not-allowed">
                        <span v-if="isAddingToCart">Goşulýar...</span>
                        <span v-else>Sebede goş</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="flex flex-col sm:space-y-2 space-y-1">
            <div class="flex items-center sm:space-x-8 space-x-3">
                <p class="sm:text-[18px] font-semibold text-nowrap"
                    :class="[product.old_price ? 'text-[#FA004C] ' : 'text-[#0C1A30]']">{{ product.price }} {{
        product.currency || 'TMT' }}</p>
                <p v-if="product.old_price" class="text-[#838589] sm:text-sm text-xs line-through text-nowrap">{{
        product.old_price }} {{
        product.currency || 'TMT' }}</p>
            </div>
            <h3 class="font-medium text-[#0C1A30] sm:text-base text-sm tracking-[0.2px]">
                {{ product.name }}
            </h3>
        </div>

    </div>
</template>

<script setup>
const router = useRouter()
const likesStore = useLikesStore()
const cartStore = useCartStore()
const { likes } = storeToRefs(likesStore)
const { createLike, deleteLike } = likesStore
const { addItem } = cartStore

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

const isLiked = ref(props.product.is_liked)
const isAddingToCart = ref(false)

const goToDetail = (id) => {
    router.push({ name: "ProductDetail", params: { id } })
}

const toggleLike = async () => {
    try {
        if (isLiked.value) {
            const likeItem = likes.value.find(item => item.product === props.product.id)
            if (likeItem) {
                await deleteLike(likeItem.id)
                isLiked.value = false
            }
        } else {
            await createLike(props.product.id)
            isLiked.value = true
        }
    } catch (error) {
        console.error('Error toggling like:', error)
    }
}

const addToCart = async () => {
    if (isAddingToCart.value) return
    isAddingToCart.value = true
    try {
        await addItem(props.product.id)
    } catch (error) {
        console.error('Error adding to cart:', error)
    } finally {
        isAddingToCart.value = false
    }
}
</script>