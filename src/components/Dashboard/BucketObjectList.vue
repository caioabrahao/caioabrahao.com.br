<script setup>
import '../../styles/global.css';
import 'remixicon/fonts/remixicon.css';
import { ref, onMounted } from "vue";

const images = ref([]);
const isLoading = ref(true);
const failedFetch = ref(false);
const errorMsg = ref("");

onMounted(async () =>{
    // FIRST ATTEMPT... ILL TRY AGAIN
    // const res = await fetch("/api/images")
    //     .then(() => isLoading.value = false);
    // images.value = await res.json();
    // console.log(images.value);
    
    fetch('/api/images')
        .then(response => response.json())
        .then(data => {
            images.value = data.images
            isLoading.value = false
            console.log(data)
        })
        .catch(error => {
            failedFetch.value = true
            errorMsg.value = error
            isLoading.value = false
        })
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
        </ul>
    </div>

</template>