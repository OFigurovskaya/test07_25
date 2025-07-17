<script setup>
import { ref, defineProps, computed } from 'vue';

const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
});

// Получаем ключи из первого объекта массива для заголовков
const keys = computed(() => {
    return props.data.length > 0 ? Object.keys(props.data[0]) : [];
});

const sortKey = ref('');
const sortOrder = ref(1); // 1 — по возрастанию, -1 — по убыванию
const currentPage = ref(1); //страница по умолчанию
const pageSize = ref(10); // Количество строк на странице

const sortBy = (key) => {
    if (sortKey.value === key) {
        sortOrder.value = -sortOrder.value; // переключаем направление
    } else {
        sortKey.value = key;
        sortOrder.value = 1; // по умолчанию по возрастанию
    }
    currentPage.value = 1; // Сбрасываем на первую страницу при смене сортировки
};

const sortedData = computed(() => {
    if (!sortKey.value) return props.data;

    return [...props.data].sort((a, b) => {
        const valA = a[sortKey.value];
        const valB = b[sortKey.value];

        if (valA < valB) return -1 * sortOrder.value;
        if (valA > valB) return 1 * sortOrder.value;
        return 0;
    });
});

//общее кол-во страниц
const totalPages = computed(() => {
    return Math.ceil(sortedData.value.length / pageSize.value);
});

//определить значения
const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return sortedData.value.slice(start, end);
});

//переключение
const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};

</script>

<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th v-for="key in keys" :key="key" @click="sortBy(key)" style="cursor: pointer;">
                        {{ key }}
                        <span v-if="sortKey === key">{{ sortOrder === 1 ? '▲' : '▼' }}</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in paginatedData" :key="index">
                    <td v-for="key in keys" :key="key">{{ item[key] }}</td>
                </tr>
            </tbody>
        </table>
        <div style="margin-top: 10px;">
            <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
                Назад
            </button>

            <button v-for="page in totalPages" :key="page" @click="goToPage(page)"
                :style="{ fontWeight: currentPage === page ? 'bold' : 'normal' }">
                {{ page }}
            </button>

            <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">
                Вперёд
            </button>
        </div>
    </div>
</template>
