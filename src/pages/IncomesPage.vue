

<script setup>
import { ref, onMounted } from 'vue';
import BaseHeader from '../components/BaseHeader.vue';
const dataIP = ref({})

const goData = async () => {
    try {
        const response = await fetch('http://109.73.206.144:6969/api/incomes?dateFrom=2025-07-01&dateTo=2025-07-15&page=1&key=E6kUTYrYwZq2tN4QEtyzsbEBk3ie&limit=100');
        const json = await response.json();
        dataIP.value = json.data;
        return dataIP
    } catch (error) {
        console.error("Error fetching:", error);
    }
};

onMounted(async() => {
    await goData()
});
</script>

<template>
    <BaseHeader />
    <div class="incom__wrapper">
        <h1 class="incom__haed">IncomesPage</h1>
        <div class="incom__graph"></div>
        <div class="incom__table"></div>
    </div>

    <p>{{ dataIP }}</p>
</template>