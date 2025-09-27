<template>
    <div>
        <div class="mt-14"></div>
        <div>
            <div class="flex justify-between">
                <img class="min-w-[140px] h-11" src="/icons/logo.png" alt="logo">
                <h1 class="text-2xl font-semibold">Order number #{{ order.number }}</h1>
            </div>
            <div class="flex justify-between">

                <div class="flex flex-1 flex-col gap-2 mt-5">
                    <p>Client number: {{ order.shipping_address.phone_number }} {{
                    order.shipping_address.first_name }} {{ order.shipping_address.last_name }}</p>
                    <p>Client address: {{ order.shipping_address.line1 }} {{ order.shipping_address.line2 }}
                        {{ order.shipping_address.line3 }}</p>
                    <p>Note: {{ order.shipping_address.notes }}</p>
                    <p v-if="order.source && order.source.cardholder !== ''">Invoice cardholder: {{
                    order.source.cardholder }}</p>
                    <p v-if="order.source && order.source.pan !== ''">Invoice plan: {{ order.source.pan }}</p>
                    <p v-if="order.source && order.source.date_payment !== ''">Invoice date of payment: {{
                    order.source.date_payment }}</p>
                    <div class="mt-5" id="qrcode">

                    </div>
                </div>
                <div class="flex items-end flex-1 flex-col gap-2 mt-5">
                    <p>Order date: {{ order.date_placed }}</p>
                    <p v-if="order.source !== null && order.source.source_type_name !== null">Pay type: {{
                    order.source.source_type_name }}</p>
                    <p>Delivery method: {{ order.shipping_method }}</p>
                    <p>Delivery price (ТМТ): {{ order.shipping_incl_tax }} TMT</p>
                    <p>Invoice total (ТМТ): {{ order.total_incl_tax }}</p>

                </div>

            </div>
        </div>
        <div class="mt-10">
            <table class="w-full table-fixed border">
                <thead>
                    <tr>
                        <th class="w-48 text-sm border py-3 pl-5">Invoice name</th>
                        <th class="w-14 text-sm border py-3 text-center">Invoice quantity</th>
                        <th class="w-14 text-sm border py-3 text-center">Invoice unit</th>
                        <th class="w-22 text-sm border py-3 text-center">Invoice price (ТМТ)</th>
                        <th class="w-22 text-sm border py-3 text-center">Invoice last (ТМТ)</th>
                        <th class="w-20 text-sm border py-3 text-center">Invoice total (ТМТ)</th>
                    </tr>
                </thead>
                <tbody>

                    <tr v-for="(line, idx) in order?.lines" :key="idx">
                        <td class="pl-5 border py-1">
                            <!-- {{ line.product.title }} -->
                            <br>
                            <!-- ({{ line.product.upc }}) -->
                        </td>
                        <td class="text-center border py-1">
                            <!-- {{ line.quantity * line.product.amount_per_quantity }} -->
                        </td>
                        <td class="text-center border py-1">
                            <!-- {{ line.product.amount_per_quantity }} -->
                        </td>
                        <td class="text-center border py-1">
                            <!-- {{ (line.product.price.incl_tax).toFixed(2) }} -->
                        </td>
                        <td class="text-center border py-1">
                            <!-- {{ (line.price_incl_tax / line.quantity).toFixed(2) }} -->
                        </td>
                        <td class="text-center border py-1">
                            <!-- {{ (line.price_incl_tax).toFixed(2) }} -->
                        </td>
                    </tr>

                </tbody>
            </table>
            <div class="w-full mt-2">
                <p class="text-end text-xl font-medium">Delivery price: {{ order.shipping_incl_tax }} TMT</p>
                <p class="text-end text-xl font-bold">Total: {{ order.total_incl_tax }} ТМТ</p>
            </div>
            <div class="w-full mt-10 no-print">
                <button class="mx-auto" @click="printWindow">Download</button>
            </div>
        </div>
    </div>
</template>

<script setup>
const ordersStore = useOrdersStore()
const { order_info, loading } = storeToRefs(ordersStore)
const { fetchOrder } = ordersStore
const route = useRoute()
const orderUuid = computed(() => route.params.id)
const orderDetails = computed(() => order_info.value || {})
const order = ref({
    date_placed: '-',
    number: '-',
    source_type_name: '-',
    shipping_method: '-',
    shipping_incl_tax: '-',
    total_incl_tax: '-',
    shipping_address: {
        line1: '',
        line2: '',
        line3: '',
        first_name: '',
        last_name: ''
    },
    source: {
        source_type_name: '-'
    },
    lines: [
        {
            quantity: '-', price_incl_tax: '-', product: {
                title: '-',
                price: {
                    incl_tax: '-'
                }
            }
        },
        {
            quantity: '-', price_incl_tax: '-', product: {
                title: '-',
                price: {
                    incl_tax: '-'
                }
            }
        },
    ]
})
const addImgQR = (qrCanvas, centerImage, factor) => {
    var ctx = qrCanvas.getContext("2d");
    ctx.drawImage(centerImage, 0, 0, centerImage.width, centerImage.height, 50, 50, 50, 50);
}
const prepareQR = (img) => {
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        width: 150,
        height: 150,
    });
    let src = `https://tamrahat.com.tm/receipt/${orderUuid}`
    qrcode.makeCode(src);
    addImgQR(qrcode._oDrawing._elCanvas, img, 1)
}

const generateQR = () => {

    const icon = new Image();
    icon.onload = () => prepareQR(icon)
    icon.src = '/favicons/android-chrome-192x192.png'
    // setTimeout(() => {
    //     this.printWindow()
    //     }, 1000);

}
const printWindow = () => {
    window.print()
}

onMounted(async () => {
    if (!orderUuid.value) return
    const order_detail = await fetchOrder(orderUuid.value)
    console.log('Order detail', order_detail);
    // if (order_detail) {
    //     order.value = data.value?.data
    //     if (process.client) {
    //         setTimeout(() => { generateQR() }, 800)
    //         setTimeout(() => { printWindow() }, 1000)
    //     }
    // }
})

// const { data } = await useFetchApi({
//     url: `orders/${orderUuid}`,
//     key: orderUuid,
//     initialCache: false,
// })

</script>