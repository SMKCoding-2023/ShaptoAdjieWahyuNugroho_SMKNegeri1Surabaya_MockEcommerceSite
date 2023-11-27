<script lang="ts" setup>
import type {Product} from '~/types/product';

const props = defineProps({
    product: {
        type: Object,
        default: {},
    },
});

const { baseStorageUrl } = useAppConfig();

const productRef = ref(props.product);

const addToCart = () => {
    productRef.value.inCart = !productRef.value.inCart;
    let localStorageData = localStorage.getItem("products");
    let products: Product[] = [];

    if(localStorageData){
        products = JSON.parse(localStorageData);
    }

    if(productRef.value.inCart){
        productRef.value.quantity = 1;
        products.push(productRef.value);
    } else {
        productRef.value.quantity = 0;
        products = products.filter((item) => item.id !== productRef.value.id)
    }
        localStorage.setItem("products", JSON.stringify(products));
}
</script>

<template>
    <section>
        <div class="imageContainer">
            <NuxtLink :to="`/product/${productRef.id}`">
                <img :src="baseStorageUrl + props.product.image" />
            </NuxtLink>
        </div>
        <div class="infoContainer">
            <NuxtLink :to="`/product/${productRef.id}`">
                <h3 class="name">{{ productRef.name }}</h3>
            </NuxtLink>
            <div class="smallInfoContainer">
                <span class="infoText">{{ productRef.category }}</span>
                <span class="infoText">${{ productRef.price }}</span>
            </div>
            <div @click="addToCart" :class="`addToCart ${productRef.inCart ? 'inCart' : 'notInCart'}`">
                <i class="ri-shopping-cart-2-line"></i>
            </div>
        </div>
    </section>
</template>

<style scoped>
section {
    background-color: var(--secondary-bg-color);
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    border-radius: 0.75rem;
    overflow: hidden;
}
div.imageContainer {
    width: 100%;
    height: 200px;
    padding: 1.25rem;
    background-color: var(--ghost-primary-color);
}
img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.infoContainer {
    padding: 2.25rem 1.25rem 1.25rem;
    position: relative;
}
.name {
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 700;
    margin-bottom: 1rem;
}
.smallInfoContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.infoText {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 400;
}
.addToCart {
    cursor: pointer;
    position: absolute;
    top: -1.25rem;
    right: 1.75rem;
    width: 50px;
    height: 50px;
    /* drop-shadow-xl */
    filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
    border-radius: 9e9px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 150ms ease-in-out;
}
.addToCart:hover {
    background-color: var(--translucent-primary-color);
}
.inCart {
    background-color: var(--primary-color);
    color: white;
}
.notInCart {
    background-color: var(--bg-color);
    color: var(--text-primary-color);
}
</style>