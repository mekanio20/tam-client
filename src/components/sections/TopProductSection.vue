<template>
    <div class="bg-white mt-5">
        <div class="relative py-10 bg-[linear-gradient(to_bottom,#FFC745,#FEC84A,#FFDB85,#FEC849,#FFD268)]">
            <!-- Bg Icon -->
            <div class="absolute top-0 left-0">
                <img class="w-[150px] h-[150px]" src="/icons/bg-2.png" />
            </div>
            <MainContainer class="flex items-center justify-end">
                <div class="flex items-center space-x-1 absolute left-1/2 transform -translate-x-1/2">
                    <h2 class="font-bold text-[36px] text-white">Köp satylan harytlar 🏆</h2>
                </div>
                <ViewAllLink title="Ählisini görmek" :to="'/'" bg_color="#FFF8E6" text_color="#FBB103" icon_color="#FBB103" />
            </MainContainer>
        </div>
    </div>
</template>