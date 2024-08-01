<template>
  <div>
    <h2>Home View</h2>
    <hr class="my-4" />
    <!-- <p>path: {{ $route.fullPath }}</p> -->
    <AppGrid :items="items" v-slot="{ item }" col-class="col-6">
      <AppCard>{{ item }}</AppCard>
    </AppGrid>
    <button class="btn btn-primary my-4" @click="goAboutPage">About</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import AppGrid from '@/components/AppGrid.vue';
import AppCard from '@/components/AppCard.vue';

const route = useRoute();
const router = useRouter();

const items = [
  'name: ' + route.name,
  'path: ' + route.path,
  'params: ' + route.params.value,
];

const goAboutPage = () => {
  router.push('/about');
};
</script>

<style lang="scss" scoped></style>
