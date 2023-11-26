<script lang="ts" setup>
import { useProductsStore } from "~/stores/products";

definePageMeta({middleware: ["user-access"]});

const selectedCategory = ref("");
const productStore = useProductsStore();
const productList = ref([]);

productStore.getProductList().then(() => {
    productList.value = productStore.products;
});
</script>

<template>
    <section>
        <div>
            <div class="buttons">
                <NuxtLink to="/category/create" class="create-category">
                    Create Category
                </NuxtLink>
                <NuxtLink to="/product/create" class="create-product">
                    Create Products
                </NuxtLink>
                <Dropdown @selected-category="selectedCategory = $event" />
            </div>
            <div class="products">
                <template v-for="(item, index) in productList" :key="index">
                    <CardProduct :product="item" class="product" />
                </template>
            </div>
        </div>
    </section>
</template>

<style scoped>
section {
    padding: 0 3rem;
}
section > div {
    padding: 2.5rem 0;
}
.buttons {
    display: flex;
    justify-content: flex-end;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
}
.create-category {
    background-color: var(--create-category-color);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.75rem;
    border: 1px solid var(--create-category-border-color);
    border-radius: 0.5rem;
    transition: background-color 150ms ease-in-out;
}
.create-category:hover {
    background-color: var(--create-category-hover-color);
}
.create-product {
    background-color: var(--create-product-color);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.75rem;
    border: 1px solid var(--create-product-border-color);
    border-radius: 0.5rem;
    transition: background-color 150ms ease-in-out;
}
.create-product:hover {
    background-color: var(--create-product-hover-color);
}
.products {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    margin: 0 auto;
}
.product {
    width: calc(100% / 4 - 18px);
}
</style>