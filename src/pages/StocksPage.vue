<script setup>
import { ref, onMounted } from 'vue';
import BaseHeader from '../components/BaseHeader.vue';
const dataSTP = ref({})

const goData = async () => {
    try {
        const response = await fetch('http://109.73.206.144:6969/api/stocks?dateFrom=2025-07-16&dateTo=2025-07-22&page=1&key=E6kUTYrYwZq2tN4QEtyzsbEBk3ie&limit=100');
        const json = await response.json();
        dataSTP.value = json.data;
        return dataSTP
    } catch (error) {
        console.error("Error fetching:", error);
    }
};

onMounted(async () => {
    await goData()
});
</script>

<template>
    <BaseHeader />
    <div class="stocks__wrapper">
        <h1 class="stocks__haed">StocksPage</h1>
        <div class="stocks__graph"></div>
        <div class="stocks__table"></div>
    </div>
    
    <p>{{ dataSTP }}</p>
</template>
