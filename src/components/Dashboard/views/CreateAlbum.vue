<script setup>
import { ref } from 'vue';

const status = ref("")
const formData = ref({
    title: null,
    description: null,
    visibility: null
})

const sendPOST = async () => {
    const res = await fetch("/api/albums", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        title: formData.value.title,
        description: formData.value.description,
        visibility: formData.value.visibility
    })
    })

    const data = await res.json();

     if (res.ok) {
        formData.value.title = "";
        formData.value.description = "";
        formData.value.visibility = 1;
        console.log("Album created!", data.slug);
        status.value = "success"
    } else {
        console.error("Failed:", data.error);
        status.value = "error"
    }
};

</script>

<template>
    <section class="global-padding-x">
        <form class="card-style-darker flex flex-col gap-4" @submit.prevent="sendPOST">
            <h2 class="font-warbler-text font-bold text-2xl">Criar Album</h2>
            <hr class="opacity-20">
            <div class="flex gap-2">
                <label class="text-text-muted" for="title">Título</label>
                <input type="text" v-model="formData.title" placeholder="Album Incrível!" required>
            </div>

            <div class="flex gap-2">
                <label class="text-text-muted" for="description">Descrição</label>
                <input type="text" v-model="formData.description" placeholder="Minha viagem para as montanhas..." id="description">
            </div>

            <div class="flex gap-2">
                <label class="text-text-muted" for="visibility">Visibilidade</label>
                <select v-model.number="formData.visibility" required>
                    <option disabled value="">Escolha uma opção</option>
                    <option selected value="1">Publico</option>
                    <option value="0">Privado</option>
                </select>
                <p class="text-text-muted text-sm"><i class="ri-information-line"></i> Você pode mudar isso depois</p>
            </div>

            <p v-if="status === 'success'">✅ Album criado!</p>
            <p v-if="status === 'error'">❌ Algo deu errado...</p>
            <button class="btn-primary" type="submit">Criar Album</button>
        </form>
    </section>
</template>