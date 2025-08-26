<template>
    <svg :width="size" :height="size" viewBox="0 0 22 22" :fill="fill" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.75 5.5H4.58333H19.25" :stroke="color" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round" />
        <path
            d="M7.33203 5.49992V3.66659C7.33203 3.18035 7.52519 2.71404 7.869 2.37022C8.21282 2.02641 8.67913 1.83325 9.16536 1.83325H12.832C13.3183 1.83325 13.7846 2.02641 14.1284 2.37022C14.4722 2.71404 14.6654 3.18035 14.6654 3.66659V5.49992M17.4154 5.49992V18.3333C17.4154 18.8195 17.2222 19.2858 16.8784 19.6296C16.5346 19.9734 16.0683 20.1666 15.582 20.1666H6.41536C5.92913 20.1666 5.46282 19.9734 5.119 19.6296C4.77519 19.2858 4.58203 18.8195 4.58203 18.3333V5.49992H17.4154Z"
            :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M12.832 10.0833V15.5833" :stroke="color" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round" />
        <path d="M9.16797 10.0833V15.5833" :stroke="color" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round" />
    </svg>
</template>

<script setup>
defineProps({
    size: {
        type: Number,
        default: 22
    },
    color: {
        type: String,
        default: '#FA004C'
    },
    fill: {
        type: String,
        default: 'none'
    }
})
</script>