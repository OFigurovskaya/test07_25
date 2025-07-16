<script setup>
import { ref, onMounted } from 'vue';
import BaseHeader from '../components/BaseHeader.vue';
import BaseGraph from '../components/BaseGraph.vue';
const dataSLP = ref({})

const goData = async () => {
    try {
        const response = await fetch('http://109.73.206.144:6969/api/sales?dateFrom=2025-07-01&dateTo=2025-07-15&page=1&key=E6kUTYrYwZq2tN4QEtyzsbEBk3ie&limit=100');
        const json = await response.json();
        dataSLP.value = json.data;
        return dataSLP
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
    <div class="sales__wrapper">
        <h1 class="sales__haed">SalesPage</h1>
        <div class="sales__graph">
            <BaseGraph :data="dataSLP" :labelField="`date`" :valueField="`total_price`"/>
        </div>
        <div class="sales__table"></div>
    </div>
   
   <p>{{ dataSLP }}</p>
</template>