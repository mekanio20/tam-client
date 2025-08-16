<template>
    <button ref="dropDownContainer" @click="toggleDropDown" class="relative flex items-center gap-2 py-0 rounded-l ">
        <div class="bg-pos-white p-2 flex flex-col items-center space-y-1 rounded-lg">
            <globe-icon />
            <span class="text-[12px] text-[#0C1A30] uppercase">{{  $i18n.locale }}</span>
        </div>
        <div v-show="dropDown === true"
            class="absolute rounded-lg top-full left-0 right-0 z-50 bg-white shadow-sm flex flex-col item-center justify-center max-lg:right-0 max-lg:left-auto">
            <button v-for="item in langs" :key="item.id" @click="switchLanguage(item.lang)"
                class="flex items-center justify-center gap-2 w-full font-medium whitespace-nowrap  text-black text-sm py-3 px-2 hover:bg-gray-200 ease-linear transition-all duration-150 uppercase"
                :class="[item.lang === 'ru' ? 'hover:rounded-b-lg' : 'hover:rounded-t-lg']">
                {{ item.name }}
            </button>
        </div>
    </button>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { onClickOutside } from '@vueuse/core'
const { t, locale } = useI18n({ useScope: 'global' })
const langs = [
    { id: 1, name: 'TK', lang: 'tk' },
    { id: 2, name: 'RU', lang: 'ru' },
]

const dropDownContainer = ref()
const dropDown = ref(false)
onClickOutside(dropDownContainer, () => dropDown.value = false)
const toggleDropDown = () => {
    dropDown.value = !dropDown.value
}
const switchLanguage = (language) => {
    locale.value = language
    localStorage.setItem('lang', language)
    window.location.reload()
}
</script>