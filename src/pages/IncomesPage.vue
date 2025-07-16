

<script setup>
import { ref, onMounted } from 'vue';
import BaseHeader from '../components/BaseHeader.vue';
import { Line } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

const dataIP = ref([]);

const chartData = ref({
    labels: [],
    datasets: []
})

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false
});


const labelField = 'date'     
const valueField = 'quantity' 

const goData = async () => {
    try {
        const response = await fetch('http://109.73.206.144:6969/api/incomes?dateFrom=2025-07-01&dateTo=2025-07-15&page=1&key=E6kUTYrYwZq2tN4QEtyzsbEBk3ie&limit=100');
        const json = await response.json();
        dataIP.value = json.data;

        if (dataIP.value.length > 0 && labelField in dataIP.value[0] && valueField in dataIP.value[0]) {
            const labels = dataIP.value.map(item => item[labelField]);
            const values = dataIP.value.map(item => {
                const val = item[valueField];
                return typeof val === 'number' ? val : Number(val) || 0;
            });

            chartData.value = {
                labels,
                datasets: [
                    {
                        label: `График по полю "${valueField}"`,
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        data: values,
                        fill: false,
                        tension: 0.1
                    }
                ]
            }
        } else {
            console.log(`Поля ${labelField} или ${valueField} отсутствуют в данных или данные пусты`);
        }

    } catch (error) {
        console.error("Error fetching:", error);
    }
};



onMounted(async () => {
    await goData()
});

</script>

<template>
    <div>
        <BaseHeader />
        <div class="incom__wrapper">
            <h1 class="incom__haed">IncomesPage</h1>
            <div class="incom__graph" style="height: 400px;">
                <Line v-if="chartData.labels.length" :data="chartData" :options="chartOptions" />
                <p v-else>Загрузка данных...</p>
            </div>
            <div class="incom__table"></div>
        </div>
    </div>
</template>