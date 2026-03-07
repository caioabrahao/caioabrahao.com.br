<script setup>
import '../../styles/global.css';
import 'remixicon/fonts/remixicon.css';
import { ref, onMounted } from "vue";

const images = ref([]);
const folders = ref([]);
const prefix = ref("");

const isLoading = ref(true);
const failedFetch = ref(false);
const errorMsg = ref("");

function openFolder(folderPrefix){
    prefix.value = folderPrefix + '/'
    fetchContents();
}
function resetPrefix(){
    prefix.value = ""
    fetchContents();
}

async function fetchContents (){
    const params = new URLSearchParams({ prefix: prefix.value });
    fetch(`/api/images?${params}`)
        .then(response => response.json())
        .then(data => {
            images.value = data.images
            folders.value = data.folders
            isLoading.value = false
            console.log(data)
        })
        .catch(error => {
            failedFetch.value = true
            errorMsg.value = error
            isLoading.value = false
})
}

onMounted(async () =>{
    fetchContents();
})
</script>

<template>
    <div class="">
        <div class="card-style mb-4 text-text-muted flex justify-between items-center">
            <div class="flex gap-2 items-center">
                <button @click="resetPrefix" class="btn-soft"><i class="ri-home-2-line"></i></button>
                <p v-if="prefix.length === 0">folder: root/</p>
                <p v-else>folder: root/{{ prefix }}</p>
            </div>
            <div class="flex gap-2">
                <button class="btn-primary-sm" popovertarget="uploadModal"><i class="ri-upload-2-line"></i> Enviar Imagem</button>
            </div>
        </div>
        <p v-if="isLoading === true"><i class="ri-loader-5-line"></i> Images are loading...</p>
        <p class="text-danger" v-else-if="failedFetch === true">Something went wrong... <br>({{ errorMsg }})</p>
        <p v-else-if="!isLoading && images.length === 0">No images found! Maybe upload some...</p>
        <ul v-else class="grid grid-cols-5 gap-2 list-none">
            <li v-for="folder in folders" :key="folder.name">
                <button @click="openFolder(folder.name)" class="card-style hover:bg-accent-muted transition-colors hover:cursor-pointer flex flex-col place-content-center w-full h-full"><i class="ri-folder-4-line text-6xl"></i> <span class="text-3xl">{{ folder.name }}</span></button>
            </li>
            <li v-for="image in images" :key="image.filename">
                <img class="object-cover aspect-3/4" :src="image.url" :alt="image.filename">
            </li>
        </ul>
    </div>

</template>