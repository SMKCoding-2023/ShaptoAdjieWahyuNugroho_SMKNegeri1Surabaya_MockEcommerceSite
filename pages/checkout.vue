<script lang="ts" setup>
import type {Product} from '~/types/product';

definePageMeta({middleware: ["user-access"]});

const products = ref<Product[]>([]);
const totalPrice = computed(() => {
    return products.value.filter((product) => { product.price !== undefined})
        .reduce((acc, curVal) => acc + curVal.price!, 0);
})
const removeFromCart = (id: number) => {
    products.value = products.value.filter((item) => item.id !== id);
    localStorage.setItem("products", JSON.stringify(products.value));
}

onMounted(() => {
    let localStorageData = localStorage.getItem("products");
    if (localStorageData) {
        products.value = JSON.parse(localStorageData);
    }
})
</script>

<!-- TODO: Add functionality -->
<template>
<section>
    <div>
        <div class="leftContainer">
            <div class="headingContainer">
                <h1 class="heading">Checkout</h1>
            </div>
        </div>
        <div class="rightContainer">
            <h3 class="orderHeading">Order Summary</h3>
            <div class="orderContainer">
                <div v-if="products.length > 0">
                    <div v-for="(v, index) in products" :key="index" class="product">
                        <span class="productName">{{v.name}}</span>
                        <span class="productPrice">${{v.price}}</span>
                    </div>
                </div>
                <div v-else>
                    <p class="emptyCart">You have no items in your cart.</p>
                </div>
            </div>
            <div class="totalPriceContainer">
                <span class="totalText">Total</span>
                <span class="totalPrice">${{totalPrice}}</span>
            </div>
            <button class="checkout">
                Checkout
            </button>
        </div>
    </div>
</section>
</template>

<style scoped>
section > div {
    padding: 2.5rem;
    display: flex;
    gap: 1.5rem;
}
div.leftContainer { width: 70% }
div.headingContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1.75rem;
    border-bottom: 1px solid var(--text-secondary-color);
    margin-bottom: 1.5rem;
}
.heading {
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 500;
}
div.cards {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}
.emptyCart {
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 300;
    text-align: center;
}

div.rightContainer {
    width: 30%;
    background-color: var(--bg-color);
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    height: max-content;
    padding: 1.5rem;
}
.orderHeading {
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 500;
    margin-bottom: 1.5rem;
}
div.orderContainer {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    border-bottom: 1px solid var(--text-secondary-color);
    padding-bottom: 1rem;
}
div.product {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
}
span.productName { font-size: 0.875rem; line-height: 1.25rem }
span.productPrice {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 600;
    text-align: right;
}
div.totalPriceContainer {
    display: flex;
    padding-top: 1rem;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
}
span.totalText { font-size: 1rem; line-height: 1.5rem }
span.totalPrice {
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 700;
}

button.checkout {
    /* bg-blue-600 text-white text-base font-bold w-full py-2 rounded-lg */
    background-color: var(--primary-color);
    color: white;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 700;
    width: 100%;
    padding: 0.5rem 0;
    border: 2px solid transparent;
    border-radius: 0.5rem;
}
button.checkout:hover {
    background-color: var(--dark-primary-color);
}
button.checkout:focus {
    border: 2px solid var(--primary-color);
}
</style>