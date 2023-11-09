<script setup>
import {ref} from 'vue'

const checked = ref(true)
</script>

<template>
    <label>
        Want a pizza? <input v-model="checked" type="checkbox"/>
    </label>
    <div>{{ checked }}</div>
</template>