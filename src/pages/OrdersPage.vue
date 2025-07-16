<script setup>
import { ref, onMounted } from 'vue';
import BaseHeader from '../components/BaseHeader.vue';
import BaseGraph from '../components/BaseGraph.vue';
const dataOP = ref({})

const goData = async () => {
    try {
        const response = await fetch('http://109.73.206.144:6969/api/orders?dateFrom=2025-07-01&dateTo=2025-07-15&page=1&key=E6kUTYrYwZq2tN4QEtyzsbEBk3ie&limit=100');
        const json = await response.json();
        dataOP.value = json.data;
        return dataOP
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
    <div class="orders__wrapper">
        <h1 class="orders__haed">OrdersPage</h1>
        <div class="orders__graph" style="height: 400px;">
                <BaseGraph :data="dataOP" :labelField="`date`" :valueField="`total_price`"/>
            </div>
        <div class="orders__table"></div>
    </div>
    <p>{{ dataOP }}</p>
</template>
