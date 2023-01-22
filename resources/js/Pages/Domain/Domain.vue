<script setup>
    import {Link} from "@inertiajs/vue3";
    import DomainLayout from './DomainLayout.vue';

    defineProps({
        domain: Object
    });
</script>

<template>
    <DomainLayout title="Some Domain">
        <template #header>
            <Link :href="route('dashboard')">
                Domains
            </Link>
            > {{ domain.description }}
        </template>

        <template #main>
            {{ domain }}
        </template>
    </DomainLayout>
</template>
