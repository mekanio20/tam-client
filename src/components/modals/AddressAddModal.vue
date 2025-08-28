<template>
    <!-- Modal Overlay -->
    <Transition enter-active-class="transition-opacity duration-300 ease-out" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-show="show" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            @click="$emit('close')">
            <!-- Modal Container -->
            <Transition enter-active-class="transition-transform duration-300 ease-out"
                enter-from-class="translate-y-full sm:scale-95" enter-to-class="translate-y-0 sm:scale-100"
                leave-active-class="transition-transform duration-200 ease-in"
                leave-from-class="translate-y-0 sm:scale-100" leave-to-class="translate-y-full sm:scale-95">
                <div v-show="show" class="bg-white w-[770px] overflow-y-auto px-8 py-4 rounded-[14px] flex flex-col relative" @click.stop>
                    <!-- Header -->
                    <div class="flex items-center justify-center pt-4 pb-10">
                        <h2 class="text-[22px] text-center font-medium text-[#0C1A30]">Salgy goşmak</h2>
                        <button @click="$emit('close')"
                            class="absolute top-8 right-5 flex items-center justify-center bg-[#F6F7F9] rounded-full hover:bg-gray-100">
                            <close-icon />
                        </button>
                    </div>

                    <!-- Content -->
                    <FormSection @submit="handleSubmit" class="grid grid-cols-2 gap-6">
                        <FormGroup>
                            <FormTitle :id="'borough'" :title="'Welaýat'" />
                            <FormInput v-model="formData.borough" :label="'borough'" :icon="{ name: 'map-icon' }" />
                        </FormGroup>
                        <!-- <FormGroup v-if="formData.village">
                            <FormTitle :id="'village'" :title="'Oba'" />
                            <FormInput v-model="formData.village" :label="'village'" :icon="{ name: 'map-icon' }" />
                        </FormGroup> -->
                        <FormGroup>
                            <FormTitle :id="'road'" :title="'Köçe'" />
                            <FormInput v-model="formData.road" :label="'road'"
                                :icon="{ name: 'map_pin-icon', size: 18, color: '#DF3DFF' }" />
                        </FormGroup>
                        <FormGroup>
                            <FormTitle :id="'Jaý'" :title="'Jaý'" />
                            <FormInput v-model="formData.building" :label="'Jaý'"
                                :icon="{ name: 'home-icon', color: '#FF3A44' }" />
                        </FormGroup>
                        <FormGroup>
                            <FormTitle :id="'house_number'" :title="'Öý'" />
                            <FormInput v-model="formData.house_number" :label="'house_number'" :icon="{ name: 'door-icon' }" />
                        </FormGroup>
                        <FormGroup class="col-span-2">
                            <CustomCheckbox v-model="formData.checked" text="Indiki sargytlarda şu salgyny ulan" />
                            <div id="map" class="w-full h-[290px] rounded-2xl shadow-lg"></div>
                        </FormGroup>
                    </FormSection>

                    <!-- Footer Button -->
                    <div class="p-4 mx-auto">
                        <button @click="handleSubmit"
                            class="w-[390px] bg-[#FEB918] text-white font-bold py-3 px-4 rounded-lg hover:bg-amber-500 transition-colors transform hover:scale-[1.02] active:scale-[0.98]">
                            Goşmak
                        </button>
                    </div>
                </div>
            </Transition>
        </div>
    </Transition>
</template>

<script setup>
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
const formData = ref({
    borough: '',
    road: '',
    building: '',
    village: '',
    house_number: '',
    display_name: '',
    lat: '',
    lon: '',
    checked: true
})
const selectedCoords = ref(null);
const props = defineProps({ show: Boolean })
const emit = defineEmits(['close', 'submit'])

const handleSubmit = () => {
    emit('submit', formData.value)
}

const fetchAddress = async (lat, lng) => {
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
        );
        const data = await res.json();
        formData.value = {
            borough: data.address.borough || data.address.city_district || data.address.state || data.address.city || '',
            building: data.address.building || data.address.shop || '',
            ...data.address,
            display_name: data.display_name,
            lat: data.lat,
            lon: data.lon,
            checked: true
        }
        console.log(formData.value);
    } catch (err) {
        console.error("Error:", err);
    }
}

onMounted(async () => {
    let marker;
    const center = [58.38, 37.95];

    const map = new maplibregl.Map({
        container: "map",
        style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
        center: center,
        zoom: 10,
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const lng = pos.coords.longitude;
            const lat = pos.coords.latitude;

            marker = new maplibregl.Marker({ color: "#037D84" })
                .setLngLat([lng, lat])
                .setPopup(new maplibregl.Popup())
                .addTo(map);

            map.flyTo({ center: [lng, lat], zoom: 14 });
            selectedCoords.value = { lng, lat };
            await fetchAddress(lat, lng);
        });
    }

    map.on("click", async (e) => {
        const lng = e.lngLat.lng;
        const lat = e.lngLat.lat;

        if (marker) {
            marker.remove();
        }

        marker = new maplibregl.Marker({ color: "#037D84" })
            .setLngLat([lng, lat])
            .setPopup(new maplibregl.Popup())
            .addTo(map);

        selectedCoords.value = { lng, lat };
        await fetchAddress(lat, lng);
    });

});
</script>

<style>
#map {
    position: relative;
}

details {
    display: none;
}
</style>