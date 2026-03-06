<script setup>
import '../../styles/global.css';
import 'remixicon/fonts/remixicon.css';
import { ref, onMounted } from "vue";

const images = ref([]);
const folders = ref([]);
const prefix = ref("highlights");

const isLoading = ref(true);
const failedFetch = ref(false);
const errorMsg = ref("");

function openFolder(folderPrefix){
    prefix.value = folderPrefix
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
        <p v-if="isLoading === true">Images are loading...</p>
        <p class="text-danger" v-else-if="failedFetch === true">Something went wrong... <br>({{ errorMsg }})</p>
        <p v-else-if="!isLoading && images.length === 0">No images found! Maybe upload some...</p>
        <ul v-else class="grid grid-cols-5 gap-2 list-none">
            <li v-for="image in images" :key="image.filename">
                <img class="object-cover aspect-3/4" :src="image.url" :alt="image.filename">
            </li>
            <li v-for="folder in folders" :key="folder.name">
                <button @click="openFolder(folder.name)" class="card-style hover:bg-accent-muted transition-colors hover:cursor-pointer flex flex-col place-content-center w-full h-full"><i class="ri-folder-4-line text-6xl"></i> <span class="text-3xl">{{ folder.name }}</span></button>
            </li>
        </ul>
    </div>

</template>