<script setup>
import { ref, defineProps } from 'vue';
const keys = ref([]);

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
});

const goKeys = () => {
    for (let i of props.data) {
        keys.value = Object.keys(i);
    }
    return (keys.value);
};


</script>

<template>
    <table>
            <thead >
                <tr>
                    <th v-for="(elem, key) of goKeys()" :key="key">
                        {{ elem }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(value, key) in props.data" :key="key">
                    <td v-for="(elem, key) of value" :key="key">{{ elem }}</td>
                </tr>
            </tbody>
    </table>
</template>
