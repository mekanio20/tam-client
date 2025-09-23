<template>
    <footer class="bg-white pt-10 mt-10 relative">
        <div class="absolute left-0 bottom-0">
            <img src="/icons/footer-1.png" />
        </div>
        <div class="absolute right-0 -top-3">
            <img src="/icons/footer-2.png" />
        </div>
        <MainContainer class="max-w-7xl mx-auto ">
            <div class="relative z-10">
                <div class="w-full flex lg:flex-row flex-col-reverse gap-8 items-start justify-between">

                    <div class="space-y-10">
                        <!-- TamRahat Logo -->
                        <div class="w-[180px]">
                            <logo-icon />
                        </div>

                        <!-- Description -->
                        <div class="space-y-3">
                            <p class="text-[#0C1A30] sm:text-sm">
                                Biziň telefon üçin <br>
                                programmamyzdan peýdalanyp bilersiňiz!
                            </p>
                        </div>

                        <!-- App Store Links -->
                        <div class="flex flex-col sm:flex-row gap-3">
                            <a href="#" class="w-[153px]">
                                <img src="/icons/googleplay.png">
                            </a>
                            <a href="#" class="w-[153px]">
                                <img src="/icons/appstore.png">
                            </a>
                        </div>
                    </div>

                    <div class="grid lg:gap-4 gap-8 text-nowrap lg:grid-cols-4 md:grid-cols-3 grid-cols-2">

                        <div class="space-y-4">
                            <FooterLinkTitle title="Market" />
                            <ul class="space-y-3">
                                <li>
                                    <FooterLink to="#" title="Kategoriýa" />
                                </li>
                                <li>
                                    <FooterLink to="#" title="Brandler" />
                                </li>
                            </ul>
                        </div>

                        <div class="space-y-4">
                            <FooterLinkTitle title="Kömek" />
                            <ul class="space-y-3">
                                <li>
                                    <FooterLink to="/faq" title="Sorag - jogap" />
                                </li>
                                <li>
                                    <FooterLink to="/contact" title="Habarlaşmak" />
                                </li>
                            </ul>
                        </div>

                        <div class="space-y-4">
                            <FooterLinkTitle title="Biz barada" />
                            <ul class="space-y-3">
                                <li>
                                    <FooterLink to="#" title="Biz barada" />
                                </li>
                                <li>
                                    <FooterLink to="#" title="Eltip bermek we töleg" />
                                </li>
                                <li>
                                    <FooterLink to="#" title="Sargyt etmek hakynda" />
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div
                    class="mt-12 py-8 border-t border-white flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div class="text-[5px] text-[#8afd8e] order-2 sm:order-1">
                        Made by <a href="https://parlaknesil.com" target="_blank" class="text-[#9cfec2] font-medium cursor-pointer">ParlakNesil</a>
                    </div>
                    <div class="sm:text-sm text-xs text-[#838589] order-1 sm:order-2">
                        © 2025 TamRahat. Ähli hukuklar goragly.
                    </div>
                </div>
            </div>
        </MainContainer>
    </footer>
</template>