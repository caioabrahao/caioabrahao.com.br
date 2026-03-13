<script setup>
import { onMounted, ref } from 'vue'
const props = defineProps(["slug"])
const album = ref({})
const albumImages = ref([])   
const bucketImages = ref([])  

const failedLoad = ref(false)

onMounted(async () => {
  const [albumRes, bucketRes] = await Promise.all([
    fetch(`/api/albums/${props.slug}`),
    fetch("/api/images")
  ])
    
    if(!albumRes.ok){
        failedLoad.value = true;
    }

  const albumData = await albumRes.json()
  const bucketData = await bucketRes.json()

  album.value = albumData.album
  albumImages.value = albumData.images
  bucketImages.value = bucketData.images
})

</script>

<template>
    
    <section class="relative global-padding-x min-h-[80vh] flex flex-col gap-4">
        <div v-if="failedLoad" class="bg-bg absolute h-full w-full top-0 left-0 flex flex-col global-padding-x justify-center">
            <p class="font text-3xl text-text-muted">..... parece que esse</p>
            <p class="font-gunter text-8xl mb-8">Album não existe!</p>
            <a class="btn-primary w-fit" href="/dashboard/albums">Ver Albums que EXISTEM!</a>
        </div>
        <div>
            <h1 class="font-gunter text-2xl"><span class="text-text-muted">Album: </span>{{ album.title }}</h1>
            <p class="text-text-muted">{{ album.description }}</p>
            <p class="text-text-muted">{{ album.created_at }}</p>
        </div>
        <div class="gap-4 grid grid-cols-2 grid-rows-1 flex-1">
            <div class="card-style flex flex-col gap-4">
                <h2 class="font-warbler-text text-2xl font-bold">Imagens do Album</h2>
                <div>
                    <p v-if="albumImages.length === 0" class="text-text-muted text-center">Sem Imagens no Album! <br>Segure e arraste para começar a adicionar</p>
                    <ul v-else class="grid grid-cols-3 gap-2">
                        <li v-for="image in albumImages" :key="image.filename">
                            <img class="aspect-3/4 object-cover hover:drop-shadow-xl hover:drop-shadow-text" :src="image.url" :alt="image.filename"/>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="card-style-darker flex flex-col gap-4">
                <h2 class="font-warbler-text text-2xl font-bold">Todas as Imagens</h2>
                <div>
                    <ul class="grid grid-cols-3 gap-2">
                        <li v-for="image in bucketImages" :key="image.filename">
                            <img class="aspect-3/4 object-cover hover:drop-shadow-xl hover:drop-shadow-text" :src="image.url" :alt="image.filename"/>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
    

</template>