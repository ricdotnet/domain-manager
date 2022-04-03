<template>
  <div class="nav-top">
    <div class="tab">A Records</div>
    <div class="tab">AAAA Records</div>
  </div>

  <div v-for="(domain, index) of state.domains" :key="index">
    {{ domain['entity.description'] }}
  </div>

  <!--  <div v-for="(record, index) of dnsData" :key="index">-->
  <!--    {{ record }}-->
  <!--  </div>-->
</template>

<script setup lang="ts">
  import { computed, defineExpose, reactive } from 'vue';

  const props = defineProps<{
    // dnsData: any;
    // data?: any;
    domains: any;
  }>();

  const state = reactive({
    domains: computed(() => props.domains),
  });

  defineExpose({ state });
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
