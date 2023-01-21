<script setup>
    import AppLayout from '@/Layouts/AppLayout.vue';
    import Welcome from '@/Components/Welcome.vue';
    import {router} from "@inertiajs/vue3";

    defineProps({
        domains: Array
    })
</script>

<template>
    <AppLayout title="Dashboard">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Dashboard
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <template v-if="!domains">
                        You don't have any domains.
                    </template>
                    <template v-else>
                        <table>
                            <tr class="h-10">
                                <th class="px-5">Domain</th>
                                <th class="px-5">Renew Date</th>
                            </tr>
                            <tr v-for="(domain, index) of domains" :key="index">
                                <td class="px-5">
                                    <a :href="'/domain/' + domain.name">{{ domain.name }}</a>
                                </td>
                                <td class="px-5">{{ new Date(domain.renew * 1000).toDateString() }}</td>
                            </tr>
                        </table>
                    </template>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
