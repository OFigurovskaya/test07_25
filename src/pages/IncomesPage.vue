

<script setup>
import { useRoute, useRouter } from 'vue-router';
import BaseHeader from '../components/BaseHeader.vue'

// const router = useRouter();
// const route = useRoute();

// const search = computed({
//     get() {
//         return route.query.search ?? ''
//     },
//     set(search) {
//         router.replace({ query: { search } })
//     }
// });
</script>

<template>
    <BaseHeader />
    <div class="">IncomesPage</div>

</template>