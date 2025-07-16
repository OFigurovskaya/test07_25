<script setup>
import { ref, watch, defineProps } from 'vue';
import { Line } from 'vue-chartjs';
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

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
    labelField: {
        type: String,
        required: true,
    },
    valueField: {
        type: String,
        required: true,
    }
});

const chartData = ref({
    labels: [],
    datasets: []
});

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false
});


const updateChart = (data) => {
    if (data.length > 0 && props.labelField in data[0] && props.valueField in data[0]) {
        const labels = data.map(item => item[props.labelField]);
        const values = data.map(item => {
            const val = item[props.valueField];
            return typeof val === 'number' ? val : Number(val) || 0;
        });

        chartData.value = {
            labels,
            datasets: [
                {
                    label: `График по полю "${props.valueField}"`,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    data: values,
                    fill: false,
                    tension: 0.1
                }
            ]
        };
    } else {
        chartData.value = { labels: [], datasets: [] };
    }
};

watch(() => props.data, (newData) => {
    updateChart(newData);
}, { immediate: true });
</script>

<template>
  <div style="height: 400px;">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
