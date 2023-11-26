<script lang="ts" setup>
import { useProductsStore } from "~/stores/products";
import { Product } from "~/types/product";

const isLoading = ref(true);
const productStore = useProductsStore();
const route = useRoute();

// ref of empty object of type product
const product = ref({} as Product);

productStore.getProductList().then(() => {
    product.value = productStore.products.find((item: Product) => item.id === id);
    if(!product.value){
        alert(`Product with ID ${id} not found! Press OK to redirect to product page.`);
        useRouter().push({ path: "/product" });
        return;
    }
    isLoading.value = false;
});

const id = typeof route.params.id === 'string' ? parseInt(route.params.id) : null;

</script>

<template>
    <h1 v-if="isLoading" class="loadingText">
        Loading product, please wait...
    </h1>
    <ProductDetail v-else :product="product" />
</template>

<style scoped>
.loadingText {
    font-size: 2.25rem;
    line-height: 2.5rem;
    font-weight: 700;
    margin: 5rem;
    text-align: center;
}
</style>