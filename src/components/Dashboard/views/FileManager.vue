<script setup>
import { ref, watch } from 'vue';
import BucketObjectList from '../BucketObjectList.vue';

const selectedImage = ref({});
const metadata = ref(null);
const isLoadingMeta = ref(false);

const fetchMetadata = async (image) => {
    if (!image) return;

    isLoadingMeta.value = true;
    metadata.value = null;

    const res = await fetch(`/api/metadata?key=${image.filename}`);
    const data = await res.json();

    metadata.value = data.image;
    console.log(metadata.value)
    isLoadingMeta.value = false;
};

watch(selectedImage, async (image) => {
    fetchMetadata(image);
})



</script>

<template>
    <section class="global-padding-x 2xl:px-[15%] pb-8 flex justify-between gap-4">
        <div class="relative card-style-darker overflow-auto h-[85vh] scrollbar w-full" id="fileViewer">
            <div class="fixed size-full pointer-events-none bottom-0 left-0 bg-linear-to-t from-surface from-5% to-surface/0 to-30%  z-2"></div>
            <BucketObjectList @image-selected="selectedImage = $event"/>
        </div>

        <div class="w-96 card-style-darker overflow-x-hidden overflow-y-auto scrollbar">
            <div class="relative">
            <div class="flex flex-col-reverse p-2 absolute bottom-0 left-0 bg-linear-to-t from-surface from-0% via-surface/90 via-25% to-surface/0 h-full w-full">
                <h4 class=" font-bold text-2xl mb-4">{{ selectedImage.filename }}</h4>
            </div>
            <img class="object-cover aspect-3/4" :src="selectedImage.url" :alt="selectedImage.filename">
            </div>
             
            <div>
                <ul class="text-text-muted truncate">
                    <li><i class="ri-link"></i> Link: {{ selectedImage.url }}</li>
                    <li><i class="ri-file-fill"></i> Tamanho do Arquivo: {{ selectedImage.size }} Bytes</li>
                    <li><i class="ri-gallery-upload-fill"></i> Enviada em: {{ selectedImage.lastModified }}</li>
                    <li>Tags:</li>
                </ul>
                <div class="flex gap-2 items-center h-16">
                    <span class="border border-secondary p-2 flex place-content-center rounded-sm mt-2 text-secondary flex-7">Não Publicada</span>
                    <span class="bg-accent text-bg flex place-content-center rounded-sm text-2xl flex-2"><i class="ri-send-plane-fill"></i></span>
                </div>
                <details open>
                    <summary class="text-lg font-bold mt-4">EXIF Metadata</summary>
                    <ul class="text-text-muted truncate">
                        <li><i class="ri-sensor-fill"></i> ISO: {{ metadata?.exif_iso ?? "—" }}</li>
                        <li><i class="ri-time-fill"></i> Shutter: {{ metadata?.exif_shutter ?? "—" }}</li>
                        <li><i class="ri-camera-lens-fill"></i> Abertura: {{ metadata?.exif_aperture ?? "—" }}</li>
                        <li><i class="ri-aspect-ratio-fill"></i> Dimensões: {{ metadata?.exif_width }}x{{ metadata?.exif_height }}</li>
                        <li><i class="ri-calendar-fill"></i> Tirada em: {{ metadata?.exif_taken_at ?? "—" }}</li>
                        <li><i class="ri-registered-fill"></i> Fabricante: {{ metadata?.exif_make ?? "—" }}</li>
                        <li><i class="ri-camera-2-fill"></i> Modelo: {{ metadata?.exif_model ?? "—" }}</li>
                        <li><i class="ri-binoculars-fill"></i> Focal: {{ metadata?.exif_focal_length ?? "—" }}</li>
                        <li><i class="ri-flashlight-fill"></i> Flash: {{ metadata?.exif_flash ?? "—" }}</li>
                        <li><i class="ri-contrast-fill"></i> Exposição: {{ metadata?.exif_exposure ?? "—" }}</li>
                        <li><i class="ri-settings-3-fill"></i> Medição: {{ metadata?.exif_metering ?? "—" }}</li>
                    </ul>
                </details>
            </div>
             
        </div>
    </section>
</template>

<style>
@reference "../../../styles/global.css";

.photo-bg{
    /* @apply object-contain bg-top; */
    background: url('https://images.caioabrahao.com.br/lightroom-25.jpg');
    background-position: top;
    background-size: contain;
    background-repeat: no-repeat;
    
}
</style>