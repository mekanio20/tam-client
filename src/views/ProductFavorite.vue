<template>
    <div class="bg-white">
        <MainContainer>
            <div class="py-6">
                <LinkGroup :items="[{ label: 'Köp satylan harytlar', to: '/' }, { label: 'Ösümlikler', to: '/' }]" />
            </div>
            <SectionTitle title="Halanan harytlar" />
            <div v-if="!products.length" class="flex items-center flex-col justify-center py-24">
                <div class="w-[250px] h-[250px]">
                    <img class="w-full h-full" src="/images/favorite.png" />
                </div>
                <h4 class="font-semibold text-[30px] text-[#838589]">
                    Sizde halanan haryt ýok
                </h4>
            </div>
            <ProductSection :sectionTitle="'Arzanladyşlar!'" :products="products" @toggleFavorite="toggleFavorite"
                @addToCart="addToCart" />
        </MainContainer>
    </div>
</template>

<script>
</script>