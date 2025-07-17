<script setup>
import { ref, onMounted } from 'vue';
import BaseHeader from '../components/BaseHeader.vue';
import BaseGraph from '../components/BaseGraph.vue';
import BaseTable from '../components/BaseTable.vue'
const dataSTP = ref([])

const goData = async () => {
    try {
        const response = await fetch('http://109.73.206.144:6969/api/orders?dateFrom=2025-07-01&dateTo=2025-07-16&page=1&key=E6kUTYrYwZq2tN4QEtyzsbEBk3ie&limit=100');
        const json = await response.json();
        dataSTP.value = Object.values(json.data);
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
            <h1 class="stocks__haed">StocksPage</h1>
            <div class="stocks__graph">
                <BaseGraph :data="dataSTP" :labelField="`date`" :valueField="`total_price`" />
            </div>
                <BaseTable :data="dataSTP" />
    </div>
</template>
