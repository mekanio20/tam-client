<template>
    <main class="sm:pb-0 pb-16">
        <div class="w-full bg-[#F7F7F9] fixed top-0 z-30">
            <Header />
            <Navbar @openSidebar="toggleSidebar" :isMobileMenuOpen="sidebar" />
        </div>
        <MainSidebar :isMobileMenuOpen="sidebar" @toggleMobileMenu="toggleMenu" />
        <div class="bg-[rgb(247,247,249)] mt-[100px]" :class="sidebar ? 'blur-sm' : ''">
            <div class="w-full max-w-[1500px] mx-auto">
                <router-view />
            </div>
        </div>
        <Footer />
    </main>
</template>

<script setup>
const sidebar = ref(false)
const toggleSidebar = () => {
    sidebar.value = !sidebar.value
}
const toggleMenu = () => {
    sidebar.value = false
}
</script>