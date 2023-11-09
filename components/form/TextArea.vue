<script setup>
import {ref} from 'vue'

const longText = ref("Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet")
</script>

<template>
    <textarea v-model="longText"/>
    <div>{{ longText }}</div>
</template>