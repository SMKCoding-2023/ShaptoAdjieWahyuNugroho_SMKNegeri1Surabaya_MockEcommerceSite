<script lang="ts" setup>
import type {Product} from '~/types/product';

const products = ref<Product[]>([]);
const totalPrice = computed(() => {
    let subtotal = 0
    products.value.forEach((product) => {
        subtotal += (product.price ?? 0) * (product.quantity ?? 0)
    })
    return subtotal;
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

const router = useRouter();
const confirm = () => {
    localStorage.setItem("products", JSON.stringify([])); // clear cart
    if (products.value.length > 0) {
        router.push({ path: "/delivery" });
    }
}
</script>

<template>
<section>
    <div class="headingContainer">
        <h1 class="heading">Thank you for purchasing at our online shop!</h1>
    </div>
    <h3 class="orderHeading">Your package is being delivered to your location.</h3>
    <span class="totalPrice">Estimated Time of Arrival: 13752850928 years, 11 months, 16 days</span>
    <p>Current status: Package was dropped into a black hole</p>
    <div style="margin-bottom: 10rem;"></div>
</section>
</template>

<style scoped>
section {
    padding: 2rem;
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

.checkout {
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
.checkout:hover {
    background-color: var(--dark-primary-color);
}
button.checkout:focus {
    border: 2px solid var(--primary-color);
}
button.disabled {
    cursor: not-allowed;
    background-color: var(--tertiary-bg-color);
    color: var(--text-primary-color);
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 700;
    width: 100%;
    padding: 0.5rem 0;
    border-radius: 0.5rem;
}
</style>