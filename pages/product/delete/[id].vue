<script lang="ts" setup>
import { useProductsStore } from "~/stores/products";
import { Product } from "~/types/product";

const { baseStorageUrl } = useAppConfig();
const isLoading = ref(true);
const productStore = useProductsStore();
const route = useRoute();

const product = ref({} as Product);

const id = typeof route.params.id === 'string' ? parseInt(route.params.id) : null;

productStore.getProductList().then(() => {
    product.value = productStore.products.find((item: Product) => item.id === id);
    if(!product.value){
        alert(`Product with ID ${id} not found! Press OK to redirect to product page.`);
        useRouter().push({ path: "/product" });
        return;
    }
    isLoading.value = false;
});


const deleteProduct = () => {
    productStore.deleteProduct(id).then(() => {
        if(!productStore.status){
            alert(productStore.message);
            return;
        }
        alert("Product deleted successfully.\nPress OK to return to the product page.");
        useRouter().push({ path: "/product" });
    });
}
</script>

<template>
    <h1 v-if="isLoading">
        Loading product, please wait...
    </h1>
    <div v-else>
        <h1>
            Are you sure you want to delete {{ product.name }}?
        </h1>
        <img :src="baseStorageUrl + product.image" :alt="product.desc">
        <div class="choice">
            <button @click="deleteProduct" class="delete">
                <i class="ri-delete-bin-2-line"></i>
                <span>Delete</span>
            </button>
            <NuxtLink to="/product" class="cancel">
                <i class="ri-close-line"></i>
                <span>Cancel</span>
            </NuxtLink>
        </div>
    </div>
</template>

<style scoped>
h1 {
    font-size: 2.25rem;
    line-height: 2.5rem;
    font-weight: 700;
    margin: 5rem;
    text-align: center;
}
img {
    width: auto;
    height: auto;
    max-width: 20rem;
    max-height: 20rem;

    margin: 0 auto 2.5rem;
    border: 2px solid var(--text-tertiary-color);
    border-radius: 1.5rem;
}

.choice {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    font-size: x-large;
    border-top: 2px solid var(--text-tertiary-color);
    padding-top: 2.5rem;
    margin-bottom: 2.5rem;
}
.delete {
    display: flex;
    background-color: var(--error-color);
    border: 2px solid var(--error-accent-color);
    color: var(--error-accent-color);
    padding: 0.5rem 1.25rem;
    gap: 1rem;
    border-radius: 9e9px;
    cursor: pointer;
    transition: all 150ms ease;
}
.delete:hover {
    background-color: var(--error-accent-color);
    color: white;
}
.cancel {
    display: flex;
    background-color: var(--tertiary-bg-color);
    color: var(--text-primary-color);
    border: 2px solid var(--tertiary-bg-color);
    padding: 0.5rem 1.25rem;
    gap: 1rem;
    border-radius: 9e9px;
    cursor: pointer;
    transition: all 150ms ease;
}
.cancel:hover {
    background-color: var(--translucent-primary-color);
    color: white;
}
</style>