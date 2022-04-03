<template>
  <div class="nav-top">
    <div class="tab">A Records</div>
    <div class="tab">AAAA Records</div>
  </div>

  <div v-for="(record, index) of dnsData" :key="index">
    {{ record }}
  </div>
</template>

<script setup lang="ts">

  defineProps<{
    dnsData: any;
    data?: any;
  }>();

</script>

<style scoped>
  .nav-top {
    @apply flex border-b-[3px] border-gray-300 w-full;

    .tab {
      @apply px-5 py-2 cursor-pointer hover:bg-gray-200;
    }

    .active {
      @apply bg-gray-300 rounded-t-md;
    }
  }
</style>
