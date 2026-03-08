<script setup>
import { ref } from 'vue';

const props = defineProps({
    url: String,
    filename: String,
    className: String,
    clickAction: String,
})

const isColored = ref(false);

function copyFeedback(){
    isColored.value = true
    setTimeout(() => {
        isColored.value = false
    }, 1000);
}

async function copyLink(link){
    try{
        await navigator.clipboard.writeText(link)
        copyFeedback();
    } catch (err){
        console.error("Failed to copy to clipboard: ", err)
    }
}

</script>


<template>

<div class="relative">
    <div class="showOnHover absolute cursor-pointer bg-surface/50 w-full h-full top-0 left-0 overflow-hidden flex flex-col justify-end p-2">
        <p class="text-lg font-bold">{{ filename }}</p>
        <div>
            <p>Size: 130 Kb</p>
            <div @click="copyLink(props.url)" class="flex link-copy gap-2 overflow-hidden" :class="{ 'bg-accent-muted' : isColored, 'bg-surface/50' : !isColored }">
                <button  class="cursor-pointer"><i class="ri-file-copy-line"></i></button>
                <input class="outline-none cursor-pointer" type="text" :value="url" readonly>
            </div>
        </div>
    </div>
    <img @click="" class="object-cover aspect-3/4" :src="url" :alt="filename">
</div>

</template>

<style>
@reference "../../styles/global.css";

.link-copy{
    @apply border border-border rounded-md
    hover:border-accent
    cursor-pointer
    transition-colors duration-1000;

    /* background: rgb(var(--color-surface) / 50); */
}

.showOnHover{
    @apply opacity-0 hover:opacity-100
    transition-opacity
    duration-100
}

</style>