<script setup>
import {ref} from 'vue'

const employee = ref('John Doe')
</script>

<template>
    <select v-model="employee">
        <option>John Doe</option>
        <option>Jane Doe</option>
        <option>John Smith</option>
    </select>
    <div>Selected: {{ employee }}</div>
</template>