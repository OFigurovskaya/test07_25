<script setup>
import { ref, onMounted } from 'vue';
import BaseHeader from '../components/BaseHeader.vue';
import BaseGraph from '../components/BaseGraph.vue';
import BaseTable from '../components/BaseTable.vue'
const dataSLP = ref([])

const goData = async () => {
    try {
        const response = await fetch('http://109.73.206.144:6969/api/sales?dateFrom=2025-07-01&dateTo=2025-07-15&page=1&key=E6kUTYrYwZq2tN4QEtyzsbEBk3ie&limit=100');
        const json = await response.json();
        dataSLP.value = Object.values(json.data);
    } catch (error) {
        console.error("Error fetching:", error);
    }
};

onMounted(async () => {
    await goData()
});

</script>


<template>
    <div class="content-wrapper">
        <BaseHeader />
            <h1 class="sales__haed">SalesPage</h1>
            <div class="sales__graph">
                <BaseGraph :data="dataSLP" :labelField="`date`" :valueField="`total_price`" />
            </div>
                <BaseTable :data="dataSLP" />
    </div>
</template>