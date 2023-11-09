<script setup>
import {ref} from 'vue'

const text = ref("Unknown")
</script>

<template>
    <input v-model="text" type="input"/>
    <div>{{ text }}</div>
</template>