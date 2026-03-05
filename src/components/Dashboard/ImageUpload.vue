<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import '../../styles/global.css';
import 'remixicon/fonts/remixicon.css';

const fileInput = ref<HTMLInputElement | null>(null);
const status = ref('');
const previews = ref<Array<{ url: string; name: string }>>([]);

const clearPreviewUrls = () => {
    for (const preview of previews.value) {
        URL.revokeObjectURL(preview.url);
    }
};

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const newFiles = Array.from(target.files ?? []);

    clearPreviewUrls();
    previews.value = newFiles.map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
    }));
};

const uploadFiles = async () => {
    const files = Array.from(fileInput.value?.files ?? []);

    if (!files.length) {
        status.value = 'Escolha pelo menos um arquivo primeiro...';
        return;
    }

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

    status.value = res.ok ? `✅ Uploaded ${data.uploads.length} file(s)` : `❌ ${data.error}`;
};

onBeforeUnmount(() => {
    clearPreviewUrls();
});
</script>

<template>
    <div>
        <input
            id="fileInput"
            ref="fileInput"
            class="file:btn-soft hover:file:bg-accent-muted text-text-muted w-full"
            type="file"
            multiple
            accept="image/*"
            @change="handleFileChange"
        />

        <div id="status">{{ status }}</div>
        <p>Preview das Imagens:</p>

        <div id="previews" class="scrollbar mt-4 grid grid-cols-3 gap-2 max-h-64 overflow-auto">
            <img
                v-for="preview in previews"
                :key="preview.url"
                :src="preview.url"
                :alt="preview.name"
                class="object-cover aspect-square"
            />
        </div>

        <button id="uploadBtn" class="btn-primary mt-2 w-full" @click="uploadFiles">Enviar</button>
    </div>
</template>
