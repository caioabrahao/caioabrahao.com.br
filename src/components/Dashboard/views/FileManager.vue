<script setup>
import BucketObjectList from '../BucketObjectList.vue';
</script>

<template>
    <section class="global-padding-x 2xl:px-[15%] pb-8 flex justify-between gap-4">
        <div class=" card-style-darker overflow-auto h-[85vh] scrollbar w-full" id="fileViewer">
            <BucketObjectList/>
        </div>

        <div class="min-w-64 max-w-96 card-style-darker overflow-x-hidden overflow-y-auto scrollbar">
            <!-- <p class="text-text-muted opacity-50 text-center">Selecione uma Foto para ver informações aqui</p> -->
             <div class="relative">
                <div class="flex flex-col-reverse p-2 absolute bottom-0 left-0 bg-linear-to-t from-surface from-0% via-surface/90 via-25% to-surface/0 h-full w-full">
                    <h4 class=" font-bold text-2xl mb-4">lightroom-24.jpg</h4>
                </div>
                <img class="object-cover" src="https://images.caioabrahao.com.br/lightroom-25.jpg" alt="filename preview">
             </div>
             
             <div>
                <ul class="text-text-muted truncate">
                    <li><i class="ri-file-fill"></i> Tamanho do Arquivo: 112 kb</li>
                    <li><i class="ri-link"></i> Link: https://images.caioabrahao.com.br/lightroom-24.jpg</li>
                    <li><i class="ri-gallery-upload-fill"></i> Enviada em:</li>
                    <li>Tags:</li>
                </ul>
                <div class="flex gap-2 items-center h-16">
                    <span class="bg-secondary p-2 flex place-content-center rounded-sm mt-2 text-bg flex-7">Não Publicada</span>
                    <span class="bg-accent text-bg flex place-content-center rounded-sm text-2xl flex-2"><i class="ri-send-plane-fill"></i></span>
                </div>
                <details open>
                    <summary class="text-lg font-bold mt-4">EXIF Metadata</summary>
                    <ul class="text-text-muted truncate">
                        <li><i class="ri-sensor-fill"></i> ISO: </li>
                        <li><i class="ri-time-fill"></i> Shutter Speed: </li>
                        <li><i class="ri-camera-lens-fill"></i> Abertura: </li>
                        <li><i class="ri-aspect-ratio-fill"></i> Dimensões: </li>
                        <li><i class="ri-calendar-fill"></i> Tirada em:</li>
                        <li><i class="ri-registered-fill"></i> Fabricante da Câmera: </li>
                        <li><i class="ri-camera-2-fill"></i> Modelo da Câmera: </li>
                        <li><i class="ri-contrast-fill"></i> Ajuste de Exposição: </li>
                        <li><i class="ri-binoculars-fill"></i> Distância Focal: </li>
                        <li><i class="ri-settings-3-fill"></i> Modo de Medição: </li>
                        <li><i class="ri-flashlight-fill"></i> Flash: </li>
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