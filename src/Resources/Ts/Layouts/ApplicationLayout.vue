<template>
  <div class="min-h-screen bg-gray-100">

    <MainNavigation :user="user"/>

    <div class="py-10">
      <main>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div class="px-4 py-8 sm:px-0">
            <slot/>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import MainNavigation from './Elements/MainNavigation.vue';

  export default defineComponent({
    name      : 'ApplicationLayout',
    components: { MainNavigation },
    // props     : {
    //   user: { type: Object as PropType<UserObject> }
    // },
    data() {
      return {
        user: {
          _id      : '1',
          createdAt: '1970-1-1',
          email    : 'email@email.com',
          name     : 'Ricardo Rocha',
          avatar   : 'https://i.pravatar.cc/150'
        }
      };
    },
  });
</script>

<style scoped>

</style>
