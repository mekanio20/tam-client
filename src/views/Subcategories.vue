<template>
    <div class="bg-white">
        <MainContainer class="-mb-5">
            <div class="pt-6">
                <LinkGroup :items="[
                    { label: 'Bölümler', to: '/categories' },
                    { label: '1', to: '/subcategories' }
                ]" />
            </div>
        </MainContainer>

        <div class="bg-white mt-10 pb-10">
            <div class="space-y-5">
                <!-- Subcategory 1 -->
                <ProductSection :sectionTitle="'Ösümlikler'" :products="subcategory1Products" :isRedirectLink="true"
                    :linkTitle="'Ählisini görmek'" :link="'/product/list'" @toggleFavorite="toggleFavorite"
                    @addToCart="addToCart" />

                <!-- Subcategory 2 -->
                <ProductSection :sectionTitle="'Elektronika'" :products="subcategory2Products" :isRedirectLink="true"
                    :linkTitle="'Ählisini görmek'" :link="'/product/list'" @toggleFavorite="toggleFavorite"
                    @addToCart="addToCart" />

                <!-- Subcategory 3 -->
                <ProductSection :sectionTitle="'Geyimler'" :products="subcategory3Products" :isRedirectLink="true"
                    :linkTitle="'Ählisini görmek'" :link="'/product/list'" @toggleFavorite="toggleFavorite"
                    @addToCart="addToCart" />

                <!-- Subcategory 4 -->
                <ProductSection :sectionTitle="'Uly ýaşlylar üçin'" :products="subcategory4Products"
                    :isRedirectLink="true" :linkTitle="'Ählisini görmek'" :link="'/product/list'"
                    @toggleFavorite="toggleFavorite" @addToCart="addToCart" />

                <!-- Subcategory 5 -->
                <ProductSection :sectionTitle="'Çaga harytlary'" :products="subcategory5Products" :isRedirectLink="true"
                    :linkTitle="'Ählisini görmek'" :link="'/product/list'" @toggleFavorite="toggleFavorite"
                    @addToCart="addToCart" />
            </div>
        </div>
    </div>
</template>

<script setup>
const subcategory1Products = ref([
    {
        id: 1,
        title: 'Gül ösümligi',
        price: 150,
        oldPrice: 200,
        image: '/images/product-1.png',
        isFavorite: false,
        rating: 4.5,
        discount: 25
    },
    {
        id: 2,
        title: 'Çiçek tohumy',
        price: 80,
        oldPrice: 100,
        image: '/images/product-2.png',
        isFavorite: true,
        rating: 4.2,
        discount: 20
    },
    {
        id: 3,
        title: 'Ösümlik gübre',
        price: 120,
        oldPrice: 150,
        image: '/images/product-3.png',
        isFavorite: false,
        rating: 4.7,
        discount: 20
    },
    {
        id: 4,
        title: 'Sakçy',
        price: 200,
        oldPrice: 250,
        image: '/images/product-1.png',
        isFavorite: false,
        rating: 4.3,
        discount: 20
    },
    {
        id: 5,
        title: 'Gül saby',
        price: 90,
        oldPrice: 120,
        image: '/images/product-2.png',
        isFavorite: true,
        rating: 4.6,
        discount: 25
    }
])

const subcategory2Products = ref([
    {
        id: 6,
        title: 'Telefon',
        price: 2500,
        oldPrice: 3000,
        image: '/images/product-3.png',
        isFavorite: false,
        rating: 4.8,
        discount: 17
    },
    {
        id: 7,
        title: 'Naushnik',
        price: 180,
        oldPrice: 220,
        image: '/images/product-1.png',
        isFavorite: true,
        rating: 4.4,
        discount: 18
    },
    {
        id: 8,
        title: 'Powerbank',
        price: 150,
        oldPrice: 200,
        image: '/images/product-2.png',
        isFavorite: false,
        rating: 4.1,
        discount: 25
    },
    {
        id: 9,
        title: 'Telefon örtügi',
        price: 50,
        oldPrice: 80,
        image: '/images/product-3.png',
        isFavorite: false,
        rating: 4.0,
        discount: 38
    },
    {
        id: 10,
        title: 'Şarj kabeli',
        price: 30,
        oldPrice: 45,
        image: '/images/product-1.png',
        isFavorite: true,
        rating: 4.5,
        discount: 33
    }
])

const subcategory3Products = ref([
    {
        id: 11,
        title: 'Kişi köýnegi',
        price: 350,
        oldPrice: 450,
        image: '/images/product-2.png',
        isFavorite: false,
        rating: 4.6,
        discount: 22
    },
    {
        id: 12,
        title: 'Aýal köýnegi',
        price: 420,
        oldPrice: 520,
        image: '/images/product-3.png',
        isFavorite: true,
        rating: 4.7,
        discount: 19
    },
    {
        id: 13,
        title: 'Çaga şalwary',
        price: 180,
        oldPrice: 220,
        image: '/images/product-1.png',
        isFavorite: false,
        rating: 4.3,
        discount: 18
    },
    {
        id: 14,
        title: 'Kişi şalwary',
        price: 280,
        oldPrice: 350,
        image: '/images/product-2.png',
        isFavorite: false,
        rating: 4.4,
        discount: 20
    },
    {
        id: 15,
        title: 'Aýal şalwary',
        price: 320,
        oldPrice: 400,
        image: '/images/product-3.png',
        isFavorite: true,
        rating: 4.5,
        discount: 20
    }
])

const subcategory4Products = ref([
    {
        id: 16,
        title: 'Uly ýaşlylar üçin köýnek',
        price: 280,
        oldPrice: 350,
        image: '/images/product-1.png',
        isFavorite: false,
        rating: 4.2,
        discount: 20
    },
    {
        id: 17,
        title: 'Uly ýaşlylar üçin şalwar',
        price: 250,
        oldPrice: 320,
        image: '/images/product-2.png',
        isFavorite: true,
        rating: 4.4,
        discount: 22
    },
    {
        id: 18,
        title: 'Uly ýaşlylar üçin ýelek',
        price: 400,
        oldPrice: 500,
        image: '/images/product-3.png',
        isFavorite: false,
        rating: 4.1,
        discount: 20
    },
    {
        id: 19,
        title: 'Uly ýaşlylar üçin baş örtügi',
        price: 120,
        oldPrice: 150,
        image: '/images/product-1.png',
        isFavorite: false,
        rating: 4.3,
        discount: 20
    },
    {
        id: 20,
        title: 'Uly ýaşlylar üçin aýakgap',
        price: 180,
        oldPrice: 220,
        image: '/images/product-2.png',
        isFavorite: true,
        rating: 4.5,
        discount: 18
    }
])

const subcategory5Products = ref([
    {
        id: 21,
        title: 'Çaga oýnawçygy',
        price: 150,
        oldPrice: 200,
        image: '/images/product-3.png',
        isFavorite: false,
        rating: 4.7,
        discount: 25
    },
    {
        id: 22,
        title: 'Çaga köýnegi',
        price: 120,
        oldPrice: 150,
        image: '/images/product-1.png',
        isFavorite: true,
        rating: 4.4,
        discount: 20
    },
    {
        id: 23,
        title: 'Çaga şalwary',
        price: 100,
        oldPrice: 130,
        image: '/images/product-2.png',
        isFavorite: false,
        rating: 4.2,
        discount: 23
    },
    {
        id: 24,
        title: 'Çaga aýakgap',
        price: 80,
        oldPrice: 100,
        image: '/images/product-3.png',
        isFavorite: false,
        rating: 4.0,
        discount: 20
    },
    {
        id: 25,
        title: 'Çaga baş örtügi',
        price: 60,
        oldPrice: 80,
        image: '/images/product-1.png',
        isFavorite: true,
        rating: 4.6,
        discount: 25
    }
])

// Event handlers
const toggleFavorite = (productId) => {
    console.log('Toggle favorite for product:', productId)
}

const addToCart = (product) => {
    console.log('Add to cart:', product)
}
</script>
