<script setup>
import {ref} from 'vue'

const color = ref('White')
const colors = ['White', 'Red', 'Blue']
const test = 'White'
</script>

<template>
    <label v-for="c in colors">
        <input type="radio" v-model="color" value={{ c }}>
        {{ c }}
    </label>
    <div>T-shirt color: {{ color }}</div>
</template>