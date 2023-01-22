<template>
    <DomainLayout title="A Records">
        <template #header>
            <Link :href="route('dashboard')">
                Domains
            </Link>
            >
            <Link :href="route('domain', { domain: domain })">
                {{ domain }}
            </Link>
            > A Records
        </template>

        <template #main>
            <div v-for="(record, index) of records" :key="index">
                {{ record }}
            </div>

            <PrimaryButton @click="postARecord()">Click Me</PrimaryButton>
        </template>
    </DomainLayout>
</template>

<script setup>
    import {Link, router} from '@inertiajs/vue3';
    import DomainLayout from './DomainLayout.vue';
    import PrimaryButton from '@/Components/PrimaryButton.vue';

    const props = defineProps({
        domain: String,
        records: Object,
    });

    function postARecord() {
        router.post(`/domain/${props.domain}/a`);
    }
</script>

