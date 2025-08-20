<template>
    <div class="bg-white">
        <MainContainer>
            <div class="py-6">
                <LinkGroup :items="[{ label: 'Köp satylan harytlar', to: '/' }, { label: 'Ösümlikler', to: '/' }]" />
            </div>
            <div class="py-6 flex items-end space-x-5">
                <h1 class="font-semibold text-[30px] leading-[25px] text-[#0C1A30]">
                    Кухня и столовая
                </h1>
                <p class="text-[14px] leading-[14px] text-[#838589]">
                    2067 haryt
                </p>
            </div>
        </MainContainer>
        <FilterSection />
        <div class="h-[100px]">

        </div>
        <Footer />
    </div>
</template>

<script setup>
</script>