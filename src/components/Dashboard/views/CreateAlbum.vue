<script setup>

</script>

<template>
    <section class="global-padding-x">
        <form class="card-style-darker flex flex-col gap-4" action="/api/albums" method="post">
            <h2 class="font-warbler-text font-bold text-2xl">Criar Album</h2>
            <hr class="opacity-20">
            <div class="flex gap-2">
                <label class="text-text-muted" for="title">Título</label>
                <input type="text" name="album_title" id="title" placeholder="Album Incrível!" required>
            </div>

            <div class="flex gap-2">
                <label class="text-text-muted" for="description">Descrição</label>
                <input type="text" name="album_description" placeholder="Minha viagem para as montanhas..." id="description">
            </div>

            <div class="flex gap-2">
                <label class="text-text-muted" for="visibility">Visibilidade</label>
                <select name="album_visibility" id="visibility">
                    <option selected value="1">Publico</option>
                    <option value="0">Privado</option>
                </select>
                <p class="text-text-muted text-sm"><i class="ri-information-line"></i> Você pode mudar isso depois</p>
            </div>
            <button class="btn-primary" type="submit">Criar Album</button>
        </form>
    </section>
</template>