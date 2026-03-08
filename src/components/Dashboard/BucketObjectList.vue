<script setup>
import '../../styles/global.css';
import 'remixicon/fonts/remixicon.css';
import { ref, onMounted, watch, defineEmits } from "vue";
import { bucketUpdated } from '../../lib/eventBus';
import ImageFileItem from './ImageFileItem.vue';

const images = ref([]);
const folders = ref([]);
const prefix = ref("");

const isLoading = ref(true);
const failedFetch = ref(false);
const errorMsg = ref("");

const totalFetched = ref()
const fetchedFrom = ref("")

const emit = defineEmits("image-selected")
const isSelected = ref(false)

function selectImage(image){
    emit("image-selected", image)
}

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

            totalFetched.value = data.requestMeta.amountReturned
            fetchedFrom.value = data.requestMeta.bucketFrom

            isLoading.value = false
            console.log(data)
        })
        .catch(error => {
            failedFetch.value = true
            errorMsg.value = error
            isLoading.value = false
})
}

watch(bucketUpdated, () => {
  fetchContents() // refetch whenever the signal fires
})

onMounted(async () =>{
    fetchContents();
})
</script>

<template>
    <div class="">
        <div class="card-style mb-4 text-text-muted flex justify-between items-center">
            <div>
                <div class="flex gap-2 items-center">
                    <button @click="resetPrefix" class="btn-soft"><i class="ri-home-2-line"></i></button>
                    <p v-if="prefix.length === 0">folder: root/</p>
                    <p v-else>folder: root/{{ prefix }}</p>
                </div>
                <p class="text-base mt-2 opacity-50">Successfully fetched {{ totalFetched }} items!</p>
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
                <button @click="openFolder(folder.name)" class="card-style hover:bg-accent-muted transition-colors hover:cursor-pointer flex flex-col place-content-center w-full h-full aspect-3/4">
                    <i class="ri-folder-4-line text-3xl"></i> 
                    <span class="text-xl text-center">{{ folder.name }}</span>
                </button>
            </li>
            <li @click="selectImage(image)" :class="{ 'outline outline-accent' : isSelected }" v-for="image in images" :key="image.filename">
                <ImageFileItem :url="image.url" :filename="image.filename"/>
            </li>
        </ul>
    </div>

</template>