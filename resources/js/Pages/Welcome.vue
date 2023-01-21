<script setup>
    import {Head, Link, router} from '@inertiajs/vue3';
    import PrimaryButton from '../Components/PrimaryButton.vue';
    import Dropdown from '../Components/Dropdown.vue';
    import DropdownLink from '../Components/DropdownLink.vue';

    defineProps({
        canLogin: Boolean,
        canRegister: Boolean,
        laravelVersion: String,
        phpVersion: String,
    });
</script>

<template>
    <Head title="Welcome"></Head>

    <div class="h-10 text-gray-900 dark:text-gray-200 flex space-x-3 justify-end items-center pr-10">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>
</template>
