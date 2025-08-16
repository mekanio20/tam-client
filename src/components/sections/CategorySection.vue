
<template>
    <div class="bg-white mt-5">
        <MainContainer>
            <SectionHeaderGroup>
                <SectionTitle title="Meşhur bölümlerimiz" />
                <ViewAllLink title="Ählisini görmek" :to="'/'" />
            </SectionHeaderGroup>
            <SectionBodyGroup>
                <CategoryCard v-for="item in 5" :key="item" />
            </SectionBodyGroup>
        </MainContainer>
    </div>
</template>