<script setup>
    import AppLayout from '@/Layouts/AppLayout.vue';

    defineProps({
        title: String,
    });
</script>

<template>
    <AppLayout :title="title">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                <slot name="header"/>
            </h2>
        </template>

        <template #main>
            <slot name="main"/>
        </template>
    </AppLayout>
</template>
