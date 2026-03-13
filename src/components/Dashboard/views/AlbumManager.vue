<script setup>
import { ref, onMounted } from 'vue';

const albumList = ref({})
const isLoading = ref(true)

const fetchAlbums = async () => {
    fetch(`/api/albums`)
        .then(response => response.json())
        .then(data => {
            albumList.value = data.albums
            isLoading.value = false
        })
        
    }

onMounted(async () => {
    fetchAlbums();
});
</script>

<template>
    <section class="gap-4 flex flex-col global-padding-x place-content-center text-text">
        <p class="font-warbler-text font-bold text-3xl">Todos os Albums</p>
        <div>
            <p v-if="isLoading === true" class="text-text-muted">Imagens Carregando...</p>
            <p v-else-if="albumList.length === 0">Nenhuma Imagem Encontrada!</p>
            <ul class="flex gap-2" v-else>
                <li v-for="album in albumList" :key="album.slug">
                    <a :href="`/dashboard/albums/${album.slug}`">
                        <div class="border-border border p-4">
                            <h4 class="font-warbler-text text-2xl">{{ album.title }}</h4>
                            <p class="text-text-muted">{{ album.description }}</p>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
        <a class="btn-primary w-fit" href="/dashboard/createAlbum">+ Criar Album</a>
    </section>
</template>