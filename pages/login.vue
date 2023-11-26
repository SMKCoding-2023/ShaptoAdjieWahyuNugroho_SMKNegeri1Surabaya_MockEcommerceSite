<script lang="ts" setup>
definePageMeta({
    layout: "blank",
})

</script>
<template>
    <section>
        <div>
            <NuxtLink to="/" class="back">
                <i class="ri-arrow-left-line"></i>
            </NuxtLink>
            <LoginForm/>
        </div>
    </section>
</template>

<style scoped>
section > div {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}
.back {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background-color: var(--primary-color);
    color: white;
    height: 45px;
    width: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    cursor: pointer;
}
.back:hover {
    background-color: var(--dark-primary-color);
}
</style>