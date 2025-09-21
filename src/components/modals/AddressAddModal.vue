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
                    <div class="flex items-center justify-center pt-4 pb-5">
                        <h2 class="text-[22px] text-center font-medium text-[#0C1A30]">Salgy goşmak</h2>
                        <button @click="$emit('close')"
                            class="absolute top-8 right-5 flex items-center justify-center bg-[#F6F7F9] rounded-full hover:bg-gray-100">
                            <close-icon />
                        </button>
                    </div>

                    <!-- Content -->
                    <FormSection @submit="handleSubmit" class="grid grid-cols-2 gap-2">
                        <!-- Region Selector -->
                        <FormGroup>
                            <FormTitle :id="'region'" :title="'Welaýat'" />
                            <select v-model="formData.region" id="region" 
                                class="w-full px-5 py-4 bg-[#F6F7F9] border-0 rounded-[10px] focus:ring-1 focus:ring-[#FEB918] focus:bg-white outline-none transition-all duration-200 pr-12">
                                <option value="">Welaýat saýlaň</option>
                                <option v-for="region in regions" :key="region.id" :value="region.id">
                                    {{ region.name }}
                                </option>
                            </select>
                        </FormGroup>

                        <!-- Street -->
                        <FormGroup>
                            <FormTitle :id="'street'" :title="'Köçe'" />
                            <FormInput v-model="formData.street" :label="'street'"
                                :icon="{ name: 'map_pin-icon', size: 14, color: '#DF3DFF' }" />
                        </FormGroup>

                        <!-- Building Number -->
                        <FormGroup>
                            <FormTitle :id="'building_number'" :title="'Jaý belgisi'" />
                            <FormInput v-model="formData.building_number" :label="'building_number'"
                                :icon="{ name: 'home-icon', size: 14, color: '#FF3A44' }" />
                        </FormGroup>

                        <!-- House Number -->
                        <FormGroup>
                            <FormTitle :id="'house_number'" :title="'Öý belgisi'" />
                            <FormInput v-model="formData.house_number" :label="'house_number'" :icon="{ name: 'door-icon', size: 14 }" />
                        </FormGroup>

                        <!-- Floor -->
                        <FormGroup>
                            <FormTitle :id="'floor'" :title="'Gat'" />
                            <FormInput v-model="formData.floor" :label="'floor'" :icon="{ name: 'home-icon', size: 14, }" />
                        </FormGroup>

                        <!-- Note -->
                        <FormGroup>
                            <FormTitle :id="'note'" :title="'Bellik'" />
                            <FormInput v-model="formData.note" :label="'note'" />
                        </FormGroup>
                        <!-- Is Primary -->
                        <FormGroup class="col-span-2">
                            <FormTitle :id="'is_primary'" :title="'Esasy salgy'" />
                            <select v-model="formData.is_primary" id="is_primary" 
                                class="w-full p-3 border-none outline-none bg-[#F6F7F9] rounded-md text-[#0C0C0C]">
                                <option :value="true">Hawa</option>
                                <option :value="false">Ýok</option>
                            </select>
                        </FormGroup>
                        <!-- Map -->
                        <FormGroup class="col-span-2">
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

const regionsStore = useRegionsStore()
const { regions } = storeToRefs(regionsStore)
const { fetchRegions } = regionsStore

const formData = ref({
    address: '',
    street: '',
    building_number: '',
    house_number: '',
    floor: '',
    region: '',
    note: '',
    longitude: '',
    latitude: '',
    is_primary: true
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
            ...formData.value,
            address: data.display_name || '',
            street: data.address.road || data.address.street || '',
            building_number: data.address.building || data.address.house_number || '',
            house_number: data.address.house_number || '',
            floor: data.address.floor || '',
            note: data.address.note || '',
            longitude: lng.toString(),
            latitude: lat.toString()
        }
        console.log(formData.value);
    } catch (err) {
        console.error("Error:", err);
    }
}

onMounted(async () => {
    // Load regions
    await fetchRegions()
    
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