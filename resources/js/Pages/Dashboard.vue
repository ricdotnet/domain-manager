<script setup>
    import AppLayout from '@/Layouts/AppLayout.vue';
    import {router} from "@inertiajs/vue3";

    defineProps({
        domains: Array
    });

    function formatDate(timestamp) {
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        };
        return new Date(timestamp * 1000).toLocaleDateString('en-gb', options);
    }
</script>

<template>
    <AppLayout title="Dashboard">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Domains
            </h2>
        </template>

        <template #main>
            <template v-if="!domains">
                You don't have any domains.
            </template>
            <template v-else>
                <h3 class="py-5 px-3">Your registered domains: {{ domains.length }}</h3>
                <table class="items-center bg-transparent w-full border-collapse">
                    <thead>
                    <tr class="h-10 text-left uppercase h-10 bg-zinc-100 border-t border-b border-gray-200 text-sm">
                        <th class="px-5 shrink-0">Domain</th>
                        <th class="px-5 shrink-0 responsive-cell">Registered On</th>
                        <th class="px-5 shrink-0">Expires On</th>
                        <th class="px-5">Privacy Protection</th>
                        <th class="px-5 shrink-0 w-2"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="h-12 text-sm" v-for="(domain, index) of domains" :key="index">
                        <td class="px-5 font-bold shrink-0">
                            <a :href="'/domain/' + domain.name">{{ domain.name }}</a>
                        </td>
                        <td class="px-5 responsive-cell">{{ formatDate(domain.registeredOn) }}</td>
                        <td class="px-5" :class="{'text-red-500 font-bold': (domain.expiresOn * 1000) < Date.now()}">
                            {{ formatDate(domain.expiresOn) }}
                        </td>
                        <td class="px-5">{{ domain.privacyProtection === 'true' ? 'True' : 'False' }}</td>
                        <td class="px-5">
                            <span class="w-2 h-2 rounded-full inline-block"
                                  :class="domain.status.toLowerCase() === 'active' ? 'bg-green-600' : 'bg-red-700'"
                            >
                            </span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </template>
        </template>
    </AppLayout>
</template>

<style scoped>
    .responsive-cell {
        display: none;
    }

    @media (min-width: 768px) {
        .responsive-cell {
            display: revert;
        }
    }
</style>
