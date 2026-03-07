<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import { bucketUpdated } from '../../lib/eventBus';
import '../../styles/global.css';
import 'remixicon/fonts/remixicon.css';

const fileInput = ref<HTMLInputElement | null>(null);
const status = ref('');
const statusColor = ref('text-text-muted')
const previews = ref<Array<{ url: string; name: string }>>([]);

const clearPreviewUrls = () => {
    for (const preview of previews.value) {
        URL.revokeObjectURL(preview.url);
    }
};

const updateBucketList = () => {
    console.log("Trying to update Object Lists at BucketObjectList.vue")
    bucketUpdated.value++
}

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const newFiles = Array.from(target.files ?? []);

    statusColor.value = 'text-text-muted'
    status.value = `Pronto para enviar ${newFiles.length} arquivos...`

    clearPreviewUrls();
    previews.value = newFiles.map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
    }));
};

const uploadFiles = async () => {
    const files = Array.from(fileInput.value?.files ?? []);

    if (!files.length) {
        statusColor.value = 'text-warning'
        status.value = 'Escolha pelo menos um arquivo primeiro...';
        return;
    }

    statusColor.value = 'text-text-muted'
    status.value = 'Enviando...';

    const formData = new FormData();
    for (const file of files) {
        formData.append('files', file);
    }

    const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
    });
    const data = await res.json();

    //status.value = res.ok ? `Enviados ${data.uploads.length} arquivo(s)` : `Algo deu errado! (${data.error})`;
    if(res.ok){
        statusColor.value = 'text-success'
        status.value = `${data.uploads.length} arquivo(s) enviados com sucesso!`

        //clear files after successful upload
        previews.value.length = 0
        if (fileInput.value) {
            fileInput.value.value = "";
        }
        updateBucketList();
    } else{
        statusColor.value = 'text-danger'
        status.value = `Algo deu errado! (${data.error})`
    }
};

onBeforeUnmount(() => {
    clearPreviewUrls();
});
</script>

<template>
    <div class="overflow-auto">
        <input
            id="fileInput"
            ref="fileInput"
            class="file:btn-soft hover:file:bg-accent-muted text-text-muted w-full"
            type="file"
            multiple
            accept="image/*"
            @change="handleFileChange"
        />

        <div id="previews" class="scrollbar mt-4 grid grid-cols-3 sm:grid-cols-5 xl:grid-cols-7 gap-2 max-h-full">
            <img
                v-for="preview in previews"
                :key="preview.url"
                :src="preview.url"
                :alt="preview.name"
                class="object-cover aspect-square"
            />
        </div>

        <div class="sticky w-full bottom-0 right-0 bg-surface-soft">
            <div id="status"><p :class="[statusColor]">{{ status }}</p></div>
            <button id="uploadBtn" class="btn-primary mt-2 w-full" @click="uploadFiles">Enviar</button>
        </div>
    </div>
</template>
