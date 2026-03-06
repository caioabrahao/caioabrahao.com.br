<script setup>
import '../../styles/global.css';
import 'remixicon/fonts/remixicon.css';
import ImageUpload from './ImageUpload.vue';
import UploadedList from './BucketObjectList.vue'
</script>

<template>
<section class="h-screen flex flex-col">
    <div class="px-[5%] grid gap-4 grid-cols-1 grid-rows-3 md:grid-cols-2 lg:grid-cols-3 flex-1 pb-8 h-full scrollbar">
        <div class="dash-card row-span-3">
            <h3>Enviar Fotos</h3>
            <p>Envie fotos para o bucket da Cloudflare</p>
            <div class="mt-8 p-2 border border-accent rounded-md flex flex-col gap-4">
                <ImageUpload/>
            </div>
        </div>
        <div class="dash-card col-span-2 h-full overflow-auto">
            <h3>Fotos Enviadas</h3>
            <p>Vejas as fotos existentes no bucket</p>
            <UploadedList/>
        </div>
        <div class="dash-card col-span-2 row-span-2">
            <h3>Gerenciar Galerias</h3>
            <p>Gerencie Galerias existentes no site</p>
        </div>
    </div>
</section>
</template>

<style scoped>
    @reference '../../styles/global.css';
    .dash-card{
        @apply card-style flex flex-col;
        p{
            @apply text-text-muted
        }
        h3{
            @apply text-xl flex-col font-bold
        }
    }
</style>