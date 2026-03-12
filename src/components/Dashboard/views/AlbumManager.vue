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
    <section class="flex flex-col global-padding-x place-content-center text-text">
        <a class="btn-primary" href="/dashboard/createAlbum">+ Criar Album</a>
        lista:
        <div>
            <p v-if="isLoading === true" class="text-text-muted">Imagens Carregando...</p>
            <ul v-else>
                <li v-for="album in albumList" :key="album.slug">
                    {{ album.title }}
                    {{ album.description }}
                </li>
            </ul>
        </div>
    </section>
</template>