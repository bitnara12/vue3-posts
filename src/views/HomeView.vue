<template>
  <div>
    <h2>Home View</h2>
    <hr class="my-4" />
    <!-- <p>path: {{ $route.fullPath }}</p> -->
    <AppGrid :items="items" v-slot="{ item }" col-class="col-6">
      <AppCard>{{ item }}</AppCard>
    </AppGrid>
    <!-- <h2>{{ $person.name }}</h2> -->
    <button class="btn btn-primary my-4" @click="goAboutPage">About</button>
    <button class="btn btn-primary ms-1" @click="person.say">
      click person
    </button>
  </div>
</template>

<script>
export default {
  created() {
    // console.log(this.$person.name);
    // this.$person.say();
  },
};
</script>

<script setup>
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import AppGrid from '@/components/AppGrid.vue';
import AppCard from '@/components/AppCard.vue';
import { inject } from 'vue';

const route = useRoute();
const router = useRouter();
const person = inject('person');

const items = [
  'name: ' + route.name,
  'path: ' + route.path,
  'params: ' + route.params.value,
  'person: ' + person.name,
];

const goAboutPage = () => {
  router.push('/about');
};
</script>

<style lang="scss" scoped></style>
