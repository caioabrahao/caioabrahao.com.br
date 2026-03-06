<script setup>
import BucketObjectList from '../BucketObjectList.vue';
</script>

<template>
    <section class="global-padding-x pb-8">
        <div class=" card-style-darker overflow-auto h-[85vh] scrollbar w-full" id="fileViewer">
            <BucketObjectList/>
        </div>
    </section>
</template>